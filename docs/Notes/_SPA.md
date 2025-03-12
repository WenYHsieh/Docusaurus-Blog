# SPA

## routing 前端路由

---

### 靜態網站 v.s. 動態網站

此處靜態與動態，並非指網頁上的內容是否會改變。

差別在於，瀏覽器輸入一段網址後，他回傳的東西有沒有被 server 處理過

- 靜態網站：會直接回傳存在 server 相對應的資源，路由反應了在 server 的真實檔案路徑。 
  - 靜態 server 例子：GitHub pages

- 動態網站：會回傳 server 執行過後的結果



#### History API

`pushState` 可以將網址列路徑改變，但不呼叫去取得檔案，而是作為參數使用。

如此一來就可以利用網址列的資訊去記住一些狀態，下一次進到頁面時就不用從首頁開始



#### react-router BrowserRouter v.s. HashRouter

BrowserRouter 底層實作使用 History API，會將路由直接接在根路徑後方，而 HashRouter 則是會多一個 `#`

差別在於重新整理時 `BrowserRouter` 可能會造成 `404 not found`，因為 SPA 只有單頁，重新整理的情況下，網址列根路徑後方的路由會變成去跟 server 的對應路徑去要資源，因為沒有資源而回傳 404。 此時可能會需要對 server 特別設定去把出現 404 的路由，重新用 history API 導向，拿到重新整理前的資源（參考實作：https://github.com/rafgraph/spa-github-pages/tree/gh-pages）。

HashRouter 因為有 `#` ，通常不需要特別設定，路由不會被解析成要去對應路徑跟 server 拿資料。

BrowserRouter 的優點是網址列看起來較乾淨、SEO。