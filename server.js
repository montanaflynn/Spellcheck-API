var spc = require('spellchecker');
var koa = require('koa');
var app = koa();

var portNumber = process.argv[2] || 8080

app.use(function *(next){
  this.response.type = 'json';
  if (!this.request.query.text){
    var errorMsg = {error: "Missing 'text' query parameter"};
    this.body = JSON.stringify(errorMsg);
  } else {
    var responseMsg = getSpellingSuggestions(this.request.query.text);
    this.body = JSON.stringify(responseMsg, null, 2);
  }
  
}).listen(portNumber)

function getSpellingSuggestions(str) {
  var misspellings = false, output = {}, suggestion = [], corrections = {};
  output.original = str;

  var words = str.split(' ');
  var lastChar = getEnding(words[words.length - 1])

  var word, noPunctuation, correctSpelling, hasMistakes;
  for (var i = 0; i < words.length; i++) {

    word = words[i];
    noPunctuation = word.replace(/\W/g, '');

    if (getEnding(word)){
      word = word.slice(0,-1)
    }

    if (spc.isMisspelled(word)) {
      hasMistakes = true;
      correctSpelling = spc.getCorrectionsForMisspelling(word);
      if (correctSpelling.length) {
        corrections[word] = correctSpelling;
      } else {
        corrections[word] = null;
      }
    }
  }

  for (correction in corrections) {
    if (correction && corrections[correction]) {
      var regex = new RegExp(correction, 'g');
      str = str.replace(regex, corrections[correction][0]);
    }
  }

  if (hasMistakes){
    output.corrections = corrections;
    output.suggestion = str
  } else {
    output.corrections = false;
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
