import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { UserPlus } from 'lucide-react';

const DriverBanner = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    return (
        <section className="py-20">
            <div className="container mx-auto px-6">
                <div className="relative rounded-[3rem] bg-gradient-to-br from-gray-900 via-blue-950 to-gray-900 p-12 lg:p-20 overflow-hidden shadow-2xl">
                    {/* Decorative elements */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl -mr-48 -mt-48"></div>
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl -ml-48 -mb-48"></div>

                    <div className="relative z-10 lg:flex lg:items-center lg:justify-between text-center lg:text-left gap-12">
                        <div className="lg:w-2/3">
                            <h2 className="text-4xl lg:text-5xl font-black text-white mb-8 leading-tight">
                                {t('landing.driver_cta.title')}
                            </h2>
                            <p className="text-xl text-blue-100 opacity-90 leading-relaxed">
                                {t('landing.driver_cta.subtitle')}
                            </p>
                        </div>
                        <div className="mt-12 lg:mt-0">
                            <button
                                onClick={() => navigate('/register')}
                                className="inline-flex items-center gap-3 bg-emerald-500 hover:bg-emerald-600 text-white px-10 py-5 rounded-2xl font-black text-xl shadow-xl shadow-emerald-900/40 transition-all hover:scale-105 active:scale-95 group"
                            >
                                <UserPlus className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                                {t('landing.driver_cta.btn')}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DriverBanner;
