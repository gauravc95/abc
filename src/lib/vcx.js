const vcx = require("node-vcx-wrapper");
const ffi = require("ffi");

async function init() {
  const myffi = ffi.Library("/usr/lib/libsovtoken.so", {
    sovtoken_init: ["void", []]
  });

  await myffi.sovtoken_init();
  await vcx.initVcx("/indy/vcx-config.json");
}

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

async function createConnection() {
  // returns {connection: object, qrcode: string}
  const connectionToHolder = await Connection.create({ id: "Holder" });
  await connectionToHolder.connect('{"use_public_did": true}');
  await connectionToHolder.updateState();
  const details = await connectionToHolder.inviteDetails(true);
  console.log(
    "*** Create QR code out of this invite externally and scan it with Holder's ConnectMe ***\n"
  );
  console.log(JSON.stringify(JSON.parse(details)));
  return {
    connection: connectionToHolder,
    qrcode: JSON.stringify(JSON.parse(details))
  };
}

async function waitForAcceptance(connection) {
  let connection_state = await connection.getState();
  // waiting for
  while (connection_state !== StateType.Accepted) {
    await sleep(2000);
    await connection.updateState();
    connection_state = await connection.getState();
  }
  console.log("Connection was accepted!");
  return connection;
}

async function issueCredential(connection) {
  var serializedCredDef = { version: '1.0',
  data: 
   { id: 'RQGxEnKLN6HRMsUpdMNHjm:3:CL:75844:tag1',
     tag: 'tag1',
     name: 'CreditRatingCredDef',
     source_id: 'CreditRatingCredDef',
     issuer_did: 'RQGxEnKLN6HRMsUpdMNHjm',
     cred_def_payment_txn: null,
     rev_reg_def_payment_txn: null,
     rev_reg_delta_payment_txn: null,
     rev_reg_id: null,
     rev_reg_def: null,
     rev_reg_entry: null,
     tails_file: 'tails.txt' } }
     
  
  var credDef = await CredentialDef.deserialize(serializedCredDef);
  var credDefHandle = credDef.handle;

  const attrs = {
    "First name": "John",
    "Last name": "Doe",
    "Date of birth": "01.01.1970",
    "Credit rating": "BB-"
  };

  let credential = await IssuerCredential.create({
    sourceId: "123",
    credDefHandle: credDefHandle,
    attr: attrs,
    credentialName: "Customer Record",
    price: "0"
  });
  await credential.sendOffer(connection);
  await credential.updateState();
  console.log("Credential offer sent");

  console.log(
    "Poll the agency and wait for the holder to send a credential request"
  );
  let credential_state = await credential.getState();
  while (credential_state !== StateType.RequestReceived) {
    await sleep(2000);
    await credential.updateState();
    credential_state = await credential.getState();
  }

  console.log("Issue a credential to a holder");
  await credential.sendCredential(connection);

  console.log("Wait for the holder to accept the credential");
  await credential.updateState();
  credential_state = await credential.getState();
  while (credential_state !== StateType.Accepted) {
    sleep(2000);
    await credential.updateState();
    credential_state = await credential.getState();
  }
  return credential;
}

async function requestAndVerifyCredential(connection) {
  // returns {proof: object, state: boolean}
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
  await proof.requestProof(connection);

  console.log("Poll the agency and wait for the holder to provide a proof");
  let proofState = await proof.getState();
  while (proofState !== StateType.Accepted) {
    sleep(2000);
    await proof.updateState();
    proofState = await proof.getState();
  }

  console.log("Process the proof provided by the holder");
  let proof_data = await proof.getProof(connection);
  console.log("Proof object: ", JSON.stringify(proof_data, null, 4));
  let valid = proof_data.proofState;
  if (valid === ProofState.Verified) {
    console.log("Proof is verified");
  } else {
    console.log("Could not verify proof");
  }
  return { proof: proof_data, state: valid === ProofState.Verified };
}

exports.init = init;
exports.createConnection = createConnection;
exports.waitForAcceptance = waitForAcceptance;
exports.issueCredential = issueCredential;
exports.requestAndVerifyCredential = requestAndVerifyCredential;
