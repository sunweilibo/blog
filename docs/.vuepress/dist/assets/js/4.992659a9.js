(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{348:function(t,s,a){t.exports=a.p+"assets/img/error.1f2e25c5.jpg"},358:function(t,s,a){"use strict";a.r(s);var e=a(43),r=Object(e.a)({},(function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[e("h2",{attrs:{id:"解决跨域"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#解决跨域"}},[t._v("#")]),t._v(" 解决跨域")]),t._v(" "),e("p",[t._v("现在前端成熟的做法，一般是把"),e("code",[t._v("node proxy server")]),t._v("集成进来。事实上，用Nginx同样可以解决问题，甚至可以应用于线上。\n本地起一个nginx server。"),e("code",[t._v("server_name")]),t._v("是"),e("code",[t._v("mysite-base.com")]),t._v("，比如现在需要请求线上"),e("code",[t._v("www.kaola.com")]),t._v("域下的线上接口 "),e("code",[t._v("www.kaola.com/getPCBanner")]),t._v(" 的数据，当在页面里直接请求，浏览器会报错：")]),t._v(" "),e("p",[e("img",{attrs:{src:a(348),alt:"跨域报错"}})]),t._v(" "),e("p",[t._v("为了绕开浏览器的跨域安全限制，现在需要将请求的域名改成"),e("code",[t._v("mysite-base.com")]),t._v("。同时约定一个url规则来表明代理请求的身份，然后Nginx通过匹配该规则，将请求代理回原来的域。Nginx配置如下：")]),t._v(" "),e("div",{staticClass:"language-nginx extra-class"},[e("pre",{pre:!0,attrs:{class:"language-nginx"}},[e("code",[e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#请求跨域，这里约定代理请求url path是以/apis/开头")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("location")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("^")]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("~")]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("apis"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 这里重写了请求，将正则匹配中的第一个()中$1的path，拼接到真正的请求后面，并用break停止后续匹配")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("rewrite")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("^")]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("apis"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("$ "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("$"),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("break")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("proxy_pass")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("https")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("www"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("kaola"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("com"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("  \n")])])]),e("p",[t._v("把请求url换成"),e("code",[t._v("http://mysite-base.com/apis/getPCBannerList.html")]),t._v(" 。这样就可以正常请求到数据。这样其实是通过nginx，用类似于hack的方式规避掉了浏览器跨域限制，实现了跨域访问。")]),t._v(" "),e("h2",{attrs:{id:"适配pc与移动环境"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#适配pc与移动环境"}},[t._v("#")]),t._v(" 适配PC与移动环境")]),t._v(" "),e("p",[t._v("Nginx可以通过内置变量"),e("code",[t._v("$http_user_agent")]),t._v("，获取到请求客户端的userAgent，从而知道用户处于移动端还是PC，进而控制重定向到H5站还是PC站。\n以笔者本地为例，pc端站点是mysite-base.com，H5端是mysite-base-H5.com。pc端Nginx配置如下：\nlocation / {\n# 移动、pc设备适配\nif ($http_user_agent ~* '(Android|webOS|iPhone|iPod|BlackBerry)') {\nset $mobile_request '1';\n}\nif ($mobile_request = '1') {\nrewrite ^.+ http://mysite-base-H5.com;\n}\n}"),e("br"),t._v("\n复制代码这样当浏览设备切换成移动模式，再次刷新页面后，站点被自动切换到H5站。如下：")])])}),[],!1,null,null,null);s.default=r.exports}}]);