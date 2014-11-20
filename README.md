# Spellcheck API

A [HTTP spellcheck API](https://www.mashape.com/montanaflynn/spellcheck) based off hunspell written Node.js. Because the API uses Koa it needs at least node > v.11.* and ran with the --harmony flag. It's better this way.

**PHP version no longer supported but still available before this commit: https://github.com/montanaflynn/Spellcheck-API/tree/5503d6ee77e5fdccae1d2fc418c98236080f58a8**

### Install

```sh
git clone git@github.com:montanaflynn/Spellcheck-API.git
npm install
```

### Usage

node ./server.js [port]

Default port is `8080`.

### Example

```sh
node --harmony server 1337 &
curl "localhost:1337?text=wrng"
```

```json
{
  "original": "wrng",
  "suggestion": "wrong",
  "corrections": {
    "wrng": [
      "wrong",
      "wing",
      "wring",
      "wrung"
    ]
  }
}
```

### Contributing

Forks and pull requests are most welcomed.

### License

The MIT License ([MIT](https://gist.githubusercontent.com/montanaflynn/4ce7e31acb71bf9526bc/raw/e4d28fca74188244911ba6befc7a7c039be2ddbd/2014))

Copyright 2014, Montana Flynn (http://anonfunction.com/)
