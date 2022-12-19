### Q1 請問 HTTP Method 中 GET 與 POST 的差別為何？

HTTP method 是 client 跟 server 經由 HTTP 協議溝通時的兩種不同方式。

GET 主要用在想要從 server 取得資料時用，而 POST 主要用在想傳資料給 server 時使用

他們最明顯的差別在於帶資料的方式，GET 是以 query string 的方式將資訊以 key/val pair 的方式帶在網址列，例如想要限制 server 回傳幾筆資料的時候常用 limit 這個 key，而 POST 通常則是將資料帶在 body，例如使用者資訊。另外，GET 由於網址列有長度限制，能帶的資訊就會比 POST 帶在 body 沒有限制來得少，並且網址列即便是一般使用者也能輕鬆存取及改動，會比較有資安的疑慮，如果是 POST ，只要不刻意去查看封包內容資料就不會被看見，安全性是稍微比 GET 來得高一點。最後是 GET 的傳輸速度會比 POST 來得更快，兩種方法各有缺，因應場合不同應該選擇較適合的方法來用，而沒有絕對。

參考：

- http://www.shibuvarkala.com/2010/01/compare-get-and-post-methods-of-html.html

- https://marcus116.blogspot.com/2018/10/http-http-getpost-method.html

- https://blog.toright.com/posts/1203/%E6%B7%BA%E8%AB%87-http-method%EF%BC%9A%E8%A1%A8%E5%96%AE%E4%B8%AD%E7%9A%84-get-%E8%88%87-post-%E6%9C%89%E4%BB%80%E9%BA%BC%E5%B7%AE%E5%88%A5%EF%BC%9F.html

:::tip 統整及其他可注意：

一般基本的回答就是比較偏「實際使用上的回答」：

1. GET 通常是拿東西，POST 是做一些操作
2. GET 的參數帶在 url query string，POST 帶在 request body
3. 承上，GET 因為帶在網址上所以比 POST 不安全
4. 承第二點，GET 因為帶在網址上所以有長度限制

這邊所講的就會是這兩個在「規格上的差異」 可以提到：

1. Safe Method 是什麼
2. Idempotent Method 是什麼
3. GET 其實也能帶 request body 但可能會被伺服器擋掉
4. GET 比較適合做快取
5. GET 東西放網址上之所以比較不安全，還有一個原因是可能會透過 Referral header 流出去

:::

### Q2 什麼是 cookie？什麼是 session？

HTTP protocol 是無狀態的 (stateful)，意即無法保存每個來自 client 的 request 或操作的狀態，因此 Server 會將每個 request 都視為獨立的新事件。然而有時我們會希望 request 它是有狀態的，能記住 request 之間的某些關聯。例如：希望在一段時間內，即便關閉頁面再打開可以維持登入，這時候就需要 Session 來達成這樣有狀態的請求，他是用來管理一段時間內發生的狀態的一套機制。而 Cookie 就是實作 Session 系統的一種方法，他是一個小型文字檔，通常由 server 產生的加密過的 Session (一對 key/value ) 組成，瀏覽器收到後會將裡面的資訊存在我們的硬碟或是記憶體中。在 cookie 的時效以內每次發 request 到同個 server 網域，瀏覽器都會自動把 Cookie 帶在 Cookie request header 帶到 server， server 解析後作驗證。

總結來說，session 是管理一段時間內發生的狀態的一套機制，而 Cookie 本身是個儲存容器，實作 session 只是其中一個用途。

:::tip

統整及其他可注意：

1.  要提到 HTTP 是無狀態的（stateless）
2.  cookie 是瀏覽器儲存資料的一個地方，可以從 server 透過 Set-Cookie 設定，在發 request 時會透過 Cookie header 帶回去 server
3.  session 就是有狀態的一段關係，最簡單的方式就是透過 cookie 來幫忙帶資料，就可以讓 request 之間建立關聯
4.  敏感資料可以存在 server，叫做 session data，利用 session id 存在 cookie 裡面來做關聯
5.  也可以把 session data 直接寫在 cookie 裡面，叫做 cookie-based session，這樣的 cookie 內容就會是加密過的，因為有敏感資訊

:::

### Q3 請問什麼是 CORS issue? 會造成這問題的原因是什麼，又該如何解決？

CORS 是 Cross-Origin Resource Sharing 的縮寫，這個 core issue 是我們在瀏覽器上發 request 跟 API 溝通時 （ XMLHttpRequest 或是 fetch（或也可以簡單稱作 AJAX）獲取跨來源的資源）特別需要注意的問題。**瀏覽器**基於安全性的考量，會強制讓我們遵守同源政策，規範了 request 要在相同協定 (protocol: http/https)、port、主機位置 (domain) 之下才有效。 那如果是透過 node.js 發送 request 給 server，並不受到瀏覽器的管轄，也就不會受到同源政策的限制

