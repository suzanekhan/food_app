<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>FoodCart - Fresh Food Delivered</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!-- Google Font -->
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap" rel="stylesheet">

    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Poppins', sans-serif;
        }

        body {
            background: #fffaf4;
            color: #333;
        }

        /* Navbar */
        nav {
            background: #2b2d42;
            padding: 18px 60px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        nav h1 {
            color: #ffffff;
            font-size: 30px;
            font-weight: 700;
            letter-spacing: 1px;
        }

        nav ul {
            list-style: none;
            display: flex;
            gap: 30px;
        }

        nav ul li a {
            text-decoration: none;
            color: #ffffff;
            font-weight: 500;
            font-size: 16px;
        }

        nav ul li a:hover {
            color: #ffd60a;
        }

        /* Hero Section */
        .hero {
            height: 85vh;
            background: linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.5)),
                        url('https://images.unsplash.com/photo-1504674900247-0877df9cc836');
            background-size: cover;
            background-position: center;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
            color: #fff;
            padding: 20px;
        }

        .hero h2 {
            font-size: 56px;
            font-weight: 700;
            margin-bottom: 15px;
        }

        .hero p {
            font-size: 22px;
            font-weight: 300;
            margin-bottom: 30px;
        }

        .search-box {
            display: flex;
            width: 55%;
            max-width: 650px;
        }

        .search-box input {
            flex: 1;
            padding: 14px;
            border: none;
            outline: none;
            font-size: 16px;
            border-radius: 8px 0 0 8px;
        }

        .search-box button {
            padding: 14px 25px;
            border: none;
            background: #ef233c;
            color: #fff;
            font-weight: 600;
            cursor: pointer;
            border-radius: 0 8px 8px 0;
        }

        .search-box button:hover {
            background: #d90429;
        }

        /* Popular Section */
        .popular {
            padding: 70px 40px;
            text-align: center;
            background: #edf2f4;
        }

        .popular h2 {
            font-size: 38px;
            margin-bottom: 40px;
            color: #2b2d42;
        }

        .restaurant-container {
            display: flex;
            justify-content: center;
            gap: 35px;
            flex-wrap: wrap;
        }

        .restaurant-card {
            background: #ffffff;
            width: 270px;
            border-radius: 15px;
            overflow: hidden;
            box-shadow: 0 8px 20px rgba(0,0,0,0.08);
            transition: 0.4s;
        }

        .restaurant-card:hover {
            transform: scale(1.05);
        }

        .restaurant-card img {
            width: 100%;
            height: 190px;
            object-fit: cover;
        }

        .restaurant-card h3 {
            padding: 18px;
            font-size: 20px;
            color: #ef233c;
        }

        /* How It Works */
        .how-it-works {
            padding: 70px 40px;
            text-align: center;
            background: #fffaf4;
        }

        .how-it-works h2 {
            font-size: 36px;
            margin-bottom: 35px;
            color: #2b2d42;
        }

        .steps {
            display: flex;
            justify-content: center;
            gap: 50px;
            flex-wrap: wrap;
        }

        .step {
            width: 220px;
        }

        .step h4 {
            font-size: 22px;
            margin-bottom: 10px;
            color: #ef233c;
        }

        .step p {
            font-size: 16px;
            color: #555;
        }

        /* Footer */
        footer {
            background: #2b2d42;
            color: #ffffff;
            padding: 25px;
            text-align: center;
            font-size: 14px;
        }

        @media(max-width: 768px) {
            .search-box {
                width: 85%;
            }

            nav {
                flex-direction: column;
                gap: 12px;
            }

            .hero h2 {
                font-size: 40px;
            }

            .hero p {
                font-size: 18px;
            }
        }

    </style>
</head>

<body>

    <!-- Navbar -->
    <nav>
        <h1>FoodCart</h1>
        <ul>
            <li><a href="index.php">Home</a></li>
            <li><a href="login.php">login</a></li>
            <li><a href="menu.php">menu</a></li>
            <li><a href="cart.php">cart</a></li>
        </ul>
    </nav>

    <!-- Hero Section -->
    <section class="hero">
    <h2>Delicious Food Delivered</h2>
    <p>Order from top-rated restaurants near you</p>

    <form class="search-box" action="login.php" method="get">
        <input type="text" placeholder="Enter your location...">
        <button type="submit">Order Now</button>
    </form>
    </section>

    <!-- Popular Restaurants -->
    <section class="popular">
        <h2>Popular Choices</h2>

        <div class="restaurant-container">
            <div class="restaurant-card">
                <img src="https://images.unsplash.com/photo-1551782450-a2132b4ba21d" alt="Burger">
                <h3>Burger House</h3>
            </div>

            <div class="restaurant-card">
                <img src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c" alt="Healthy Food">
                <h3>Salad Bowl</h3>
            </div>

            <div class="restaurant-card">
                <img src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092" alt="Indian Food">
                <h3>Spice Junction</h3>
            </div>
        </div>
    </section>

    <!-- How It Works -->
    <section class="how-it-works">
        <h2>How It Works</h2>

        <div class="steps">
            <div class="step">
                <h4>Browse</h4>
                <p>Explore food items & cuisines</p>
            </div>

            <div class="step">
                <h4>Checkout</h4>
                <p>Add items & confirm your order</p>
            </div>

            <div class="step">
                <h4>Delivery</h4>
                <p>Fast & secure delivery to your door</p>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer>
        © 2026 FoodCart | Made with ❤️ for food lovers
    </footer>

</body>
</html>