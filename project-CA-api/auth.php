<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");
header("Content-Type: application/json");

include 'connection.php';

$objDb = new DbConnect;
$conn = $objDb->connect();

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case "POST":
        $data = json_decode(file_get_contents("php://input"), true);

        if (isset($data['username']) && isset($data['password'])) {
            $username = $data['username'];
            $password = $data['password'];

            // Fetch the user by username
            $sql = "SELECT * FROM accounts WHERE username = :username";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':username', $username);
            $stmt->execute();
            $user = $stmt->fetch(PDO::FETCH_ASSOC);

            // Check if the user exists and the password matches
            if ($user && $user['password'] === $password) {
                $response = [
                    'status' => 1,
                    'message' => 'Login successful!',
                    'id' => $user['account_id']
                ];
            } else {
                $response = ['status' => 0, 'message' => 'Invalid username or password.'];
            }
        } else {
            $response = ['status' => 0, 'message' => 'Invalid input.'];
        }

        echo json_encode($response);
        break;

    default:
        echo json_encode(['status' => 0, 'message' => 'Method not supported.']);
        break;
}
?>
