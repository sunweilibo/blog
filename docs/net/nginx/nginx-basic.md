---
title: 基础知识
---

## 使用场景
nginx最常用的使用场景有以下三种
+ 静态资源服务，通过本地文件系统提供服务；
+ 反向代理服务，延伸出包括缓存、负载均衡等；
+ API 服务，OpenResty ；

## root和alias
+ alias指定的目录是准确的，即location匹配访问的path目录下的文件直接是在alias目录下查找的；
+ alias必须在location作用块中；
+ root指定的目录是location匹配访问的path目录的上一级目录,这个path目录一定要是真实存在root指定目录下的；
+ 使用alias标签的目录块中不能使用rewrite的break（具体原因不明）；另外，**alias指定的目录后面必须要加上"/"符号！！**
+ alias虚拟目录配置中，location匹配的path目录如果后面不带"/"，那么访问的url地址中这个path目录后面加不加"/"不影响访问，访问时它会自动加上"/"；但是如果location匹配的path目录后面加上"/"，那么访问的url地址中这个path目录必须要加上"/"，访问时它不会自动加上"/"。如果不加上"/"，访问就会失败！
+ root目录配置中，location匹配的path目录后面带不带"/"，都不会影响访问。

### 示例
```nginx
location ~ /huan/ {
  alias /home/www/huan/;
}
```
在上面alias虚拟目录配置下，访问`http://www.wangshibo.com/huan/a.html`实际指定的是`/home/www/huan/a.html`。

**注意：alias指定的目录后面必须要加上"/"，即/home/www/huan/不能成/home/www/huan**

上面的配置也可以改成root目录配置，如下
```nginx
location ~ /huan/ {
  root /home/www/;
}
```
> 可以看出，使用`alias`会将`location`匹配到的字段完全进行替换，而`root`则是拼接。

## location路径"/"
+ 结尾带"/"为精确匹配，即url字段必须与location字段相同
+ 结尾不带"/"为一般匹配，即url字段开头与location字段匹配即可，即部分匹配。

### 示例
```nginx
// 规则一
location ~ /huan/ {
  root /home/www/;
}
// 规则二
location ~ /huan {
  root /home/www/;
}
```
示例一配置可以匹配 `www.test.com/huan/aa.html`，`www.test.com/huan/xxx.html`，但不能匹配到`www.test.com/huanxx/aa.html`。

示例二代码可以匹配`www.test.com/huan/aa.html`，`www.test.com/huan/xxx.html`，`www.test.com/huanxx/aa.html`。

同时使用时，必须将规则一放在规则二前面，否则规则一不会生效。
## 匹配规则
+ = 开头表示精确匹配
+ ^~ 开头表示uri以某个常规字符串开头，理解为匹配 url路径即可。nginx不对url做编码，因此请求为/static/20%/aa，可以被规则^~ /static/ /aa匹配到（注意是空格）。
+ ~ 开头表示区分大小写的正则匹配
+ ~* 开头表示不区分大小写的正则匹配
+ !~和!~*分别为区分大小写不匹配及不区分大小写不匹配 的正则
+ / 通用匹配，任何请求都会匹配到。

## try_files
try_files的语法规则：
+ 格式1：`try_files file ... uri`;
+ 格式2：`try_files file ... =code`;

可应用的上下文：server，location段

语法解释：
+ 按指定的file顺序查找存在的文件，并使用第一个找到的文件进行请求处理
+ 查找路径是按照给定的root或alias为根路径来查找的
+ 如果给出的file都没有匹配到，则重新请求最后一个参数给定的uri，就是新的location匹配
+ 如果是格式2，如果最后一个参数是 = 404 ，若给出的file都没有匹配到，则最后返回404的响应码

配置举例：
```nginx
location /images/ {
    root /opt/html/;
    try_files $uri   $uri/  /images/default.gif; 
}
```
比如 请求 `127.0.0.1/images/test.gif` 会依次查找 1.文件`/opt/html/images/test.gif`   2.文件夹 `/opt/html/images/test.gif/`下的index文件  3. 请求`127.0.0.1/images/default.gif`

其他用法
```nginx
location / {
    try_files /system/maintenance.html
              $uri $uri/index.html $uri.html
              @mongrel;
}

location @mongrel {
    proxy_pass http://mongrel;
}
```
以上中若未找到给定顺序的文件，则将会交给location @mongrel处理（相当于匹配到了@mongrel来匹配）
```nginx
location / {
            try_files $uri $uri/ /index.php?$query_string;
}
```
未匹配到前面两个时，可以进行重定向
## location内部proxy配置
1. `proxy_set_header`：在将客户端请求发送给后端服务器之前，更改来自客户端的请求头信息。
2. `proxy_connect_timeout`：配置Nginx与后端代理服务器尝试建立连接的超时时间。
3. `proxy_read_timeout`：配置Nginx向后端服务器组发出read请求后，等待相应的超时时间。
4. `proxy_send_timeout`：配置Nginx向后端服务器组发出write请求后，等待相应的超时时间。
5. `proxy_redirect`：用于修改后端服务器返回的响应头中的Location和Refresh。
6. `proxy_cookie_domain`：用于修改后端服务器返回的响应头中的cookie所属的域名。