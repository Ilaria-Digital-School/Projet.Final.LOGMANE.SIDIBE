import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import axios from 'axios';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Card, Badge } from '../../../components/Common/UIComponents';

// Creamos un icono personalizado con un emoji de moto para el mapa
const motoIcon = L.divIcon({
    className: 'custom-moto-icon',
    html: '<div style="font-size: 20px; background: white; border: 2px solid #2563eb; border-radius: 50%; width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 6px rgba(0,0,0,0.3);">🏍️</div>',
    iconSize: [36, 36],
    iconAnchor: [18, 18],
    popupAnchor: [0, -18]
});

const AdminMap = () => {
    const [activeTrips, setActiveTrips] = useState([]);
    const [loading, setLoading] = useState(true);

    // Centro del mapa por defecto (Bamako, Mali)
    const mapCenter = [12.6392, -8.0029];

    useEffect(() => {
        fetchActiveTrips();

        // Conexión a WebSockets (Laravel Echo)
        if (window.Echo) {
            const channel = window.Echo.private('admin.monitoring');

            channel.listen('MotoristaLocationUpdated', (e) => {
                // Actualizamos las coordenadas del motorista específico sin mutar el resto del estado
                setActiveTrips(prevTrips =>
                    prevTrips.map(trip => {
                        // Comprobamos si el evento pertenece a este viaje/motorista
                        if (trip.motorista_id === e.motoristaId || (trip.motorista && trip.motorista.id === e.motoristaId)) {
                            return {
                                ...trip,
                                motorista: {
                                    ...trip.motorista,
                                    motorista_perfil: {
                                        ...(trip.motorista?.motorista_perfil || {}),
                                        latitud_actual: e.lat,
                                        longitud_actual: e.lng
                                    }
                                }
                            };
                        }
                        return trip;
                    })
                );
            });

            return () => {
                channel.stopListening('MotoristaLocationUpdated');
                window.Echo.leave('admin.monitoring');
            };
        }
    }, []);

    const fetchActiveTrips = async () => {
        try {
            const response = await axios.get('/api/admin/viajes/activos');
            const data = response.data.data ? response.data.data : response.data;
            setActiveTrips(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("Error cargando viajes activos para el mapa", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="p-10 text-center animate-pulse">Cargando radar de flota...</div>;

    return (
        <Card className="p-0 overflow-hidden shadow-xl border-0 mb-8 mt-4">
            <div className="bg-gray-900 text-white p-4 flex justify-between items-center">
                <h3 className="font-bold text-lg flex items-center gap-2">
                    <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                    </span>
                    Radar Global de Flota (Tiempo Real)
                </h3>
                <Badge variant="primary">{activeTrips.length} Viajes en Curso</Badge>
            </div>

            <MapContainer center={mapCenter} zoom={13} style={{ height: '600px', width: '100%', zIndex: 1 }}>
                <TileLayer
                    url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />

                {activeTrips.map(trip => {
                    const lat = parseFloat(trip.motorista?.motorista_perfil?.latitud_actual);
                    const lng = parseFloat(trip.motorista?.motorista_perfil?.longitud_actual);

                    // Si no tiene coordenadas válidas, no lo renderizamos en el mapa
                    if (isNaN(lat) || isNaN(lng)) return null;

                    return (
                        <Marker key={trip.id} position={[lat, lng]} icon={motoIcon}>
                            <Popup className="custom-popup">
                                <div className="text-sm">
                                    <div className="font-bold text-base border-b pb-1 mb-2">
                                        🏍️ {trip.motorista?.name}
                                    </div>
                                    <div className="mb-1">
                                        <strong>Cliente:</strong> {trip.cliente?.name}
                                    </div>
                                    <div className="mb-2">
                                        <Badge variant={trip.estado === 'en_curso' ? 'success' : 'warning'}>
                                            {trip.estado.toUpperCase()}
                                        </Badge>
                                    </div>
                                    <div className="text-xs text-gray-500 mt-2 truncate max-w-[200px]">
                                        📍 {trip.origen} <br />
                                        🏁 {trip.destino}
                                    </div>
                                </div>
                            </Popup>
                        </Marker>
                    );
                })}
            </MapContainer>
        </Card>
    );
};

export default AdminMap;
