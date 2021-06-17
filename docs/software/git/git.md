---
title: 常用配置
---

### git 加速
1. 使用代理
```bash
git config --global http.proxy xx
git config --global https.proxy xx
```
2. 镜像
如果原 github 地址为`https://github.com/sunweilibo/blog`, 下载时可以使用`https://github.com.cnpmjs.org/sunweilibo/blog`

### 配置别名
```bash
git config --global alias.co checkout
git config --global alias.cm 'commit -m'
git config --global alias.a 'add .'
```