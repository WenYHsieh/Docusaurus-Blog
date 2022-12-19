### Q1 請問 process 跟 thread 的差別是什麼？

OS -> program -> process -> thread

program 是我們所寫的，尚未被執行的程式碼，而當我們執行這個 program，他就活化變成

Process 程序: 就是已經被 Load 到記憶體中，隨時會被 CPU 執行的 program 。每個 program 被活化後都最少會有一個 proccess 在工作。

> 一個 CPU 核心一次只能執行一個 proccess，但 proccess 可以有很多個，因此 proccess 數量總是會小於 CPU 核心數，假設現在電腦有四核心，共有 10 個 proccess ，那就會需要排程，去讓同一時間只會有四個 proccess 在運行中，其他 6 個會在等待狀態。一個以上的 proccess 同時執行就是 multi-proccessing 的概念

因此作業系統最小分配資源的單位是 proccess，CPU 核心數代表同時間最多能有多少 proccess 在運行中，而每個 CPU 的資源會再分配給底下的執行單元，也就是 thread。最大的差異在於同一個 Process 底下的一個或多個 Thread 能透過 global variable 來共享資源，而不同的 Process 都是互相獨立的。

thread 執行續是 proccess 當中的執行小單元，也是真正的執行單元， proccess 則是執行續的容器

對不同瀏覽器 (program) 來說，他執行上的實作可能是一個 browser proccess 多個 thread 分別執行不同的部分，例如和網路相關的工作或是 GPU 相關的工作，他也可能會有多個 proccess，如 network proccesss, plugin proccess 或 GPU proccess。

:::tip

可以再次複習這篇好文：https://developers.google.com/web/updates/2018/09/inside-browser-part1

1.  基本上一個應用程式在執行的時候就會產生一個程序（Process）
2.  一個程序底下可以有多個執行緒（Thread）
3.  Process 之間基本上資料是不共享的，而同個 Process 底下的 thread 們則共享資料
4.  一個 CPU 同時間只能執行一個任務，但又不能一直執行同一個 process 的任務，所以會來回在不同 process 之間切換，這就叫做 context switch
5.  一個 CPU 同時間只能執行一個任務，但又不能一直執行同一個 process 的任務，所以會來回在不同 process 之間切換，這就叫做 context switch
6.  以瀏覽器為例，Chrome 是一個 process，然後還會幫每一個 tab 都產生一個 process，因此一個分頁掛掉不會影響到其他的
7.  tab 的 process 底下又會有不同 thread 來做事，例如說負責渲染的 UI thread，負責網路的 network thread 等等

:::
