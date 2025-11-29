<?php
header('Content-Type: application/json');

$eventsFile = __DIR__ . '/uploads/new-events.txt';
$uploadsDir = __DIR__ . '/uploads/';

// Ensure uploads directory exists
if (!file_exists($uploadsDir)) {
    mkdir($uploadsDir, 0755, true);
}

// Get form data
$title = isset($_POST['title']) ? trim($_POST['title']) : '';
$description = isset($_POST['description']) ? trim($_POST['description']) : '';

if (empty($title)) {
    echo json_encode(['success' => false, 'message' => 'Title is required']);
    exit;
}

// Handle photo upload
$photoPath = null;
$photoFilename = null;

if (isset($_FILES['photo']) && $_FILES['photo']['error'] === UPLOAD_ERR_OK) {
    $fileExtension = strtolower(pathinfo($_FILES['photo']['name'], PATHINFO_EXTENSION));
    $allowedExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
    
    if (in_array($fileExtension, $allowedExtensions)) {
        $photoFilename = 'event_' . time() . '_' . uniqid() . '.' . $fileExtension;
        $photoPath = $uploadsDir . $photoFilename;
        
        if (!move_uploaded_file($_FILES['photo']['tmp_name'], $photoPath)) {
            echo json_encode(['success' => false, 'message' => 'Failed to upload photo']);
            exit;
        }
    }
}

// Format date
$dateAdded = date('F j, Y, g:i a');

// Prepare content to append
$content = "\n==================================================\n";
$content .= "=== NEW STORY ===\n";
$content .= "Date Added: " . $dateAdded . "\n";
$content .= "Title: " . $title . "\n";
$content .= "Description: " . $description . "\n";

if ($photoFilename) {
    $content .= "Photo: (saved as " . $photoFilename . ")\n";
} else {
    $content .= "Photo: (none)\n";
}

$content .= "==================================================\n";

// Append to file
if (file_put_contents($eventsFile, $content, FILE_APPEND | LOCK_EX) !== false) {
    echo json_encode([
        'success' => true,
        'message' => 'Event added successfully',
        'photoPath' => $photoFilename ? 'uploads/' . $photoFilename : null,
        'date' => $dateAdded
    ]);
} else {
    echo json_encode(['success' => false, 'message' => 'Failed to save event']);
}
?>