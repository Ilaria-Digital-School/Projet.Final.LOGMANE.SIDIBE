<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Tymon\JWTAuth\Facades\JWTAuth; // Import JWTAuth facade

class MotoristaMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        try {
            $user = JWTAuth::parseToken()->authenticate();
        } catch (\Exception $e) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        if ($user->rol !== 'motorista') {
            return response()->json(['error' => 'Forbidden: Motorista role required'], 403);
        }

        // Check for subscription or trial access
        $perfil = \App\Models\MotoristaPerfil::where('usuario_id', $user->id)->first();
        
        \Illuminate\Support\Facades\Log::info('MotoristaMiddleware Check', [
            'user_id' => $user->id,
            'perfil_exists' => (bool)$perfil,
            'has_access' => $perfil ? $perfil->hasAccess() : false,
            'viajes_prueba' => $perfil ? $perfil->viajes_prueba_restantes : 0,
            'active_sub_exists' => $perfil ? $perfil->activeSubscription()->exists() : false,
            'now' => now()->toDateTimeString(),
            'route' => $request->route()->getName()
        ]);
        
        // Allow access to subscription endpoints even if blocked (to allow payment)
        $route = $request->route()->getName();
        $allowedRoutes = ['motorista.planes.index', 'motorista.planes.status', 'motorista.planes.subscribe'];

        /* 
        // [ES] MODO DIOS: Desactivamos el bloqueo por falta de suscripción en el Middleware
        if ($perfil && !$perfil->hasAccess() && !in_array($route, $allowedRoutes)) {
             if (!$request->is('api/motorista/planes*') && 
                 !$request->is('api/motorista/perfil') && 
                 !$request->is('api/motorista/status')) {
                 return response()->json(['error' => 'Subscription required', 'code' => 'SUBSCRIPTION_REQUIRED'], 403);
             }
        }
        */

        return $next($request);
    }
}
