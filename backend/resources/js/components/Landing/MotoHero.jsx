import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';
import { Navigation, Bike } from 'lucide-react';

const MotoHero = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    return (
        <section className="relative overflow-hidden bg-white py-16 lg:py-24">
            <div className="container mx-auto px-6 lg:flex lg:items-center lg:gap-12">
                <div className="lg:w-1/2">
                    <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl leading-tight">
                        <Trans t={t} i18nKey="landing.hero_title">
                            Tu viaje <span className="text-blue-600">seguro y rápido</span> por Bamako
                        </Trans>
                    </h1>
                    <p className="mt-6 text-lg leading-8 text-gray-600">
                        {t('landing.hero_subtitle_modern')}
                    </p>
                    <div className="mt-10 flex flex-wrap gap-4">
                        <button
                            onClick={() => navigate('/login')}
                            className="flex items-center gap-2 rounded-xl bg-blue-600 px-8 py-4 text-lg font-bold text-white shadow-lg shadow-blue-600/30 transition-all hover:bg-blue-700 hover:scale-105 active:scale-95"
                        >
                            <Navigation className="h-5 w-5" />
                            {t('landing.btn_request_trip')}
                        </button>
                        <button
                            onClick={() => navigate('/register')}
                            className="flex items-center gap-2 rounded-xl border-2 border-emerald-600 bg-transparent px-8 py-4 text-lg font-bold text-emerald-600 transition-all hover:bg-emerald-50 hover:scale-105 active:scale-95"
                        >
                            <Bike className="h-5 w-5" />
                            {t('landing.btn_want_to_drive')}
                        </button>
                    </div>

                    <div className="mt-12 flex items-center gap-6 text-sm text-gray-500">
                        <div className="flex -space-x-2">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="h-10 w-10 rounded-full border-2 border-white bg-gray-200">
                                    <img src={`https://i.pravatar.cc/100?u=${i}`} alt="User" className="h-full w-full rounded-full" />
                                </div>
                            ))}
                        </div>
                        <p>
                            <Trans t={t} i18nKey="landing.hero_trust">
                                Más de <span className="font-bold text-gray-900">+500 viajeros</span> confían en nosotros diariamente
                            </Trans>
                        </p>
                    </div>
                </div>

                <div className="mt-12 lg:mt-0 lg:w-1/2 relative">
                    <div className="absolute -top-10 -right-10 h-64 w-64 rounded-full bg-blue-100/50 blur-3xl"></div>
                    <div className="absolute -bottom-10 -left-10 h-64 w-64 rounded-full bg-emerald-100/50 blur-3xl"></div>
                    <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                        <img
                            src="https://images.unsplash.com/photo-1558981403-c5f9899a28bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                            alt="Moto taxi service"
                            className="h-full w-full object-cover shadow-inner"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MotoHero;
