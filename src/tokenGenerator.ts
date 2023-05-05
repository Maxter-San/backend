const TokenGenerator = require( 'token-generator' )({
    salt: 'your secret ingredient for this magic recipe',
    timestampMap: 'abcdefghij', // 10 chars array for obfuscation proposes
});

export default TokenGenerator;