解決方法主要是在 server 端要作一些設定，如果符合簡單跨來源請求的條件，在 response header 加上 `Access-Control-Allow-Origin: *` 允許所有來源存取，或者指定某個 domain 存取即可。 若非是簡單跨來源請求的話，除了 response header 要設定好之外，因為瀏覽器在發送請求之前會先發送一個 「preflight request（預檢請求）」再次跟 server 確認是否同意 request，server 就還需要額外告訴瀏覽器**允許的 http method** (`Access-Control-Allow-Methods`) 跟**允許的非簡單 header** (`Access-Control-Allow-Headers`) ，例如加入 request 是使用到的 custom header

:::tip

同源與否的一些判斷，擷取自 huli 文章

而 same origin 就代表著來源一樣，如果有兩個 URL A 跟 B 的 origin 是一樣的，我們就說 A 跟 B 是 same origin，也叫做「同源（同個來源）」。

所以 `https://huli.tw` 跟 `https://google.com` 不同源，因為它們的 origin 不一樣。

更精確一點地說，你可以把 origin 當作是：scheme + host + port 的組合。scheme 就是最前面的那個 `https` 或是 `http` 之類的東西，host 就是 `huli.tw`，而 port 的話如果沒有特別指定，http 預設的 port 就是 80，https 就是 443。

所以呢，

1.  `https://huli.tw` 跟 `https://huli.tw/api` 同源，因為 scheme + host + port 都一樣（`/api` 是 path 的部分，不是 host）
2.  `https://huli.tw` 跟 `http://huli.tw` 不同源，因為 scheme 不一樣
3.  `http://huli.tw` 跟 `http://huli.tw:3000` 不同源，因為 port 不一樣
4.  `https://api.huli.tw` 跟 `https://data.huli.tw` 不同源，因為 host 不一樣
5.  `https://huli.tw` 跟 `https://api.huli.tw` 不同源，因為 host 不一樣

第五點是大家要特別注意的一點，domain 跟 subdomain 之間也是不同源的，所以 `api.huli.tw` 跟 `huli.tw` 不同源。有很多人常常會把這個跟 cookie 搞混，因為 `api.huli.tw` 跟 `huli.tw` 是可以共用 cookie 的。

CORS 跟 same origin policy 有關，是為了安全性所以瀏覽器禁止跨來源的存取 server 加上正確的 header 是唯一正解其他請參考 CORS 完全手冊

:::

### Q4 從網址列輸入 google.com 按下 enter 到看到頁面，請問這中間發生了哪些事情？

1. 取得 Google Server 的 IP 位置
   - 瀏覽器檢查 dns cache 有無 google.com，有的話會直就會透過網路卡發送 request 給那個位置。
   - 沒有的話呼叫 C 語言，C 語言呼叫作業系統找 dns cache 有無 google.com，有的話會回傳位置，透過網路卡發送 request 給那個位置。
   - 沒有的話會連到 Google DNS Server `8.8.8.8` 問 google.com 的 IP，DNS Server 回傳 `172.217.160.78`，透過網路卡發送 request 給那個位置。
2. Google server 收到後跑去資料庫搜尋，取得結果
3. Google server 回傳 response
4. 瀏覽器上顯示結果

:::tip

可以講到的很多，講自己會的就好，像是：

1.  DNS 查詢
2.  request response 來回的過程
3.  瀏覽器的顯示

想回答更多就是針對每個細節再下去講，例如說：

1.  DNS 查詢具體上是怎麼做的，是分成一層一層的來查詢
2.  tcp 三次握手
3.  瀏覽器渲染畫面的流程細節，解析 html 產生 dom，解析 css 產生 cssom，結合產生 render tree 然後 flow，paint 之類的

:::

### Q5 請問 cookie, localStorage 與 sessionStorage 的差別是什麼？

cookie 大小在 4 KB 以內，而 localStorage 與 sessionStorage 的大小在 5 MB 以內。localStorage 沒有過期時間的限制；sessionStorage 存的資料則會在 session 結束時被清除；cookie 則是要看有沒有透過 expires 屬性設定過期時間，如果有的話就以 expires 屬性為主，沒有的話就以 session 為主。

[參考資料](<[https://medium.com/@bebebobohaha/cookie-localstorage-sessionstorage-差異-9e1d5df3dd7f](https://medium.com/@bebebobohaha/cookie-localstorage-sessionstorage-%E5%B7%AE%E7%95%B0-9e1d5df3dd7f)>)
