前端 Testing 的幾個面向

1. api req, res 以外的 dataprocessing => unit test
2. api req, res dataProcessing => 用 zod 動態檢查，如果後端改欄位，寫 unit test 檢查不到，這樣 component 還是會壞掉
3. 對應不同資料輸出的相對應 UI 是符合預期的、component 使用邏輯符合預期 => component test (資料轉換成 UI 的邏輯)
4. UI 流程符合預期 => E2E testing （component 的交互邏輯）

---

Next.js 官網引入 testing 流程

1. install dev deps: jest jest-environment-jsdom @testing-library/react @testing-library/jest-dom ts-jest @types/jest

```
1. jest:

用途: Jest 是一個 JavaScript 測試框架，主要用來進行單元測試和整合測試。它提供了一個簡單的 API 來撰寫測試、執行測試、生成測試報告，並且內建了 Mock 功能和測試覆蓋率報告。
功能: 允許你撰寫和運行測試，包括同步和異步測試，並且能夠偵測測試的改動來自動重新運行測試。

2. jest-environment-jsdom:

用途: 這是一個 Jest 環境，用於在 Node.js 中模擬一個瀏覽器環境。它使用 jsdom 來模擬瀏覽器中的 DOM，使得你可以在 Node.js 中測試與 DOM 相關的功能。
功能: 允許你在 Jest 測試中操作和測試 DOM 元素，就像在瀏覽器中一樣。

3. @testing-library/react:

用途: 這是 Testing Library 系列的一部分，專門用來測試 React 組件。它提供了一些工具和實用程式來幫助你撰寫更可靠和更可維護的 React 測試。
功能: 主要功能包括渲染 React 組件、查找 DOM 元素、模擬用戶互動（如點擊、輸入等），使得測試更接近真實用戶行為。

4. @testing-library/jest-dom:

用途: 這個套件為 Jest 測試增加了一些自訂的匹配器，使得你可以更容易地撰寫與 DOM 相關的斷言。
功能: 提供了如 toBeInTheDocument(), toHaveTextContent(), toHaveClass() 等匹配器，這些匹配器讓你可以更清楚和簡潔地表達對 DOM 元素的期望。

5. ts-jest:

用途: ts-jest 是一個 TypeScript 預處理器，用於在 Jest 中處理 TypeScript 文件。它使得你可以在 Jest 測試中直接使用 TypeScript，而不需要先手動編譯為 JavaScript。
功能: 提供一個與 Jest 集成的 TypeScript 編譯器，可以直接在測試中使用 TypeScript 語法，並且支持 TypeScript 的所有特性，如類型檢查、裝飾器等。


6. @types/jest: 

用途: 這是一個 TypeScript 定義文件包，用來為 Jest 提供 TypeScript 的類型定義。它使得你在撰寫 Jest 測試時能夠獲得 TypeScript 的類型提示和自動補全。
功能: 包含了 Jest API 的類型定義，使得你在撰寫測試時可以享受到 TypeScript 的好處，如類型檢查、編譯時錯誤提示等，提高了代碼的可靠性和可維護性。
```

2. 新增 jest.config.cjs 在根目錄 















