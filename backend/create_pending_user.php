<?php
require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\User;
use App\Models\MotoristaPerfil;

$email = 'pending_test@mototx.com';
$user = User::where('email', $email)->first();

if (!$user) {
    $user = User::create([
        'name' => 'Pending Driver Test',
        'email' => $email,
        'password' => 'password',
        'rol' => 'motorista',
        'telefono' => '12345678',
        'status' => 'pendiente',
    ]);
    
    MotoristaPerfil::create([
        'usuario_id' => $user->id,
        'viajes_prueba_restantes' => 5,
        'estado_validacion' => 'pendiente',
        'estado_actual' => 'offline',
        'marca_vehiculo' => 'Yamaha',
        'matricula' => 'TEST-001',
    ]);
    
    echo "Pending user created: $email\n";
} else {
    $user->update(['status' => 'pendiente']);
    echo "User $email updated to status 'pendiente'\n";
}
