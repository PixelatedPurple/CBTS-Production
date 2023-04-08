<link rel="stylesheet" href="/styles.css"/>
<title>CursedBots | Forum | Login</title>
<?php
session_start();
require 'header2.php';
$data = json_decode(file_get_contents("users.json"),true);
if(!isset($_SESSION['LOGGED_IN']) && $_SERVER['REQUEST_METHOD'] === 'POST') {
  if(password_verify($_POST['password'], $data[htmlspecialchars($_POST['username'])])) {
    $_SESSION['LOGGED_IN'] = true;
    $_SESSION['user'] = $_POST['username'];
    echo "<br>Signed in as " . $_SESSION['user'];
    echo '<br><button onclick="' . "location.href='/index.php'" . '">Home</button>';
    exit();
  } else {
    http_response_code(401);
    echo "Signin failed";
    exit();
  }
} 
if(isset($_SESSION['LOGGED_IN'])) {
  echo "You are already signed in as " . $_SESSION['user'] . "<br>";
  echo '<button onclick="' . "location.href='/signout.php'" . '">Log Out</button>';
  exit();
}
?>
<?php if (!isset($_SESSION['LOGGED_IN'])): ?>
<div class="container">
  <section id="content">
    <h3 class="text">Login</h3>
    <form id="login-form" method="POST" action="<?php echo htmlspecialchars($_SERVER['PHP_SELF']) ?>">
  <div class="form-i"><input type="text" name="username" placeholder="Username" autocomplete="off" required/><br>
  <input type="password" name="password" placeholder="Password" required/></div> <br>
  <input class="submit-btn" type="submit"/> <button onclick=location.href='/signup.php' class="submit-btn">Signup</button>
</form>
  </section></div>
<?php endif ?>
