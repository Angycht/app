<?php 
$host = "localhost";
$dbname = "usuario"; // Nombre de la base de datos
$username = "root"; // Usuario de la base de datos
$passwordDB = ""; // Contraseña de la base de datos
try {
    // Crear la conexión usando PDO
    $conexion = new PDO("mysql:host=$host;dbname=$dbname", $username, $passwordDB);
    $conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Error de conexión: " . $e->getMessage());
}

try {
    // Crear la conexión usando PDO
    $conexion = new PDO("mysql:host=$host;dbname=$dbname", $username, $passwordDB);
    $conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    http_response_code(500); // Error del servidor
    echo json_encode(["status" => "error", "message" => "Error de conexión: " . $e->getMessage()]);
    exit;
}