---
title: 命令
---
## 自带命令
Nginx 的命令在控制台中输入 `nginx -h` 就可以看到完整的命令，这里列举几个常用的命令：
|命令|作用|
|---|---|
|nginx -s reload  | 向主进程发送信号，重新加载配置文件，热重启|
|nginx -s reopen	 | 重启 Nginx|
|nginx -s stop    | 快速关闭|
|nginx -s quit    | 等待工作进程处理完成后关闭|
|nginx -T         | 查看当前 Nginx 最终的配置|
|nginx -t -c <配置路径>    | 检查配置是否有问题，如果已经在配置目录，则不需要-c|
## 系统命令
`systemctl` 是 Linux 系统应用管理工具 `systemd` 的主命令，用于管理系统，我们也可以用它来对 Nginx 进行管理，相关命令如下：
|命令|作用|
|---|---|
|systemctl start nginx    | 启动 Nginx|
|systemctl stop nginx     | 停止 Nginx|
|systemctl restart nginx  | 重启 Nginx|
|systemctl reload nginx   | 重新加载 Nginx，用于修改配置后|
|systemctl enable nginx   | 设置开机启动 Nginx|
|systemctl disable nginx  | 关闭开机启动 Nginx|
|systemctl status nginx   | 查看 Nginx 运行状态|