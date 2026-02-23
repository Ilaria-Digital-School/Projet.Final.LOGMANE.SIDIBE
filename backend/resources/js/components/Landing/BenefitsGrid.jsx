import React from 'react';
import { ShieldCheck, Banknote, Zap } from 'lucide-react';

const BenefitsGrid = () => {
    const benefits = [
        {
            icon: <ShieldCheck className="h-10 w-10 text-blue-600" />,
            title: "Seguridad primero",
            description: "Todos nuestros conductores están verificados y cuentan con equipo de seguridad completo para protegerte."
        },
        {
            icon: <Banknote className="h-10 w-10 text-emerald-600" />,
            title: "Precio cerrado",
            description: "Conoce el costo de tu viaje antes de subirte. Sin sorpresas ni regateos innecesarios."
        },
        {
            icon: <Zap className="h-10 w-10 text-amber-500" />,
            title: "Rapidez",
            description: "Nuestras motos circulan ágilmente por el tráfico de Bamako para que llegues a tiempo siempre."
        }
    ];

    return (
        <section className="bg-gray-50 py-20">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {benefits.map((benefit, index) => (
                        <div key={index} className="flex flex-col items-center text-center p-8 bg-white rounded-3xl shadow-sm border border-gray-100 transition-all hover:shadow-md">
                            <div className="mb-6 p-4 bg-gray-50 rounded-2xl">
                                {benefit.icon}
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">{benefit.title}</h3>
                            <p className="text-gray-600 leading-relaxed">
                                {benefit.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BenefitsGrid;
