# Redux

## Redux 概念

---

| 名稱     | 描述                                                         |
| -------- | ------------------------------------------------------------ |
| Store    | 儲存 state 的一個倉庫                                        |
| Action   | 用來描述狀態變化的 JS object，必須有一個 type 屬性           |
| Dispatch | 一個把 action 傳遞給 store 的 function（Redux 會再把 action 傳遞給 reducer） |
| Reducer  | 在 store 中的一個純函數，接受 action 和之前的狀態，用於更新 state |

資料更新流程：UI 呼叫 event handler -> event handler dispatch action 到 store -> store 的 reducer 更新 state -> UI 監聽到 state 的變化，於是更新 component 資料或 UI



## Redux-thunk

---

Redux-thunk：讓你的 action 可以是一個 function，所以如果要進行非同步狀態更新，你會從同步更新時候的 dispatch object action，變成 dispatch thunk function action，Redux-thunk 看到你的 action 不是回傳 object 而是 function，就會去幫你執行這個 function

這個 thunk function 的參數會傳入 `dispatch`, `getState` ，讓你可以在執行完非同步行為（如呼叫 API）之後寫一段 dispatch action 來更新狀態，過程中如果有需要也可以透過 `getState` 來取得狀態

