# Darkroom — Image Gallery

Simple image gallery built with Express, EJS and MongoDB (Mongoose). Upload, view, update and delete images.

## Website

Live demo: https://gallery-eqsl.onrender.com/

- Deployed on Render
- Verify uptime before sharing(free version).


## Features
- Upload images (multer) and store file metadata in MongoDB.
- View gallery and single image details.
- Update image  and delete images.
- Basic test for the home route.

## Quick start

1. Install dependencies
```sh
npm install
```

2. Environment
- Copy `.env.example` to `.env` and set your MongoDB credentials (or use the included `.env`).
- Connection URIs are built from env vars in [._config.js](_config.js) or `server.js`.

Key env vars used:
- MONGO_USERNAME, MONGO_PASSWORD, MONGO_CLUSTER, MONGO_DB_DEV, MONGO_DB_TEST

3. Run the app
```sh
node server.js
# or (dev)
node server.js
# or 
npm start 
```


4. Run tests
```sh
npm test
```
## Testing

Run tests locally:
```sh
npm install
npm test
```

Checkout the test branch (steps)

1. If you don't have the upstream remote set, add it (only do this once):
```sh
git remote add upstream <UPSTREAM_REPO_URL >
```

2. Fetch remote branches:
```sh
git fetch upstream
# or, if the branch is on origin: to chech this  do git remote -v
git fetch origin
```

3. Create a local branch that tracks the remote test branch:
```sh
git checkout -b test upstream/test
```

4. If the test branch already exists locally:
```sh
git checkout test
# update from upstream
git pull upstream test    
# or
git pull origin test
```

5. Run the test the test branch:
```sh
npm test
```

Notes:
- Replace <UPSTREAM_REPO_URL> with the repo URL(from the where you forked the repo).
- Use `git branch -a` to list remote branches if you need to confirm the test branch name.
- You can aswell use `git remote -v` to check the remote repository.

## Important files
- [server.js](server.js) — app entry, connects to MongoDB and exports [`app`](server.js)
- [package.json](package.json) — scripts and dependencies
- [._config.js](_config.js) — helper to build Mongo URIs from env
- [.env](.env) / [.env.example](.env.example) — environment examples


## Deployment
- App listens on `process.env.PORT || 5000` in [server.js](server.js).
- `Jenkinsfile` included for CI/deploy examples.

## Notes & tips
- Uploaded images stored under `public/images/` (ignored by Git).
- Max upload size in [routes/upload.js](routes/upload.js) is 1MB — adjust `limits.fileSize` as needed.

## Troubleshooting
- Mongo connection errors: verify env values and network access to your cluster. See [._config.js](_config.js) and [server.js](server.js).
- Tests failing: ensure test DB is reachable or mock DB for CI. Test uses [test/serverTest.js](test/serverTest.js).

## License
ISC

## Author
- Name: Victor Malanga
- Email: malangavic@gmail.com
- GitHub: https://github.com/Vicmalash/gallery/

## Forked from
This project was forked from [jonnygovish/gallery](https://github.com/jonnygovish/gallery).