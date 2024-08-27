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
        $receiver_id = isset($_GET['receiver_id']) ? $_GET['receiver_id'] : null;
        $sender_id = isset($_GET['sender_id']) ? $_GET['sender_id'] : null;

        if ($receiver_id && $sender_id) {
            $sql = "SELECT c.*,
               a1.username AS sender_name,
               a2.username AS receiver_name
        FROM chats c
        INNER JOIN accounts a1
        ON c.sender_id = a1.account_id
        INNER JOIN accounts a2
        ON c.receiver_id = a2.account_id
        WHERE (c.sender_id = :sender_id AND c.receiver_id = :receiver_id)
        OR (c.sender_id = :receiver_id AND c.receiver_id = :sender_id)
        GROUP BY c.chat_id";


            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':sender_id', $sender_id);
            $stmt->bindParam(':receiver_id', $receiver_id);
            $stmt->execute();
            $chats = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($chats);
        } else {
            echo json_encode(array('status' => 'error', 'message' => 'sender_id or receiver_id missing'));
        }
        break;

    case "POST":
        $data = json_decode(file_get_contents("php://input"), true);
        if (isset($data['sender_id']) && isset($data['receiver_id']) && isset($data['text'])) {
            $sender_id = $data['sender_id'];
            $receiver_id = $data['receiver_id'];
            $text = $data['text'];

            $sql = "INSERT INTO chats (sender_id, receiver_id, text) VALUES (:sender_id, :receiver_id, :text)";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':sender_id', $sender_id);
            $stmt->bindParam(':receiver_id', $receiver_id);
            $stmt->bindParam(':text', $text);
            if ($stmt->execute()) {
                echo json_encode(array('status' => 'success'));
            } else {
                echo json_encode(array('status' => 'error', 'message' => 'Failed to send message'));
            }
        } else {
            echo json_encode(array('status' => 'error', 'message' => 'Invalid input'));
        }
        break;

    default:
        echo json_encode(array('status' => 'error', 'message' => 'Method not supported'));
        break;
}
?>
