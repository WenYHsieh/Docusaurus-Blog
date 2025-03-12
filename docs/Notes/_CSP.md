## CSP


### Contents

```
1. What's CSP ?
2. Why do we need CSP? (tho using a React-based framework)
3. Common CSP directive that we looking for
3. How can we implement CSP? (NextJS app router, DV2.0 as examples)
```



CSP，全名為 Content Security Policy，可以翻作「內容安全政策」，用意是你可以幫自己的網頁訂立一些規範，跟瀏覽器說我的網頁只允許符合這個規則的內容，不符合的都幫我擋掉。

>  Ref: 
>
> 1. [huli blig](https://aszx87410.github.io/beyond-xss/ch1/browser-security-model/)
> 2. [NextJS Docs](https://nextjs.org/docs/app/building-your-application/configuring/content-security-policy)

規定的詳情介紹請見 MDN： https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy

為何需要 CSP？

```
後台需要的原因：
1. 有直接貼上 HTML 並可能會顯示到前台（但前台因為要嵌入各種第三方服務，比較難防禦）

前台為何需要：
可能攻擊者不透過後台前端，直接透過後台 API 攻擊
```



CSP 最主要是拿來防 XSS 的 ，XSS 就代表著攻擊者可以在其他人的網站上面執行 JavaScript 程式碼。

一旦成功植入 script，他就有可能去存你的 localStorage, cookie 等等 browser storage 去偷你的 token，冒用你的身分，輕則偷你的資料，重則盜刷你的卡

或植入 <script>location.href='釣魚網站網址'</script> 把你導去釣魚網站，騙你點中 iphone 要填寫 email 領取的送出按鈕

---

有哪些危險的點？

使用者可以輸入的地方都是危險的點

有可能怎樣被攻擊？

- 自己人不知情的情況下攻擊
- 被有心人士植入 script



其實防 XSS 有很多更基本的方式，像是 React 已經幫我們作掉的，component return 的 JSX 預設都是有作過字元跳脫的，除非我們有使用 `dangerouslySetInnerHTML` (or innerHTML)

> 通常都是這段文字原本就是 HTML，例如說部落格平台的文章可能會支援部分的 HTML 標籤，這都是很常見的狀況。那這種情形該怎麼處理呢？這就是要做 sanitize 的時候了。
>
> DOMPurify 可以幫你拿掉有潛在風險的 tag(iframe, embed,...) 跟屬性 (handler, onError..., style...)

CSP 是在全域設定，但DOMPurify就需要你自己足夠地小心去判斷每個潛在的注入點並處理

對於我們的後台來說，雖然資料感覺都不是頂機密，但我覺得是個很好的練習機會。



先說後台做了哪些防禦？

- HTML editor 套件 tiptap 自己會過濾
- embed 貼文區塊把 script 直接過濾掉，在前台引入
- 設定嚴格的 CSP

- 如何設定 CSP？

  想要幫網頁加上 CSP 有兩種方式，一種是經由 HTTP response header `Content-Security-Policy`，另外一種是經由 `<meta>` 標籤

  - 靜態網站：web server 如 nginx config 裡面去加
  - SSR(不知道怎麼稱呼比較好）:Next.js 有開一個 server 在送資料，提供用配置 middleware 檔案的方式加


常見 CSP directive：

有一些設定不會吃到 fallback 要注意 [ref](https://content-security-policy.com/default-src/)

![Screenshot 2024-06-06 at 4.50.08 PM](/Users/wenyu/Desktop/Screenshot 2024-06-06 at 4.50.08 PM.png)

```
// fallback: 沒設定就會放這個
default-src 'self';

// unsafe-eval:允許執行用字串形式的 script，這一點是在 dev server 為了即時地快速 rebuild 後的網站，會使用到的， 可以新增判端production 再套用
style-src 'self' 'unsafe-inline' 'unsafe-eval';

// 只允許自己跟 dataURL
img-src 'self' blob: data:;

// 可以不放，因為會 fallback 拿到 default-src
font-src 'self';

object-src 'none';

base-uri 'self';

form-action 'self';

// 允許怎樣的來源用 iframe 嵌入
frame-ancestors 'none';

// 允許我們的網站用 iframe 嵌入哪些來源，被別的網站嵌入可能會有 CSRF 風險（clickjacking)
[ref](https://portswigger.net/web-security/clickjacking#:~:text=Consider%20the%20following%20example%3A,an%20account%20on%20another%20site.)
frame-src https://www.facebook.com;

upgrade-insecure-requests;

// 指所有腳本的載入，不限於 script src 放的資源
script-src 'self' 'unsafe-eval' 'unsafe-inline';


```



通常 script-src 的 unsafe-inline 是要關起來的，不然相當於門戶大開。

但若有載入第三方功能，如 google reCaptcha 難免要允許，或者有一些我們知道他是來自可信任來源的

有兩種方法可選擇性允許 inline script

- 把 script 編碼成 sha256 base64 string
  - 轉換：`shasum -a 256` -> `openssl base64`
  - 放到 CSP header： `script-src: 'self' sha-${sha256 base64 string}`

- 在 server side 動態產 nonce（一次性的 base64 charset -> Nonces should only use the base64 charset.）：uuid 相同才允許執行

  - Nonce:Allowing all inline scripts is considered a security risk, so it's recommended to use a nonce-source or a hash-source instead. To allow inline scripts and styles with a nonce-source, you need to generate a random nonce value (using a cryptographically secure random token generator) and include it in the policy. It is important to note, this nonce value needs to be dynamically generated as it has to be unique for each HTTP request:

  - nextJS 的話可以在 middleware 產了動態嵌入 => 會加在 route doc (HTML) 的 response header

    ![Screenshot 2024-06-07 at 11.06.58 AM](/Users/wenyu/Desktop/Screenshot 2024-06-07 at 11.06.58 AM.png)

  - `script-src 'strict-dynamic'` 讓 nonce 允許的 script 裡面的 script  都繼承到 nonce，允許載入
  
    - 在 component script 裡面載入的 script 都被允許
    - 似乎是指 script tag src 引入的 script 而已，handler 上的 inline script 不能被執行
    - 使用 strict-dynamic 會自動忽略一些規則：unsafe-inline, self
  

nextJS 使用 config 跟 middleware 來寫 CSP 的差異

- config 較適用於靜態設定

- 動態產 nonce 要寫在 middleware

  

piifall?

- In production ，在 nextjs 裡面使用 nonce 要把 layout dynamic 設定為 force-dynamic，不然 nonce 不會加上去

  https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config

  ![Screenshot 2024-06-06 at 5.45.03 PM](/Users/wenyu/Library/Application Support/typora-user-images/Screenshot 2024-06-06 at 5.45.03 PM.png)

  ![Screenshot 2024-06-06 at 5.46.49 PM](/Users/wenyu/Desktop/Screenshot 2024-06-06 at 5.46.49 PM.png)

這個網站可以給你的 CSP 一些建議：https://csp-evaluator.withgoogle.com/

---

前台 CSP

因為第三方廣告及工具 (google publisher tag, AviviD, dable)，依據廣告投放不同，要外連的網站，要允許的資源來源都會不同，無法一一列舉。且像是 AviviD 會用到 inline script 去連到廣告跟關閉區塊。總和以上原因，以下的 CSP 設定基本上都只能全開，所以最後不放。

```style 
img
frame 
connect
script
```

script 部分 ，原本設定 script-src 'self' 'unsafe-eval' 'nonce-${nonce}' 'strict-dynamic'，但如果使用 hash or nonce 就不能使用 unsafe-inline 來允許 inline scritp 執行，因此最後也拿掉了



