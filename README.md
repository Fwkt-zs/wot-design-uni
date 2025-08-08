## 使用方式
  - 同步 wot-design-uni 最新版本
    - 切换到 master 分支
    - 执行 `git pull` 命令
    - 切回 main 分支, 合并 master 分支代码、记得保留或兼容内部开发的私有代码

  - 同步至私有仓库 (包名: hcg-app-ui)
    - 切换到 main 分支
    - 执行脚本 `pnpm compiler` 等待 `lib` 文件夹生成
    - 进入到 lib 目录下 `cd ./lib`
    - 执行命令 `pnpm publish --registry http://172.17.17.235:4873/ --no-git-check` 发布至私仓
    - 若 私仓中 同版本包存在, 则需要先移除私仓项目再发布, 命令: `pnpm unpublish hcg-app-ui --registry http://172.17.17.235:4873/ --force`

  - 在 uni-app 项目中使用
    - `pnpm install hcg-app-ui --registry http://172.17.17.235:4873/`
    - 若 `http://172.17.17.235:4873/` 未启动, 则在 Jenkins 先启动私仓服务 `online/pm2-private-bag`