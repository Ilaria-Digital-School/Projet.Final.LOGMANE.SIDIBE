import React from 'react';
import { Route, Users, Star, Award } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const StatsBar = () => {
    const { t } = useTranslation();
    const stats = [
        { icon: <Route className="w-6 h-6" />, value: "+25,000", label: t('landing.stats.trips') },
        { icon: <Users className="w-6 h-6" />, value: "+1,200", label: t('landing.stats.drivers') },
        { icon: <Star className="w-6 h-6" />, value: "4.9/5", label: t('landing.stats.rating') },
        { icon: <Award className="w-6 h-6" />, value: "100%", label: t('landing.stats.safety') },
    ];

    return (
        <section className="bg-blue-600 py-12">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <div key={index} className="flex flex-col items-center text-center text-white group">
                            <div className="mb-4 p-3 bg-white/10 rounded-2xl group-hover:scale-110 transition-transform">
                                {stat.icon}
                            </div>
                            <div className="text-3xl font-black mb-1">{stat.value}</div>
                            <div className="text-blue-100 text-sm font-medium uppercase tracking-wider">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StatsBar;
