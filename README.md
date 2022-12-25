## Deployment steps

### Pull the code and update necessary information in src/aws-exports.js

After pulling the code, we have to update the aws-exports.js with required [backend configurations](https://github.com/nexfoundation/nex-door-ui/blob/master/src/aws-exports.js).

Just copy paste the value in each key.

----

### Local Deployment

There are 2 approaches to deploy and you can pick either one to do it.
The final goal is the same. We're going to launch the docker container in which our web application is gonna run.

 1. VSCode Remote Container
 2. Create container by shell script
 
#### 1. VS Code Remote Container

What is Remote Container? It let us use a Docker container as a full-featured development environment. We can jump in development without the need of cumbersome environment set-up.

Ref: (https://code.visualstudio.com/docs/remote/containers)


##### Prerequiste
- Docker Desktop installed
- VSCode Remote Container installed

##### Setup
1. Make sure your docker engine is running.
2. Open the code folder in VS Code, and then click the special button 「 」at bottom right (or left). It's a button to launch remote container command pallate.
3. Select open the code folder with Remote Container.
4. The container will then installing and building the necessary environment.
5. Supposedly, you will then see the application is running and you can access it at http://localhost:8080/

If not, follow below steps:

5. Press F5 for debug(npm run serve)
6. ...or run scripts from *NPM Scripts* at *Explorer* Activity(Side) Bar
7. ...or "Task: run task" in Command Palette
8. ...or directly interact terminal💻

> Note: vscode may show alert "no debugger installed" after exit debugging. You can ignore it.

#### 2. Create container by shell script

1. Launch container by command line:

Run below command under your app folder. This will launch and enter into the docker container.

```
docker run -it -p 8080:8080 --rm -v $PWD:/app node:14.17.0-alpine3.13 sh
```

2. Now you're in the container. What we then need to do is install the necessary libraries and run the application.

```
$ cd ./app  # move to the app folder, which is where we clone our repo in the container
$ npm install
$ npm run serve
```
