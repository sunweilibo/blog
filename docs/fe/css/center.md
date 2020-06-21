---
title: 水平垂直居中
---
## 固定宽高

## 未知宽高
### 文本水平垂直居中
**方案：** `text-align`+`line-height`
```css
<style>
    .f10 .test{
        text-align: center;
        line-height: 100px;
    }
</style>
<div class="case-box f10" data-case="f10">
    <div class="test" style="background-color: lightblue;width: 200px;">测试文字</div>
</div>
```

### text-align + vertical-align
**方案：** 将父元素设置为`table-cell`元素，子元素设置为`inline-block`元素，然后在父元素设置`text-align`和`vertical-align`
```html
<style>
    .f11 .parent{
        display: table-cell;
        text-align: center;
        vertical-align: middle;
    }
    .f11 .child{
        width: 80px;
        display: inline-block;
    }
</style>
<div class="case-box f11" data-case="f11">
    <div class="parent" style="background-color: gray; width:200px; height:100px;">
        <div class="child" style="background-color: lightblue;">测试文字</div>
    </div>
</div>
```

### 图像居中
若子元素是图像，可不使用table-cell，而是其父元素用行高替代高度，且字体大小设为0。子元素本身设置vertical-align:middle
```html
<style>
    .f12 .parent{
        line-height: 200px;
        text-align: center;
        font-size:0;
    }
    .f12 .child{
        vertical-align: middle;
    }
</style>
<div class="case-box f12" data-case="f12">
    <div class="parent" style="background-color: gray; width:200px;">
        <img class="child" src="../../img/head.jpg" style="width:50px;" alt="test">
    </div>
</div>
```