#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
<<<<<<< HEAD
set -e

# 生成静态文件
npm run build

# 进入生成的文件夹
cd docs/.vuepress/dist
=======
#set -e

# 生成静态文件
#npm run build

# 进入生成的文件夹
#cd docs/.vuepress/dist
>>>>>>> 327850a (项目的的建立)

# 如果是发布到自定义域名
# echo 'www.zhangyunchen.cc' > CNAME

<<<<<<< HEAD
git init
git add -A
git commit -m 'deploy'
=======
#git init
#git add -A
#git commit -m 'deploy'
>>>>>>> 327850a (项目的的建立)

# 如果你想要部署到 https://<USERNAME>.github.io
# git push -f git@github.com:837370005/837370005.github.io.git master

# 如果发布到 https://<USERNAME>.github.io/<REPO>  REPO=github上的项目
# git push -f git@github.com:<USERNAME>/vuepress.git master:gh-pages

<<<<<<< HEAD
cd -
=======
#cd -
>>>>>>> 327850a (项目的的建立)
