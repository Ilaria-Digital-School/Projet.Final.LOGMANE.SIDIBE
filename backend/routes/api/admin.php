<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Pagos\ForfaitController; // Forfaits are managed by admin

Route::group(['middleware' => ['jwt.auth', 'admin'], 'prefix' => 'admin'], function () {
    // [SPECIFIC ROUTES FIRST]
    Route::get('/users/pending', [AdminController::class, 'getPendingUsers']);
    Route::match(['put', 'patch'], '/users/{id}/status', [AdminController::class, 'updateUserStatus']);
    Route::match(['put', 'patch'], '/motorista-perfil/{user}/validation', [AdminController::class, 'updateMotoristaStatus']);
    
    // [RESOURCES AFTER]
    Route::apiResource('forfaits', ForfaitController::class);
    Route::apiResource('motorista-plans', \App\Http\Controllers\Admin\AdminPlanMotoristaController::class);
    Route::apiResource('users', AdminController::class)->except(['store']);
    Route::get('/viajes', [AdminController::class, 'getAllTrips']);
    Route::get('/viajes/activos', [AdminController::class, 'getActiveTrips']);
    Route::get('/transacciones', [AdminController::class, 'getAllTransacciones']);
    Route::get('/statistics', [AdminController::class, 'getStatistics']);
    Route::get('/chart-data', [AdminController::class, 'getChartData']);
    Route::get('/reports/export', [\App\Http\Controllers\Admin\AdminReportController::class, 'exportMonthlyReport']);
});
