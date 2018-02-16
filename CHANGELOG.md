# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.3.0] - 2018-02-16
### Added
- Add new scripts to implement a watch mode for the server ([#1](https://github.com/amalto/platform6-service-typescript/issues/1)).
- Create an example to check permissions (client & server) ([#3](https://github.com/amalto/platform6-service-typescript/issues/3)).
### Changed
- Reduce the image _Service Configuration Interface Example_ in the `README.md`.
- Prevent a user who has a single instance to reconnect to display his service in the Portal ([#2](https://github.com/amalto/platform6-service-typescript/issues/3))

## [1.2.1] - 2017-12-28
### Added
- Add [a release script](./scripts/release.sh).

## [1.2.0] - 2017-12-28
### Added
- Add a MIT license.
- Add a section _Prerequisite_ in the `README.md`.
### Changed
- Use the packages [@amalto/platform6-client](https://www.npmjs.com/package/@amalto/platform6-client) and [@amalto/platform6-ui](https://www.npmjs.com/package/@amalto/platform6-ui).
- Conform to [Keep a Changelog](http://keepachangelog.com/en/1.0.0/) format.
- Update the section _General notes about the user interface of the service_ in the `README.md`.
- Update the images in the section _How to run the demo?_ in the `README.md`.
- Update the example of the output of the endpoint `GET /portal` in the `README.md`.
### Removed
- Remove useless dependencies from the client sub-project.
- Remove the file `ServiceConfiguration.json` from the client sub-project.

## [1.1.0] - 2017-12-22
### Changed
- Refactor the directory architecture.
- Update the `README.md`.

## [1.0.1] - 2017-12-21
### Changed
- Refactor the directory architecture.
- Update the `README.md`.

## 1.0.0 - 2017-12-14
### Added
- Show an example of deploying a service.
- Show an example of calling another Platform 6 service.
- Show an example of an API endpoint to get the service client's script.

[Unreleased]: https://bitbucket.org/amalto/dev-service-typescript/branches/compare/HEAD..v1.3.0
[1.3.0]: https://bitbucket.org/amalto/dev-service-typescript/branches/compare/v1.3.0..v1.2.1
[1.2.1]: https://bitbucket.org/amalto/dev-service-typescript/branches/compare/v1.2.1..v1.2.0
[1.2.0]: https://bitbucket.org/amalto/dev-service-typescript/branches/compare/v1.2.0..v1.1.0
[1.1.0]: https://bitbucket.org/amalto/dev-service-typescript/branches/compare/v1.1.0..v1.0.1
[1.0.1]: https://bitbucket.org/amalto/dev-service-typescript/branches/compare/v1.0.1..v1.0.0
