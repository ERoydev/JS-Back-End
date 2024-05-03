const is = require('is');

function sum(a, b) {
    if (!is.integer(a) || !is.integer(b)) {
        throw new Error('Arguments are not integers');
    }
    return a + b;
}

function multiply(a, b) {
    return a * b;
}

module.exports = {
    sum,
    multiply
};