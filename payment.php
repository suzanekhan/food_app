<?php
session_start();

// If not logged in → go to login
if(!isset($_SESSION['user'])) {
    header("Location: login.php");
    exit();
}

// Calculate total
$total = 0;
if(!empty($_SESSION['cart'])){
    foreach($_SESSION['cart'] as $item) {
        $total += $item['price'];
    }
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>FoodCart - Payment</title>

    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap" rel="stylesheet">

    <style>
        body {
            font-family: 'Poppins', sans-serif;
            background: linear-gradient(to right, #fff0f3, #f8f9fa);
            margin: 0;
            padding: 0;
        }

        .container {
            width: 90%;
            max-width: 1000px;
            margin: 50px auto;
            display: flex;
            gap: 30px;
        }

        .box {
            background: white;
            padding: 30px;
            border-radius: 15px;
            box-shadow: 0 5px 20px rgba(0,0,0,0.08);
            flex: 1;
        }

        h2 {
            margin-top: 0;
        }

        .order-item {
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;
            font-size: 14px;
        }

        .total {
            font-size: 18px;
            font-weight: 600;
            margin-top: 20px;
            border-top: 1px solid #ddd;
            padding-top: 10px;
            display: flex;
            justify-content: space-between;
        }

        .btn {
            width: 100%;
            padding: 12px;
            background: #ef233c;
            color: white;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-size: 15px;
            transition: 0.3s;
        }

        .btn:hover {
            background: #d90429;
        }
    </style>
</head>

<body>

<div class="container">

    <!-- Order Summary -->
    <div class="box">
        <h2>Order Summary</h2>

        <?php
        if(!empty($_SESSION['cart'])) {
            foreach($_SESSION['cart'] as $item) {
                echo "<div class='order-item'>
                        <span>{$item['name']}</span>
                        <span>₹{$item['price']}</span>
                      </div>";
            }
        } else {
            echo "<p>Your cart is empty.</p>";
        }
        ?>

        <div class="total">
            <span>Total</span>
            <span>₹<?php echo $total; ?></span>
        </div>
    </div>

    <!-- Stripe Payment -->
    <div class="box">
        <h2>Payment</h2>

        <form action="create-checkout-session.php" method="POST">
            <button type="submit" class="btn">
                Pay ₹<?php echo $total; ?> with Stripe
            </button>
        </form>

    </div>

</div>

</body>
</html>