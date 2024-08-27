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
    case "GET":
        $path = explode('/', $_SERVER['REQUEST_URI']);
        $id = isset($path[2]) ? $path[2] : null;
        if (is_numeric($id)) {
            $sql = "SELECT * FROM accounts WHERE account_id = :id";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':id', $id);
            $stmt->execute();
            $user = $stmt->fetch(PDO::FETCH_ASSOC);
            echo json_encode($user);
        } else {
            $sql = "SELECT * FROM accounts";
            $stmt = $conn->prepare($sql);
            $stmt->execute();
            $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($users);
        }
        break;

    case "POST":
        $data = json_decode(file_get_contents("php://input"), true);

        if (isset($data['fullname']) && isset($data['username']) && isset($data['password'])) {
            $fullname = $data['fullname'];
            $username = $data['username'];
            $password =$data['password'];

            $sql = "INSERT INTO accounts(fullname, username, password) VALUES (:fullname, :username, :password)";
            $stmt = $conn->prepare($sql);

            if ($stmt) {
                $stmt->bindParam(':fullname', $fullname);
                $stmt->bindParam(':username', $username);
                $stmt->bindParam(':password', $password);

                if ($stmt->execute()) {
                    $response = ['status' => 1, 'message' => 'Account successfully created!'];
                } else {
                    $response = ['status' => 0, 'message' => 'Failed to create account.'];
                }
            } else {
                $response = ['status' => 0, 'message' => 'Failed to prepare statement.'];
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
