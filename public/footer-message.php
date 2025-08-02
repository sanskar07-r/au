// DEBUG: Show all errors (remove on production)
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
<?php
// footer-message.php
header('Content-Type: application/json');
// Allow only POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method not allowed']);
    exit;
}
// Basic anti-spam: simple session rate limit (1 message per 60 seconds)
session_start();
if (!isset($_SESSION['last_message_time'])) {
    $_SESSION['last_message_time'] = 0;
}
if (time() - $_SESSION['last_message_time'] < 60) {
    echo json_encode(['success' => false, 'error' => 'Please wait before sending another message.']);
    exit;
}
// Validate and sanitize message
$message = trim($_POST['message'] ?? '');
if (empty($message) || strlen($message) > 300) {
    echo json_encode(['success' => false, 'error' => 'Invalid message.']);
    exit;
}
$message = htmlspecialchars($message, ENT_QUOTES | ENT_HTML5, 'UTF-8');
// Email settings
$to = '1singhsanskar11@gmail.com';
$subject = 'New message from Cyber Academy footer';
$body = "Message: $message\n\nSent from the website footer.";
$sender = '1singhsanskar11@gmail.com';
$headers = 'From: ' . $sender . "\r\n" .
           'Reply-To: ' . $sender . "\r\n" .
           'X-Mailer: PHP/' . phpversion();
// Send email
$sent = mail($to, $subject, $body, $headers);
if ($sent) {
    $_SESSION['last_message_time'] = time();
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'error' => 'Failed to send message. Try again later.']);
}
