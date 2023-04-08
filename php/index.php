<html><link rel="stylesheet" href="/styles.css"/>
<title>CursedBots | Forum</title></html>
<body class="main">
<?php
session_start();
require 'header.php';

echo "<h1>CursedBots Forums<h1><p class='welcome'>CursedBots Forums, Where tough questions get answered. Ask away!</p>";
?>
 <br>
<?php if (isset($_SESSION['LOGGED_IN'])): ?> 
<div class="landing"><br><br>
  <button onclick=location.href="/new_topic.php" class="account-btn">New Post</button>
  <br><br><button onclick=location.href="/topics_index.php" class="account-btn">Index</button><br>
<p class="copy">&copy CursedBots 2023</p>
</div>
<?php else: ?>
<div class="landing"><br><br>
  <button onclick=location.href="/topics_index.php" class="account-btn">Index</button><br>
  <button onclick=location.href="/login.php" class="account-btn">Login</button>
  <br>
<button onclick=location.href="/signup.php" class="account-btn">Signup</button>
  <br>
<button onclick=location.href="https://s.cursedbots.xyz/forum.html" class="account-btn hidden">Support</button><br>
 <p class="copy">&copy CursedBots 2023</p>
</div>
  
<?php endif ?></body>
