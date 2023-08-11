# 前端頁面渲染模式

## 頁面渲染常見模式

---

### SSG (Static Site Generation)

在 build 時會將所有靜態資源及動態取得（那些需要呼叫 API 的）的資源都預先取得，生成靜態的 HTML 檔案。

優點是載入快速，適合用於內容較少變動、資料不需要即時更新的網站。

### ISR (Incremental Static Regeneration)

SSG 的拓展模式，會在設定定期之內重新取得動態資料。它在 SSG 的基礎上引入了增量更新的概念，允許在 build 後的頁面上進行部分更新，而不必重新生成整個頁面。這使得網站可以保持部分即時性，同時仍然能夠獲得 SSG 的性能優勢。

### SSR (Server Side Generation)

HTML 頁面回會在 server 動態生成 HTML 頁面。在每次訪問頁面時，server 都會根據請求動態計算、生成頁面的內容，然後將 HTML 回傳。

優點是可以有更好的 SEO 和較快的首次載入時間。

### CSR (Client Side Generation)

從 server 拿到的 HTML 只存在網頁掛載用的根節點，全部的資源都要 Client 經由之後的呼叫來動態取得及生成。每當訪問頁面時，瀏覽器會下載並執行 JS，然後動態生成頁面內容。他適用於需要較多互動和動態內容的場景，但可能在首次載入時有較長的延遲。（較長的 TTI）


