<?php
// Define database connection parameters 
$host = 'localhost';
$username = 'root';
$password = '';
$database = 'periodic_table'; // database name

// Creating a database connection
$connection = new mysqli($host, $username, $password, $database);

// Checking the connection
if ($connection->connect_error) {
    die("Connection failed: " . $connection->connect_error);
}

// Query the database to check if the list exists
$query = "SELECT atomic_mass,element_name,category,symbol FROM periodic_table.elements";
$stmt = $connection->prepare($query);
$stmt->execute();
$result = $stmt->get_result();

// Initialize an empty array to store results
$data = [];

// Check if a matching record was found
if ($result->num_rows > 0) {
    $flag = 1;
    $response = ["success" => true, "flag" => $flag];

    // Fetch the data from the result set
    while ($row = $result->fetch_assoc()) {
         // Add the row to the data array
        $data[] = $row;
    }
} else {
    $flag = 0;
    $response = ["success" => false, "flag" => $flag];
}

// Merge data into the response
$response['data'] = $data;

// Send the response as JSON
header('Content-Type: application/json');
echo json_encode($response);

// Close the database connection
$stmt->close();
$connection->close();
?>
