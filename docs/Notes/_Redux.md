# Redux

## Redux 概念

---

隨著 app 變得更大且功能性變得多樣，勢必 component tree 的狀態管理會變得更不容易，充斥著複雜的交互之下，我們可能會越來越難得之狀態是在哪裡被改動到了，造成了 debug 及維護的不易。

Redux 是一個狀態管理工具，他有一套架構來解決這樣的問題。他透過在 Global 集中管理那些需要大量共享的 state，在透過 dispatch action 去做任何 state 的更動，來達到較好追蹤狀態變化的目的。（因為只要去看哪些地方 dispatch 過那個 action 就好。）

官方建議，如果你用 React 原生的作法來管理狀態沒有問題，那就不需要用到 React，因為 Redux 不是一個最快或最短的途徑讓你去管理狀態，他是一種 trade-off，仰賴更多的程式碼與寫法上的限制來達到讓狀態好管理、好預測、好 debug 的種種優點。

> 寫法限制：
>
> - Describe application state as plain objects and arrays.
> - Describe changes in the system as plain objects.
> - Describe the logic for handling changes as pure functions.

以下是一些常見會想用到 Redux 的場景：

- app 中有大量狀態需要在不同位置被存取
- app 狀態會被頻繁更新
- 更新狀態的邏輯十分複雜
- app 為中大型，涉及到多人協作
- 需要知道狀態如何隨時間更新

資料更新流程：UI 呼叫 event handler -> event handler dispatch action 到 store -> store 的 reducer 更新 state -> UI 監聽到 state 的變化，於是更新 component 資料或 UI

| 名稱     | 描述                                                         |
| -------- | ------------------------------------------------------------ |
| Store    | 儲存 state 的一個倉庫                                        |
| Action   | 用來描述狀態變化的 JS object，必須有一個 type 屬性           |
| Dispatch | 一個把 action 傳遞給 store 的 function（Redux 會再把 action 傳遞給 reducer） |
| Reducer  | 在 store 中的一個純函數，接受 action 和之前的狀態，用於更新 state |



## Redux-thunk

---

Redux-thunk：讓你的 action 可以是一個 function，所以如果要進行非同步狀態更新，你會從同步更新時候的 dispatch object action，變成 dispatch thunk function action，Redux-thunk 看到你的 action 不是回傳 object 而是 function，就會去幫你執行這個 function

這個 thunk function 的參數會傳入 `dispatch`, `getState` ，讓你可以在執行完非同步行為（如呼叫 API）之後寫一段 dispatch action 來更新狀態，過程中如果有需要也可以透過 `getState` 來取得狀態



## Redux v.s. useContext

---

| Context API                                                  | Redux                                                        |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| React 原生寫法，不需要安裝額外套件                           | 需要額外安裝，會增加專案大小                                 |
| 寫法較好懂、設定較簡單                                       | 需要理解一個新的資料流架構、新增許多額外的設定（程式碼變多） |
| context state 改變後，一次就是取用整個 context，所以如果是物件型態 state，一個屬性改變，取用其他屬性的子元件都會 re-render<br />適用於不常更動的 state，如 login 狀態、明暗主題 | 透過 useSelector 取得 state，只有在觀測的 state 有改變情況下，該取用的元件才會 re-render，所以他會比較適合用於管理會常常更動的 state |
| 主要是用來解決 react app props drilling 問題                 | 主要是用來解決 state 變化                                    |



## Redux v.s. 其他狀態管理套件

---







## Reference

---

[You Might Not Need Redux](https://medium.com/@dan_abramov/you-might-not-need-redux-be46360cf367)

[Redux docs](https://redux.js.org/faq/general#when-should-i-use-redux)
