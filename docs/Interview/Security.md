### Q1 請問什麼是 CSRF? 該如何防範？

**CSRF 攻擊原理**

CSRF 是跨站請求偽造的縮寫，CSRF 攻擊的原理是利用瀏覽器會自動在發 request 時帶上 cookie 這個特性，就能在使用者不知情的情況下，冒充他的身分發送了一些惡意的 request，這些可能包括了以發信件或者盜取帳號密碼，甚至是涉及一些金錢交易。

> 使用者防範方面

可以確保在離開網頁之前要登出或避免瀏覽、點擊看起來可疑的網站或連結。主要還是要靠 server 端來防範，那因為這種攻擊方法有個特色就是是從外部網域發送 request，所以其中一個防範重點可以放在如何分辨外部網域來的 request 並且阻止後續動作。

1. 增加對 request 的驗證，例如轉帳前的圖形驗證或簡訊驗證，確定是使用者本人。此方法較麻煩，會減損使用者體驗，因此通常在操作敏感資訊時才會使用。
2. 檢查 request header 當中的 referer，這表示 request 從哪個 domain 發送，若非相同 domain 就 reject。但此方法存在許多缺點…

   不是所有瀏覽器都支援 referer 、referer 可能被惡意更動，或者使用者可能會關閉自動帶 referer，導致真實來自使用者的 request 也可能被擋掉

3. server 在同網域的時候先產生一個一次性的亂數 csrf token 儲存在 cookie 中並且讓表單發出 request 的時候帶上這個 token，而後端就可以去驗證表單與 cookie 的 token 是否相符。
4. Double Submit Cookie ：利用跨站不能設定 cookie 這個特點 ， client 在發 req 時產生 csrf token 同時放到 from 或 req header 跟 cookie，如此，server 只需去檢查是不是 from 或 req 跟 cookie 帶來的 token 是不是相符就能知道是不是來自同個 domain 的 req

> browser 方面可以利用近期新興的防禦手法

在 set-cookie 後加上 SameSite，以阻擋瀏覽器在跨 domain 帶上 cookie。以嚴格程度分為兩種模式…，Strict，默認的模式，會阻擋來自不同 domain 的所有形式的 request 帶 cookieLax，較寬鬆的模式，放寬了不同形式 request 的限制，例如來自 a, link 或 GET 這些都可以帶上 cookie，其他 DELETE, POST 之類的就無法。

:::tip

csrf 可以作用最大的原因是你從第三方去對某網域做操作的時候，瀏覽器會幫你把這個網域的 cookie 一起帶上去，從伺服器看來就等於是使用者本人在操作，**而防禦方式都是圍繞在怎麼解決這個狀況有一種方法是如果不是用 cookie 做身份驗證，例如說 22 周作業用 local storage 裡的東西做驗證，那就不會有 csrf 的問題**或是 otp，常見的簡訊驗證碼，多了第二道手續不登入也是一種，不是登入狀態就不會怎樣 samesite cookie 則是靠瀏覽器幫你防禦，只有在同個 site 的時候會帶 cookiecsrf token 也是多一道手續，攻擊者沒辦法拿到這東西所以沒辦法在 header 裡面放值

幾個要修正的點：

1. Cookie 跟 session 要分清楚
2. Samesite 是不是 google 發明的不重要，重點是 chrome 會預設 samesite 屬性，這才是重點
3. 不要舉什麼用 get 刪除資料的例子，那個只是方便講解而已，但技術上本來就不該這樣做，舉 post 改資料的會比較好
4. CSRF 通常都是改資料，做某些操作，而不是取得資料或是偷資料

:::

### Q2 什麼是 SQL Injection？該如何防範？

在 server 處理來自 client 的資料時有可能會發生 SQL injection，他是在前端以惡意注入字串，導致不合預期的 sql query 的方式來達到冒充別人的身分或盜用資訊等等的攻擊。

主要會發生 SQL injection 是在後段處理 sql query 時採用字串拼接將要查詢的關鍵字傳進去，如果使用者故意傳入註解符號，就可能繞過密碼驗證、利用 sub-squery 的方式撈資料庫理的資料或者改變內容等等。

防範的方法，在處理 sql query 的時候要對於傳來的東西抱持懷疑的態度，先用 regex 之類的方法來檢驗使用者輸入的東西是否會出問題，或者更容易也比較流行的作法是使用參數化的方式傳遞使用者的資訊，例如 prepare statement，而非直接拼接。

1. regex 過濾：可能不當的格式、限制長度
2. 限制使用者權限：讓他不能去更動資料庫的內容

:::tip

SQL Injection 就是攻擊者可以刻意操弄部分 query 內容，跟原本的合在一起而產生具有新的意義的 query，進而達成攻擊防範方式是跳脫字串或是用 Prepared statement 也可以提到詳細的攻擊方法，例如說利用 union 來拿資料或者是 blind SQL injection 是什麼

:::

### Q3 請問 XSS 是什麼？該如何防範?

XSS 指的是 client 惡意地在網站上執行 JS 程式碼的攻擊。這個攻擊常會處現在能夠讓 client 輸入資料的地方，例如 input 或 textarea。 html 標籤不會被當成純文字解釋，因為我沒有特別處理，那些標籤就會直接被瀏覽器渲染出來。因此如果有心人士用 script tag 傳一段惡意程式碼進來例如: `<script> 惡意程式碼 </script>`，例如將使用者導向到釣魚網站或者放在一張隱藏圖片 `<img>` (因為不受同源政策影響)，然後在 `src` 裡面發送一個 帶著 cookie 資訊的 reqeust，傳送到自己的 Server，這樣就可以拿到點此網址的使用者 cookie 了

```jsx
<img src="" onerror="sendRequest('document.cookie')">
```

防範的方式會著重在使用者輸入跟呈現使用者輸入的東西時，輸入的話可以去檢查是不是包含一些 html tag，例如上述的 script tag, img tag 等等，不過因為能鑽的漏洞很難都顧到，比較好的方式可能變成要在呈現資料時作前處理，例如作字元的跳脫，使 html 將特殊字元解釋成純文字，而非程式碼。

:::tip

XSS 全名跨站式腳本攻擊，攻擊者可以在你的網站上執行 JS 分成三種：Stored XSS, Reflected XSS 跟 DOM-based XSS 在前端 render 而造成的 XSS 就是 DOM-based XSS 從後端 render，然後資料是從資料庫來的就叫做 Stored XSS 從後端 render，會直接反映使用者的輸入的就叫 Reflected XSS 防範方式：過濾使用者的輸出，進行編碼，不要當成 JS 執行也可以用 CSP 阻止使用者執行 inline script 如果一定要輸出 HTML，可以用 DOMPurify 之類的 library 來過濾

:::
