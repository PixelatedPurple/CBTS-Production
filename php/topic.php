<link rel="stylesheet" href="/styles.css"/>
<title>CursedBots | Forum</title>
<?php
session_start();
require 'header.php';
$posts = json_decode(file_get_contents("topics.json"), true);
if(!array_key_exists($_GET['topic'], $posts)) {
  http_response_code(404);
  echo "<br>No topic exists with that object ID";
  exit();
} else {
  if($_SESSION['user'] === $posts[$_GET['topic']][0]['author']) {
    echo '<form method="POST" action="/delete_topic.php"><input type="hidden" name="topic" value="' . $_GET['topic'] . '"/><input type="submit" value="Delete"/></form>';
  }
  foreach($posts[$_GET['topic']] as $index => $post) {
    echo '<div class=posts>' . '<h4>' . $post['author'] . ':</h4>' . $post['content'] . '</div><hr class="divider">';
    if($index !== count($posts[$_GET['topic']]) - 1) {
      echo "";
    }
  }
}
?>
<?php if($_SESSION['LOGGED_IN']): ?>
<br> <br> <a class="buttons" href="<?php echo '/reply.php?topic=' . $_GET['topic'] ?>">Reply</a>
<?php else: ?>
<p>You must login to reply<button onclick=location.href="/login.php">Login</button></p>
<?php endif ?>

