<?php
session_start();

if(!isset($_SESSION['user'])){
    header("Location: login.php");
    exit();
}

// Initialize cart if it doesn't exist
if(!isset($_SESSION['cart'])){
    $_SESSION['cart'] = [];
}

// Handle increase, decrease, remove
if($_SERVER['REQUEST_METHOD'] === 'POST'){
    $id = $_POST['item_id'];

    foreach($_SESSION['cart'] as $index => &$item){
        if($item['id'] == $id){
            if(isset($_POST['increase'])) $item['quantity'] += 1;
            if(isset($_POST['decrease'])){
                $item['quantity'] -= 1;
                if($item['quantity'] <= 0){
                    unset($_SESSION['cart'][$index]);
                    $_SESSION['cart'] = array_values($_SESSION['cart']);
                }
            }
            if(isset($_POST['remove'])){
                unset($_SESSION['cart'][$index]);
                $_SESSION['cart'] = array_values($_SESSION['cart']);
            }
            break;
        }
    }
    header("Location: cart.php");
    exit();
}

// Map item names to images
$item_images = [
    "Cheese Burger" => "cheese.jpg",
    "Mango Shake" => "mango.jpg",
    "Cold Coffee" => "coffee.jpg",
    "Farmhouse Pizza" => "farmhouse.jpg",
    "Margherita Pizza" => "pizza.jpg",
    "French Fries" => "fries.jpg",
    "Nuggets" => "nuggets.jpg",
    "Garlic Bread" => "garlic.jpg",
    "Veg Burger" => "burger.jpg",
    "Chicken Burger" => "chicken.jpg",
    "Cheese Burst Pizza" => "burst.jpg",
    "Pepsi" => "pepsi.jpg"
];

// Calculate subtotal
$total = 0;
foreach($_SESSION['cart'] as $item){
    $total += $item['price'] * $item['quantity'];
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>FoodCart - Cart</title>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap" rel="stylesheet">
    <style>
        body{font-family:'Poppins',sans-serif;background:#f8f9fa;margin:0;padding:0;}
        .container{display:flex; max-width:1200px; margin:40px auto; gap:20px;}
        .left{flex:0 0 70%; display:flex; flex-direction:column; gap:15px;}
        .right{flex:0 0 30%; position:sticky; top:20px; background:white; padding:20px; border-radius:10px; box-shadow:0 5px 20px rgba(0,0,0,0.08);}
        h2{margin-top:0;}
        .cart-item{display:flex; align-items:center; gap:15px; background:white; padding:15px; border-radius:10px; box-shadow:0 3px 10px rgba(0,0,0,0.05);}
        .cart-item img{width:50px; height:50px; object-fit:cover; border-radius:8px;}
        .item-details{flex:1; display:flex; flex-direction:column; gap:5px;}
        .item-header{display:flex; justify-content:space-between; align-items:center;}
        .item-name{font-weight:500; font-size:16px;}
        .item-price{font-weight:600; color:#333;}
        .quantity-controls{display:flex; align-items:center; gap:5px;}
        .quantity-controls button{width:28px; height:28px; border:none; border-radius:5px; background:#ddd; cursor:pointer; font-weight:bold;}
        .quantity-controls button:hover{background:#ccc;}
        .quantity-controls span{min-width:25px; text-align:center; font-weight:bold; display:inline-block;}
        .remove-btn{background:none;border:none;font-size:18px;cursor:pointer;color:#888;opacity:0.7;transition:0.2s;}
        .remove-btn:hover{color:#ef233c; opacity:1;}
        .summary h3{margin-top:0;}
        .summary p{font-size:16px; margin:8px 0;}
        .summary .total{font-weight:600; font-size:18px; color:#222;}
        .summary .btn{display:block;text-align:center;padding:12px 20px;background:#ef233c;color:white;border:none;border-radius:6px;font-size:16px;text-decoration:none;cursor:pointer; margin-top:15px;}
        .summary .btn:hover{background:#d90429;}
        @media(max-width:900px){.container{flex-direction:column;}.right{position:static;}}
    </style>
</head>
<body>

<div class="container">
    <div class="left">
        <h2>Your Cart</h2>
        <?php if(!empty($_SESSION['cart'])): ?>
            <?php foreach($_SESSION['cart'] as $item): ?>
                <div class="cart-item">
                    <img src="images/<?php echo $item_images[$item['name']] ?? 'placeholder.png'; ?>" alt="<?php echo $item['name']; ?>">
                    <div class="item-details">
                        <div class="item-header">
                            <span class="item-name"><?php echo $item['name']; ?></span>
                            <form method="post" style="display:inline;">
                                <input type="hidden" name="item_id" value="<?php echo $item['id']; ?>">
                                <button type="submit" name="remove" class="remove-btn">🗑️</button>
                            </form>
                        </div>
                        <span class="item-price">₹<?php echo $item['price']; ?></span>
                        <form method="post" class="quantity-controls">
                            <input type="hidden" name="item_id" value="<?php echo $item['id']; ?>">
                            <button type="submit" name="decrease">-</button>
                            <span><?php echo $item['quantity']; ?></span>
                            <button type="submit" name="increase">+</button>
                        </form>
                    </div>
                </div>
            <?php endforeach; ?>
        <?php else: ?>
            <p>Your cart is empty 🛒</p>
        <?php endif; ?>
    </div>

    <div class="right summary">
        <h3>Order Summary</h3>
        <p>Subtotal: ₹<?php echo $total; ?></p>
        <?php $tax = round($total*0.05,2); ?>
        <p>Tax (5%): ₹<?php echo $tax; ?></p>
        <?php $delivery = 50; ?>
        <p>Delivery Fee: ₹<?php echo $delivery; ?></p>
        <p class="total">Total: ₹<?php echo $total+$tax+$delivery; ?></p>
        <a href="payment.php" class="btn">Proceed to Payment</a>
    </div>
</div>

</body>
</html>