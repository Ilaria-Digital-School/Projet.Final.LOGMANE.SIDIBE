import React from 'react';
import { Package, Building2, Lock } from 'lucide-react';

const RoadmapSection = () => {
    return (
        <section className="py-24 bg-gray-900 text-white overflow-hidden relative">
            {/* Decoración de fondo */}
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>

            <div className="container mx-auto px-6 relative">
                <div className="flex flex-col md:flex-row items-center justify-between gap-12 mb-16">
                    <div className="md:w-1/2">
                        <span className="inline-block px-4 py-2 rounded-full bg-blue-600/20 text-blue-400 font-bold text-sm mb-4 uppercase tracking-wider">
                            Roadmap
                        </span>
                        <h2 className="text-4xl font-bold mb-6">Próximamente</h2>
                        <p className="text-gray-400 text-lg leading-relaxed">
                            No nos detenemos en el transporte de pasajeros. Estamos construyendo el ecosistema de movilidad más completo de Bamako.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="group p-8 rounded-3xl bg-gray-800 border border-gray-700 transition-all hover:bg-gray-850 hover:border-gray-600">
                        <div className="flex items-start justify-between mb-8">
                            <div className="p-4 rounded-2xl bg-blue-600/10">
                                <Package className="h-10 w-10 text-blue-500" />
                            </div>
                            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-gray-700 text-gray-400 text-xs font-bold">
                                <Lock className="h-3 w-3" /> EN CONSTRUCCIÓN
                            </div>
                        </div>
                        <h3 className="text-2xl font-bold mb-4 italic">MotoTX Entregas</h3>
                        <p className="text-gray-400 mb-6">
                            Servicio de paquetería express para que tus envíos lleguen tan rápido como tú. Seguimiento en tiempo real incluido.
                        </p>
                    </div>

                    <div className="group p-8 rounded-3xl bg-gray-800 border border-gray-700 transition-all hover:bg-gray-850 hover:border-gray-600">
                        <div className="flex items-start justify-between mb-8">
                            <div className="p-4 rounded-2xl bg-emerald-600/10">
                                <Building2 className="h-10 w-10 text-emerald-500" />
                            </div>
                            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-gray-700 text-gray-400 text-xs font-bold">
                                <Lock className="h-3 w-3" /> EN PLANIFICACIÓN
                            </div>
                        </div>
                        <h3 className="text-2xl font-bold mb-4 italic">MotoTX Empresas</h3>
                        <p className="text-gray-400 mb-6">
                            Integración API para e-commerce y soluciones corporativas para que tu negocio nunca se detenga.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default RoadmapSection;
