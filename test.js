const assert = require('assert')
const { describe, it } = require('mocha')

const { calc, standardization } = require('./index.js')

describe('Normal operations', () => {
  it('1 2 + 3 * => (1 + 2) * 3 = 9', () => {
    assert.strictEqual(calc('1 2 + 3 *'), 9)
  })

  it('1 2 + 3 4 + * => (1 + 2) * (3 + 4) = 21', () => {
    assert.strictEqual(calc('1 2 + 3 4 + *'), 21)
  })

  it('1 2 + 3 + 4 * => (1 + 2 + 3) * 4 = 24', () => {
    assert.strictEqual(calc('1 2 + 3 + 4 *'), 24)
  })

  it('Convert to standard formula', () => {
    assert.strictEqual(standardization('1 2 + 3 + 4 *'), '(1 + 2 + 3) * 4')
  })
})

describe('Abnormal operations', () => {
  it('Few operator 1 2 + 3 4 +', () => {
    try {
      calc('1 2 + 3 4 +')
    } catch (e) {
      assert.strictEqual(e.message, 'Error: Invalid Format (Few operator.)')
    }
  })

  it('Too much operator 1 2 + 3 * +', () => {
    try {
      calc('1 2 + 3 * +')
    } catch (e) {
      assert.strictEqual(e.message, 'Error: Invalid Format (Operator is too much.)')
    }
  })

  it('Invalid element a 2 + 3 * +', () => {
    try {
      calc('a 2 + 3 * +')
    } catch (e) {
      assert.strictEqual(e.message, 'Error: Invalid element \'a\'')
    }
  })
})
