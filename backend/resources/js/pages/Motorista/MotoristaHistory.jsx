import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SEO from '../../components/Common/SEO';
import { Card, Button, Badge } from '../../components/Common/UIComponents';
import { LayoutDashboard, History, User, LogOut, Clock, CheckCircle, Calendar, Star, MapPin } from 'lucide-react';
import '../../../css/components.css';

/**
 * MotoristaHistory Component
 *
 * [ES] Historial de servicios realizados por el conductor.
 *      Muestra estadísticas de viajes totales y calificación media, además de la lista detallada de trayectos finalizados.
 *
 * [FR] Historique des services effectués par le chauffeur.
 *      Affiche les statistiques des trajets totaux et la note moyenne, ainsi que la liste détaillée des trajets terminés.
 */

// [PHASE 2] Helper for safe numeric display
const safeFixed = (val, digits = 4) => {
    const parsed = parseFloat(val);
    if (isNaN(parsed)) return '0.0000';
    return parsed.toFixed(digits);
};

const MotoristaHistory = () => {
    const { logout, user } = useAuth();
    const navigate = useNavigate();
    const [viajes, setViajes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({ total: 0, average: 0 });

    const { t } = useTranslation();

    useEffect(() => {
        fetchHistory();
    }, []);

    const fetchHistory = async () => {
        setLoading(true);
        try {
            const response = await axios.get('/api/viajes/historial');
            // Defensive coding to handle different response formats
            let trips = [];
            if (response.data && Array.isArray(response.data.data)) {
                trips = response.data.data;
            } else if (response.data && Array.isArray(response.data)) {
                trips = response.data;
            } else if (response.data && typeof response.data === 'object') {
                trips = Object.values(response.data.data || response.data);
            }

            setViajes(trips);

            // Calculate stats safely
            const ratedTrips = Array.isArray(trips) ? trips.filter(v => v.calificacion) : [];
            const totalRating = ratedTrips.reduce((sum, v) => sum + (v.calificacion?.puntuacion || 0), 0);
            const avgRating = ratedTrips.length > 0 ? (totalRating / ratedTrips.length).toFixed(1) : 0;

            setStats({
                total: trips.length,
                average: avgRating
            });
        } catch (error) {
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const renderStars = (rating) => {
        return (
            <div className="stars-container">
                {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} className={`star ${star <= rating ? 'filled' : 'empty'}`}>
                        ★
                    </span>
                ))}
            </div>
        );
    };

    return (
        <div className="dashboard-container driver-theme">
            <SEO title={t('client_dashboard.history')} />

            <header className="mtx-header driver-header">
                <div className="mtx-header-brand">
                    <div className="mtx-header-icon">🏍️</div>
                    <div className="mtx-header-text">
                        <h1 className="header-title">
                            {t('client_dashboard.history')}
                        </h1>
                        <span className="header-subtitle">
                            {user?.name || t('driver_dashboard.driver_role')}
                        </span>
                    </div>
                </div>
                <div className="desktop-nav">
                    <Button onClick={() => navigate('/motorista')} label="Dashboard">
                        ← Dashboard
                    </Button>
                    <Button variant="outline" onClick={() => navigate('/motorista/perfil')} label={t('client_dashboard.profile')}>
                        👤 {t('client_dashboard.profile')}
                    </Button>
                    <Button variant="error" onClick={handleLogout} label={t('common.logout')}>
                        {t('common.logout')}
                    </Button>
                </div>
            </header>

            {/* Mobile Bottom Nav */}
            <BottomNav role="motorista" />

            <main className="main-content-centered">
                {/* Premium Stats Row */}
                <div className="driver-stats-grid animate-in fade-in slide-in-from-bottom-4">
                    <div className="stat-card-premium earnings">
                        <div className="stat-card-inner">
                            <div className="stat-icon-wrapper">
                                <Star size={24} fill="currentColor" />
                            </div>
                            <div className="stat-content">
                                <span className="stat-label-modern">{t('driver_dashboard.average_rating')}</span>
                                <div className="stat-value-modern">
                                    {stats.average} <span className="stat-subtext">/ 5.0</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="stat-card-premium trips">
                        <div className="stat-card-inner">
                            <div className="stat-icon-wrapper">
                                <History size={24} />
                            </div>
                            <div className="stat-content">
                                <span className="stat-label-modern">{t('driver_dashboard.completed_trips')}</span>
                                <div className="stat-value-modern">
                                    {stats.total} <span className="stat-subtext">trips</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="history-section-header">
                    <h2 className="section-title-modern">
                        <Calendar size={20} /> {t('client_dashboard.history')}
                    </h2>
                </div>

                {/* Activity timeline list */}
                {loading ? (
                    <div className="loading-state-premium">
                        <div className="spinner-modern"></div>
                        <span>{t('common.loading')}</span>
                    </div>
                ) : viajes.length === 0 ? (
                    <Card className="empty-state-card">
                        <div className="empty-state-icon">
                            <History size={48} className="opacity-20" />
                        </div>
                        <h3 className="empty-title">{t('client_dashboard.no_trips')}</h3>
                        <p className="empty-desc">Your activity journal is waiting for your first ride.</p>
                        <Button variant="primary" onClick={() => navigate('/motorista')}>
                            Ir al Dashboard
                        </Button>
                    </Card>
                ) : (
                    <div className="activity-timeline">
                        {Array.isArray(viajes) && viajes.map((viaje, index) => (
                            <div key={viaje.id} className="timeline-item-wrapper animate-in fade-in slide-in-from-left-4" style={{ animationDelay: `${index * 0.05}s` }}>
                                <div className="timeline-marker">
                                    <div className="marker-dot"></div>
                                    <div className="marker-line"></div>
                                </div>

                                <Card className="timeline-content-card">
                                    <div className="trip-card-header">
                                        <div className="trip-time-box">
                                            <Clock size={14} />
                                            <span>
                                                {new Date(viaje.updated_at).toLocaleDateString('es-ES', {
                                                    day: 'numeric',
                                                    month: 'short',
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                })}
                                            </span>
                                        </div>
                                        <Badge variant="success" className="badge--sm">
                                            <CheckCircle size={12} /> {t('common.completed')}
                                        </Badge>
                                    </div>

                                    <div className="trip-main-info">
                                        <div className="trip-route-display">
                                            <div className="route-step">
                                                <div className="route-icon origin"></div>
                                                <div className="route-text">
                                                    <span className="route-label">{t('client_dashboard.origin')}</span>
                                                    <span className="route-value">{viaje.origen || `${safeFixed(viaje.origen_lat)}, ${safeFixed(viaje.origen_lng)}`}</span>
                                                </div>
                                            </div>
                                            <div className="route-step">
                                                <div className="route-icon destination"></div>
                                                <div className="route-text">
                                                    <span className="route-label">{t('client_dashboard.destination')}</span>
                                                    <span className="route-value">{viaje.destino || `${safeFixed(viaje.destino_lat)}, ${safeFixed(viaje.destino_lng)}`}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="trip-meta-info">
                                            <div className="meta-item">
                                                <User size={14} className="text-secondary" />
                                                <span className="meta-value">{viaje.cliente?.name || 'Cliente'}</span>
                                            </div>

                                            {viaje.calificacion ? (
                                                <div className="meta-item rating-received">
                                                    <Star size={14} fill="#f59e0b" className="text-accent" />
                                                    <span className="meta-value font-bold">{viaje.calificacion.puntuacion}</span>
                                                </div>
                                            ) : (
                                                <div className="meta-item no-rating-yet">
                                                    <Star size={14} className="opacity-30" />
                                                    <span className="meta-value text-muted">--</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {viaje.calificacion?.comentario && (
                                        <div className="trip-comment-bubble">
                                            <div className="comment-quote">"</div>
                                            <p>{viaje.calificacion.comentario}</p>
                                        </div>
                                    )}
                                </Card>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
};

export default MotoristaHistory;
