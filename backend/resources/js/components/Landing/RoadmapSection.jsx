import React from 'react';
import { Package, Smartphone, Clock } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const RoadmapSection = () => {
    const { t } = useTranslation();
    const items = [
        {
            icon: <Package className="h-10 w-10 text-blue-600" />,
            title: t('landing.roadmap.delivery_title'),
            desc: t('landing.roadmap.delivery_desc'),
            status: t('landing.roadmap.status')
        },
        {
            icon: <Smartphone className="h-10 w-10 text-emerald-600" />,
            title: t('landing.roadmap.business_title'),
            desc: t('landing.roadmap.business_desc'),
            status: t('landing.roadmap.status')
        }
    ];

    return (
        <section className="py-24 bg-gray-900 text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-emerald-600/20 rounded-full blur-3xl"></div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-3xl mx-auto text-center mb-20">
                    <h2 className="text-4xl font-black mb-6">{t('landing.roadmap.title')}</h2>
                    <p className="text-gray-400 text-lg leading-relaxed">{t('landing.roadmap.subtitle')}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
                    {items.map((item, i) => (
                        <div key={i} className="group p-10 bg-white/5 border border-white/10 rounded-[2.5rem] backdrop-blur-sm transition-all hover:bg-white/10 hover:border-white/20">
                            <div className="flex items-start justify-between mb-8">
                                <div className="p-4 bg-white/10 rounded-2xl group-hover:scale-110 transition-transform">
                                    {item.icon}
                                </div>
                                <span className="flex items-center gap-1.5 px-4 py-1.5 bg-blue-600/20 text-blue-400 rounded-full text-xs font-bold tracking-wider uppercase">
                                    <Clock className="w-3 h-3" /> {item.status}
                                </span>
                            </div>
                            <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                            <p className="text-gray-400 leading-relaxed text-lg">
                                {item.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default RoadmapSection;
