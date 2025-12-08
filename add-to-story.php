<?php
    $uploadDir     = __DIR__ . "/uploads/";
    $storyFilename = "new-events.txt";
    $fullPath      = $uploadDir . $storyFilename;

    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0777, true);
    }

    $title       = $_POST["title"] ?? "";
    $description = $_POST["description"] ?? "";
    $description = str_replace("\r\n", "\n", $description);

    $storyContent  = "=== NEW STORY ===\n";
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

        $filename   = $basename . '.' . $ext;
        $uploadDir  = __DIR__ . "/uploads/";
        $counter    = 1;
        $testName   = $filename;

        while (file_exists($uploadDir . $testName)) {
            $testName = $basename . "($counter)." . $ext;
            $counter++;
        }
        return $testName;
    }

    $photoLine = "Photo: No\n\n";

    if (isset($_FILES["photo"]) && $_FILES["photo"]["error"] === UPLOAD_ERR_OK) {
        $safeName  = getSafeOriginalFilename($_FILES["photo"]);
        $destPath  = $uploadDir . $safeName;

        if (move_uploaded_file($_FILES["photo"]["tmp_name"], $destPath)) {
            $photoLine = "Photo: Yes (saved as $safeName)\n\n";
        } else {
            $photoLine = "Photo: Upload failed\n\n";
        }
    }

    $storyContent .= $photoLine;
    $storyContent .= str_repeat("=", 50) . "\n\n";
    $handle = fopen($fullPath, "a");

    if ($handle === false) {
        die("Cannot open file for writing");
    }

    flock($handle, LOCK_EX);
    fwrite($handle, $storyContent);
    fflush($handle);
    flock($handle, LOCK_UN);
    fclose($handle);

    echo "SUCCESS";
?>