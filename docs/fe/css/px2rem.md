---
title: px2rem
---
## 网易转换rem
首先网易的设计稿是基于iPhone5设计的也就是宽度`640px`。（先不考虑dpr的问题下面会说）然后设置`1rem`等于`100px`（ `HTML font-size`为`100px`），相当于`6.4rem = 100%宽度 = 设备的宽度`。
由于是基于6.4rem开发。iPhone5 的物理像素是`320px`(dpr是2.0)，如果此时还想让6.4rem等于设备宽度只能调整1rem对应font-size的比例， `320 / 6.4 = 50 让1rem=50px`就可以实现。如果想让 iPhone6 适配只需要 `1rem = （375 / 6.4） = 58.59375px` 就可以实现iPhone6的适配，这个方法可以适配市面上绝大多数的移动端设备。
   只需要加下面这句话可以实现我上述效果。
`document.documentElement.style.fontSize = document.documentElement.clientWidth / 6.4 + 'px';`
结合预处理器进行处理
```
$ue-width: 640px;
@function px2rem($px) {
  @return #{$px/$ue-width*6.4}rem;
}
```
::: tip
适配即使所有元素在不同deviceWidth设备展示相同的比例效果。因此，我们可以固定的将适配屏幕分为10个等宽区间，转换为css表示即`10rem`，为了达到这种效果，需根据不同设备进行根元素`fontSize`设置。适配即使元素占用空间数量相同，即使元素固定为`nrem`。为此我们首先使用`px2rem($px)`求的元素占据空间宽度，即`nrem`。由此实现适配。
:::
## 淘宝转换rem(rem+js)
这次咱们还是拿iPhone5（640px）的设计稿举例，淘宝的思想是无论当前页面多宽，让`10rem = 页面宽度 = 100%`，所以`1rem = 64px` 然后通过`dpr`设置缩放整个页面，以达到高保真的效果。
iPhone5的宽度是`640px`，页面最终完成效果也是`640px`，iPhone的dpr是2，所以设置  `<meta name="viewport" content="initial-scale=0.5, maximum-scale=0.5, minimum-scale=0.5, user-scalable=no">` 就可以了适配iPhone5了。当然这些东西lib-flexible都帮我们做好了。我只不过说一下，让好奇的小伙伴知道原理。
### flexible主要做了几点。
+ 动态改写<meta>标签
+ 给`<html>`元素添加data-dpr属性，并且动态改写data-dpr的值。
+ 给`<html>`元素添加font-size属性，并且动态改写font-size的值