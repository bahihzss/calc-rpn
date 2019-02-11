module.exports = class RPN {
  constructor (formula) {
    this.stack = []
    this.formula = formula
    this.operators = ['+', '-', '/', '*', '^', '%']
    this.previosOperator = null
  }

  /**
   * 逆ポーランド記法の計算式を計算して結果を返す
   * もし、不正な形式だった場合はnullを返す
   *
   * @return {Number, null}
   */
  calc () {
    this.getElements().forEach(element => {
      if (!this.isOperator(element)) {
        this.stack.push(element)
      } else {
        let sub;

        if (this.stack.length < 2) {
          throw new Error('Error: Invalid Format (Operator is too much.)')
        }

        const el1 = this.spliceLastElement()
        const el2 = this.spliceLastElement()

        eval(`sub = ${el1} ${element} ${el2}`)

        this.stack.push(sub)
      }
    })

    if (this.stack.length !== 1) {
      throw new Error('Error: Invalid Format (Few operator.)')
    }

    return this.stack[0]
  }

  /**
   * 逆ポーランド記法を要素毎に分けたものを配列に格納して返す
   *
   * @returns {*|string[]}
   */
  getElements () {
    return this.formula.split(' ')
  }

  /**
   * 任意の要素が演算子かどうかを返す
   *
   * @param {Number, String} element
   * @returns {boolean}
   */
  isOperator(element) {
    return this.operators.includes(element)
  }

  /**
   * スタックから最後の要素を抜き出す
   *
   * @returns {Number}
   */
  spliceLastElement() {
    return this.stack.splice(this.stack.length - 1, 1)[0]
  }

  /**
   * 一般的な記法の計算式を返す
   *
   * @returns {String}
   */
  toStandardFormula() {
    this.getElements().forEach(element => {
      if (!this.isOperator(element)) {
        this.stack.push(element)
      } else {
        if (this.stack.length < 2) {
          throw new Error('Error: Invalid Format (Operator is too much.)')
        }

        const el1 = this.spliceLastElement()
        const el2 = this.spliceLastElement()

        this.stack.push(RPN.getClause(el1, el2, element))

        this.previosOperator = element
      }
    })

    if (this.stack.length !== 1) {
      throw new Error('Error: Invalid Format (Few operator.)')
    }

    return this.stack[0]
  }

  /**
   * 項を返す。
   * ＋・ーの場合は括弧を付加する
   *
   * @param el1
   * @param el2
   * @param operator
   * @returns {string}
   */
  static getClause(el1, el2, operator) {
    return ['+', '-'].includes((operator))
      ? `(${el2} ${operator} ${el1})`
      : `${el2} ${operator} ${el1}`
  }
}

module.exports.calc = function(formula) {
  const calculator = new RPN(formula)
  return calculator.calc()
}

module.exports.toStandardFormula = function(formula) {
  const calculator = new RPN(formula)
  return calculator.toStandardFormula()
}
