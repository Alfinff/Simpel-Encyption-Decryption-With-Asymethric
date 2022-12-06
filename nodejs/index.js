/**
 * genarate from nodejs 
 * below generate from nodejs
 */
const crypto = require('crypto');
const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: {
      type: 'spki',
      format: 'pem'
    },
    privateKeyEncoding: {
      type: 'pkcs8',
      format: 'pem'
    }
});

console.log(privateKey); // private key
console.log(publicKey); // public key

/**
 * simulate enc dec
 */

let string_ori = 'somte text was here';
let encString = Enc(privateKey, string_ori);
let decString = Dec(publicKey, encString);
console.log(encString)
console.log(decString)


function Enc(privateKey, string_original){
  return crypto.privateEncrypt(privateKey, Buffer.from(string_original,'utf8')).toString('base64');
}

function Dec(publicKey, encrypt_string){
  return crypto.publicDecrypt(publicKey,Buffer.from(encrypt_string, 'base64')).toString();
}