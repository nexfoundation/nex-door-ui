## Deployment Steps
### Environment Variables for Firebase Configuration

Vite loads Firebase configuration from per-mode env files (all git-ignored except the example):

| Command | Mode | Env file |
| --- | --- | --- |
| `npm run dev` | development | `.env.development` |
| `npm run build:staging` | staging (QA, `nex-work-qa`) | `.env.staging.local` |
| `npm run build` | production (`nex-job-refer`) | `.env.production.local` |

Copy `.env.production.example` and fill in:

```
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_DATABASE_URL=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

### Firebase Hosting

The site is served by Firebase Hosting target `door` (`firebase.json`, `.firebaserc`):

- staging: project `nex-work-qa`, site `nex-door-qa`
- prod: project `nex-job-refer`, site `nex-door`

Manual deploy (requires `firebase login` and access to the project):

```
npm run build:staging && firebase deploy --only hosting:door -P staging
npm run build && firebase deploy --only hosting:door -P prod
```

CI (`.github/workflows/firebase-hosting.yml`):

- pull request to `master`/`staging`: staging build deployed to a QA preview channel (skipped for forks)
- push to `staging`: QA live
- push to `master`: prod live

Required repository settings:

- Variables: `DOOR_ENV_STAGING`, `DOOR_ENV_PRODUCTION` — full multi-line `.env` content written to `.env.staging.local` / `.env.production.local` before building
- Secrets: `FIREBASE_SERVICE_ACCOUNT_NEX_WORK_QA`, `FIREBASE_SERVICE_ACCOUNT_NEX_JOB_REFER` — service account JSON with Firebase Hosting Admin on each project

### Local Development with Docker

There are two ways to run the app locally using Docker.

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
