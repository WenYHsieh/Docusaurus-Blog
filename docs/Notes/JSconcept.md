---
enableComments: true
---

# JS 一些觀念

## function

---

### first-class function 一級函式

可視為一般變數一樣的 function 稱為 first-class function。

下例中，`func1` 為 first-class function

- function delaration

  ```js
  const func1 = () => { console.log('yup') }
  ```

  

- 可作為參數傳遞

  ```js
  const func1 = () => { console.log('yup') }
  const logFn = (fn) => { console.log(fn) }
  ```

  

- 可作為 function 回傳值

  ```js
  const func1 = () => { console.log('yup') }
  const logFn = (fn) => { return fn }
  ```

  

### high-order function 高階函式

high-order function 是指一個 function 有無能力接收一個 function 當作參數以及是否能夠 return 一個 function

下例中，`func2` 為 high-order function

```js
const func1 = () => { console.log('yup') }
const func2 = (fn) => { console.log(fn) }
or 
const func2 = (fn) => { return fn }
```



