/**
 * genarate from nodejs 
 * below generate from nodejs
 */
const crypto = require('crypto');
// const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
//     modulusLength: 2048,
//     publicKeyEncoding: {
//       type: 'spki',
//       format: 'pem'
//     },
//     privateKeyEncoding: {
//       type: 'pkcs8',
//       format: 'pem'
//     }
// });
const fs = require('fs');
var privateKey = fs.readFileSync('../your.key.pem').toString();
var publicKey = fs.readFileSync('../your.pub.pem').toString();


// console.log(privateKey); // private key
// console.log(publicKey); // public key

/**
 * simulate enc dec
 */

let string_ori = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi consequatur exercitationem officia consectetur dignissimos corporis illum nostrum? Aliquam facere earum odio! Id esse corporis eos, molestiae quam explicabo magnam dolore nemo tempore quaerat laboriosam est adipisci neque commodi cupiditate. Minus quis ullam, aspernatur, sunt enim officiis repellendus eum impedit in beatae repudiandae similique autem, inventore rerum eligendi voluptatibus pariatur quam deserunt culpa molestiae quo sapiente id? Perspiciatis, quibusdam quidem debitis voluptatem nesciunt, nisi quas sunt commodi sint ad pariatur. Labore dolor facilis cum, fuga, esse error totam facere adipisci et voluptatum cupiditate non saepe ex in officia nulla magni eligendi corrupti consequuntur maxime quo, perferendis vitae? Perspiciatis dolorum amet ea perferendis, laborum porro laboriosam dicta id enim libero veniam hic quaerat ab nostrum rem ex omnis praesentium animi impedit architecto! Unde odio quos deleniti magni facilis, veritatis in eum? Ratione aliquid perferendis, deserunt iusto eum sapiente culpa, ea consequatur obcaecati architecto reiciendis veniam assumenda inventore non vero, tempora fugit possimus rem natus. Quae, consequatur eaque ipsa eius quidem ipsum rerum eos facere reiciendis. Rem quae officia nisi maxime, totam quod eligendi tempore non, doloribus explicabo fugiat, veniam eveniet. Delectus accusantium quam exercitationem debitis voluptatem, soluta tempore? Sunt dicta itaque autem ex dolor, eos reiciendis voluptatibus rem vero dolore distinctio quasi, accusamus animi doloribus tempore? At, deserunt in. Rerum natus corrupti quod at sunt porro accusantium soluta neque vitae fugiat eos facilis deleniti, delectus asperiores distinctio, rem molestiae illum doloribus repellat. Odit, quas consequuntur. Officiis fuga dolores repellat quo omnis doloremque rerum natus dolorem? Minima iusto quod qui ex iste consectetur a porro, fugiat veritatis, ullam itaque, repudiandae molestias non debitis deserunt illum distinctio beatae ipsum nihil eligendi. Omnis et nisi itaque fuga nihil officia eum aliquid expedita assumenda, dolorum tempore fugit ad, maiores voluptatibus maxime numquam nostrum. Facilis porro veniam cupiditate saepe corporis amet minus dignissimos explicabo odit. Delectus hic nulla quas? Iusto quasi impedit, iste exercitationem quo sed molestiae molestias dignissimos illo voluptatum incidunt id et praesentium consectetur quas inventore. Perferendis veniam ex non iste quasi. Sit natus est voluptatem iure molestias vitae iusto quisquam repellat aut dolore facere nam debitis accusantium commodi sunt, nisi assumenda excepturi nulla. Corporis, odio sed, explicabo voluptatem soluta alias eius aspernatur dolore earum excepturi ab facere repudiandae accusamus porro expedita cum, ipsum pariatur perspiciatis eveniet voluptas asperiores! Dignissimos veniam atque laboriosam voluptatibus odit aut vero suscipit quibusdam eum possimus tenetur, voluptate deleniti corporis ipsam itaque? Hic minima optio doloribus incidunt repellendus quis at animi voluptatum sunt quasi amet cupiditate, praesentium laborum ex necessitatibus quam veritatis? Totam velit numquam consequuntur quia, asperiores laudantium reiciendis dolorum qui ipsum animi vel veritatis beatae repellendus quaerat autem rerum quod, distinctio rem suscipit delectus dolore voluptate. Rerum tempora perspiciatis eveniet numquam, voluptas rem alias, repellendus similique molestias ad id dolores maiores reprehenderit asperiores, consequuntur doloremque enim officia quisquam cumque fugit ducimus exercitationem libero quia. Aliquid ab, sit enim possimus neque illum porro asperiores atque ex libero omnis perferendis hic eaque ipsa ea tempora quae dolore quaerat natus aperiam?';



(async() => {
    const x2 = await strToEnc(string_ori, privateKey);
    const finalx2 = x2.toString('base64');

    const y2 = await encToDec(finalx2, publicKey);
    const finaly2 = y2.toString();
    console.log(finalx2)
    console.log(finaly2)
})();


async function enc(pvtkey, str) {
    return await crypto.privateEncrypt({ key: pvtkey }, Buffer.from(str))
}

async function dec(pubkey, enc) {
    return await crypto.publicDecrypt({ key: pubkey }, Buffer.from(enc, 'base64'));
}

async function strToEnc(str, key) {
    let size = 214;
    const numChunks = await Math.ceil(str.length / size)
    var joindata = []
    for (let i = 0, o = 0; i < numChunks; ++i, o += size) {
        joindata.push(await enc(key, str.substr(o, size)))
    }

    var buf = await Buffer.concat(joindata);
    return buf;
}


async function encToDec(str, key) {
    let size = 256;
    let buff = await Buffer.from(str, 'base64')

    const numChunks = await Math.ceil(buff.length / size)
    var joindata = []
    let setelah = 0;
    let o = 0;
    for (let i = 0; i < numChunks; ++i) {
        setelah += size
        joindata.push(await dec(key, buff.slice(o, setelah)))
        o = setelah;
    }
    var ret = joindata.join('');
    return ret;
}