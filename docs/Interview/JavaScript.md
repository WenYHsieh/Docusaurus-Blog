### Q1 在 JS 裡面想要宣告變數有三個關鍵字可以用，var let 跟 const，請問這三種的差異為何？

var 是 ES6 以前變數宣告唯一的方法，ES6 開始才出現 let 跟 const。

第一個差異是在於 scope，宣告的變數他的生存範圍，var 為 function scope，代表如果在 function 中用 var 宣告變數，只能在 function 當中取用這個變數，出去到像是全域就取不到了。let, const 為 block scope，代表他得生存範圍在 block 內，以大括號組成的程式碼區塊，出了宣告的 block，就無法取用。

第二個差異是 hoisting 的行為不同，var 在 hoisting 時會將變數給定一個記憶體空間並預設為 undefined，賦值前取用不會報錯，會得到 undefined，let, const 也還是會有 hositing ，也會在記憶體中被設定好，但直到賦值前之前你都不能取用，JS engine 會把他擋下來不讓你取用，這段期間稱為 TDZ(Temporal Dead Zone)

第三是能不能重複宣告，var 可以， let, const 則不行

最後是 const 宣告時一定要賦值，並且給定後不可再賦值改變。但要注意的是這邊 const 若存的是記憶體位置，就還是可能會改到裡面的值。

:::tip

Day9 題目重點：

1.  其實除了這三個以外，還有一種方式是都不加關鍵字的，這種的會把變數變成全域變數，例如說 a = 3
2.  var 的 scope 是 function，可以重新賦值，需注意 hoisting
3.  let 的 scope 是 block，可以重新賦值，有 hoisting + TDZ
4.  const 的 scope 是 block，不能重新賦值但可以更改內容，宣告時就要給初始值，有 hoisting + TDZ

:::
