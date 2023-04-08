<link rel="stylesheet" href="/styles.css"/>
<title>CursedBots | Forum | Posts</title>

<?php require 'header.php';?>
<h1>Index of topics</h1>
<button onclick=location.href="/new_topic.php">New Post</button>
<ul>
<?php
$posts = json_decode(file_get_contents("topics.json"));
foreach($posts as $postname=>$n) {
  echo "<ul><br>";
  echo '<a class="buttons" href="/topic.php?topic=' . urlencode($postname) . '">' . $postname . '</a>';
  echo "</ul>";
}
?>
</ul>
