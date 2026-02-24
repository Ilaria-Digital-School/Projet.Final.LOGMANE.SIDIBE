import React from 'react';
import { Star } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Testimonials = () => {
    const { t } = useTranslation();
    const reviews = [
        {
            name: "Moussa Diakité",
            role: t('landing.testimonials.role_user'),
            img: "https://i.pravatar.cc/150?u=moussa",
            text: t('landing.faq_section.a1') // Using a safe placeholder or ideally specific keys
        },
        {
            name: "Fatoumata Traoré",
            role: t('landing.testimonials.role_student'),
            img: "https://i.pravatar.cc/150?u=fatou",
            text: t('landing.safety_protocol.item3_desc')
        },
        {
            name: "Ibrahim Koné",
            role: t('landing.testimonials.role_driver'),
            img: "https://i.pravatar.cc/150?u=ibrahim",
            text: t('landing.driver_step3_desc') || "He aumentado mis ingresos significativamente."
        }
    ];

    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-4xl font-black text-gray-900 mb-16">{t('landing.testimonials.title')}</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {reviews.map((rev, i) => (
                        <div key={i} className="bg-gray-50 p-8 rounded-[2.5rem] relative text-left transition-all hover:-translate-y-2">
                            <div className="flex gap-1 mb-6 text-amber-500">
                                {[1, 2, 3, 4, 5].map(s => <Star key={s} className="w-5 h-5 fill-current" />)}
                            </div>
                            <p className="text-gray-600 italic leading-relaxed mb-8">"{rev.text}"</p>
                            <div className="flex items-center gap-4">
                                <img src={rev.img} alt={rev.name} className="w-12 h-12 rounded-full border-2 border-white shadow-md" />
                                <div>
                                    <div className="font-bold text-gray-900">{rev.name}</div>
                                    <div className="text-xs text-blue-600 font-bold uppercase tracking-tight">{rev.role}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
