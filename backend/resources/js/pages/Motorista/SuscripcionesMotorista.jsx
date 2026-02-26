import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';
import SEO from '../../components/Common/SEO';
import { Card, Button } from '../../components/Common/UIComponents';
import BottomNav from '../../components/Common/BottomNav';
import '../../../css/components.css';

const SuscripcionesMotorista = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [planes, setPlanes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('/api/motorista/planes')
            .then(res => setPlanes(res.data.data ? res.data.data : res.data))
            .catch(() => { })
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <div className="loading-state">Cargando...</div>;

    return (
        <div className="dashboard-container driver-theme" style={{ paddingBottom: '80px' }}>
            <SEO title="Suscripciones" />
            <header className="mtx-header driver-header">
                <Button variant="ghost" onClick={() => navigate('/motorista/dashboard')}>← Volver</Button>
                <h1 className="header-title">Suscripciones</h1>
            </header>
            <main className="main-content-centered p-4">
                <Card style={{ marginBottom: '2rem', background: '#10b981', color: 'white' }}>
                    <h2 className="text-xl font-bold mb-2">✅ Cuenta Activa (Demo)</h2>
                    <p>Tienes acceso total a la plataforma.</p>
                    <div style={{ marginTop: '1rem', background: 'white', color: 'black', padding: '1rem', borderRadius: '0.5rem', display: 'flex', justifyContent: 'space-between' }}>
                        <div>
                            <div className="text-sm text-gray-500">Pruebas Restantes</div>
                            <div className="text-2xl font-bold text-blue-600">999</div>
                        </div>
                        <div>
                            <div className="text-sm text-gray-500">Vencimiento</div>
                            <div className="text-xl font-bold">Ilimitado</div>
                        </div>
                    </div>
                </Card>
            </main>
            <BottomNav role="motorista" />
        </div>
    );
};

export default SuscripcionesMotorista;
