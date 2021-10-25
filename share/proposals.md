# Finished Proposals

## 1. [String.prototype.replaceAll(searchValue, replaceValue)](https://github.com/tc39/proposal-string-replaceall)

  <pre>
    // 这里需要将queryString的 + 转为 空格
    const queryString = 'q=query+string+parameters'

    // 在之前只能使用
    queryString.replace(/\+/g, ' ')

    // 或者结合split和join
    queryString.split('+').join(' ')

    // 现在可以直接使用
    queryString.replaceAll('+', ' ')
  </pre>

  >注意：
  >1. 如果searchValue是一个非全局正则表达式，则直接抛出错误
  >2. 如果searchValue是一个全局正则表达式，则表现与replace一致

## 2. [Numeric Separators](https://github.com/tc39/proposal-numeric-separator)

  <pre>
    // 该提案允许给 number 类型的值增加 _ 分隔符以增强可读性
    const num = 1_0000_0000 // 100000000
    const num = 1_0000_0000.01 // 100000000.01
  </pre>

## 3. [.at()](https://github.com/tc39/proposal-relative-indexing-method)
