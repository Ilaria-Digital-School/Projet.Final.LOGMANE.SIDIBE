import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

/**
 * useNotifications Hook
 *
 * [ES] Hook personalizado para gestionar conexiones WebSocket en tiempo real.
 *      Maneja los canales de escucha para solicitudes de viajes (Motoristas) y actualizaciones de estado (Clientes/Motoristas).
 *
 * [FR] Hook personnalisé pour gérer les connexions WebSocket en temps réel.
 *      Gère les canaux d'écoute pour les demandes de voyage (Chauffeurs) et les mises à jour de statut (Clients/Chauffeurs).
 *
 * @param {Function} onNewTrip [ES] Callback para nuevas solicitudes de viaje. [FR] Callback pour les nouvelles demandes de voyage.
 * @param {Function} onTripUpdate [ES] Callback para cambios de estado del viaje. [FR] Callback pour les changements de statut du voyage.
 */
const useNotifications = (onNewTrip, onTripUpdate) => {
    const { user } = useAuth();

    useEffect(() => {
        if (!user) return;

        // [ES] Función de limpieza para salir de los canales al desmontar
        // [FR] Fonction de nettoyage pour quitter les canaux lors du démontage
        return () => {
            if (window.Echo) {
                if (user.rol === 'motorista') {
                    window.Echo.leave('viajes.disponibles');
                }
                // [ES] Podríamos necesitar rastrear qué canales de viajes nos unimos para salir correctamente
                // [FR] Nous pourrions avoir besoin de suivre les canaux de voyage auxquels nous nous sommes joints pour quitter correctement
            }
        };
    }, [user]);

    // [ES] Los oyentes específicos por rol se manejan mejor en componentes específicos
    // [FR] Les écouteurs spécifiques au rôle sont mieux gérés dans des composants spécifiques
    // [ES] Este hook proporciona métodos auxiliares para unirse/salir de canales
    // [FR] Ce hook fournit des méthodes auxiliaires pour rejoindre/quitter les canaux

    /**
     * [ES] Escucha el canal público para nuevas solicitudes de viajes.
     * [FR] Écoute el canal public pour les nouvelles demandes de voyage.
     */
    const listenToAvailableTrips = (callback) => {
        // The logic for listening to 'drivers' channel is now handled in useEffect.
        // This function can be removed or adapted if there's a need for on-demand subscription.
        // For now, it will remain as a placeholder or can be removed if no longer needed.
        console.warn('[useNotifications] listenToAvailableTrips is largely handled by useEffect. Consider refactoring.');
        if (user?.rol === 'motorista' && window.Echo) {
            // If there's a need for an *additional* callback beyond the one in useEffect,
            // this part could be re-enabled or modified.
            // For now, the primary listening is in useEffect.
            // window.Echo.channel('drivers')
            //     .listen('ViajeSolicitado', (e) => {
            //         if (callback) callback(e.viaje);
            //     });
        }
    };

    /**
     * [ES] Escucha actualizaciones privadas de un viaje específico.
     * [FR] Écoute les mises à jour privées d'un viaje específico.
     */
    const listenToTripUpdates = (viajeId, callback) => {
        if (viajeId && window.Echo) {
            console.log(`[useNotifications] Subscribing to private channel 'viaje.${viajeId}'...`);
            const channel = window.Echo.private(`viaje.${viajeId}`);

            channel.listen('ViajeActualizado', (e) => {
                console.log(`[useNotifications] EVENT RECEIVED: ViajeActualizado for ${viajeId}`, e);
                if (callback) callback(e.viaje);
            })
                .listen('ViajeAceptado', (e) => {
                    console.log(`[useNotifications] EVENT RECEIVED: ViajeAceptado for ${viajeId}`, e);
                    if (callback) callback(e.viaje);
                })
                .listen('.location-updated', (e) => { // Note the dot prefix for broadcastAs aliases
                    console.log(`[useNotifications] EVENT RECEIVED: .location-updated for ${viajeId}`, e);
                    if (callback.onLocationUpdate) callback.onLocationUpdate(e);
                    // Also support generic callback if it handles the object structure
                });

            channel.error((error) => {
                console.error(`[useNotifications] Private channel 'viaje.${viajeId}' error:`, error);
            });

            return () => {
                window.Echo.leave(`viaje.${viajeId}`);
            };
        }
        return () => { };
    };

    return {
        listenToAvailableTrips,
        listenToTripUpdates
    };
};

export default useNotifications;
