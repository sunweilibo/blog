---
title: 实际问题
---

### 修改 git commit 历史提交 author
问题原因：git 配置用户名和邮箱为 github 信息，但实际操作的是 gitlab 项目，提交时可能导致 author 信息错误。
解决办法：
 1. 使用 `git rebase -i HEAD~n` 命令，表示修改前 n 次所有提交。找到对应的提交，修改提交前的 `pick` 为 `e` 或 `edit`,保存退出。
 保存并退出后，会提示下面信息
```git
You can amend the commit now, with

    git commit --amend 

Once you are satisfied with your changes, run

    git rebase --continue
```
 2. 执行 `git commit --amend --author "sunweili <sunweili@joyy.sg>`
 3. 执行 `git rebase --continue`
