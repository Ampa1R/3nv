# 3nv

tool for managing .env file

```bash
yarn add 3nv
```

## Usage

Get config from `.env` file without modifying process.env
```ts
import { init } from './lib/index.js';

const config = init();
```

Init parameters:

Name             | Default value | Possible values | Description
-----------------|---------------|-----------------|-------------
path             | '.env'        | string          | Path to .env file
modifyProcessEnv | false         | boolean         | Add env vars to process.env object
verbose          | false         | boolean         | Extended logging 
copyFromExample  | true          | boolean         | Copy .env.example content to .env file if it doesn't exists

## CLI 
The package provides command for copying your `.env` template to `.env.example` file:

```json
# package.json
{
  "scripts": {
    "dump": "3nv dump"
  }
}
```
```bash
yarn dump
```
