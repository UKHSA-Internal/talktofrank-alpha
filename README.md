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

## Development

A feature branch branching strategy is in use, specifically:

- When a new feature is to be added, a developer should branch from `develop` naming the new branch `feature/[userstory-id]-[short description of new feature for humans]`
- When the work is ready (tested, linted etc.), a pull request should be opened against the `develop` branch.
- A peer review should be undertaken against the pull request and the branch merged.
- The CI server will build from the develop and deploy to the staging server.

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
