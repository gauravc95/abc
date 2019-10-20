let vcx = require("node-vcx-wrapper");
let ffi = require("ffi");

const {
  Schema,
  CredentialDef,
  Connection,
  IssuerCredential,
  Proof,
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

  const connectionToHolder = await Connection.create({ id: "Holder" });
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
  var serializedCredDef = {
    version: "1.0",
    data: {
      id: "RQGxEnKLN6HRMsUpdMNHjm:3:CL:75818:tag1",
      tag: "tag1",
      name: "CreditRatingCredDef",
      source_id: "CreditRatingCredDef",
      issuer_did: "RQGxEnKLN6HRMsUpdMNHjm",
      cred_def_payment_txn: null,
      rev_reg_def_payment_txn: null,
      rev_reg_delta_payment_txn: null,
      rev_reg_id: null,
      rev_reg_def: null,
      rev_reg_entry: null,
      tails_file: "tails.txt"
    }
  };

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
  await credential.sendOffer(connectionToHolder);
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
  await credential.sendCredential(connectionToHolder);

  console.log("Wait for the holder to accept the credential");
  await credential.updateState();
  credential_state = await credential.getState();
  while (credential_state !== StateType.Accepted) {
    sleep(2000);
    await credential.updateState();
    credential_state = await credential.getState();
  }
}

run();
