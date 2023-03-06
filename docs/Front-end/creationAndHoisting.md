# Creation and Hoisting

Execution Context 的產生分為兩個階段

1. creation phase: Execution context is created
   - Global obj, this, outer environment 會在這個階段被給定記憶體位置 (Setup memory space for variables and functions: hoisting)
   - hoisting 並非把你宣告的動作都移到所有 code 的最前面，他不會去更動你寫的程式碼，而是在程式碼真的開始執行之前，由上掃到下，將記憶體空間先設定給這些變數、function 的一個動作
     - 變數： 對於每個變數，在這個階段只有名稱會先設定好，給定一個記憶體空間，JS engine 還不會設定裡面的值，而是會先給他一個初始化的值，undefined，直到真正程式碼執行的階段變數的值才會被換成你定義的 (如果有的話)
     - function：不同於變數，function 在這個階段就會被完全設定好放到記憶體中了
     - **要注意的是：在全域環境下，只會將在全域中的變數和 function 寫到記憶體，而不會將 function 內部的都設定好。內部的會在何時被設定？ 在 code execution 階段，當那個 function 被執行到的時候，內部的東西才會開始他們的創造階段**
2. Code execution
   - 要注意的是他是由上到下逐行執行的

:::tip

ES6: let and const

仍存在創造階段的 hoisting，不過他的行為和 var 不太一樣，他還是會在記憶體中被設定好，但直到宣告的那行被執行到之前你都不能取用，JS engine 會把他擋下來不讓你取用，這段被禁止取用的期間叫做 TDZ(Temperal Dead Zone)

:::

參考： Udemy 課程，JavaScript 全攻略：克服 JS 的奇怪部分
