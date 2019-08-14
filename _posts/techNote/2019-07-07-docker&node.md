---
layout:     post
title:      docker部署前端开发环境
category: techNote
description: 学习笔记
tags:  学习笔记
---

用docker部署前端开发环境是个早就想做的事情，做完发现也还好吧，因为目前的工具链已经很完善了，一个yarn全都vans。不过还是记录一下。

1、安装docker

之前装的都启动不了了,重新官网下软件，不得不说非常简单了。运行起来就可以使用docker了。

2、DockerFile

    #node 镜像，版本11
    FROM node:11
    #docker里的工作路径，后面比如copy文件的当前目录就是这个地址
    WORKDIR  /usr/src/app
    #COPY命令前面是本地目录，并且只能是DockerFile同级目录，后面是docker里的目录，.就代表是WORKDIR
    #这里如果是发布环境，可以先将依赖安装好，所以复制这两个文件过去，执行yarn
    #这里注释掉是因为我们后面要加volume，如果放到WORKDIR下，这些依赖就白装了，目录被覆盖了。
    #COPY  ./package.json .
    #COPY  ./yarn.lock .
    #RUN yarn 
    #这是允许暴露的端口号地址，就全暴露吧
    EXPOSE 1000-9999
    #只能有一个CMD命令，最后执行，然后就运行起来了。
    CMD ["npm", "run","dev" ]

3、编辑&运行

    # build就是编译，起个名字，然后接编译得目录
    docker build -t liuxiaoyuff/node-web-app .
    #-p是指docker暴露的端口号如果是 5678:5677 意思就是docker暴露的5677端口，我们可以用5678访问，不加前面的端口号，docker就自己分配一个
    #-v是指volume，放代码用的，后面是本地目录，对应docker目录，本质就是共享文件夹
    #这里先yarn ，又npm run dev，就是在该目录下按照依赖和启动
    #尝试过后可以确认是用docker内部的node按照和编译得
    #实际上看过很多文章，发布环境是像上面那样copy package.json文件安装依赖，再copy代码目录编译得，直接在Docker里解决。
    #不一起复制是因为每一个 RUN 指令都会被看作是可缓存的执行单元，业务代码可变性强，可以充分利用缓存。
    #我这里主要是为了开发环境改代码可以用实时更新。
    docker run -p 5677 -v ~/app:/usr/src/app  liuxiaoyuff/node-web-app yarn
    docker run -p 5677 -v ~/app:/usr/src/app  liuxiaoyuff/node-web-app npm run dev

就很简单。。因为只是静态文件的编译而已，只需node镜像

4、提交

像git一样 docker commit docker tag docker push 三连。
提交的是容器id，之后自己账户下就有了

5、这里记录一个没用到的工具：

docker compose ： Compose is a tool for defining and running multi-container Docker applications

Kubernetes：用于管理云平台中多个主机上的容器化的应用。

6、清楚缓存

    docker container prune -f
    docker image prune
