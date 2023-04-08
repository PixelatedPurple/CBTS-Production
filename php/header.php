<link rel="stylesheet" href="/styles.css"/>
<?php
session_start();
if($_SESSION['LOGGED_IN']) {
  echo "<a href='index.php'><img src='/static/header.png' alt='CursedBots | Forums' class='fheader'></a><br><div class='profile'>Welcome - " . $_SESSION['user'] . "            <button onclick=location.href='/signout.php'>Logout</button></div>";
} else {
  echo "<a href='index.php'><img src='/static/header.png' alt='CursedBots | Forums' class='fheader'></a><br><button onclick=location.href='/login.php'>Please Login</button>";
}
?>

<style>
  .fheader {
    width: 150px;
    height: 50px;
  }
</style>
