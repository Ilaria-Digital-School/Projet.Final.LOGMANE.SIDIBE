import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
// Asegúrate de importar tus componentes de UI
import { Card, Button, Badge, Modal } from '../../../components/Common/UIComponents';

const AdminForfaits = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [forfaits, setForfaits] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('clientes'); // 'clientes' o 'motoristas'
    const [editingForfait, setEditingForfait] = useState(null);
    const [formData, setFormData] = useState({
        nombre: '',
        descripcion: '',
        precio: '',
        dias_validez: '',
        viajes_incluidos: '',
        distancia_maxima: '', // Añadido: vital para MotoTX
        es_vip: false,
        estado: 'activo'
    });

    useEffect(() => {
        fetchData();
    }, [activeTab]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const endpoint = activeTab === 'clientes' ? '/api/admin/forfaits' : '/api/admin/motorista-plans';
            const response = await axios.get(endpoint);
            // Laravel a veces envuelve la respuesta en 'data', así que lo comprobamos:
            const data = response.data.data ? response.data.data : response.data;
            setForfaits(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("Fetch Forfaits Error:", error);
            toast.error(t('common.error'));
        } finally {
            setLoading(false);
        }
    };

    const handleOpenModal = (forfait = null) => {
        if (forfait) {
            setEditingForfait(forfait);
            setFormData({
                nombre: forfait.nombre || '',
                descripcion: forfait.descripcion || '',
                precio: forfait.precio || '',
                dias_validez: forfait.dias_validez || '',
                viajes_incluidos: forfait.viajes_incluidos || '',
                distancia_maxima: forfait.distancia_maxima || '',
                es_vip: forfait.es_vip || false,
                estado: forfait.estado || 'activo'
            });
        } else {
            setEditingForfait(null);
            setFormData({
                nombre: '',
                descripcion: '',
                precio: '',
                dias_validez: '',
                viajes_incluidos: '',
                distancia_maxima: '',
                es_vip: false,
                estado: 'activo'
            });
        }
        setModalOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const endpoint = activeTab === 'clientes' ? '/api/admin/forfaits' : '/api/admin/motorista-plans';

            // Forzamos los tipos correctos para la BD
            const cleanData = {
                ...formData,
                precio: parseFloat(formData.precio) || 0,
                dias_validez: parseInt(formData.dias_validez) || 0,
                viajes_incluidos: activeTab === 'clientes' ? (parseInt(formData.viajes_incluidos) || 0) : 0,
                distancia_maxima: parseFloat(formData.distancia_maxima) || 0,
            };

            if (editingForfait) {
                await axios.put(`${endpoint}/${editingForfait.id}`, cleanData);
            } else {
                await axios.post(endpoint, cleanData);
            }

            setModalOpen(false);
            fetchData();
            toast.success(t('admin_dashboard.forfaits.save_success'));
        } catch (error) {
            // MOSTRAR EL ERROR REAL DE LARAVEL:
            console.error("Submit Error:", error.response?.data);
            const errorMsg = error.response?.data?.message || error.response?.data?.error || t('common.error');
            toast.error(`Error: ${errorMsg}`);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm(t('admin_dashboard.forfaits.delete_confirm', { name: 'este forfait' }))) return;
        try {
            const endpoint = activeTab === 'clientes' ? '/api/admin/forfaits' : '/api/admin/motorista-plans';
            await axios.delete(`${endpoint}/${id}`);
            toast.success(t('common.success'));
            fetchData();
        } catch (error) {
            toast.error(t('common.error'));
        }
    };

    // Renderizado básico temporal para comprobar si llegan los datos
    if (loading) return <div>Cargando paquetes...</div>;

    return (
        <div className="admin-forfaits-container p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">{t('admin_dashboard.forfaits.title')}</h2>
                <Button onClick={() => handleOpenModal()} variant="primary">
                    {t('admin_dashboard.forfaits.new_btn')}
                </Button>
            </div>

            {/* Selector de pestañas */}
            <div className="flex gap-4 mb-6">
                <Button
                    variant={activeTab === 'clientes' ? 'primary' : 'outline'}
                    onClick={() => setActiveTab('clientes')}
                >
                    Paquetes para Clientes
                </Button>
                <Button
                    variant={activeTab === 'motoristas' ? 'primary' : 'outline'}
                    onClick={() => setActiveTab('motoristas')}
                >
                    Planes para Motoristas
                </Button>
            </div>

            {/* Tabla de Resultados */}
            <Card>
                {forfaits.length === 0 ? (
                    <div className="text-center p-4">No hay forfaits creados.</div>
                ) : (
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b">
                                <th className="p-3">{t('admin_dashboard.forfaits.table.name')}</th>
                                <th className="p-3">{t('admin_dashboard.forfaits.table.price')}</th>
                                {activeTab === 'clientes' && <th className="p-3">{t('admin_dashboard.forfaits.table.trips')}</th>}
                                <th className="p-3">Estado</th>
                                <th className="p-3">{t('admin_dashboard.forfaits.table.actions')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {forfaits.map(f => (
                                <tr key={f.id} className="border-b">
                                    <td className="p-3 font-bold">{f.nombre}</td>
                                    <td className="p-3">{f.precio} CFA</td>
                                    {activeTab === 'clientes' && <td className="p-3">{f.viajes_incluidos}</td>}
                                    <td className="p-3">
                                        <Badge variant={f.estado === 'activo' ? 'success' : 'error'}>
                                            {f.estado}
                                        </Badge>
                                    </td>
                                    <td className="p-3 flex gap-2">
                                        <Button variant="outline" size="sm" onClick={() => handleOpenModal(f)}>Editar</Button>
                                        <Button variant="danger" size="sm" onClick={() => handleDelete(f.id)}>Borrar</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </Card>

            {/* Modal Simple */}
            {modalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <Card className="w-full max-w-md bg-white p-6 rounded-lg shadow-xl">
                        <h3 className="text-xl font-bold mb-4">
                            {editingForfait ? t('admin_dashboard.forfaits.modal.title_edit') : t('admin_dashboard.forfaits.modal.title_create')}
                        </h3>
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                            <div>
                                <label className="block text-sm mb-1">{t('admin_dashboard.forfaits.modal.label_name')}</label>
                                <input className="w-full p-2 border rounded" required value={formData.nombre} onChange={e => setFormData({ ...formData, nombre: e.target.value })} />
                            </div>
                            <div>
                                <label className="block text-sm mb-1">{t('admin_dashboard.forfaits.modal.label_description')}</label>
                                <textarea className="w-full p-2 border rounded" rows="2" value={formData.descripcion} onChange={e => setFormData({ ...formData, descripcion: e.target.value })} />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm mb-1">{t('admin_dashboard.forfaits.modal.label_price')}</label>
                                    <input type="number" className="w-full p-2 border rounded" required value={formData.precio} onChange={e => setFormData({ ...formData, precio: e.target.value })} />
                                </div>
                                <div>
                                    <label className="block text-sm mb-1">Distancia Máx (KM)</label>
                                    <input type="number" className="w-full p-2 border rounded" value={formData.distancia_maxima} onChange={e => setFormData({ ...formData, distancia_maxima: e.target.value })} />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                {activeTab === 'clientes' ? (
                                    <div>
                                        <label className="block text-sm mb-1">{t('admin_dashboard.forfaits.modal.label_trips')}</label>
                                        <input type="number" className="w-full p-2 border rounded" required value={formData.viajes_incluidos} onChange={e => setFormData({ ...formData, viajes_incluidos: e.target.value })} />
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-2 pt-6">
                                        <input type="checkbox" id="es_vip" checked={formData.es_vip} onChange={e => setFormData({ ...formData, es_vip: e.target.checked })} />
                                        <label htmlFor="es_vip" className="text-sm font-medium">¿Es Plan VIP?</label>
                                    </div>
                                )}
                                <div>
                                    <label className="block text-sm mb-1">{t('admin_dashboard.forfaits.modal.label_days')}</label>
                                    <input type="number" className="w-full p-2 border rounded" required value={formData.dias_validez} onChange={e => setFormData({ ...formData, dias_validez: e.target.value })} />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm mb-1">{t('admin_dashboard.forfaits.modal.label_status')}</label>
                                <select className="w-full p-2 border rounded" value={formData.estado} onChange={e => setFormData({ ...formData, estado: e.target.value })}>
                                    <option value="activo">Activo</option>
                                    <option value="inactivo">Inactivo</option>
                                </select>
                            </div>
                            <div className="flex justify-end gap-2 mt-4">
                                <Button type="button" variant="ghost" onClick={() => setModalOpen(false)}>Cancelar</Button>
                                <Button type="submit" variant="primary">Guardar</Button>
                            </div>
                        </form>
                    </Card>
                </div>
            )}
        </div>
    );
};

export default AdminForfaits;
