## Deployment Steps

There are two ways to deploy your web application using Docker.

### VS Code Remote Container

With Remote Container, you can use a Docker container as your development environment without the need for a complicated set-up. Here's how to set it up:

1. Make sure **Docker** and **Visual Studio Code Dev Containers** extension are installed.
2. Open the project folder in VS Code and the remote container dialog will  pop-up in the bottom right corner.
3. Select to open the project folder with Remote Container.
4. The container will install and build the necessary environment.
5. You should then see the application running at [[http://localhost:8080/](http://localhost:8080/)]. If not, follow the steps below:
6. Press F5 for debug (Task: npm run serve).

*> Note: You can ignore the "no debugger installed" alert after exiting debugging.*

### Create Container by Shell Script

1. Launch the container by running the following command under your project folder:

    ```
    docker run -it -p 8080:8080 --rm -v $PWD:/app node:14.17.0-alpine3.13 sh
    ```

1. Install the necessary libraries and run the application:

    ```
    $ cd ./app

    $ npm install

    $ npm run serve
    ```

## Building Tailwind CSS

To build Tailwind CSS, go to the Docker container, navigate to `./app`, and run `npx tailwindcss -i ./src/assets/main.css -o ./public/main.css --watch`.