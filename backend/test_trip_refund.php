<?php
require 'vendor/autoload.php';
$app = require_once 'bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

use App\Models\User;
use App\Models\Viaje;
use App\Models\ClienteForfait;
use App\Services\ViajeService;
use Illuminate\Support\Facades\DB;

$viajeService = app(ViajeService::class);

// 1. Buscar un cliente con forfait
$cliente = User::where('rol', 'cliente')->whereHas('clienteForfaits', function($q) {
    $q->where('viajes_restantes', '>', 0);
})->first();

if (!$cliente) {
    die("No client with active forfait found for testing.\n");
}

$forfaitBefore = ClienteForfait::where('cliente_id', $cliente->id)->first();
echo "Viajes antes de solicitar: " . $forfaitBefore->viajes_restantes . "\n";

try {
    // 2. Solicitar viaje (debe descontar 1)
    $viaje = $viajeService->solicitarViaje($cliente, 12.345, -7.890);
    $forfaitDuring = ClienteForfait::where('cliente_id', $cliente->id)->first();
    echo "Viajes tras solicitar: " . $forfaitDuring->viajes_restantes . " (Esperado: " . ($forfaitBefore->viajes_restantes - 1) . ")\n";

    // 3. Cancelar viaje (debe devolver 1)
    $viajeService->cancelarViaje($cliente, $viaje);
    $forfaitAfter = ClienteForfait::where('cliente_id', $cliente->id)->first();
    echo "Viajes tras cancelar: " . $forfaitAfter->viajes_restantes . " (Esperado: " . $forfaitBefore->viajes_restantes . ")\n";

    if ($forfaitBefore->viajes_restantes == $forfaitAfter->viajes_restantes) {
        echo "SUCCESS: Refund logic verified.\n";
    } else {
        echo "FAILURE: Trip was not refunded.\n";
    }

} catch (\Exception $e) {
    echo "ERROR: " . $e->getMessage() . "\n";
}
