<?php
require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\User;
use Illuminate\Support\Facades\Hash;

$email = 'admin@mototx.com';
$user = User::where('email', $email)->first();

if ($user) {
    $user->password = Hash::make('password');
    $user->rol = 'admin';
    $user->save();
    echo "User $email updated with password 'password'\n";
} else {
    User::create([
        'name' => 'Admin MotoTX',
        'email' => $email,
        'password' => Hash::make('password'),
        'rol' => 'admin',
        'status' => 'aprobado'
    ]);
    echo "User $email created with password 'password'\n";
}
