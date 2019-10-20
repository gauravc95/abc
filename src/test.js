const vcx = require("./lib/vcx");

async function issueCredential() {
  let { connection, qrcode } = await vcx.createConnection();
  connection = await vcx.waitForAcceptance(connection);
  let credential = await vcx.issueCredential(connection);
}

issueCredential()
