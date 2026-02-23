import React from 'react';
import { MapPin, UserCheck, Sparkles } from 'lucide-react';

const HowItWorksSteps = () => {
    const steps = [
        {
            number: "01",
            icon: <MapPin className="h-8 w-8 text-blue-600" />,
            title: "Indica tu destino",
            description: "Selecciona dónde quieres ir desde nuestra plataforma fácil de usar."
        },
        {
            number: "02",
            icon: <UserCheck className="h-8 w-8 text-blue-600" />,
            title: "Conductor asignado",
            description: "Te conectamos con el conductor más cercano y verificado en segundos."
        },
        {
            number: "03",
            icon: <Sparkles className="h-8 w-8 text-blue-600" />,
            title: "Disfruta el viaje",
            description: "Súbete a la moto y viaja tranquilamente hasta tu punto de destino."
        }
    ];

    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Cómo funciona</h2>
                    <p className="mt-4 text-lg text-gray-600 text-center">Viajar con nosotros es tan sencillo como estos tres pasos</p>
                </div>

                <div className="relative flex flex-col md:flex-row justify-between items-start gap-12">
                    {/* Línea conectora decorativa para desktop */}
                    <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-blue-100 -z-10"></div>

                    {steps.map((step, index) => (
                        <div key={index} className="flex-1 flex flex-col items-center text-center">
                            <div className="relative mb-8">
                                <div className="h-20 w-20 rounded-2xl bg-white border-2 border-blue-600 flex items-center justify-center shadow-lg shadow-blue-100">
                                    {step.icon}
                                </div>
                                <div className="absolute -top-4 -right-4 h-10 w-10 bg-gray-900 text-white rounded-full flex items-center justify-center font-bold text-sm">
                                    {step.number}
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                            <p className="text-gray-600 max-w-xs">{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorksSteps;
