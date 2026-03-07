<?php
session_start();

// Clear cart after successful payment
if(isset($_SESSION['cart'])){
    unset($_SESSION['cart']);
}
?>

<!DOCTYPE html>
<html>
<head>
<title>Payment Successful</title>

<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap" rel="stylesheet">

<style>
body{
    font-family:'Poppins',sans-serif;
    background:#f8f9fa;
    display:flex;
    justify-content:center;
    align-items:center;
    height:100vh;
    margin:0;
}

.box{
    background:white;
    padding:50px;
    border-radius:12px;
    text-align:center;
    box-shadow:0 10px 30px rgba(0,0,0,0.1);
    max-width:400px;
}

h1{
    color:#2ecc71;
    margin-bottom:10px;
}

p{
    color:#555;
}

a{
    display:inline-block;
    margin-top:25px;
    padding:12px 22px;
    background:#ef233c;
    color:white;
    text-decoration:none;
    border-radius:8px;
    font-weight:500;
    transition:0.3s;
}

a:hover{
    background:#d90429;
}
</style>

</head>

<body>

<div class="box">

<h1>Payment Successful 🎉</h1>
<p>Your order has been placed successfully!</p>
<p>Thank you for ordering from <b>FoodCart</b> 🍔</p>

<a href="menu.php">Order More Food</a>

</div>

</body>
</html>