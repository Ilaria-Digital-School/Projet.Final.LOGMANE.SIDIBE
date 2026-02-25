<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('forfaits', function (Blueprint $table) {
            if (!Schema::hasColumn('forfaits', 'es_vip')) {
                $table->boolean('es_vip')->default(false)->after('distancia_maxima');
            }
        });

        Schema::table('planes_motorista', function (Blueprint $table) {
            if (!Schema::hasColumn('planes_motorista', 'distancia_maxima')) {
                $table->decimal('distancia_maxima', 8, 2)->default(0)->after('es_vip');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('forfaits', function (Blueprint $table) {
            $table->dropColumn('es_vip');
        });

        Schema::table('planes_motorista', function (Blueprint $table) {
            $table->dropColumn('distancia_maxima');
        });
    }
};
