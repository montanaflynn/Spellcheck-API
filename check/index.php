<?php

// Could you tell I have WordPress background?
// This will probably be changed in the very near future

function spell_word($word) 
{
  // The real magic provided by aspell / pspell
  // http://php.net/manual/en/book.pspell.php
  global $pspell;
  
  $word = $word[0];

  // ACROYNMS / UPPERCASE
  if (preg_match('/^[A-Z]*$/',$word))
  {
    return $word;
  } 

  if (pspell_check($pspell,$word)) 
  {
    return $word;
  }

  if ($suggestions = pspell_suggest($pspell,$word)) 
  {
    return current($suggestions);
  }

  return $word;
}

function spell_check($string) 
{
  return preg_replace_callback('/\b\w+\b/','spell_word',$string);
}

// Finally let's begin the show

$pspell = pspell_new('en','american','','utf-8',PSPELL_NORMAL);

$text = (string) $_GET['text'];

if ($text) 
{
  echo spell_check($text);
  die();
}
else {
  echo "Please provide text parameter.";
}


?>