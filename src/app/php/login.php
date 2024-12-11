<?php
// Configuración de la conexión a la base de datos
require "conexion.php";


// Recuperar los datos del formulario
$email = $_POST['email'] ?? null;
$password = $_POST['password'] ?? null;

// Verificar que los campos no estén vacíos
if (empty($email) || empty($password)) {
    die("El email y la contraseña son obligatorios.");
}

// Preparar la consulta SQL para buscar el email
$sql = "SELECT * FROM users WHERE email = :email LIMIT 1";

// Ejecutar la consulta
$stmt = $conexion->prepare($sql);
$stmt->execute([':email' => $email]);

// Verificar si el usuario existe
$user = $stmt->fetch(PDO::FETCH_ASSOC);

if ($user) {
    // El usuario existe, ahora verificamos la contraseña
    if (password_verify($password, $user['password'])) {
        // La contraseña es correcta, iniciar sesión
        echo "¡Bienvenido, " . htmlspecialchars($user['email']) . "!";
        // Aquí puedes iniciar la sesión, guardar la información en $_SESSION, etc.
    } else {
        // Contraseña incorrecta
        echo "La contraseña es incorrecta.";
    }
} else {
    // El email no existe
    echo "El email no está registrado.";
}
?>
