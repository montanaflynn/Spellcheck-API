# Spellcheck API

[HTTP spellcheck API](https://www.mashape.com/montanaflynn/spellcheck) based off hunspell. 

__The API server needs node version 0.11.0 or higher and to be ran with the `--harmony` flag.__ 

### Install

```sh
git clone git@github.com:montanaflynn/Spellcheck-API.git
npm install
```

### Usage

node --harmony ./server.js [port]

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

### Responses

If there is no `text` querystring parameter return error message:

```json
{"error":"Missing 'text' query parameter"}
```

If there are no mistakes return false for suggestion.

```json
{
  "original": "the words are fine.",
  "suggestion": false
}
```

If there are mistakes but no suggestions return null for suggestion and corrections.

```json
{
  "original": "dfdgdfg is gfdgdfsg.",
  "suggestion": null,
  "corrections": {
    "dfdgdfg": null,
    "gfdgdfsg": null
  }
}
```

If there are mistakes and suggestions return an array for each correction and replace the word in the `suggestion` string.

```json
{
  "original": "thefdeee123 is theedffdfde is baddd.",
  "suggestion": "thefdeee123 is theedffdfde is bad.",
  "corrections": {
    "thefdeee123": null,
    "theedffdfde": null,
    "baddd": [
      "bad",
      "addd",
      "bddd",
      "badd"
    ]
  }
}
```

### FAQ

Didn't this use to be a PHP project?

Yes indeed, however the PHP version is no longer supported. The [source code](https://github.com/montanaflynn/Spellcheck-API/tree/5503d6ee77e5fdccae1d2fc418c98236080f58a8) is still available.

### Contributing

Forks and pull requests are most welcomed.

### License

The MIT License ([MIT](https://gist.githubusercontent.com/montanaflynn/4ce7e31acb71bf9526bc/raw/e4d28fca74188244911ba6befc7a7c039be2ddbd/2014))

Copyright 2014, Montana Flynn (http://anonfunction.com/)
