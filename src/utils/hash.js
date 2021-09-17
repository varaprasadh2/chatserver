const bcrypt = require('bcrypt');


const SALT_ROUNDS = 5;

const getContentHash = async content => {    
    if(void 0 === content)  content = null;
    const hashedContent = await bcrypt.hash(content, SALT_ROUNDS);
    return hashedContent;
}

const isHashMatches = async (content, prevHash) => {
  const result = await bcrypt.compare(content, prevHash);
  return result;
}

module.exports = {
    getContentHash,
    isHashMatches
}
