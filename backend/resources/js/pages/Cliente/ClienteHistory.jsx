import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import SEO from '../../components/Common/SEO';
import { Card, Button, Badge } from '../../components/Common/UIComponents';
import RatingModal from '../../components/RatingModal';
import '../../../css/components.css';

/**
 * ClienteHistory Component
 *
 * [ES] Historial de trayectos del cliente — diseño premium con línea de tiempo.
 * [FR] Historique des trajets client — design premium avec chronologie.
 */

const safeFixed = (val, digits = 4) => {
    const parsed = parseFloat(val);
    if (isNaN(parsed)) return '0.0000';
    return parsed.toFixed(digits);
};

const StatusBadge = ({ estado }) => {
    const map = {
        completado: { label: '✓ Completado', bg: '#dcfce7', color: '#166534' },
        cancelado: { label: '✕ Cancelado', bg: '#fee2e2', color: '#991b1b' },
        en_curso: { label: '▶ En Curso', bg: '#dbeafe', color: '#1d4ed8' },
        aceptado: { label: '◉ Aceptado', bg: '#fef3c7', color: '#92400e' },
        solicitado: { label: '⏳ Solicitado', bg: '#f3f4f6', color: '#374151' },
    };
    const s = map[estado] || { label: estado, bg: '#f3f4f6', color: '#374151' };
    return (
        <span style={{
            display: 'inline-block',
            padding: '0.2rem 0.65rem',
            borderRadius: '9999px',
            fontSize: '0.72rem',
            fontWeight: '700',
            backgroundColor: s.bg,
            color: s.color,
            whiteSpace: 'nowrap'
        }}>
            {s.label}
        </span>
    );
};

const StarRow = ({ rating }) => (
    <div style={{ display: 'flex', gap: '2px' }}>
        {[1, 2, 3, 4, 5].map(s => (
            <span key={s} style={{ fontSize: '1rem', color: s <= rating ? '#f59e0b' : '#d1d5db' }}>★</span>
        ))}
    </div>
);

