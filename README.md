## Deployment Steps
### Environment Variables for Firebase Configuration

Set up the following environment variables in the `.env.{mode}` file by default it is `.env.development`:

```
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_DATABASE_URL=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

And there are two ways to deploy your web application using Docker.

### VS Code Remote Container

With Remote Container, you can use a Docker container as your development environment without the need for a complicated set-up. Here's how to set it up:

1. Make sure **Docker** and **Visual Studio Code Dev Containers** extension are installed.
2. Open the project folder in VS Code and the remote container dialog will  pop up in the bottom right corner.
3. Select to open the project folder with Remote Container.
4. The container will install and build the necessary environment.
5. You should then see the application running at [[http://localhost:5173/](http://localhost:5173/)]. If not, follow the steps below:
6. Press F5 for debug (Task: npm run dev).

*> Note: You can ignore the "no debugger installed" alert after exiting debugging.*

### Create Container by Shell Script

1. Launch the container by running the following command under your project folder:

    ```
    docker run -it -p 5173:5173 --rm -v $PWD:/app node:18-bullseye sh
    ```

2. Install the necessary libraries and run the application:

    ```
    $ cd ./app

    $ npm install

    $ npm run dev
    ```
