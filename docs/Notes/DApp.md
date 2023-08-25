# DApp

網頁架構方面，一般的 web2 SPA 網站前端可以透過發送 HTTP request 來跟後端溝通，後端接到 request 後向資料庫 query 資料後處理回傳 response 到前端。

DApp 則是會透過 ABI （Application Binary Interface）去與區塊鏈上的智能合約溝通（即 transaction)

以網頁工程師，我們一般的網頁是透過

> （輸入資料）前端 透過 POST API 發送內容至後端打到資料庫
>
> （向資料庫要資料）**前端** 透過 GET API 發送需求至**後端**打到**資料庫**，調用資料庫資料回傳至前端

那區塊鏈 Dapp 工程師是透過

> （輸入資料） 前端 透過 Web3 發送內容透過合約至區塊鏈
>
> (向區塊鏈要資料）**前端** 透過 Web3 發送**合約請求**至**區塊鏈**