const ClienteHistory = () => {
    const { logout, user } = useAuth();
    const navigate = useNavigate();
    const { t } = useTranslation();

    const [viajes, setViajes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedTrip, setSelectedTrip] = useState(null);
    const [showRatingModal, setShowRatingModal] = useState(false);

    useEffect(() => { fetchHistory(); }, []);

    const fetchHistory = async () => {
        setLoading(true);
        try {
            const response = await axios.get('/api/viajes/historial');
            setViajes(response.data.data || []);
        } catch (error) {
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => { logout(); navigate('/login'); };

    const completedTrips = viajes.filter(v => v.estado === 'completado').length;
    const ratedTrips = viajes.filter(v => v.calificacion).length;

    return (
        <div className="dashboard-container">
            <SEO title={t('client_dashboard.history')} />

            {/* ─── Header ─── */}
            <header className="mtx-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: 1, minWidth: 0 }}>
                    <div style={{
                        background: 'var(--secondary-color)',
                        width: '2.5rem', height: '2.5rem',
                        borderRadius: '50%',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '1.1rem', flexShrink: 0
                    }}>📋</div>
                    <div style={{ minWidth: 0 }}>
                        <h1 className="header-title">{t('client_dashboard.history')}</h1>
                        <span className="header-subtitle" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', display: 'block' }}>
                            {user?.name || t('auth.role_client')}
                        </span>
                    </div>
                </div>
                <div className="desktop-nav">
                    <Button variant="outline" onClick={() => navigate('/cliente')} label="Dashboard">
                        ← Dashboard
                    </Button>
                    <Button variant="outline" onClick={() => navigate('/cliente/perfil')} label={t('client_dashboard.profile')}>
                        👤 {t('client_dashboard.profile')}
                    </Button>
                    <Button variant="error" onClick={handleLogout} label={t('common.logout')}>
                        {t('common.logout')}
                    </Button>
                </div>
            </header>

            {/* ─── Mobile Bottom Nav ─── */}
            <nav className="mobile-bottom-nav">
                <Button variant="ghost" onClick={() => navigate('/cliente')} label={t('nav.dashboard')}>
                    <span style={{ fontSize: '1.25rem' }}>🏠</span>
                    {t('nav.dashboard')}
                </Button>
                <Button variant="ghost" className="active" label={t('client_dashboard.history')}>
                    <span style={{ fontSize: '1.25rem' }}>📋</span>
                    {t('client_dashboard.history')}
                </Button>
                <Button variant="ghost" onClick={() => navigate('/cliente/perfil')} label={t('client_dashboard.profile')}>
                    <span style={{ fontSize: '1.25rem' }}>👤</span>
                    {t('client_dashboard.profile')}
                </Button>
                <Button variant="ghost" onClick={handleLogout} label={t('common.logout')} className="text-error">
                    <span style={{ fontSize: '1.25rem' }}>🚪</span>
                    {t('common.logout')}
                </Button>
            </nav>

            {/* ─── Main Content ─── */}
            <main className="main-content-centered" style={{ paddingTop: '1.5rem' }}>

                {/* Stats Summary Bar */}
                {!loading && viajes.length > 0 && (
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        gap: '1rem',
                        marginBottom: '1.5rem'
                    }}>
                        {[
                            { icon: '🛵', label: t('client_dashboard.total_trips') || 'Total viajes', value: viajes.length },
                            { icon: '✅', label: t('client_dashboard.completed') || 'Completados', value: completedTrips },
                            { icon: '⭐', label: t('client_dashboard.rated') || 'Calificados', value: ratedTrips },
                        ].map((stat, i) => (
                            <div key={i} style={{
                                background: 'white',
                                borderRadius: '1rem',
                                padding: '1rem',
                                textAlign: 'center',
                                boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
                                border: '1px solid var(--border-color)'
                            }}>
                                <div style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>{stat.icon}</div>
                                <div style={{ fontSize: '1.5rem', fontWeight: '900', color: 'var(--primary-color)', lineHeight: 1 }}>{stat.value}</div>
                                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>{stat.label}</div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Content */}
                {loading ? (
                    <Card>
                        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                            <div style={{
                                width: '3rem', height: '3rem',
                                border: '4px solid #e2e8f0',
                                borderTopColor: 'var(--primary-color)',
                                borderRadius: '50%',
                                animation: 'spin 1s linear infinite',
                                margin: '0 auto 1rem'
                            }} />
                            {t('common.loading')}
                        </div>
                    </Card>
                ) : viajes.length === 0 ? (
                    <Card>
                        <div style={{ textAlign: 'center', padding: '3rem' }}>
                            <div style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>📭</div>
                            <h3 style={{ marginBottom: '0.5rem', color: 'var(--text-main)', fontWeight: '700' }}>
                                {t('client_dashboard.no_trips')}
                            </h3>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                                {t('client_dashboard.no_trips_desc') || 'Aún no has realizado ningún viaje.'}
                            </p>
                            <Button onClick={() => navigate('/cliente')} variant="primary">
                                🛵 {t('client_dashboard.request_trip')}
                            </Button>
                        </div>
                    </Card>
                ) : (
                    <div style={{ display: 'grid', gap: '1rem' }}>
                        {Array.isArray(viajes) && viajes.map((viaje, index) => (
                            <Card key={viaje.id} className="history-item" style={{ padding: '1.25rem' }}>
                                {/* Trip Header */}
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem', gap: '0.5rem' }}>
                                    <div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.2rem' }}>
                                            {new Date(viaje.updated_at).toLocaleDateString(t('common.date_locale') || 'es-ES', {
                                                year: 'numeric', month: 'short', day: 'numeric',
                                                hour: '2-digit', minute: '2-digit'
                                            })}
                                        </div>
                                        <div style={{ fontWeight: '700', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                            🏍️ {viaje.motorista?.name || 'N/A'}
                                        </div>
                                    </div>
                                    <StatusBadge estado={viaje.estado} />
                                </div>

                                {/* Route timeline */}
                                <div style={{
                                    background: 'var(--bg-light)',
                                    borderRadius: '0.75rem',
                                    padding: '0.875rem 1rem',
                                    marginBottom: '1rem',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '0.5rem'
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <span style={{
                                            width: '0.6rem', height: '0.6rem', borderRadius: '50%',
                                            background: 'var(--primary-color)', flexShrink: 0
                                        }} />
                                        <span style={{ fontSize: '0.82rem', color: 'var(--text-main)', flex: 1 }}>
                                            {viaje.origen || `${safeFixed(viaje.origen_lat)}, ${safeFixed(viaje.origen_lng)}`}
                                        </span>
                                    </div>
                                    <div style={{ marginLeft: '0.27rem', width: '1px', height: '1rem', background: 'var(--border-color)' }} />
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <span style={{
                                            width: '0.6rem', height: '0.6rem', borderRadius: '2px',
                                            background: 'var(--accent-color)', flexShrink: 0
                                        }} />
                                        <span style={{ fontSize: '0.82rem', color: 'var(--text-main)', flex: 1 }}>
                                            {viaje.destino || `${safeFixed(viaje.destino_lat)}, ${safeFixed(viaje.destino_lng)}`}
                                        </span>
                                    </div>
                                </div>

                                {/* Rating section */}
                                {viaje.calificacion ? (
                                    <div style={{
                                        padding: '0.75rem 1rem',
                                        background: 'rgba(245, 158, 11, 0.08)',
                                        borderRadius: '0.75rem',
                                        borderLeft: '3px solid var(--accent-color)',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '0.25rem'
                                    }}>
                                        <div style={{ fontSize: '0.7rem', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                            {t('client_dashboard.your_rating')}
                                        </div>
                                        <StarRow rating={viaje.calificacion.puntuacion} />
                                        {viaje.calificacion.comentario && (
                                            <div style={{ fontSize: '0.82rem', color: 'var(--text-main)', fontStyle: 'italic', marginTop: '0.25rem' }}>
                                                "{viaje.calificacion.comentario}"
                                            </div>
                                        )}
                                    </div>
                                ) : viaje.estado === 'completado' ? (
                                    <Button
                                        variant="accent"
                                        onClick={() => { setSelectedTrip(viaje); setShowRatingModal(true); }}
                                        className="w-full"
                                    >
                                        ⭐ {t('client_dashboard.rate_trip')}
                                    </Button>
                                ) : null}
                            </Card>
                        ))}
                    </div>
                )}
            </main>

            {/* Rating Modal */}
            {showRatingModal && selectedTrip && (
                <RatingModal
                    tripId={selectedTrip.id}
                    motoristaName={selectedTrip.motorista?.name || 'Motorista'}
                    onClose={() => { setShowRatingModal(false); setSelectedTrip(null); }}
                    onSuccess={() => { fetchHistory(); }}
                />
            )}
        </div>
    );
};

export default ClienteHistory;
