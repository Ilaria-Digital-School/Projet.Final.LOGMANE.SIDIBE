import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const FAQSection = () => {
    const { t } = useTranslation();
    const [openIndex, setOpenIndex] = useState(0);

    const questions = [
        {
            q: t('landing.faq_section.q1'),
            a: t('landing.faq_section.a1')
        },
        {
            q: t('landing.faq_section.q2'),
            a: t('landing.faq_section.a2')
        },
        {
            q: t('landing.faq_section.q3'),
            a: t('landing.faq_section.a3')
        },
        {
            q: t('landing.faq_section.q4'),
            a: t('landing.faq_section.a4')
        }
    ];

    return (
        <section className="py-24 bg-gray-50">
            <div className="container mx-auto px-6 max-w-3xl">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-black text-gray-900">{t('landing.faq_section.title')}</h2>
                    <p className="text-gray-600 mt-4 font-medium italic">{t('landing.faq_section.subtitle')}</p>
                </div>

                <div className="space-y-4">
                    {questions.map((item, i) => (
                        <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
                            <button
                                onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
                                className="w-full px-8 py-6 text-left flex justify-between items-center transition-colors hover:bg-gray-50"
                            >
                                <span className="font-bold text-gray-900 text-lg">{item.q}</span>
                                {openIndex === i ? <ChevronUp className="w-5 h-5 text-blue-600" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
                            </button>
                            {openIndex === i && (
                                <div className="px-8 pb-6 animate-fadeIn">
                                    <p className="text-gray-600 leading-relaxed border-t border-gray-50 pt-4 italic">
                                        {item.a}
                                    </p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQSection;
