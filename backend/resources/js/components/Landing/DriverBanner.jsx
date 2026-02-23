import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { BadgeCheck } from 'lucide-react';

const DriverBanner = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    return (
        <section className="py-20 bg-blue-600 rounded-y-[4rem] overflow-hidden relative">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-400/20 via-transparent to-transparent"></div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-8 leading-tight">
                        Conduce con MotoTX y aumenta tus ingresos
                    </h2>
                    <p className="text-blue-100 text-xl mb-12 max-w-2xl mx-auto font-medium">
                        Únete a la flota de motoristas más grande y tecnológica de Bamako. Flexibilidad total y pagos asegurados.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center items-center gap-8 mb-12 text-white/90">
                        <div className="flex items-center gap-2">
                            <BadgeCheck className="h-6 w-6 text-emerald-300" />
                            <span className="font-semibold text-lg">Pagos semanales</span>
                        </div>
                        <div className="hidden sm:block h-2 w-2 rounded-full bg-blue-400 opacity-50"></div>
                        <div className="flex items-center gap-2">
                            <BadgeCheck className="h-6 w-6 text-emerald-300" />
                            <span className="font-semibold text-lg">Tú eliges el horario</span>
                        </div>
                        <div className="hidden sm:block h-2 w-2 rounded-full bg-blue-400 opacity-50"></div>
                        <div className="flex items-center gap-2">
                            <BadgeCheck className="h-6 w-6 text-emerald-300" />
                            <span className="font-semibold text-lg">App de última generación</span>
                        </div>
                    </div>

                    <button
                        onClick={() => navigate('/register')}
                        className="bg-white text-blue-600 hover:bg-gray-100 px-12 py-5 rounded-2xl text-xl font-black shadow-2xl transition-all hover:scale-105 active:scale-95"
                    >
                        Registrar mi moto
                    </button>

                    <p className="mt-8 text-blue-200 text-sm font-medium">
                        Requisito: Licencia de conducir vigente y moto en buen estado.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default DriverBanner;
