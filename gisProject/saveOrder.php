<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "gis";

// for making connection
$conn = new mysqli($servername, $username, $password, $dbname);

// checking the connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

// retrieve data form script.js post method
$province = $_POST['province'];
$timestamp = date("Y-m-d H:i:s");
$nama = $_POST['nama'];
$phone = $_POST['phone'];
$product = $_POST['product'];
$startLocation = $_POST['start'];
$endLocation = $_POST['end'];
$distance = $_POST['distance'];
$duration = $_POST['duration'];
$price = $_POST['price'];


// Query
$sql = "INSERT INTO orders (nama, phone, product, start_location, end_location, distance, duration, price, province ,timestamp)
VALUES ('$nama', '$phone', '$product', '$startLocation', '$endLocation', '$distance', '$duration', '$price','$province', '$timestamp')";

if ($conn->query($sql) === TRUE) {
  echo "New record created successfully";
} else {
  echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>
