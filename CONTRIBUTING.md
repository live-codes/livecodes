# Contributing

Contributions are always welcome, no matter how large or small. Before contributing,
please read the [code of conduct](CODE_OF_CONDUCT.md).

Some thoughts to help you contribute to this project

## General Recommendations

1. Always discuss your suggested contribution in an issue, so that we agree on the concept and implementation before the actual work.
2. Leave a detailed description in the Pull Request.
3. Screenshots are preferable for visuals changes.
4. Always communicate. Whether it is in the issue or the pull request, keeping the lines of communication helps everyone around you.
5. If you have any questions, [let's discuss](https://github.com/live-codes/livecodes/discussions).

## Get Started

1. Fork the repo `https://github.com/live-codes/livecodes`
2. Clone

   ```shell
   $ git clone https://github.com/<your-name>/livecodes
   $ cd livecodes
   ```

3. Install dependencies

   ```shell
   $ npm install
   ```

4. Export all source texts for i18n ([more details](./docs/docs/contribution/i18n.md))

   ```shell
   $ npm run i18n-export
   ```

5. Build

   ```shell
   $ npm run build
   ```

6. Serve the app on http://127.0.0.1:8080

   ```shell
   $ npm run serve
   ```

7. Start the app and watch for changes

   ```shell
   $ npm run start
   ```

8. Start the docs and watch for changes: http://localhost:3000/docs

   ```shell
   $ npm run docs
   ```

9. Start storybook and watch for changes: http://localhost:6006

   ```shell
   $ npm run storybook
   ```

10. Run linters, formatters & unit tests

    ```shell
    $ npm run test
    ```

11. Run e2e tests

    ```shell
    $ npm run e2e
    ```

12. Deploy to GitHub Pages (make sure you have built the app first)

    ```shell
    $ npm run gh-pages
    ```

13. Start a release ([more details](./docs/docs/contribution/release.md))

    ```shell
    $ npm run start-release
    ```

## Pull Requests

### _We actively welcome your pull requests, however linking your work to an existing issue is preferred._

1. Fork the repo and create your branch from `develop`.
2. Name your branch something that is descriptive to the work you are doing. i.e. adds-new-thing or fixes-mobile
3. If you've added code that should be tested, add tests.
4. If you've changed APIs, update the documentation.
5. If you make visual changes, screenshots are required.
6. Ensure the test suite passes.
7. Make sure you address any lint warnings.
8. If you make the existing code better, please let us know in your PR description.
9. If your changes are related to i18n, please check the [i18n](./docs/docs/contribution/i18n.md) guide first.
10. A PR description and title are required.
11. [Link to an issue](https://help.github.com/en/github/writing-on-github/autolinked-references-and-urls) in the project. An issue is required to announce your intentions and discuss decisions.

### Commit Messages

This project uses [Conventional Commits](https://www.conventionalcommits.org/) to automatically generate [changelog](CHANGELOG.md).

### Work in progress

GitHub has support for draft pull requests, which will disable the merge button until the PR is marked as ready for merge.

## Issues

If you plan to contribute a change based on an open issue, please assign yourself by commenting on the following word `.take`. Issues that are not assigned are assumed open, and to avoid conflicts, please assign yourself before beginning work on any issues.

If you would like to contribute to the project for the first time, please consider checking the [docs](https://github.com/live-codes/livecodes/issues?q=is%3Aissue+is%3Aopen+label%3A%22%F0%9F%90%9B+docs%22), [bug](https://github.com/live-codes/livecodes/issues?q=is%3Aissue+is%3Aopen+label%3A%22%F0%9F%90%9B+bug%22) or [good first issue](https://github.com/live-codes/livecodes/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22) labels.

Also, all questions are [welcomed](https://github.com/live-codes/livecodes/discussions).

## Specific Topics

- [Adding Languages](./docs/docs/contribution/adding-languages.md)
- [Release](./docs/docs/contribution/release.md)
- [i18n](./docs/docs/contribution/i18n.md)

## Funding

LiveCodes is a part of GitHub Sponsors. If you would like to contribute, please note the [sponsor page](https://livecodes.io/docs/sponsor) for details.

## License

By contributing to the LiveCodes project, you agree that your contributions will be licensed under its [MIT license](LICENSE).
