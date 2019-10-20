const express=require("express")
var QRCode = require('qrcode')
const vcx = require("./lib/vcx");
 

const app=express()
init()

async function init() {

    await vcx.init();

}
async function issuer(req, res) {

    let { connection, qrcode } = await vcx.createConnection();

    console.log(qrcode)

    QRCode.toFile("./qrcode.png",qrcode, function (err) {
        res.sendFile("/app/qrcode.png")
    })

    connection = await vcx.waitForAcceptance(connection);
    let credential = await vcx.issueCredential(connection);
    console.log("credential issued");
    console.log(credential);
} 


async function verify(req, res) {

    let { connection, qrcode } = await vcx.createConnection();
    
    QRCode.toFile("./qrcodeverify.png",qrcode, function (err) {
        res.sendFile("/app/qrcodeverify.png")
    })

    connection = await vcx.waitForAcceptance(connection);
  
    let proof = await vcx.requestAndVerifyCredential(connection);
    console.log("proof");
    console.log(proof);
    res.send(proof)
}


app.get("/app/issuer/createConnection",function(req,res){
    issuer(req, res)
})

app.get("/app/verify/verifyCredentials",function(req,res){
    verify(req,res)
})

app.listen(9005,()=>console.log("Server running on port 9001"))
