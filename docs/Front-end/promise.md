---
enableComments: true
---

# Promise

Promise 是個建構函式，讓我們可以定義一段非同步行為，在成功或失敗情況下要執行的程式碼，並提供一個易於閱讀、使用及維護的介面來處理前端的非同步行為。

關於為何出現 Promise 及我們為何需要他，可以參考 [前端程式非同步流程控制 ](/Front-end/asyncHandlingInF2E)。

## 常見操作

---

1.  new Promise() 得到實體物件後，可以調用方法

    ```js
    const p = new Promise()

    p.then() // 用於操作成功的情況，resolve (fulfilled) 會調用
    p.catch() // 用於操作失敗的情況，reject 會調用
    p.finally() // 無論狀態是成功或失敗都會執行當中的 callback
    ```

2.  new Promise 時通常會傳入一個 callback，代兩個參數，resolve 及 reject

    ```js
    new Promise((resolve, reject) => {
      // 在這的東西會立刻被執行
      resolve() // 設定為 resole (fulfilled)
      reject() // 設定為 reject
    })
    ```

    - new Promise 裡面的 callback 是會立刻執行的，而 resolve 則是在 `.then()` 呼叫到才會回傳值，`.catch()` 則是去拿 reject 的值

3.  Promise 狀態有三種，一定會處在其一。依據調用 `resolve` or `reject` 來決定變為 `Fulfilled` or `Rejected` 。如果都沒有調用，就會是 `pending`
4.  `.then()` 可以串聯使用，第二個 `.then()` 開始會拿到上一個 `.then()` callback 的回傳值
5.  `.catch` 通常會放在最後，當任何 `.then()` 出錯都會直接跳到最後，不會再繼續執行後續的 `.then()`

## Practical use case

---

在後端 API 還沒有產出之前，但 schema 已經有的狀態下。就可以利用 Promise 來模擬 API，因為比起你在前端寫死 Response 結構，使用 promise ，不只能模擬回傳的結構，也能保留非同步特性。

```js
export const getData = (data, successRate = 0.98, maxLatencyMs = 1000) => {
  const mockResponse = {
    status: 200,
    error: null,
    message: null,
    object: {
      id: 1,
      name: 'BbokAri',
      type: 'chick',
    },
    errorDetail: null,
    data,
  }

  return new Promise((resolve, reject) => {
    const successRoll = Math.random()

    const latency = Math.floor(Math.random() * (maxLatencyMs + 1))
    // [0, maxLatencyMs]

    if (successRoll <= successRate) {
      setTimeout(() => resolve(mockResponse), latency)
    } else {
      setTimeout(() => reject('API failed to return data'), latency)
    }
  })
}
```

以上為一個範例，我們可以依照後端 schema 事先產生 mockResponse，同時模擬一個每次都在不同時間內回傳及有一定失敗機率的 API call。

## Reference

---

[JavaScript Promises: Practical Use Cases and Examples](https://www.aleksandrhovhannisyan.com/blog/javascript-promise-tricks/)
