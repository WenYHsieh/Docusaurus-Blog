# React 一些觀念

## React life cycle

---

React function component 的生命週期可分為三階段

`mounting -> update -> unmounting`

1. mounting

   當 component 放到 DOM 上面時，執行一些初始化的行為。

2. update

   當 props or state 改變驅使 component re-render

3. unmounting

   當 component 離開 DOM，執行一些 cleanup 行為。



