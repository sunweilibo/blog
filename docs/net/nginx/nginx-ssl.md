---
title: https 配置
---

### nginx ssl模块安装
#### 安装
查看是否已经安装http_ssl_module模块
```bash
// 查看 nginx 安装位置
whereis nginx
// 查看安装
/usr/sbin/nginx -V
```
如果存在`–with-http_ssl_module`则已安装，否则需要手动安装

Nginx 官网下载安装包到 src 目录
```bash
cd /usr/local/src
wget http://nginx.org/download/nginx-1.15.9.tar.gz

//解压安装包。
tar -zxvf nginx-1.15.9.tar.gz

//配置 SSL 模块。
cd nginx-1.15.9
./configure --prefix=/usr/local/nginx --with-http_ssl_module

//使用 make 命令编译（使用make install会重新安装nginx），此时当前目录会出现 objs 文件夹。
//用新的 nginx 文件覆盖当前的 nginx 文件。
cp ./objs/nginx /usr/sbin/nginx

//再次查看安装的模块（configure arguments: –with-http_ssl_module说明ssl模块已安装）。
/usr/local/nginx/sbin/nginx -V
```

### SSL 证书部署
新建文件夹，存放 ssl 证书文件

### nginx 配置

编辑 `/usr/local/nginx/conf/nginx.conf` 配置文件：

配置 https server。注释掉之前的 http server 配置，新增 https server：
```nginx
server {
    # 服务器端口使用443，开启ssl, 这里ssl就是上面安装的ssl模块
    listen 443 ssl;
    # 域名，多个以空格分开
    server_name  hack520.com www.hack520.com;
    
    # ssl证书地址
    ssl_certificate     /usr/local/nginx/cert/ssl.pem;  # pem文件的路径
    ssl_certificate_key  /usr/local/nginx/cert/ssl.key; # key文件的路径
    
    # ssl验证相关配置
    ssl_session_timeout  5m;    #缓存有效期
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;    #加密算法
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;    #安全链接可选的加密协议
    ssl_prefer_server_ciphers on;   #使用服务器端的首选算法

    location / {
        root   html;
        index  index.html index.htm;
    }
}
将 http 重定向 https。

server {
    listen       80;
    server_name  hack520.com www.hack520.com;
    return 301 https://$server_name$request_uri;
}
```

