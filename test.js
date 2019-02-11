const { calc, toStandardFormula } = require('./index.js')

// 1 2 + 3 * => (1 + 2) * 3 = 9
console.log(calc('1 2 + 3 *'))

// 1 2 + 3 4 + * => (1 + 2) * (3 + 4) = 21
console.log(calc('1 2 + 3 4 + *'))

// 1 2 + 3 + 4 * => (1 + 2 + 3) * 4 = 24
console.log(calc('1 2 + 3 + 4 *'))

// Few operator 1 2 + 3 4 +
try {
  calc('1 2 + 3 4 +')
} catch (e) {
  console.log(e.message)
}

// Too much operator 1 2 + 3 * +
try {
  calc('1 2 + 3 * +')
} catch (e) {
  console.log(e.message)
}

// 1 2 + 3 + 4 * => (1 + 2 + 3) * 4
console.log(toStandardFormula('1 2 + 3 + 4 *'))
