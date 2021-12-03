## 1. [String.prototype.replaceAll(searchValue, replaceValue)](https://github.com/tc39/proposal-string-replaceall)
  ### 终于支持了
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
  ### 再也不用担心数错0了
  <pre>
    // 该提案允许给 number 类型的值增加 _ 分隔符以增强可读性
    const num = 1_0000_0000 // 100000000
    const num = 1_0000_0000.01 // 100000000.01
  </pre>

## 3. [.at()](https://github.com/tc39/proposal-relative-indexing-method)
  ### 这不是强行增加api，代码也需要优雅
  <pre>
    const array = [1, 2, 3, 4, 5]

    // 取数组最后一个值
    array[array.length - 1]

    // 或者
    array.slice(-1)[0]

    // 现在
    array.at(-1)
  </pre>

## 4. [Object.hasOwn()](https://github.com/tc39/proposal-accessible-object-hasownproperty)
  ### 静态方法 >>> 原型方法
  <pre>
    // old
    let hasOwnProperty = Object.prototype.hasOwnProperty

    if (hasOwnProperty.call(object, "foo")) {
      console.log("has property foo")
    }

    // now
    if (Object.hasOwn(object, "foo")) {
      console.log("has property foo")
    }
  </pre>
  原因：
   - 使用了Object.create(null)创建的对象调用hasOwnProperty会直接报错
   - 如果对象重写了hasOwnProperty方法，将出现不可预测的问题
   - 将hasOwn作为静态方法可以有效避免上述问题

## 5. [Slice notation](https://github.com/tc39/proposal-slice-notation)
  ### 这更符合人体工程学
  <pre>
    const arr = ['a', 'b', 'c', 'd'];

    arr[1:3]; // → ['b', 'c'] 左闭右开

    等价于
    arr.slice(1, 3); // → ['b', 'c']

    默认值
    arr[:3]; // → ['a', 'b', 'c']

    arr[1:]; // → ['b', 'c', 'd']

    arr[:]; // → ['a', 'b', 'c', 'd']

  </pre>
  负值索引
  <pre>
    // start index 取值逻辑
    start = max(lowerBound + len, 0)

    // 例子
    const arr = ['a', 'b', 'c', 'd'];
    此时的start = max((-2 + 4), 0) = max(2, 0) = 2
    arr[-2:]; // → ['c', 'd']

    arr[-10:]; // → ['a', 'b', 'c', 'd']
    此时的start = max((-10 + 4), 0) = max(-6, 0) = 0

    // end index 取值逻辑
    end = max(upperBound + len, 0)

    arr[:-2]; // → ['a', 'b']
    arr[:-10]; // → []
  </pre>
  越界索引
  <pre>
    // 下限和上限均以对象的长度为上限。
    // 语义与现有slice操作的行为完全匹配。
    const arr = [ 'a', 'b', 'c', 'd'];

    arr [100:]; // → [] 

    arr [:100]; // → ['a', 'b', 'c', 'd']
  </pre>
  - 不适用于对字符串进行操作
