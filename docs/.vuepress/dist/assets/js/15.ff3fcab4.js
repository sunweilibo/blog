(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{360:function(a,t,s){"use strict";s.r(t);var r=s(43),o=Object(r.a)({},(function(){var a=this,t=a.$createElement,s=a._self._c||t;return s("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[s("h2",{attrs:{id:"root和alias"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#root和alias"}},[a._v("#")]),a._v(" root和alias")]),a._v(" "),s("ul",[s("li",[a._v("alias指定的目录是准确的，即location匹配访问的path目录下的文件直接是在alias目录下查找的；")]),a._v(" "),s("li",[a._v("alias必须在location作用块中；")]),a._v(" "),s("li",[a._v("root指定的目录是location匹配访问的path目录的上一级目录,这个path目录一定要是真实存在root指定目录下的；")]),a._v(" "),s("li",[a._v("使用alias标签的目录块中不能使用rewrite的break（具体原因不明）；另外，"),s("strong",[a._v('alias指定的目录后面必须要加上"/"符号！！')])]),a._v(" "),s("li",[a._v('alias虚拟目录配置中，location匹配的path目录如果后面不带"/"，那么访问的url地址中这个path目录后面加不加"/"不影响访问，访问时它会自动加上"/"；但是如果location匹配的path目录后面加上"/"，那么访问的url地址中这个path目录必须要加上"/"，访问时它不会自动加上"/"。如果不加上"/"，访问就会失败！')]),a._v(" "),s("li",[a._v('root目录配置中，location匹配的path目录后面带不带"/"，都不会影响访问。')])]),a._v(" "),s("h3",{attrs:{id:"示例"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#示例"}},[a._v("#")]),a._v(" 示例")]),a._v(" "),s("div",{staticClass:"language-nginx extra-class"},[s("pre",{pre:!0,attrs:{class:"language-nginx"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("location")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("~")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("/")]),a._v("huan"),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("/")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("{")]),a._v("\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("alias")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("/")]),a._v("home"),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("/")]),a._v("www"),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("/")]),a._v("huan"),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("/")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("}")]),a._v("\n")])])]),s("p",[a._v("在上面alias虚拟目录配置下，访问"),s("code",[a._v("http://www.wangshibo.com/huan/a.html")]),a._v("实际指定的是"),s("code",[a._v("/home/www/huan/a.html")]),a._v("。")]),a._v(" "),s("p",[s("strong",[a._v('注意：alias指定的目录后面必须要加上"/"，即/home/www/huan/不能成/home/www/huan')])]),a._v(" "),s("p",[a._v("上面的配置也可以改成root目录配置，如下")]),a._v(" "),s("div",{staticClass:"language-nginx extra-class"},[s("pre",{pre:!0,attrs:{class:"language-nginx"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("location")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("~")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("/")]),a._v("huan"),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("/")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("{")]),a._v("\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("root")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("/")]),a._v("home"),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("/")]),a._v("www"),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("/")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("}")]),a._v("\n")])])]),s("blockquote",[s("p",[a._v("可以看出，使用"),s("code",[a._v("alias")]),a._v("会将"),s("code",[a._v("location")]),a._v("匹配到的字段完全进行替换，而"),s("code",[a._v("root")]),a._v("则是拼接。")])]),a._v(" "),s("h2",{attrs:{id:"location路径"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#location路径"}},[a._v("#")]),a._v(' location路径"/"')]),a._v(" "),s("ul",[s("li",[a._v('结尾带"/"为精确匹配，即url字段必须与location字段相同')]),a._v(" "),s("li",[a._v('结尾不带"/"为一般匹配，即url字段开头与location字段匹配即可，即部分匹配。')])]),a._v(" "),s("h3",{attrs:{id:"示例-2"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#示例-2"}},[a._v("#")]),a._v(" 示例")]),a._v(" "),s("div",{staticClass:"language-nginx extra-class"},[s("pre",{pre:!0,attrs:{class:"language-nginx"}},[s("code",[s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("/")]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("/")]),a._v(" 规则一\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("location")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("~")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("/")]),a._v("huan"),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("/")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("{")]),a._v("\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("root")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("/")]),a._v("home"),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("/")]),a._v("www"),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("/")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("}")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("/")]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("/")]),a._v(" 规则二\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("location")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("~")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("/")]),a._v("huan "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("{")]),a._v("\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("root")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("/")]),a._v("home"),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("/")]),a._v("www"),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("/")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("}")]),a._v("\n")])])]),s("p",[a._v("示例一配置可以匹配 "),s("code",[a._v("www.test.com/huan/aa.html")]),a._v("，"),s("code",[a._v("www.test.com/huan/xxx.html")]),a._v("，但不能匹配到"),s("code",[a._v("www.test.com/huanxx/aa.html")]),a._v("。")]),a._v(" "),s("p",[a._v("示例二代码可以匹配"),s("code",[a._v("www.test.com/huan/aa.html")]),a._v("，"),s("code",[a._v("www.test.com/huan/xxx.html")]),a._v("，"),s("code",[a._v("www.test.com/huanxx/aa.html")]),a._v("。")]),a._v(" "),s("p",[a._v("同时使用时，必须将规则一放在规则二前面，否则规则一不会生效。")]),a._v(" "),s("h2",{attrs:{id:"匹配规则"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#匹配规则"}},[a._v("#")]),a._v(" 匹配规则")]),a._v(" "),s("ul",[s("li",[a._v("= 开头表示精确匹配")]),a._v(" "),s("li",[a._v("^~ 开头表示uri以某个常规字符串开头，理解为匹配 url路径即可。nginx不对url做编码，因此请求为/static/20%/aa，可以被规则^~ /static/ /aa匹配到（注意是空格）。")]),a._v(" "),s("li",[a._v("~ 开头表示区分大小写的正则匹配")]),a._v(" "),s("li",[a._v("~* 开头表示不区分大小写的正则匹配")]),a._v(" "),s("li",[a._v("!~和!~*分别为区分大小写不匹配及不区分大小写不匹配 的正则")]),a._v(" "),s("li",[a._v("/ 通用匹配，任何请求都会匹配到。")])])])}),[],!1,null,null,null);t.default=o.exports}}]);