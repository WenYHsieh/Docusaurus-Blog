## Security

1. encode

   Encoding 是將字元轉換為另一種格式，以便在不同的系統、協定或環境中傳輸和儲存。例如，URL encoding 是為了確保在 URL 中傳輸資料時不會遺失訊息，Base64 encoding 是為了將二進位資料轉換為可列印的文字格式。

   應用場景：

   - URL Encoding: 處理 URL 中的特殊字符，確保它們在 HTTP 請求中正確傳輸。
   - Base64 Encoding: 將二進位資料（如圖片或檔案）轉換為文字格式，以便在文字協定中傳輸。
   - Character Encoding: 將字元轉換為特定編碼格式（如 UTF-8, ISO-8859-1），以便在不同系統之間正確顯示文字。
     範例：

   URL Encoding: 空格 轉換為 `%20`、`/` 轉換為 `%2F`、`?` 轉換為 `%3F`

2. escape

   HTML當中有些保留字，< 與 > 等等，如果不做任何處理，這些就會被瀏覽器當成 HTML 的語法

   - 當我們需要真的顯示此字符不希望被當成 html render 時。可以把字符轉換成 html entity ，這樣瀏覽器看到就知道要把他當成字串 ([對照表](https://www.freeformatter.com/html-entities.html))
   - 使用場景：防禦 XSS 時、真的想要秀 HTML string 在頁面中（部落格文）

3. sanitize

   把可能引起資安危險的 tag, attribute 過濾掉

這個跟前面講的「編碼（encode）」或是「跳脫（escape）」有一些細微的差別，一個只是把使用者的輸入中的特定字元編碼，最後還是會以純文字顯示出來，而 sanitization 是把不符合規則的地方整個拿掉，全部刪掉