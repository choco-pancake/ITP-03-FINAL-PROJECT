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

    $storyFilename = "new-events.txt";

    $storyContent = "=== NEW STORY ===\n";
    $storyContent .= "Date Added: $prettyDate (Philippine Time)\n";
    $storyContent .= "Title: $title\n";
    $storyContent .= "Description:\n$description\n\n";

    function getSafeOriginalFilename($fileArray) {
        $originalName = $fileArray['name'];
        $ext = strtolower(pathinfo($originalName, PATHINFO_EXTENSION));
    
        $basename = pathinfo($originalName, PATHINFO_FILENAME);
        $basename = preg_replace('/[^a-zA-Z0-9\-_]/', '_', $basename);
        $basename = preg_replace('/_+/', '_', $basename);
        $basename = trim($basename, '_');
    
        if ($basename === '' || $basename === '.') {
            $basename = 'photo';
        }

        $filename = $basename . '.' . $ext;
        $uploadDir = __DIR__ . "/uploads/";
        $counter = 1;
        $testName = $filename;

        while (file_exists($uploadDir . $testName)) {
            $testName = $basename . "($counter)." . $ext;
            $counter++;
        }

        return $testName;
    }

    if (isset($_FILES["photo"]) && $_FILES["photo"]["error"] === 0) {
        $photoName = getSafeOriginalFilename($_FILES["photo"]);
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