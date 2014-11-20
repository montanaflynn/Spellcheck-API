var spc = require('spellchecker');
var koa = require('koa');
var app = koa();

var portNumber = process.argv[2] || 8080

app.use(function *(next){
  this.response.type = 'json';
  this.res.setHeader('x-powered-by', "Blood, Sweat and Magic")
  if (!this.request.query.text){
    var errorMsg = {error: "Missing 'text' query parameter"};
    this.body = JSON.stringify(errorMsg);
  } else {
    var responseMsg = getSpellingSuggestions(this.request.query.text);
    this.body = JSON.stringify(responseMsg, null, 2);
  }
  
}).listen(portNumber)

// So hacky... must refactor
function getSpellingSuggestions(str) {
  var words = str.split(' ');
  var output = {}, suggestion = [], corrections = {};
  output.original = str;
  for (var i = 0; i < words.length; i++) {
    word = words[i];
    if (getEnding(word)){
      word = word.slice(0,-1)
    }
    if (spc.isMisspelled(word)) {
      var correctSpelling = spc.getCorrectionsForMisspelling(word);
      if (i === words.length -1 && getEnding(str))
        correctSpelling[0] += "."
      suggestion.push(correctSpelling.length ? correctSpelling[0] : word);
      corrections[word] = correctSpelling;
    }
  }

  if (suggestion.length){
    output.suggestion = suggestion.join(' ');
    output.corrections = corrections;
  } else {
    output.suggestion = false;
  }

  return output;
}

function getEnding(str) {
  var lastChar = str.slice(-1);
  if (!lastChar.match(/^[0-9a-z]+$/)) {
    return lastChar;
  } else {
    return false;
  }
}

function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}
