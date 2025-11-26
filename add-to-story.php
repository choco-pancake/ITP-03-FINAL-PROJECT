<?php
    date_default_timezone_set('UTC');  
    $now = new DateTime("now", new DateTimeZone('UTC'));
    $now->setTimezone(new DateTimeZone('Asia/Manila'));
    $now->modify("-1 hour");

    $uploadDir = __DIR__ . "/uploads/";

    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0777, true);
    }

    $title       = $_POST["title"] ?? "";
    $description = $_POST["description"] ?? "";

    $dateNow        = $now->format("Y-m-d H:i:s");  
    $prettyDate     = $now->format("F j, Y \\a\\t g:i A");  
    $filenameDate   = $now->format("Y-m-d");    

    $storyFilename = "story-" . $filenameDate . ".txt";

    $storyContent = "=== NEW STORY ===\n";
    $storyContent .= "Date Added: $prettyDate (Philippine Time)\n";
    $storyContent .= "Title: $title\n";
    $storyContent .= "Description:\n$description\n\n";

    if (isset($_FILES["photo"]) && $_FILES["photo"]["error"] === 0) {
        $ext = pathinfo($_FILES["photo"]["name"], PATHINFO_EXTENSION);
        $photoName = time() . "_" . bin2hex(random_bytes(4)) . "." . $ext;
        $photoPath = $uploadDir . $photoName;

        if (move_uploaded_file($_FILES["photo"]["tmp_name"], $photoPath)) {
            $storyContent .= "Photo: Yes (saved as $photoName)\n";
        } else {
            $storyContent .= "Photo: Failed to upload\n";
        }
    } else {
        $storyContent .= "Photo: No\n";
    }

    $storyContent .= str_repeat("=", 50) . "\n\n";

    file_put_contents($uploadDir . $storyFilename, $storyContent, FILE_APPEND);

    echo "SUCCESS";
?>