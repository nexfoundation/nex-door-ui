## Deployment steps
2 approach. You can choose either VSCode Remote Container or Create container by shell script
### VS Code Remote Container

What is Remote Container? It let us use a Docker container as a full-featured development environment. We can jump in development without the need of cumbersome environment set-up.
Ref: (https://code.visualstudio.com/docs/remote/containers)


1. We have set the required development environment in 

#### Prerequiste
- Docker Desktop installed
- VSCode Remote Container installed

#### Setup
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

### Create container by shell script

1. You can run the `docker-env.sh` to start up the development environment (container)

```
./docker-env.sh
docker run -it -p 8080:8080 --rm -v $PWD:/app node:14.17.0-alpine3.13 sh
```

2. (In the container) Now you can run the front-end UI!

```
$ npm install
$ npm run serve
```


## Configuration 
Pull the project and edit the `src/aws-exports.js` with required backend configurations

```
cp src/aws-exports.js.example src/aws-exports.js
// replace value
```
