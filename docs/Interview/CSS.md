### Q1 請問 CSS 怎麼做垂直水平置中？請提供至少兩個方法

**文字 in div:**

- 垂直：
  - flex + align-items:center
  - Line-height: div height
- 水平：
  - flex + justify-content:center
  - Text-align: center

**Div in div**

- 垂直：
  - flex + align-items:center
  - Position: absolute + top: 50% + transform: translateY(-50%)
- 水平：
  - flex + justify-content:center
  - Position: absolute + left: 50% + transform: translateX(-50%)
  - Margin: 0 auto (元素要記得設定寬度)

:::tip

flexbox 搭配 align-items: center + justify-content: center; position absolute/fixed + top left 50% + transform: translate(-50%, -50%)

:::
