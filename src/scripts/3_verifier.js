let vcx = require("node-vcx-wrapper");
let ffi = require("ffi");

const {
  Schema,
  CredentialDef,
  Connection,
  IssuerCredential,
  Proof,
  ProofState,
  StateType,
  Error,
  rustAPI
} = vcx;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function run() {
  const myffi = ffi.Library("/usr/lib/libsovtoken.so", {
    sovtoken_init: ["void", []]
  });
  await myffi.sovtoken_init();
  await vcx.initVcx("/indy/vcx-config.json");

  const connectionToHolder = await Connection.create({ id: "holder" });
  await connectionToHolder.connect('{"use_public_did": true}');
  await connectionToHolder.updateState();
  const details = await connectionToHolder.inviteDetails(true);
  console.log(
    "*** Create QR code out of this invite externally and scan it with Holder's ConnectMe ***\n"
  );
  console.log(JSON.stringify(JSON.parse(details)));

  let connection_state = await connectionToHolder.getState();
  while (connection_state !== StateType.Accepted) {
    await sleep(2000);
    await connectionToHolder.updateState();
    connection_state = await connectionToHolder.getState();
  }
  console.log("Connection was accepted!");

  const proofAttributes = [
    { name: "First name" },
    { name: "Last name" },
    { name: "Date of birth" },
    { name: "Credit rating" }
  ];

  console.log("Create a Proof object");
  const proof = await Proof.create({
    sourceId: "213",
    attrs: proofAttributes,
    name: "proofForHolder",
    revocationInterval: {}
  });

  console.log("Request proof of the credit rating from the holder");
  await proof.requestProof(connectionToHolder);

  console.log("Poll the agency and wait for the holder to provide a proof");
  let proofState = await proof.getState();
  while (proofState !== StateType.Accepted) {
    sleep(2000);
    await proof.updateState();
    proofState = await proof.getState();
  }

  console.log("Process the proof provided by the holder");
  let proof_data = await proof.getProof(connectionToHolder);
  let valid = proof_data.proofState;
  if (valid === ProofState.Verified) {
    console.log("Proof is verified");
  } else {
    console.log("Could not verify proof");
  }
  console.log("Proof object: ", JSON.stringify(proof_data, null, 4));
}

run();
