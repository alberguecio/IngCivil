<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Obtener los datos del formulario
    $name = $_POST['name'];
    $email = $_POST['email'];
    $message = $_POST['message'];
    
    // Correo de destino (cambiar por el correo del hosting)
    $to = "consultas@lcringenieria.cl";
    
    // Asunto del correo
    $subject = "Nuevo mensaje de contacto de $name";
    
    // Cuerpo del correo
    $email_content = "Nombre: $name\n";
    $email_content .= "Email: $email\n\n";
    $email_content .= "Mensaje:\n$message\n";
    
    // Cabeceras del correo
    $headers = "From: $name <$email>\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();
    
    // Intentar enviar el correo
    if(mail($to, $subject, $email_content, $headers)) {
        // Redirigir con mensaje de éxito
        header("Location: index.html?status=success#contacto");
    } else {
        // Redirigir con mensaje de error
        header("Location: index.html?status=error#contacto");
    }
} else {
    // Si alguien intenta acceder directamente a este archivo
    header("Location: index.html");
}
?> 