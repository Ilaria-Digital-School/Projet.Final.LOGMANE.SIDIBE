import React from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useTranslation, Trans } from 'react-i18next';

const ModernContact = () => {
    const { t } = useTranslation();
    return (
        <section className="py-24 bg-white" id="contacto">
            <div className="container mx-auto px-6">
                <div className="bg-blue-600 rounded-[3rem] overflow-hidden shadow-2xl flex flex-col lg:flex-row">
                    {/* Info Side */}
                    <div className="lg:w-1/3 p-12 bg-blue-700 text-white flex flex-col justify-between">
                        <div>
                            <h2 className="text-3xl font-black mb-8 leading-tight">
                                <Trans t={t} i18nKey="landing.contact_modern.title">
                                    ¿Hablamos?<br />Tu opinión nos importa
                                </Trans>
                            </h2>
                            <p className="text-blue-100 mb-12">{t('landing.contact_modern.desc')}</p>

                            <div className="space-y-8">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-blue-600 rounded-xl"><Mail className="w-6 h-6" /></div>
                                    <div>
                                        <div className="text-xs text-blue-300 font-bold uppercase tracking-widest">Email</div>
                                        <div className="font-bold">soporte@mototx.com</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-blue-600 rounded-xl"><Phone className="w-6 h-6" /></div>
                                    <div>
                                        <div className="text-xs text-blue-300 font-bold uppercase tracking-widest">WhatsApp</div>
                                        <div className="font-bold">+223 90 00 00 00</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-blue-600 rounded-xl"><MapPin className="w-6 h-6" /></div>
                                    <div>
                                        <div className="text-xs text-blue-300 font-bold uppercase tracking-widest">{t('landing.mission_title')}</div>
                                        <div className="font-bold">Hamdallaye ACI 2000, Bamako</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-16 pt-8 border-t border-blue-600/50 flex gap-4">
                            {/* Social Placeholder icons */}
                            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold">f</div>
                            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold">ig</div>
                            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold">tw</div>
                        </div>
                    </div>

                    {/* Form Side */}
                    <div className="lg:w-2/3 p-12 bg-white">
                        <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-500 uppercase tracking-widest ml-1">{t('landing.contact_modern.label_name')}</label>
                                    <input type="text" className="w-full p-4 bg-gray-50 rounded-2xl border-2 border-transparent focus:border-blue-600 focus:bg-white outline-none transition-all" placeholder={t('landing.contact_modern.placeholder_name')} />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-500 uppercase tracking-widest ml-1">{t('common.email')}</label>
                                    <input type="email" className="w-full p-4 bg-gray-50 rounded-2xl border-2 border-transparent focus:border-blue-600 focus:bg-white outline-none transition-all" placeholder="tu@email.com" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-500 uppercase tracking-widest ml-1">{t('landing.contact_modern.label_subject')}</label>
                                <select className="w-full p-4 bg-gray-50 rounded-2xl border-2 border-transparent focus:border-blue-600 focus:bg-white outline-none transition-all">
                                    <option>{t('landing.contact_modern.subject_support')}</option>
                                    <option>{t('landing.contact_modern.subject_driver')}</option>
                                    <option>{t('landing.contact_modern.subject_business')}</option>
                                    <option>{t('landing.contact_modern.subject_other')}</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-500 uppercase tracking-widest ml-1">{t('landing.contact_modern.label_message')}</label>
                                <textarea rows="4" className="w-full p-4 bg-gray-50 rounded-2xl border-2 border-transparent focus:border-blue-600 focus:bg-white outline-none transition-all resize-none" placeholder={t('landing.contact_modern.placeholder_message')}></textarea>
                            </div>

                            <button className="flex items-center justify-center gap-3 w-full md:w-fit px-12 py-5 bg-blue-600 text-white font-black rounded-2xl shadow-xl shadow-blue-600/30 hover:bg-blue-700 hover:scale-105 active:scale-95 transition-all">
                                <span>{t('landing.contact_modern.btn_send')}</span>
                                <Send className="w-5 h-5" />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ModernContact;
