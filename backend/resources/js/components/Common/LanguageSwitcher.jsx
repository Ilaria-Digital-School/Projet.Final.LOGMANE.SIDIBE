import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
    const { i18n } = useTranslation();

    const languages = [
        { code: 'es', label: 'ES' },
        { code: 'fr', label: 'FR' },
        { code: 'en', label: 'EN' }
    ];

    return (
        <div className="flex items-center gap-1 bg-gray-100/50 p-1 rounded-xl backdrop-blur-sm border border-gray-200/50" translate="no">
            {languages.map((lang) => {
                const isActive = i18n.language.startsWith(lang.code);
                return (
                    <button
                        key={lang.code}
                        onClick={() => i18n.changeLanguage(lang.code)}
                        className={`
                            px-2 py-1.5 rounded-lg text-[10px] font-black transition-all
                            ${isActive
                                ? 'bg-blue-600 text-white shadow-sm scale-105'
                                : 'text-gray-500 hover:bg-white hover:text-blue-600'}
                        `}
                        translate="no"
                    >
                        {lang.label}
                    </button>
                );
            })}
        </div>
    );
};

export default LanguageSwitcher;
