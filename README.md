### Deployment steps

Step 1: Pull the project and edit the `src/aws-exports.js` with required backend configurations

```
$ git clone git@github.com:nexfoundation/nex-door-ui.git
$ cd nex-door-ui/
$ cp src/aws-exports.js.example src/aws-exports.js
```

Step 2 (Optional): You can run the `docker-env.sh` to start up the development environment (container)

```
$ ./docker-env.sh
docker run -it -p 8080:8080 --rm -v $PWD:/app node:14.17.0-alpine3.13 sh
```

Step 3: (In the container) Now you can run the front-end UI!

```
$ npm install
$ npm run serve
```
