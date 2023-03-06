# this - binding object 綁定物件

## this

1. 代表函式的綁定物件，通常在函式當中使用
2. 特別需要留意的是: 在不同 **程式脈絡**之下，this 所代表的東西可能不同

## 四種常見情況底下的 this

### 1. 獨立的函式 (function):

無論宣告在哪裡，但如果是物件方法裡面的 this 就會是物件本身： **this 代表 window 物件**

```jsx
function test() {
  console.log(this);
}
```

### 2. 物件的方法 (Object method)：

**this 代表物件本身**

```jsx
let Obj{
    x:3,
    test:function(){
    console.log(this);
    }
}
```

### 3. 事件處理函式 (eventListener)：

**this 代表觸發事件的對象物件**

```jsx
document.addEventListener('mouseover', function () {
  console.log(this);
});
```

### 4. 建構函式 (constructor)：

**this 就是瀏覽器自動幫我們建立好的物件**

```jsx
function Point() {
  console.log(this);
}
new Point();
```

5. Arrow function

   arrow function 的 `this` 是依據語彙環境的父層區域（parent scope）來綁定。 白話的說，arrow function 定義位置（不是呼叫順序）的上一層 `this` 代表誰，arrow function 內的 `this` 就代表誰

## 自定義、重新設定 「綁定物件」的三種方法 - bind, call, apply

### 1. functionName.bind(新綁定物件)

使用 bind() 將函式的綁定物件**自定義**

回傳一個新的 function

```jsx
let newFuntion = oldFunctionName.bind(新的綁定物件);
/* 
回傳function with 新的綁定物件
因為式回傳新的function所以務必要宣告新變數存起來
*/
```

### 2. functionName.apply (新綁定物件, [參數…])

是一種特殊的呼叫函式的方式，藉由傳入新的自定義榜定物件，以陣列的形式傳入呼叫時欲傳入的參數。

```jsx
function add(a, b) {
  return a + b;
}
// 一般的函式呼叫
add(1, 2);
// 傳入 document 物件當作新的綁定物件，傳入 [4, 5] 當作參數來呼叫這個 add
add.apply(document, [4, 5]);
```

### 3. functionName.call(新綁定物件, 參數…)

基本上用法跟 apply 一樣，只是說他傳參數的方式是直接傳入，不是放在 array 裡面傳入。

```jsx
function add(a, b) {
  return a + b;
}
// 一般的函式呼叫
add(1, 2);
// 傳入 document 物件當作新的綁定物件，傳入 4, 5 當作參數來呼叫這個 add
add.call(document, 4, 5);
```

References:

- [Function 內的 this 到底是哪個 this](https://www.spreered.com/arrow-function-this/)
