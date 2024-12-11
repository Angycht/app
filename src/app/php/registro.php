<?php
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Origin: *"); // Permitir solicitudes desde cualquier origen
header("Access-Control-Allow-Headers: Content-Type , Authorization"); // Permitir encabezados necesarios
header("Content-Type: application/json"); // Definir que la respuesta será JSON
header("Access-Control-Allow-Origin: http://localhost:4200");
// Conexión a la base de datos
$host = "localhost";
$dbname = "usuario"; // Nombre de tu base de datos
$username = "root"; // Usuario de tu base de datos
$passwordDB = ""; // Contraseña de tu base de datos

try {
    // Crear la conexión usando PDO
    $conexion = new PDO("mysql:host=$host;dbname=$dbname", $username, $passwordDB);
    $conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    http_response_code(500); // Error del servidor
    echo json_encode(["status" => "error", "message" => "Error de conexión: " . $e->getMessage()]);
    exit;
}

// Capturar los datos enviados por JSON
$data = json_decode(file_get_contents("php://input"), true);
$password = $data['password'] ?? null;
$email = $data['email'] ?? null;
$repetir = $data['repetir'] ?? null;


// Validar que los campos no estén vacíos
if (!isset($password) || !isset($email) || !isset($repetir)) {
    http_response_code(400); // Solicitud incorrecta
    echo json_encode(["status" => "error", "message" => "Todos los campos son obligatorios."]);
    exit;
}

// Validar que las contraseñas coincidan
if ($password !== $repetir) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Las contraseñas no coinciden."]);
    exit;
}

// Validar la fortaleza de la contraseña
$passwordPattern = "/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/";

if (!preg_match($passwordPattern, $password)) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula, un número y un carácter especial."]);
    exit;
}

// Hashear la contraseña
$hashedPassword = password_hash($password, PASSWORD_DEFAULT);

// Crear la consulta SQL para insertar los datos
$sql = "INSERT INTO users (password, email) VALUES (:password, :email)";

try {
    $stmt = $conexion->prepare($sql);
    $isOk = $stmt->execute([
        ':password' => $hashedPassword,
        ':email' => $email
    ]);

    if ($isOk) {
        echo json_encode(["status" => "success", "message" => "Usuario registrado correctamente."]);
    } else {
        http_response_code(500);
        echo json_encode(["status" => "error", "message" => "Error al registrar el usuario."]);
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Error en la consulta: " . $e->getMessage()]);
}
?>
