<?php
session_start();

// Redirect if not logged in
if(!isset($_SESSION['user'])) {
    header("Location: login.php");
    exit();
}

include 'db.php';

// Handle search query
$search = "";
if(isset($_GET['search'])) {
    $search = mysqli_real_escape_string($conn, $_GET['search']);
    $query = "SELECT * FROM menu_items WHERE name LIKE '%$search%' OR description LIKE '%$search%'";
} else {
    $query = "SELECT * FROM menu_items";
}

$result = mysqli_query($conn, $query);

// Handle add/increase/decrease from menu
if($_SERVER['REQUEST_METHOD'] === 'POST'){
    $id = $_POST['item_id'];
    $name = $_POST['item_name'];
    $price = $_POST['item_price'];

    if(!isset($_SESSION['cart'])) $_SESSION['cart'] = [];

    $found = false;
    foreach($_SESSION['cart'] as &$item){
        if($item['id'] == $id){
            if(isset($_POST['increase'])) $item['quantity'] += 1;
            if(isset($_POST['decrease'])){
                $item['quantity'] -= 1;
                if($item['quantity'] <= 0){
                    unset($item);
                    $_SESSION['cart'] = array_values($_SESSION['cart']);
                }
            }
            $found = true;
            break;
        }
    }

    if(!$found && isset($_POST['increase'])){
        $_SESSION['cart'][] = [
            'id'=>$id,
            'name'=>$name,
            'price'=>$price,
            'quantity'=>1
        ];
    }

    $_SESSION['toast'] = "Item added to cart!";
    header("Location: menu.php");
    exit();
}

// Cart count for floating button
$cart_count = isset($_SESSION['cart']) ? array_sum(array_column($_SESSION['cart'], 'quantity')) : 0;
?>

