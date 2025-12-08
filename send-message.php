<?php
    session_start();

    $uploadDir = dirname(__FILE__) . '/uploads';
    $filePath  = $uploadDir . '/contacts.txt';

    if (!is_dir($uploadDir)) {
        if (!mkdir($uploadDir, 0755, true)) {
            die("Error: Could not create uploads folder. Check permissions.");
        }
    }

    if (!file_exists($filePath)) {
        $fp = fopen($filePath, "w");
        if ($fp) {
            fwrite($fp, "====== CONTACT FORM SUBMISSIONS ======\n\n");
            fclose($fp);
            chmod($filePath, 0644);
        } else {
            die("Error: Could not create contacts.txt file.");
        }
    }

    $name    = isset($_POST['name'])    ? trim($_POST['name'])    : '';
    $email   = isset($_POST['email'])   ? trim($_POST['email'])   : '';
    $message = isset($_POST['message']) ? trim($_POST['message']) : '';

        if (empty($name) || empty($email) || empty($message)) {
        die("Please fill in all fields.");
    }

    if (!preg_match("/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,})$/i", $email)) {
        die("Please enter a valid email address.");
    }

    $date  = date("Y-m-d H:i:s");
    $entry = str_repeat("=", 40) . "\n";
    $entry .= "\nSubmitted: $date\n";
    $entry .= "Name:      $name\n";
    $entry .= "Email:     $email\n";
    $entry .= "Message: $message\n\n";
    $fp = fopen($filePath, "a");

    if ($fp && flock($fp, LOCK_EX)) {
        fwrite($fp, $entry);
        flock($fp, LOCK_UN);
        fclose($fp);
    
        echo '{"status":"success"}';
    } else {
        echo '{"status":"error","message":"Failed to save message."}';
    }

    exit();
?>