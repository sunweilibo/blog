---
title: 浏览器网络请求
---

## 简单请求和复杂请求
如果同时满足下面两个条件，就属于简单请求：
+ 请求方法是 HEAD、GET、POST 三种之一；
+ HTTP 头信息不超过右边着几个字段：`Accept、Accept-Language、Content-Language、Last-Event-ID`
`Content-Type` 只限于三个值 `application/x-www-form-urlencoded、multipart/form-data、text/plain`；

凡是不同时满足这两个条件的，都属于复杂请求。或符合以下任一情况的就是复杂请求：
+ 使用方法put或者delete;
+ 发送json格式的数据（content-type: application/json）
+ 请求中带有自定义头部；
### 浏览器处理方式
浏览器处理简单请求和非简单请求的方式不一样：

**简单请求**

对于简单请求，浏览器会在头信息中增加 `Origin` 字段后直接发出，`Origin` 字段用来说明，本次请求来自的哪个源（协议+域名+端口）。
如果服务器发现 `Origin` 指定的源不在许可范围内，服务器会返回一个正常的 HTTP 回应，浏览器取到回应之后发现回应的头信息中没有包含 `Access-Control-Allow-Origin` 字段，就抛出一个错误给 XHR 的 error 事件；
如果服务器发现 `Origin` 指定的域名在许可范围内，服务器返回的响应会多出几个 `Access-Control-` 开头的头信息字段。

**非简单请求**

非简单请求是那种对服务器有特殊要求的请求，比如请求方法是 `PUT` 或 `DELETE`，或`Content-Type` 值为 `application/json`。浏览器会在正式通信之前，发送一次 HTTP 预检 `OPTIONS` 请求，先询问服务器，当前网页所在的域名是否在服务器的许可名单之中，以及可以使用哪些 HTTP 请求方法（如get、post）和头信息字段，以及是否需要Credentials(认证信息）。只有得到肯定答复，浏览器才会发出正式的 XHR 请求，否则报错。

请求报文中有两个需要关注的首部字段：

（1）`Access-Control-Request-Method`：告知服务器实际请求所使用的HTTP方法；

（2）`Access-Control-Request-Headers`：告知服务器实际请求所携带的自定义首部字段。

同时服务器也会添加`origin` header,告知服务器实际请求的客户端的地址。服务器基于从预检请求获得的信息来判断，是否接受接下来的实际请求。

服务器所返回的`Access-Control-Allow-Methods`首部字段将所有允许的请求方法告知客户端，返回的`Access-Control-Request-Headers`首部字段将所有允许的自定义首部字段告知客户端。此外，服务器端可返回Access-Control-Max-Age首部字段，允许浏览器在指定时间内，无需再发送预检请求，直接用本次结果即可。