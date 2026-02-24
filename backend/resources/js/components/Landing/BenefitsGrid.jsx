import React from 'react';
import { ShieldCheck, Banknote, Zap } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const BenefitsGrid = () => {
    const { t } = useTranslation();
    const benefits = [
        {
            icon: <ShieldCheck className="h-10 w-10 text-blue-600" />,
            title: t('landing.benefits.title1'),
            description: t('landing.benefits.desc1')
        },
        {
            icon: <Banknote className="h-10 w-10 text-emerald-600" />,
            title: t('landing.benefits.title2'),
            description: t('landing.benefits.desc2')
        },
        {
            icon: <Zap className="h-10 w-10 text-amber-500" />,
            title: t('landing.benefits.title3'),
            description: t('landing.benefits.desc3')
        }
    ];

    return (
        <section className="bg-gray-50 py-20">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {benefits.map((benefit, index) => (
                        <div key={index} className="flex flex-col items-center text-center p-8 bg-white rounded-3xl shadow-sm border border-gray-100 transition-all hover:shadow-md hover:-translate-y-1">
                            <div className="mb-6 p-4 bg-gray-50 rounded-2xl">
                                {benefit.icon}
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">{benefit.title}</h3>
                            <p className="text-gray-600 leading-relaxed font-medium opacity-90">
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
