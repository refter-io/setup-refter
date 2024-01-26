# setup-refter

[![Continuous Integration](https://github.com/refter-io/setup-refter/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/refter-io/setup-refter/actions/workflows/ci.yml)

This action sets up the [refter-cli](https://refter.io) for use in Github Actions. You can specify what version you want to install, the action will fail if no matching versions are found.

This action supports versions of:

- Python `>=3.7`
- refter-cli `>=0.1.3`

## Changelog

### v1.0.1

- Require `refter-cli>=0.1.3`

### v1.0.0

- Initial release

## Usage

### Install the latest `refter-cli` in your workflow

```yaml
steps:
  - uses: actions/checkout@v3
  - uses: actions/setup-python@v4
    with:
      python-version: "3.11"
  - uses: refter-io/setup-refter@v1.0.1
  - run: refter --help
```

### Install a specific version, using SemVer's version syntax

```yaml
steps:
  - uses: actions/checkout@v3
  - uses: actions/setup-python@v4
    with:
      python-version: "3.11"
  - uses: refter-io/setup-refter@v1.0.1
    with:
      version: "0.1.3"
  - run: refter --help
```

### End to end example

The below example will setup dbt, create the dbt manifest and deploy the manifest to [refter](https://refter.io) when code is merged into the `main` branch.

```yaml
name: Deploy to refter

on:
  push:
    branches:
      - main

jobs:
  action:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout the code
        uses: actions/checkout@v3

      - name: Setup python
        uses: actions/setup-python@v4
        with:
          python-version: "3.11"

      - name: Install dbt dependencies
        uses: mwhitaker/dbt-action@master
        with:
          dbt_command: "dbt deps"
        env:
          DBT_BIGQUERY_TOKEN: ${{ secrets.DBT_BIGQUERY_TOKEN }}

      - name: Create dbt manifest
        uses: mwhitaker/dbt-action@master
        with:
          dbt_command: "dbt ls --profiles-dir ."
        env:
          DBT_BIGQUERY_TOKEN: ${{ secrets.DBT_BIGQUERY_TOKEN }}

      - name: Setup refter-cli
        uses: refter-io/setup-refter@v1.0.0

      - name: Deploy to refter
        run: refter deploy -t ${{ secrets.REFTER_TOKEN }}
        env:
          CI_COMMIT: ${{ github.sha }}
          CI_BRANCH: ${{ github.ref }}
```

## Contributing

Feel free to submit any PR you want, they are always welcome.

## License

`setup-refter` is licensed under the MIT license. See the license file for details.
