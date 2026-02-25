<?php
require 'vendor/autoload.php';
$app = require_once 'bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

$motoristas = App\Models\User::where('rol', 'motorista')
    ->with('motorista_perfil')
    ->get()
    ->map(function($u) {
        return [
            'id' => $u->id,
            'name' => $u->name,
            'status' => $u->status,
            'perfil_val' => $u->motorista_perfil?->estado_validacion,
            'trips_left' => $u->motorista_perfil?->viajes_prueba_restantes,
            'can_go_online' => $u->motorista_perfil?->hasAccess() ? 'Yes' : 'No'
        ];
    });

echo json_encode($motoristas, JSON_PRETTY_PRINT);