<!DOCTYPE html>
<html>
<head>
    <title>FoodCart - Menu</title>
    <style>
        body { font-family:'Poppins',sans-serif; background:#f4f6f8; margin:0; padding:0; }
        h2 { text-align:center; padding:30px 0 10px 0; font-size:32px; color:#222; }

        /* Search Bar */
        .search-bar { text-align:center; margin-bottom:30px; }
        .search-bar input[type="text"] { width:300px; padding:10px 15px; border-radius:8px; border:1px solid #ccc; font-size:16px; }
        .search-bar button { padding:10px 18px; background:#ef233c; color:white; border:none; border-radius:8px; font-size:16px; cursor:pointer; margin-left:5px; transition:0.2s; }
        .search-bar button:hover { background:#d90429; transform: translateY(-2px); }
        .search-bar button:active { transform: scale(0.95); }

        /* Menu Cards */
        .menu-container { width:90%; margin:auto; display:grid; grid-template-columns:repeat(auto-fit,minmax(250px,1fr)); gap:25px; padding-bottom:80px; }
        .card { background:white; border-radius:15px; overflow:hidden; box-shadow:0 4px 15px rgba(0,0,0,0.05); transition:0.3s ease; position:relative; }
        .card:hover { transform: translateY(-5px); box-shadow:0 8px 20px rgba(0,0,0,0.08); }
        .card img { width:100%; height:180px; object-fit:cover; }
        .card-content { padding:15px; display:flex; flex-direction:column; gap:10px; }
        .card-content h3 { margin:0; font-size:20px; }
        .card-content p { color:#555; font-size:14px; margin:0; }
        .price { font-size:18px; font-weight:500; color:#333; }

        /* Add to Cart Button / Quantity container */
        .action-container { height:45px; display:flex; align-items:center; justify-content:center; }
        .btn { display:inline-block; padding:8px 16px; background:#ef233c; color:white; text-decoration:none; border-radius:5px; font-size:14px; cursor:pointer; transition:all 0.15s ease; height:35px; min-width:100px; display:flex; align-items:center; justify-content:center; }
        .btn:hover { background:#d90429; transform: translateY(-2px); }
        .btn:active { transform: scale(0.95); }

        /* Quantity Controls */
        .quantity-controls { display:flex; align-items:center; justify-content:center; gap:5px; background:#f2f2f2; border-radius:5px; height:35px; min-width:100px; }
        .quantity-controls button { width:30px; height:30px; border:none; border-radius:4px; background:#ddd; cursor:pointer; font-weight:bold; transition:0.15s; }
        .quantity-controls button:hover { background:#ccc; }
        .quantity-controls span { min-width:25px; text-align:center; font-weight:bold; display:inline-block; }

        /* Floating Go to Cart Button */
        .go-cart { position:fixed; bottom:20px; right:20px; z-index:999; }
        .go-cart .btn { padding:12px 35px; font-size:16px; border-radius:8px; position:relative; }
        .go-cart .count { background:red; color:white; border-radius:50%; padding:2px 6px; font-size:12px; position:absolute; top:-8px; right:-8px; }

        /* Toast */
        #toast {
            visibility:hidden;
            min-width:180px;
            background-color:#333;
            color:white;
            text-align:center;
            padding:10px;
            border-radius:5px;
            position:fixed;
            bottom:70px;
            right:20px;
            z-index:1000;
            font-size:14px;
        }
        #toast.show { visibility:visible; animation: fadein 0.3s, fadeout 0.5s 1.5s; }
        @keyframes fadein { from{bottom:50px;opacity:0;} to{bottom:70px;opacity:1;} }
        @keyframes fadeout { from{bottom:70px;opacity:1;} to{bottom:90px;opacity:0;} }
    </style>
</head>
<body>

<h2>Today's Menu</h2>

<div class="search-bar">
    <form method="GET" action="">
        <input type="text" name="search" placeholder="Search for dishes..." value="<?php echo htmlspecialchars($search); ?>">
        <button type="submit">Search</button>
    </form>
</div>

<div class="menu-container">
<?php if(mysqli_num_rows($result) > 0): ?>
    <?php while($row = mysqli_fetch_assoc($result)): ?>
        <div class="card">
            <img src="images/<?php echo $row['image']; ?>" alt="<?php echo $row['name']; ?>">
            <div class="card-content">
                <h3><?php echo $row['name']; ?></h3>
                <p><?php echo $row['description']; ?></p>
                <div class="price">₹<?php echo $row['price']; ?></div>

                <?php
                $qty = 0;
                if(isset($_SESSION['cart'])){
                    foreach($_SESSION['cart'] as $item){
                        if($item['id'] == $row['id']){
                            $qty = $item['quantity'];
                            break;
                        }
                    }
                }
                ?>

                <div class="action-container">
                    <?php if($qty == 0): ?>
                        <form method="post">
                            <input type="hidden" name="item_id" value="<?php echo $row['id']; ?>">
                            <input type="hidden" name="item_name" value="<?php echo $row['name']; ?>">
                            <input type="hidden" name="item_price" value="<?php echo $row['price']; ?>">
                            <button type="submit" name="increase" class="btn" onclick="showToast()">Add to Cart</button>
                        </form>
                    <?php else: ?>
                        <form method="post" class="quantity-controls">
                            <input type="hidden" name="item_id" value="<?php echo $row['id']; ?>">
                            <input type="hidden" name="item_name" value="<?php echo $row['name']; ?>">
                            <input type="hidden" name="item_price" value="<?php echo $row['price']; ?>">
                            <button type="submit" name="decrease" onclick="showToast()">-</button>
                            <span><?php echo $qty; ?></span>
                            <button type="submit" name="increase" onclick="showToast()">+</button>
                        </form>
                    <?php endif; ?>
                </div>
            </div>
        </div>
    <?php endwhile; ?>
<?php else: ?>
    <p style="text-align:center; font-size:18px; color:#555;">No items found matching your search.</p>
<?php endif; ?>
</div>

<!-- Floating Go to Cart Button -->
<div class="go-cart">
    <a href="cart.php" class="btn">
        Go to Cart
        <?php if($cart_count > 0): ?>
            <span class="count"><?php echo $cart_count; ?></span>
        <?php endif; ?>
    </a>
</div>

<!-- Toast Notification -->
<div id="toast"></div>

<script>
function showToast() {
    const toast = document.getElementById('toast');
    toast.innerText = "Item added to cart!";
    toast.className = 'show';
    setTimeout(()=>{ toast.className = toast.className.replace('show',''); }, 2000);
}

<?php if(isset($_SESSION['toast'])): ?>
    showToast();
    <?php unset($_SESSION['toast']); ?>
<?php endif; ?>
</script>

</body>
</html>