### Q1 請解釋一下什麼是盒模型 box model，有哪些需要注意的地方？

Box model 是將 html 元素當作一個很多層的盒子來定義的模型，CSS 能夠針對不同層做樣式變化。

由內而外分別是:

- content 內容
- padding 內邊距
  - border 和 content 之間的距離。
  - 是向內畫，因此可能會壓縮到內容，影響元素實際的寬高。
- border 邊框
  - 元素的外框。
  - 是向內畫，因此可能會壓縮到內容，影響元素實際的寬高。
- margin 外邊距
  - 和其他元素的距離。
  - 因為是向外擴張的，不會影響元素實際的寬高。

比較要注意的點是，**box model 預設為 content-box**，指的是對這個元素定義的寬高是 content，因此調整 padding 或 border 後會使得整個元素寬高變得更大，造成變形。這時候改設定 box model 為 border-box，在此設定之下調整 padding 跟 border，CSS 會自動計算調整各個部分的大小，讓 border 以內範圍的寬高符合我們所設定的寬高。

### Q2 請介紹一下 BOM 與 DOM

> BOM 瀏覽器物件模型; DOM 文件物件模型

JS 本身沒有提供跟網頁操作的內建方法，因此需要靠瀏覽器提供的 BOM 跟 DOM

**Document Object Model (DOM)，文件物件模型**。這個模型定義 Document 為一個物件的型態，這個物件為一個由多個節點組成的樹狀的結構 (如下圖所示)，這就提供了一個介面使得人們能夠透過程式語言去操縱 Document 的內容。

為了達到動態操縱頁面的目的，以 HTML 來說，當瀏覽器載入 HTML 文件，瀏覽器會將之轉換成 Document 這個物件，HTML 當中個元素，例如: header, div, 文字等等，會以 node 形式存在。 透過 JavaScript 物件操縱的方法，我們能夠存取 HTML 的元素、更改樣式，甚至是加上事件監聽。

BOM 瀏覽器物件模型

- 瀏覽器提供的一個，以 window 物件為核心
- 以 window 物件為核心，document, location, screen, nevagator, history…
- 提供方法去取得一些跟瀏覽器相關的資訊，例如使用者螢幕寬高，滑鼠位置等等
- 或者取用瀏覽器提供的 webapi，例如 setTimeout, console …

總結來說，DOM 用於 JS 與 html 操作、互動有關的; BOM 用於 JS 與 瀏覽器操作、互動有關，不涉及網頁內容

:::tip

BOM 是 Browser Object Model，查了一下看似只是個沒有詳細定義的名詞，就是瀏覽器提供給 JS 的各種東西，透過 window 來存取，例如說什麼 location, navigator 之類的 DOM 是 Document Object Model，在 JS 裡面透過 document 可以取得，是可以讓你透過程式去改變 document 的一個 API 這邊我也不是很熟，查了一下發現 BOM 跟我們以前提過的 Web APIs 看起來差不多，都是瀏覽器提供給 js 的東西

可參考資料：

- https://javascript.info/browser-environment
- https://frontendmasters.com/books/front-end-handbook/2017/learning/dom.html
- https://stackoverflow.com/questions/2213594/whats-the-difference-between-the-browser-object-model-and-the-document-object-m

:::
