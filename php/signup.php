<link rel="stylesheet" href="/styles.css"/>
<title>CursedBots | Forum | Signup</title>

<?php
require 'header.php';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $users = json_decode(file_get_contents('users.json'), true) ?? array();
  if(array_key_exists(htmlspecialchars($_POST['username']),$users)) {
    http_response_code(409);
    echo "Username is taken";
    exit();
  }
  $users[htmlspecialchars($_POST['username'])] = password_hash($_POST['password'], PASSWORD_BCRYPT);
  file_put_contents("users.json", json_encode($users));
  echo "Signed up as user " . $_POST['username'];
}
?>
<?php if (!($_SERVER['REQUEST_METHOD'] === 'POST')): ?>
  <div class="container">
  <section id="content">
    <h3 class="text">Signup</h3>
<div class="account-form"><form id="signup-form" method="POST" action="<?php echo htmlspecialchars($_SERVER['PHP_SELF']) ?>">
  <input type="text" name="username" placeholder="Username" required/> <br>
  <input type="password" name="password" id="pwd1" placeholder="Password" required/> <br>
  <input type="password" id="pwd2" placeholder="Confirm Password" required/> <br>
  <span id="msg"></span> <br>
  <input class="submit-btn" type="submit"/> <button onclick=location.href='/login.php' class="submit-btn">Login</button>
                                              
</form></div></section></div>
<script type="text/javascript">
  var msg = document.getElementById('msg');
  document.getElementById('signup-form').onsubmit = function(e) {
    if(document.getElementById('pwd1').value !== document.getElementById('pwd2').value) {
      e.preventDefault();
      msg.style.color = 'red';
      msg.innerHTML = 'Passwords do not match';
    }
  }
</script>
<?php endif; ?>
