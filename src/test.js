const vcx = require("./lib/vcx");

async function issueCredential() {
  let { connection, qrcode } = await vcx.createConnection();
  connection = await vcx.waitForAcceptance(connection);
  let credential = await vcx.issueCredential(connection);
  console.log("credential issued");
  console.log(credential);
}

async function verifyCredential() {
  let { connection, qrcode } = await vcx.createConnection();
  connection = await vcx.waitForAcceptance(connection);

  let proof = await vcx.requestAndVerifyCredential(connection);
  console.log("proof");
  console.log(proof);
}

async function run() {
  await vcx.init();
  await issueCredential();
  await verifyCredential();
}

run();
