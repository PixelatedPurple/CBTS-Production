<link rel="stylesheet" href="/styles.css"/>
<title>CursedBots | Forum</title>
<?php
session_start();
require 'header.php';
if($_SERVER['REQUEST_METHOD'] === 'POST') {
  if($_SESSION['LOGGED_IN']) {
    $posts = json_decode(file_get_contents("topics.json"), true);
		if (array_key_exists($_POST['topic-name'], $posts)) {
			http_response_code(409);
			echo "Topic with the same name already exists.";
			exit();
		}
    $posts[htmlspecialchars($_POST['topic-name'])] = array(array('author' => $_SESSION['user'],'content' => str_replace("\n","<br>",htmlspecialchars($_POST['content']))));
    file_put_contents("topics.json", json_encode($posts));
    header("Location: /topic.php?topic=" . urlencode(htmlspecialchars($_POST['topic-name'])));
    exit();
  } else {
    http_response_code(401);
    echo "You need to be logged in to post";
  }
}
?>
<?php if(!($_SERVER['REQUEST_METHOD'] === 'POST') && $_SESSION['LOGGED_IN']): ?>
  <div class="container">
  <section id="content">
    <h3 class="text">Make a Post</h3>
<form id="post-form" method="POST" action="<?php echo htmlspecialchars($_SERVER['PHP_SELF']); ?>">
  <input class="post-name" type="text" name="topic-name" placeholder="Topic Name"/> <br>
  <textarea class="post-content" form="post-form" name="content" placeholder="Topic Content"></textarea> <br>
  <input type="submit"  class="submit-btn" />
</form></section></div>
<?php else: ?>
<?php http_response_code(401); ?>
<p>You must login to post<button onclick=location.href="/login.php">Login</button></p>
<?php endif; ?>
