---
title: nginx内置变量
---
## 预定义内置变量
|变量名|作用|
|---|---|
|$arg_name |请求URL中的参数名称|
|$args|请求URL中包含的参数|
|$binary_remote_addr |二进制形式的客户端地址，ipv4通常是4比特长度，ipv6通常为16比特长度|
|$body_bytes_sent |发送给客户端的不包含响应头的字节数|
|$bytes_sent |发送给客户端的字节数。|
|$connection | 连接序列号。|
|$connection_requests | 当前通过连接发出的请求数。|
|$content_length | 请求头中的Content-Length字段。|
|$content_type | 请求头中的Content-Type字段。|
|$cookie_name | cookie的名称。|
|$document_root |当前请求的根目录或别名的值。|
|$document_uri | 与$uri全局变量相同。|
|$hostname |主机名称。|
|$http_name |任意请求头字段；变量名的最后一部份是转换为小写的字段名，通过下划线相连。|
|$https | 如果是https请求方式则值为on，否则为空字符串。|
|$http_HEADER | http请求信息里的HEADER字段。|
|$http_host |与$host相同，但如果请求信息中没有Host行，则可能不同。|
|$http_cookie | 客户端的cookie信息。|
|$http_referer | 引用地址。|
|$http_user_agent | 客户端代理信息。|
|$http_via | 最后一个访问服务器的IP地址。|
|$http_x_forwarded_for | 相当于网络访问路径。|
|$is_args | 如果URL包含参数则为？，否则为空字符串。|
|$limit_rate |nginx配置中的limit_rate配置项的值，影响响应速度限制。|
|$msec |当前时间，单位为毫秒。|
|$nginx_version | nginx version.|
|$pid | 工作进程的PID。|
|$pipe |“p” if request was pipelined, “.” otherwise(1.3.12,1.2.7).|
|$proxy_protocol_addr | proxy_protocol在nginx配置listen参数时设定。来自代理协议头的客户端地址，否则为空字符串。 |
|$proxy_protocol_port |来自代理协议头的客户端端口，其它与$proxy_protocol_addr相同|
|$query_string |  same as $args.|
|$realpath_root |对应于当前请求的根目录或别名值的绝对路径名，所有符号连接都解析为真实路径。|
|$remote_addr | 客户端地址。|
|$remote_port | 客户端端口。|
|$remote_user |用于基本验证的用户名。|
|$request |完整的原始请求URL。|
|$request_body |请求体，当proxy_pass,fastcgi_pass,uwsgi_pass和scgi_pass指令将请求体读入缓存中时此变量值可用。
|$request_body_file |请求主体的临时文件的名称。|
|$request_completion |如果请求完成则值为OK，否则为空字符串。|
|$request_filename |当前请求的文件路径，基于根目录或别名指令，以及请求URI。|
|$request_id | 16位随机字节生成的唯一标识符。|
|$request_length | 请求长度，包含请求行，请求头，以及请求的消息体。|
|$request_method |请求方法，通常为GET或POST。|
|$request_time |以毫秒为单位的请求处理时间；从客户端读取第1个字节之后的时间。|
|$request_uri |完整的原始请求URI（带有参数）。|
|$scheme | 请求协议，http或https。|
|$sent_http_name |任意的响应头字段；变量名的最后一部份是转换为小写的字段名，通过下划线相连。|
|$send_trailer_name |响应结束时发送的任意字段；变量名的最后一部份是转换为小写的字段名，通过下划线相连。|
|$server_addr | 响应请求的服务器地址。|
|$server_name |响应请求的服务器名称。|
|$server_port |响应请求的服务器端口。|
|$server_protocol |响应请求的服务器协议|
|$status | 响应状态。|
|$tcpinfo_rtt，$tcpinfo_rttvar，$tcpinfo_snd_cwnd，$tcpinfo_rcv_space |客户端TCP连接的相关信息，在支持TCP_INFO套接字选项的系统上可用。|
|$time_iso8601 |ISO 8601标准格式下的本地时间。|
|$time_local |通用日志格式的本地时间。|
|$uri | 当前请求的URI。|