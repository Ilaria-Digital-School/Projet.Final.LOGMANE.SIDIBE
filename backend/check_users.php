<?php
require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\User;

$emails = ['admin@mototx.com', 'admin@test.com'];
foreach ($emails as $email) {
    $user = User::where('email', $email)->first();
    if ($user) {
        echo "Email: $email | Rol: [{$user->rol}]\n";
    } else {
        echo "User not found: $email\n";
    }
}
