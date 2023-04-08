


<link rel="stylesheet" href="/styles.css"/>
<title>CursedBots | Forum</title>
<?php
session_start();
require 'header.php';
if(isset($_SESSION['LOGGED_IN'])) {
  if($_POST['topic'] ?? null) {
    $topics = json_decode(file_get_contents("topics.json"),true);
    if(!array_key_exists($_POST['topic'], $topics)) {
      http_response_code(400);
      echo "That topic does not exist.<br><button onclick=location.href='/topics_index.php'>Back</button>";
    } else if($topics[$_POST['topic']][0]['author'] !== $_SESSION['user']) {
      http_response_code(401);
      echo "Only the author of this topic can delete it<br><button onclick=location.href='/topics_index.php'>Back</button>";
    } else {
      unset($topics[$_POST['topic']]);
      file_put_contents("topics.json",json_encode($topics));
      echo "Topic deleted.<br><button onclick=location.href='/topics_index.php'>Back</button>";
    }
  } else {
    echo "Please specify a topic to delete.<br><button onclick=location.href='/topics_index.php'>Back</button>";
  }
} else {
  echo "Please sign in.<br><button onclick=location.href='/login.php'>Login</button>";
}
?>
