## Deployment steps
2 approach. You can choose either VSCode Remote Container or Create container by shell script
### VS Code Remote Container
#### prerequist 
- VSCode remote container(at bottom right recommend corner)
#### Setup
1. Open folder with VSCode remote container (follow VSCode's guilde)
2. ...wait for container build & npm install
3. Press F5 for debug(npm run serve)
4. ...or run scripts from *NPM Scripts* at *Explorer* Activity(Side) Bar
5. ...or "Task: run task" in Command Palette
6. ...or directly interact terminal💻

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
