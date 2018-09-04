# Talk to Frank Alpha

## Dependencies

- nodejs version `9.8.0`

## development

`grunt`

## Building

To build files to `./dist`:

`grunt build`

### Environment Vars

The `BUILD_CONFIG=staging|production|development` (defaults to `development`) environment variable should be used to define to the application the environment it is running in. This is separate to `NODE_ENV` since many libraries (React included) rely on the de-facto standard values of `production|development` to optimise their running.

Setting `BUILD_CONFIG` sets `NODE_ENV` automatically accordingly in webpack.js.

### Live configuration

No passwords / keys etc. are kept in the repo. Any live environments needs a `config.creds.yaml` file in the root of the project to store keys etc.

## Development

A feature branch branching strategy is in use, specifically:

- When a new feature is to be added, a developer should branch from `develop` naming the new branch `feature/[userstory-id]-[short description of new feature for humans]`
- When the work is ready (tested, linted etc.), a pull request should be opened against the `develop` branch.
- A peer review should be undertaken against the pull request and the branch merged.
- The CI server will build from the develop and deploy to the staging server.


### Grunt tasks

| Task | Description                                                                      |
| --------------- | -------------------------------------------------------------------------------- |
| `grunt`  (default)                    | Clean existing & build new bundled files. Run your app on the development server at `localhost:3000`.  |
| `grunt build `                        | Create new bundled files                                                      |
| `grunt ngrok`                         | Setup an grok tunnel to your local web server                                 |
| `grunt contentful:deleteAllIndices`   | Delete all elasticsearch indexes                                              |
| `grunt contentful:fullReindex`        | Delete existing index, create a new ES index and pull entries from contentful |
| `grunt contentful:reindexContent`     | Pull entries from contentful into Elasticsearch & reindex                     |
| `grunt localtunnel`                   | Run local server (monitor for changes) with ngrok tunnel                      |


### Contenftul CLI

Migration and API query tools available using [contentful-cli](https://github.com/contentful/contentful-cli).


| `contentful <script>` | Description                                                                      |
| --------------- | -------------------------------------------------------------------------------- |
| `login / logout`           | Start/end a CLI tool session |
| `content-type list --space-id xxx` | List all content types |
| `content-type get --space-id xxx --id [content type id]`| Get a list of content type fields |


### Workbox (service worker)

**Note: service workers require an HTTPS connection**

[Workbox](https://developers.google.com/web/tools/workbox/modules/) is used to handle service-worker logic.  Configuration is 
found in ```/workbox-config.js```

* service worker files are found in ```/static/ui/js``` & ```/static/offline```
* all requests for png, ico, css and png & offline.html files are precached
* a **'Network first'** policy is used so that 
  * requests made while online will always go to the server first
  * offline requests will correctly load the cached files so that offline.html can be loaded correctly
  
To refresh the list of assets to precache:

```
workbox injectManifest ./workbox-config.js 
```

## Releasing

- Determine the new semantic version of the release.
- Update `package.json`.
- Ensure `changelog` is up to date, whereby changes for the release are listed underneath the version.
- Merge `develop` into `master`.
- Manually run the CI server so that the master is deployed to production.
- Create a new `release/vX.Y.Z` where the release number relates to the semantic version of the release.

## CI

BuddyCI is used for the CI server (see `buddy.yaml`).

- The `Build` CI task validates all branches
- The `Build & Deploy` task runs whenever an update to `develop` is made. This task will update the staging server.

### SSH / Keys

To give BuddyCI access to the integration server, the public key (found at `/environment-variables`) should be added to the `deploy` user's `~/.ssh/authorized_keys` file on the staging server.
