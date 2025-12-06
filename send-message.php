<?php
    session_start();

    $uploadDir = __DIR__ . '/uploads';
    $filePath  = $uploadDir . '/contacts.txt';

    if (!is_dir($uploadDir)) {
        if (!mkdir($uploadDir, 0755, true)) {
            die("Error: Could not create uploads folder. Check permissions.");
        }
    }

    if (!file_exists($filePath)) {
        if (file_put_contents($filePath, "====== CONTACT FORM SUBMISSIONS ======\n\n") === false) {
            die("Error: Could not create contacts.txt file.");
        }

        chmod($filePath, 0644);
    }

    $name    = trim($_POST['name'] ?? '');
    $email   = trim($_POST['email'] ?? '');
    $message = trim($_POST['message'] ?? '');

    if (empty($name) || empty($email) || empty($message)) {
        die("Please fill in all fields.");
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        die("Please enter a valid email address.");
    }

    $date  = date('Y-m-d H:i:s');
    $entry = str_repeat("=", 40) . "\n";
    $entry .= "\nSubmitted: $date\n";
    $entry .= "Name:      $name\n";
    $entry .= "Email:     $email\n";
    $entry .= "Message: $message\n\n";

    $result = file_put_contents($filePath, $entry, FILE_APPEND | LOCK_EX);

    if ($result !== false) {
        echo json_encode(['status' => 'success']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Failed to save message.']);
    }

    exit();
?>