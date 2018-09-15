const sha = new require('./sha')

var buf = new Buffer("hey")

var result = sha('sha256').update(buf).digest()

console.log(result.toString('hex'))
