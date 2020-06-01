---
title: 转发配置
---

## return

在重定向满足两个条件时适用：
+ 重写的 URL 适用于每个匹配的 server 或 location 的请求
+ 可以使用标准的 NGINX 变量构建重写的 URL
`return` 指令简单高效，建议尽量使用 `return`，而不是 `rewrite`。

return 指令放在 server 或 location 上下文中。语法很简单

+ return code [text];
+ return code URL;
+ return URL;
```nginx
# 下面代码中，listen 指令表明 server 块同时用于 HTTP流量。
# server_name 指令匹配包含域名 ‘www.old-name.com’ 的请求。return 指令告诉 Nginx 停止处理请求，直接返回 301 (Moved Permanently) 代码和指定的重写过的 URL 到客户端。
# $scheme 是协议（HTTP 或 HTTPS），$request_uri 是包含参数的完整的 URI。 
server{
    listen         80;
    server_name www.old-name.com;
    
    # return 指令的第一个参数是响应码。第二个参数可选，可以是重定向的 URL
    # location 和 server 上下文中都可以使用 return 指令。
    return 301 $scheme://www.new-name.com$request_uri;
}
```
## rewrite

rewrite 规则会改变部分或整个用户请求中的 URL，主要有两个用途：
+ 通知客户端，请求的资源已经换地方了。例如网站改版后添加了 www 前缀，通过 rewrite 规则可以将所有请求导向新站点。
+ 控制 Nginx 中的处理流程。例如当需要动态生成内容时，将请求转发到应用程序服务器。try_files 指令经常用于这个目的。
  
**语法**:`rewrite regex URL [flag];`

**flag标志位:**

+ last：停止处理当前的 `ngx_http_rewrite_module` 指令集，并开始对匹配更改后的 URI 的新 location 进行搜索（再从 server 走一遍匹配流程）。此时对于当前 server 或 location 上下文，不再处理 `ngx_http_rewrite_module` 重写模块的指令。
+ break：停止处理当前的 `ngx_http_rewrite_module` 指令集.
+ redirect：返回包含 302 代码的临时重定向,在替换字符串不以`http://`,`https://` 或 `$scheme`开头时使用.
+ permanent：返回包含 301 代码的永久重定向。

::: tip
rewrite 指令只能返回代码 301 或 302。要返回其他代码，需要在 rewrite 指令后面包含 return 指令。
:::
::: tip
last 和 break 的区别及共同处：
+ last 重写 url 后，会再从 server 走一遍匹配流程，而 break 终止重写后的匹配
+ break 和 last 都能阻止后面的 rewrite 指令再次执行
:::
```nginx
server {
    listen      80;
    server_name chat.paas.scorpio.uat.newtank.cn;
    
    # 第一个参数 regex 是正则表达式。
    rewrite ^(.*)$	https://$host$1	permanent;
}
```

## proxy_pass
proxy_pass指令中在nginx的两个模块都有

+ ngx_http_proxy_module的proxy_pass:
  + 语法: `proxy_pass URL`;
  + 场景: `location`, `if in location`, `limit_except`
  + 说明: 设置后端代理服务器的协议(protocol)和地址(address),以及location中可以匹配的一个可选的URI。协议可以是"http"或"https"。地址可以是一个域名或ip地址和端口，或者一个 `unix-domain socket` 路径。[详见官方文档](http://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_pass)

+ ngx_stream_proxy_module的proxy_pass:
  + 语法: proxy_pass address;
  + 场景: server
  + 说明: 设置后端代理服务器的地址。这个地址(address)可以是一个域名或ip地址和端口，或者一个 unix-domain socket路径。
  + [详见官方文档](http://nginx.org/en/docs/stream/ngx_stream_proxy_module.html#proxy_pass)

> 两个proxy_pass的关系和区别:
> 
>在两个模块中,两个proxy_pass都是用来做后端代理的指令.
>
>`ngx_stream_proxy_module`模块的proxy_pass指令只能在server段使用,只需要提供域名或ip地址和端口,可以理解为端口转发,可以是tcp端口,也可以是udp端口.
>
>`ngx-http-proxy-module`模块中的proxy_pass指令需要在location段,location中的if段,limit_except段中使用,处理需要提供域名或ip地址和端口外,还需要提供协议.如 “http” 或 “https”,还有一个可选的url可以配置.

下面介绍几种`proxy_pass`使用方式
### 绝对路径. 
`proxy_pass http://127.0.0.1:8080;` 后面8080没有 “/”
```nginx
server {
  listen      80;
  server_name www.test.com;
  
  # 当访问 http://test.yeguxin.top/proxy/aaa/bbb.text时,nginx匹配到 /proxy/路径,把请求转发给127.0.0.1:8080服务.
  # 实际请求代理服务器路径为 " 127.0.0.1:8080/proxy/aaa/bbb.text "
  location /proxy/ {
        proxy_pass http://127.0.0.1:8080;
  }
}
```

### 相对路径
`proxy_pass http://127.0.0.1:8080/;` 后面8080有 “/”
```nginx
server {
  listen      80;
  server_name www.test.com;
  
  # 当访问 http://test.yeguxin.top/proxy/aaa/bbb.text时,nginx匹配到 /proxy/路径,把请求转发给127.0.0.1:8080服务.
  # 实际请求代理服务器路径为 " 127.0.0.1:8080/aaa/bbb.text "
  location /proxy/ {
        proxy_pass http://127.0.0.1:8080/;
  }
}
```
### path后没有/
`proxy_pass http://127.0.0.1:8080/static;` 后面static没有 “/”
```nginx
server {
  listen      80;
  server_name www.test.com;
  
  # 当访问 http://test.yeguxin.top/proxy/aaa/bbb.text时,nginx匹配到 /proxy/路径,把请求转发给127.0.0.1:8080服务.
  # 实际请求代理服务器路径为 " 127.0.0.1:8080/staticaaa/bbb.text "
  location /proxy/ {
        proxy_pass http://127.0.0.1:8080/static;
  }
}
```
### path后有/
`proxy_pass http://127.0.0.1:8080/static/;` 后面static有 “/”
```nginx
server {
  listen      80;
  server_name www.test.com;
  
  # 当访问 http://test.yeguxin.top/proxy/aaa/bbb.text时,nginx匹配到 /proxy/路径,把请求转发给127.0.0.1:8080服务.
  # 实际请求代理服务器路径为 " 127.0.0.1:8080/static/aaa/bbb.text "
  location /proxy/ {
        proxy_pass http://127.0.0.1:8080/static/;
  }
}
```
### 最基本用法
```nginx
server {
  listen      80;
  server_name chat.paas.scorpio.uat.newtank.cn;
    # 转发请求到 http://www.example.com
  location / {
      proxy_pass http://www.example.com;
  }
}
```