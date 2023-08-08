# React 狀態更新

## Primitive type

---

因為 primitive type 本身就是 immutable，用以下寫法來告知 React state 有改變是沒問題的

```js
const [count, setCount] = useState(0)

setState(1)
```

## Object 物件 (object, Array)

---

Object 可以是 mutable 的，代表同一個記憶體位置裡面的 Object 內容是可以被改變的。

有以下兩種原因，官方建議我們應該永遠都應該使用 immutable 方式去更新 state，即傳入新的一份 Object (deep copy)

1. Object 是 pass by reference：

   - mutable: 直接 mutate 雖然 position 確實被改變了，但記憶體位置沒有改變，React 無法得知內容物是否變化，所以不會有 re-render。應該要用 setPosition 註冊狀態更新

   ```js
   const [position, setPosition] = useState({
       x: 0,
       y: 0
     });

   onPointerMove={e => {
     position.x = e.clientX;
     position.y = e.clientY;
   }}

   ```

   - immutable: 使用 setState 註冊狀態變化，才可以正確觸發 re-render

   ```js
   const [position, setPosition] = useState({
       x: 0,
       y: 0
     });

   onPointerMove={e => {
     setPosition({
       x: e.clientX,
       y: e.clientY
     });
   }}
   ```

2. 避免副作用： 使用 mutable 資料可能導致 side effect，即在修改資料時可能會影響到其他部分的程式碼，導致錯誤或難以預測的行為。

## Reference

---

[React docs: Updating Objects in State](https://react.dev/learn/updating-arrays-in-state)
