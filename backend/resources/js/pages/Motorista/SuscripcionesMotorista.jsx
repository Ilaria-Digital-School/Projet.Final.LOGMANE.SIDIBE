import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';
import SEO from '../../components/Common/SEO';
import { Card, Button, Badge } from '../../components/Common/UIComponents';
import BottomNav from '../../components/Common/BottomNav';
import { Check, ShieldAlert, Crown, Gift, ArrowLeft } from 'lucide-react';
import '../../../css/components.css';

const SuscripcionesMotorista = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [planes, setPlanes] = useState([]);
    const { t } = useTranslation();
    const [loading, setLoading] = useState(true);
    const [currentStatus, setCurrentStatus] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);

    useEffect(() => {
        fetchPlanesAndStatus();
    }, []);

    const fetchPlanesAndStatus = async () => {
        try {
            const [planesRes, statusRes] = await Promise.all([
                axios.get('/api/motorista/planes'),
                axios.get('/api/motorista/planes/status')
            ]);
            
            // Laravel puede devolver { data: [...] } o simplemente el array
            const planesData = planesRes.data.data ? planesRes.data.data : planesRes.data;
            setPlanes(Array.isArray(planesData) ? planesData : []);
            
            setCurrentStatus(statusRes.data);
        } catch (error) {
            console.error("Error fetching planes:", error);
            toast.error(t('common.error_loading_data') || 'Error al cargar los planes');
        } finally {
            setLoading(false);
        }
    };

    const handlePurchase = async (planId, planName) => {
        setIsProcessing(true);
        // Aquí iría la lógica de integración con Orange Money / Pasarela de pago
        // Simularemos un retraso de red
        toast.loading(`Procesando pago de ${planName}...`, { id: 'purchase' });
        
        setTimeout(() => {
            // Ejemplo de llamada real (comentada):
            // await axios.post('/api/motorista/comprar-plan', { plan_id: planId });
            
            toast.success(`¡Plan ${planName} activado con éxito!`, { id: 'purchase' });
            fetchPlanesAndStatus(); // Refrescar estado
            setIsProcessing(false);
        }, 2000);
    };

    if (loading) return (
        <div className="dashboard-container driver-theme flex items-center justify-center">
            <div className="animate-spin" style={{ width: '40px', height: '40px', border: '4px solid #e2e8f0', borderTopColor: '#f59e0b', borderRadius: '50%' }}></div>
        </div>
    );

    const { suscripcion_activa, plan: activePlan, fecha_fin, viajes_prueba_restantes, acceso_permitido } = currentStatus || {};

    return (
        <div className="dashboard-container driver-theme" style={{ paddingBottom: '80px', background: '#f8fafc', minHeight: '100vh' }}>
            <SEO title={t('driver_dashboard.subscriptions') || 'Suscripciones'} />
            
            <header className="mtx-header driver-header sticky top-0 z-10" style={{ background: 'white', borderBottom: '1px solid #e2e8f0' }}>
                <Button variant="ghost" onClick={() => navigate('/motorista/dashboard')} style={{ padding: '0.5rem' }}>
                    <ArrowLeft size={24} />
                </Button>
                <h1 className="header-title flex-1 text-center pr-8" style={{ fontSize: '1.2rem' }}>
                    {t('driver_dashboard.subscriptions') || 'Planes y Suscripciones'}
                </h1>
            </header>

            <main className="main-content-centered p-4 max-w-4xl mx-auto">
                
                {/* STATUS BANNER */}
                <Card className="mb-6 overflow-hidden" style={{ padding: 0, border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
                    <div className="p-4 flex items-center gap-4 text-white" style={{ background: acceso_permitido ? (suscripcion_activa ? '#10b981' : '#3b82f6') : '#ef4444' }}>
                        <div className="p-2 bg-white bg-opacity-20 rounded-full">
                            {acceso_permitido ? (suscripcion_activa ? <Crown size={32} /> : <Gift size={32} />) : <ShieldAlert size={32} />}
                        </div>
                        <div>
                            <h2 className="text-xl font-bold m-0">
                                {acceso_permitido 
                                    ? (suscripcion_activa ? 'Suscripción Activa' : 'Modo Prueba Gratuito') 
                                    : 'Acceso Bloqueado'}
                            </h2>
                            <p className="opacity-90 m-0 text-sm">
                                {acceso_permitido 
                                    ? (suscripcion_activa ? `Plan actual: ${activePlan?.nombre}` : 'Disfruta tus viajes de regalo para probar la plataforma.') 
                                    : 'Necesitas adquirir un plan para recibir viajes.'}
                            </p>
                        </div>
                    </div>
                    
                    <div className="p-4 bg-white grid grid-cols-2 gap-4 divide-x divide-gray-100">
                        <div className="text-center">
                            <div className="text-sm text-gray-500 uppercase font-bold tracking-wider mb-1">
                                {t('driver_dashboard.trial_remaining') || 'Viajes Gratis'}
                            </div>
                            <div className="text-2xl font-black text-blue-600">
                                {viajes_prueba_restantes || 0}
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="text-sm text-gray-500 uppercase font-bold tracking-wider mb-1">
                                Vencimiento
                            </div>
                            <div className="text-lg font-bold text-gray-800 mt-1">
                                {suscripcion_activa ? (fecha_fin ? new Date(fecha_fin).toLocaleDateString() : 'N/A') : 'Ilimitado'}
                            </div>
                        </div>
                    </div>
                </Card>

                <h2 className="text-xl font-bold mb-4 text-gray-800 px-2">{t('driver_dashboard.available_plans') || 'Elige tu Plan'}</h2>
                
                {/* PRICING PLANS GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {planes.length === 0 ? (
                        <div className="col-span-full text-center p-8 text-gray-500">
                            No hay planes de suscripción disponibles en este momento.
                        </div>
                    ) : (
                        planes.map(plan => {
                            const isVIP = plan.es_vip || plan.nombre.toLowerCase().includes('vip');
                            
                            return (
                                <Card 
                                    key={plan.id} 
                                    className={`relative flex flex-col h-full transition-transform hover:scale-105 ${isVIP ? 'border-2 border-yellow-400' : ''}`}
                                    style={{ 
                                        border: isVIP ? '2px solid #fbbf24' : '1px solid #e2e8f0',
                                        boxShadow: isVIP ? '0 10px 15px -3px rgba(251, 191, 36, 0.2)' : '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                                    }}
                                >
                                    {isVIP && (
                                        <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-3">
                                            <Badge variant="premium" className="shadow-md text-xs px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-none">
                                                ★ MÁS POPULAR
                                            </Badge>
                                        </div>
                                    )}
                                    
                                    <div className="mb-4">
                                        <h3 className="text-xl font-bold text-gray-800">{plan.nombre}</h3>
                                        <p className="text-gray-500 text-sm mt-1">{plan.descripcion || 'Acceso completo a la plataforma MotoTX.'}</p>
                                    </div>
                                    
                                    <div className="mb-6 pb-6 border-b border-gray-100 flex-grow">
                                        <div className="flex items-baseline gap-1">
                                            <span className="text-4xl font-black text-gray-900">{plan.precio}</span>
                                            <span className="text-gray-500 font-bold">CFA</span>
                                        </div>
                                        <div className="text-sm text-gray-500 mt-1">
                                            Válido por {plan.dias_validez} días
                                        </div>
                                        
                                        <ul className="mt-6 space-y-3">
                                            <li className="flex items-start gap-2 text-sm text-gray-700">
                                                <Check size={18} className="text-green-500 flex-shrink-0 mt-0.5" />
                                                <span>Recepción de viajes <strong>ilimitada</strong></span>
                                            </li>
                                            <li className="flex items-start gap-2 text-sm text-gray-700">
                                                <Check size={18} className="text-green-500 flex-shrink-0 mt-0.5" />
                                                <span>Soporte prioritario 24/7</span>
                                            </li>
                                            {isVIP && (
                                                <li className="flex items-start gap-2 text-sm text-gray-700 font-bold">
                                                    <Check size={18} className="text-yellow-500 flex-shrink-0 mt-0.5" />
                                                    <span>Prioridad máxima en asignación</span>
                                                </li>
                                            )}
                                        </ul>
                                    </div>
                                    
                                    <Button 
                                        variant={isVIP ? "accent" : "primary"} 
                                        className="w-full mt-auto py-3 text-lg font-bold"
                                        onClick={() => handlePurchase(plan.id, plan.nombre)}
                                        disabled={isProcessing}
                                        style={{ 
                                            background: isVIP ? 'linear-gradient(to right, #f59e0b, #ea580c)' : '#2563eb',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '0.75rem'
                                        }}
                                    >
                                        {isProcessing ? '...' : t('driver_dashboard.activate_plan') || 'Comprar Plan'}
                                    </Button>
                                </Card>
                            );
                        })
                    )}
                </div>
            </main>
            
            <BottomNav role="motorista" />
        </div>
    );
};

export default SuscripcionesMotorista;
