# Space Mission API :ringed_planet:

## 🚀 Getting Started

Make sure you have a postgres database running locally, then copy the .env.example file to .env

You'll need to create a jwt secret. With **openssl** you can create the secret with ease:

```bash
openssl rand -hex 32
```

_To get 100% of the project you'll also need to create a_ **cloudinary account**.

After adding all environment variables, you can execute the project in dev mode, just run:

```bash
npm install # install all packages
npm cert # generate a self-signed certificate
npm run start:dev # execute project in dev mode
```

The server uses the 'node:https' built-in module, so don't forget to **generate the self-signed certificate**

At this point, the API should be running at localhost:3000. Go to https://localhost:3000/docs to see the API documentation made with **Swagger**.

If you want to execute the project in production, run:

```bash
npm run build:start # build and execute api in production
```

## 🐳 Docker

The easiest way to execute the project is by using Docker.
With Docker installed and the repo at hand, you just need to execute the following command:

```bash
docker-compose up
```

## 📝 License

This project is licensed under the MIT license. See the [LICENSE](./LICENSE.md) file for more details.
