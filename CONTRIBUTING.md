# Contributing to this repository

Thank you for wanting to contribute to dashboard!

There are a few things to keep in mind when contributing:

- We're using Prettier, so make sure to either format your code using `yarn prettier --write`, or by installing an extension for your editor to auto-format everything.
- We're using the React testing library for testing and CircleCI for CI/CD. Please ensure that the tests pass with your contribution, either by adding sufficient test coverage to your contribution or by modifying existing tests for sufficient coverage (that is if your contribution modifies existing code).

In summary, please make sure the following two commands run without issue before creating your PR:

```sh
yarn prettier
yarn test
```
