import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
    LayoutDashboard,
    User,
    History,
    Ticket,
    CreditCard,
    ClipboardList,
    BarChart2,
    Home,
    LogOut
} from 'lucide-react';
import { Button } from './UIComponents';
import { useAuth } from '../../context/AuthContext';

/**
 * BottomNav Component
 * 
 * [ES] Barra de navegación inferior unificada para dispositivos móviles.
 *      Adapta los iconos y rutas según el rol del usuario.
 */
const BottomNav = ({ role }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { t } = useTranslation();
    const { logout } = useAuth();

    const isActive = (path) => location.pathname === path;

    const navItems = {
        cliente: [
            { icon: Home, label: t('nav.dashboard'), path: '/cliente' },
            { icon: ClipboardList, label: t('client_dashboard.history'), path: '/cliente/historial' },
            { icon: Ticket, label: t('nav.forfaits'), path: '/cliente/forfaits' },
            { icon: User, label: t('client_dashboard.profile'), path: '/cliente/perfil' },
        ],
        motorista: [
            { icon: LayoutDashboard, label: t('nav.dashboard'), path: '/motorista' },
            { icon: History, label: t('client_dashboard.history'), path: '/motorista/historial' },
            { icon: CreditCard, label: t('driver_dashboard.subscriptions'), path: '/motorista/suscripciones' },
            { icon: User, label: t('client_dashboard.profile'), path: '/motorista/perfil' },
        ],
        admin: [
            { icon: BarChart2, label: t('nav.dashboard'), path: '/admin' },
            { icon: ClipboardList, label: t('nav.trips'), path: '/admin/viajes' },
            { icon: User, label: t('client_dashboard.profile'), path: '/admin/perfil' },
            {
                icon: LogOut,
                label: t('common.logout'),
                action: () => {
                    if (window.confirm(t('common.confirm_logout') || '¿Cerrar sesión?')) {
                        logout();
                        navigate('/login');
                    }
                },
                className: 'text-error'
            }
        ]
    };

    const items = navItems[role] || [];

    if (items.length === 0) return null;

    return (
        <nav className="mobile-bottom-nav">
            {items.map((item, index) => {
                const Icon = item.icon;
                const active = item.path ? isActive(item.path) : false;

                return (
                    <Button
                        key={index}
                        variant="ghost"
                        className={`${active ? 'active' : ''} ${item.className || ''}`}
                        onClick={item.action ? item.action : () => navigate(item.path)}
                        label={item.label}
                    >
                        <Icon size={20} />
                        <span className="nav-label">{item.label}</span>
                    </Button>
                );
            })}
        </nav>
    );
};

export default BottomNav;
