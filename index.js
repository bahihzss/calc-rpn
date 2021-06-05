class RPN {
  constructor (operators = null) {
    this._operators = operators || ['+', '-', '/', '*', '^', '%']
  }

  /**
   * Split elements and collect clause elements.
   * Then pass the clause elements into callback.
   *
   * @param formula {String}
   * @param callback {Function}
   * @returns {*}
   * @private
   */
  _calc (formula, callback) {
    const elements = formula.split(' ')

    const stack = elements.reduce((stack, element) => {
      if (!this._operators.includes(element)) {
        if (!/^\d+$/.test(element)) throw Error(`Error: Invalid element '${element}'`)
        return stack.concat([element])
      }

      if (stack.length < 2) {
        throw new Error('Error: Invalid Format (Operator is too much.)')
      }

      const el1 = stack.splice(-1, 1)[0]
      const el2 = stack.splice(-1, 1)[0]
      const sub = callback(el1, el2, element)

      return stack.concat([sub])
    }, [])

    if (stack.length !== 1) {
      throw new Error('Error: Invalid Format (Few operator.)')
    }

    return stack[0]
  }

  calc (formula) {
    return this._calc(formula, this._eval)
  }

  /**
   * Evaluate a clause.
   *
   * @param el1 {String}
   * @param el2 {String}
   * @param operator {String}
   * @returns {Number}
   * @private
   */
  _eval (el1, el2, operator) {
    return eval(`${el1} ${operator} ${el2}`)
  }

  /**
   * Returns the standard notation formula.
   *
   * @param formula {String}
   * @returns {String}
   */
  standardization (formula) {
    return this._calc(formula, this._stringify)
  }

  /**
   * Returns the clause.
   *
   * @param el1 {String}
   * @param el2 {String}
   * @param operator {String}
   * @returns {String}
   */
  _stringify (el1, el2, operator) {
    el1 = el1.replace(/^\((\d+ [+-] \d+)\)$/, '$1')
    el2 = el2.replace(/^\((\d+ [+-] \d+)\)$/, '$1')

    const clause = `${el2} ${operator} ${el1}`

    return /^[+-]$/.test(operator) ? `(${clause})` : clause
  }
}

module.exports.calc = function (formula) {
  return new RPN().calc(formula)
}

module.exports.standardization = function (formula) {
  return new RPN().standardization(formula)
}
