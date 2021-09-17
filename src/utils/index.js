const hash  = require("./hash");


// temporary test case 
// (async ()=>{
//     const something = await hash.getContentHash("something");
//     const isSame = await hash.isHashMatches('something', something);
//     const isNotSame = await hash.isHashMatches('not something', something);

//     console.log({
//         something,
//         isSame,
//         isNotSame
//     })
// })()


module.exports = {
   ...hash
}
