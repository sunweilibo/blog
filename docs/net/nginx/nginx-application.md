---
title: 工程实际配置
---
 ## 解决跨域
现在前端成熟的做法，一般是把`node proxy server`集成进来。事实上，用Nginx同样可以解决问题，甚至可以应用于线上。
本地起一个nginx server。`server_name`是`mysite-base.com`，比如现在需要请求线上`www.kaola.com`域下的线上接口 `www.kaola.com/getPCBanner` 的数据，当在页面里直接请求，浏览器会报错：

![跨域报错](../img/error.jpg)

为了绕开浏览器的跨域安全限制，现在需要将请求的域名改成`mysite-base.com`。同时约定一个url规则来表明代理请求的身份，然后Nginx通过匹配该规则，将请求代理回原来的域。Nginx配置如下：
```nginx
#请求跨域，这里约定代理请求url path是以/apis/开头
location ^~/apis/ {
    # 这里重写了请求，将正则匹配中的第一个()中$1的path，拼接到真正的请求后面，并用break停止后续匹配
    rewrite ^/apis/(.*)$ /$1 break;
    proxy_pass https://www.kaola.com/;
}  
```
把请求url换成`http://mysite-base.com/apis/getPCBannerList.html` 。这样就可以正常请求到数据。这样其实是通过nginx，用类似于hack的方式规避掉了浏览器跨域限制，实现了跨域访问。

## 适配PC与移动环境
Nginx可以通过内置变量`$http_user_agent`，获取到请求客户端的userAgent，从而知道用户处于移动端还是PC，进而控制重定向到H5站还是PC站。
以笔者本地为例，pc端站点是`mysite-base.com`，H5端是`mysite-base-H5.com`。pc端Nginx配置如下：
```nginx
location / {
    # 移动、pc设备适配
    if ($http_user_agent ~* '(Android|webOS|iPhone|iPod|BlackBerry)') {
        set $mobile_request '1';
    }
    if ($mobile_request = '1') {
        rewrite ^.+ http://mysite-base-H5.com;
    }
}  
```
复制代码这样当浏览设备切换成移动模式，再次刷新页面后，站点被自动切换到H5站。

## 获取真实用户ip
nginx配置
```nginx
location / {
    proxy_set_header  Host $host;
    proxy_set_header  X-real-ip $remote_addr;
    proxy_set_header  X-Forwarded-For $proxy_add_x_forwarded_for;
}
```
+ `$remote_addr`获取到上一级代理的IP
+ `proxy_add_x_forwarded_for`获取到结果例如：(223.104.6.125, 10.10.10.45)，第一个是用户的真实IP，第二个是一级代理的IP，依此类推。

可以从`X-Forwarded-For`中取第一个值获取到真实用户ip。
