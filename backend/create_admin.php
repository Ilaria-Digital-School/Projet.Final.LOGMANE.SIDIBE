<?php
require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\User;
use Illuminate\Support\Facades\Hash;

$email = 'admin@test.com';
$user = User::firstOrNew(['email' => $email]);
$user->name = 'Admin Test';
$user->password = Hash::make('password');
$user->rol = 'admin';
$user->save();

echo "User created/updated: $email | password\n";
