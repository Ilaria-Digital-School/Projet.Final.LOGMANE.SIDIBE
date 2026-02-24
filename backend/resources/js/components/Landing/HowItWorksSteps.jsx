import React from 'react';
import { MapPin, UserCheck, Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const HowItWorksSteps = () => {
    const { t } = useTranslation();
    const steps = [
        {
            number: "01",
            icon: <MapPin className="h-8 w-8 text-blue-600" />,
            title: t('landing.how_it_works.step1_title'),
            description: t('landing.how_it_works.step1_desc')
        },
        {
            number: "02",
            icon: <UserCheck className="h-8 w-8 text-blue-600" />,
            title: t('landing.how_it_works.step2_title'),
            description: t('landing.how_it_works.step2_desc')
        },
        {
            number: "03",
            icon: <Sparkles className="h-8 w-8 text-blue-600" />,
            title: t('landing.how_it_works.step3_title'),
            description: t('landing.how_it_works.step3_desc')
        }
    ];

    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">{t('landing.how_it_works.title')}</h2>
                    <p className="mt-4 text-lg text-gray-600 text-center">{t('landing.how_it_works.subtitle')}</p>
                </div>

                <div className="relative flex flex-col md:flex-row justify-between items-start gap-12">
                    {/* Línea conectora decorativa para desktop */}
                    <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-blue-100 -z-10"></div>

                    {steps.map((step, index) => (
                        <div key={index} className="flex-1 flex flex-col items-center text-center group">
                            <div className="relative mb-8 transition-transform group-hover:scale-110 duration-300">
                                <div className="h-20 w-20 rounded-2xl bg-white border-2 border-blue-600 flex items-center justify-center shadow-lg shadow-blue-100 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                    <div className="group-hover:text-white transition-colors">
                                        {React.cloneElement(step.icon, { className: "h-8 w-8 " + (step.icon.props.className.replace('text-blue-600', 'group-hover:text-white')) })}
                                    </div>
                                </div>
                                <div className="absolute -top-4 -right-4 h-10 w-10 bg-gray-900 text-white rounded-full flex items-center justify-center font-bold text-sm border-4 border-white">
                                    {step.number}
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                            <p className="text-gray-600 max-w-xs leading-relaxed">{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorksSteps;
