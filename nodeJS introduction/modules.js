const qs = require('querystring');


const myUrl = new URL('https://www.facebook.com/');


const query = qs.parse('foo=bar&abc=xyz&abc=123');

console.log(query)