# CSS 一些觀念



## Box model

---

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



## CSS 常用 selector

---

|        | 意義                                |
| ------ | ----------------------------------- |
| a b    | 選中所有子元素                      |
| a > b  | 選中最靠近的子元素                  |
| a ~ b  | 選中所有同級元素                    |
| a + b  | 選中最靠近的同級元素                |
| .a.b   | 選中同時具有 a, b class name 的元素 |
| a[x=y] | 選中 x 屬性被設定為 y 的 a 元素     |
| *      | 全選                                |
| #a     | 選中 id 為 a 的元素                 |
| div    | 選中所有 div 元素                   |

- div .a.b
  - 選中 div 的所有子元素，有 class name a 及 b 的所有元素
- div .a .b
  - 選中 div 所有子元素符合 class name 為 a 的所有元素，這個元素符合 class name 為 b 的所有元素
- div section
  - 選中 div 為 section 元素的所有子元素
- div > section
  - 選中 div 最接近的一個為 section 的子元素
- div + section
  - 選中 div 最接近的一個為 section 的 sibling 元素 (同一層級）
- div ~ section
  - 選中 div 最接近的所有為 section 的 sibling 元素 (同一層級)



## class name Naming convention

---

CSS 是全域的，因此會有 class name 相同後面覆蓋到前面的問題，BEM 是一種為了解決此問題而出現的一種命名慣例，三個字母分別代表 Block、Element、Modifier。

- Block: 可重用的區塊
- Element: 區塊當中的元素
- Modifier: 此元素的狀態。如：active, inactive

因此 BEM 把一個元素的 class 用這三者來加以定義，使之形成 scope，來減少撞名的可能。

例如，元素是一個資訊卡中的按鈕，可能會這樣命名：`infoCard__button--active` -> `[Block]__[Element]--[Modifier]`