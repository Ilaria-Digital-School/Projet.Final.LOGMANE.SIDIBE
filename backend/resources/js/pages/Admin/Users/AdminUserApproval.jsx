import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';
import { Card, Button, Badge } from '../../../components/Common/UIComponents';
import { Search, UserCheck, UserX, Clock } from 'lucide-react';

const AdminUserApproval = () => {
    const { t } = useTranslation();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [viewerOpen, setViewerOpen] = useState(false);
    const [selectedDocs, setSelectedDocs] = useState(null);

    useEffect(() => {
        fetchPendingUsers();
    }, []);

    const fetchPendingUsers = async () => {
        try {
            const response = await axios.get('/api/admin/users/pending');
            // Defensive coding to handle different response formats
            let data = [];
            if (Array.isArray(response.data)) {
                data = response.data;
            } else if (response.data && Array.isArray(response.data.data)) {
                data = response.data.data;
            } else if (response.data && typeof response.data === 'object') {
                data = Object.values(response.data);
            }
            setUsers(data);
        } catch (error) {
            console.error("Error fetching pending users:", error);
            toast.error(t('common.error_loading_data'));
            setUsers([]);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateStatus = async (userId, status) => {
        try {
            await axios.patch(`/api/admin/users/${userId}/status`, { status });
            toast.success(t(`admin_dashboard.users.status_updated_${status}`));
            setUsers(prev => Array.isArray(prev) ? prev.filter(u => u.id !== userId) : []);
        } catch (error) {
            toast.error(t('common.error_updating_status'));
        }
    };

    const filteredUsers = Array.isArray(users) ? users.filter(user =>
        user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase())
    ) : [];

    if (loading) return <div className="text-center p-20">{t('common.loading')}</div>;

    return (
        <div className="admin-approval-page">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">{t('admin_dashboard.users.pending_title')}</h1>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                        type="text"
                        placeholder={t('common.search')}
                        className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <Card className="overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-gray-50 border-b">
                            <tr>
                                <th className="px-6 py-4 font-semibold text-sm text-gray-600 uppercase">{t('common.name')}</th>
                                <th className="px-6 py-4 font-semibold text-sm text-gray-600 uppercase">{t('common.email')}</th>
                                <th className="px-6 py-4 font-semibold text-sm text-gray-600 uppercase">{t('common.role')}</th>
                                <th className="px-6 py-4 font-semibold text-sm text-gray-600 uppercase">{t('common.date')}</th>
                                <th className="px-6 py-4 font-semibold text-sm text-gray-600 uppercase text-right">{t('common.actions')}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredUsers.length > 0 ? filteredUsers.map(user => (
                                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-gray-900">{user.name}</td>
                                    <td className="px-6 py-4 text-gray-600">{user.email}</td>
                                    <td className="px-6 py-4">
                                        <Badge variant={user.rol === 'admin' ? 'danger' : user.rol === 'motorista' ? 'secondary' : 'primary'}>
                                            {t(`roles.${user.rol}`)}
                                        </Badge>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end gap-2 text-right items-center">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => {
                                                    setSelectedDocs({
                                                        name: user.name,
                                                        dni: user.documento_identidad_path,
                                                        license: user.motorista_perfil?.documento_licencia_path
                                                    });
                                                    setViewerOpen(true);
                                                }}
                                                title={t('admin_dashboard.motoristas.actions.view_docs')}
                                                style={{ fontSize: '0.75rem', padding: '0.4rem 0.6rem' }}
                                            >
                                                📄 {t('common.view')}
                                            </Button>
                                            <Button
                                                variant="primary"
                                                size="sm"
                                                onClick={() => handleUpdateStatus(user.id, 'aprobado')}
                                                title={t('common.approve')}
                                            >
                                                <UserCheck className="w-4 h-4" />
                                            </Button>
                                            <Button
                                                variant="danger"
                                                size="sm"
                                                onClick={() => handleUpdateStatus(user.id, 'rechazado')}
                                                title={t('common.reject')}
                                            >
                                                <UserX className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="5" className="px-6 py-10 text-center text-gray-500">
                                        <div className="flex flex-col items-center gap-2">
                                            <Clock className="w-10 h-10 text-gray-300" />
                                            <p>{t('admin_dashboard.users.no_pending')}</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </Card>
            {viewerOpen && selectedDocs && (
                <div style={{
                    position: 'fixed',
                    inset: 0,
                    backgroundColor: 'rgba(0,0,0,0.75)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '1.5rem',
                    zIndex: 100
                }}>
                    <div className="mtx-card" style={{ width: '100%', maxWidth: '50rem', maxHeight: '90vh', overflowY: 'auto', textAlign: 'left' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid #e5e7eb', paddingBottom: '1rem' }}>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>{t('admin_dashboard.motoristas.viewer.title', { name: selectedDocs.name })}</h3>
                            <button onClick={() => setViewerOpen(false)} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer' }}>✕</button>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: window.innerWidth < 768 ? '1fr' : '1fr 1fr', gap: '1.5rem' }}>
                            <div>
                                <h4 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.75rem', color: '#4b5563' }}>🪪 {t('admin_dashboard.motoristas.viewer.dni')}</h4>
                                {selectedDocs.dni ? (
                                    <div style={{ borderRadius: '0.5rem', overflow: 'hidden', border: '1px solid #e5e7eb' }}>
                                        <img
                                            src={selectedDocs.dni.startsWith('http') ? selectedDocs.dni : `/storage/${selectedDocs.dni}`}
                                            alt="DNI"
                                            style={{ width: '100%', height: 'auto', display: 'block' }}
                                        />
                                    </div>
                                ) : (
                                    <div style={{ padding: '2rem', textAlign: 'center', backgroundColor: '#f3f4f6', borderRadius: '0.5rem', color: '#6b7280' }}>
                                        {t('admin_dashboard.motoristas.viewer.no_file')}
                                    </div>
                                )}
                            </div>
                            <div>
                                <h4 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.75rem', color: '#4b5563' }}>🏍️ {t('admin_dashboard.motoristas.viewer.license')}</h4>
                                {selectedDocs.license ? (
                                    <div style={{ borderRadius: '0.5rem', overflow: 'hidden', border: '1px solid #e5e7eb' }}>
                                        <img
                                            src={selectedDocs.license.startsWith('http') ? selectedDocs.license : `/storage/${selectedDocs.license}`}
                                            alt="Licencia"
                                            style={{ width: '100%', height: 'auto', display: 'block' }}
                                        />
                                    </div>
                                ) : (
                                    <div style={{ padding: '2rem', textAlign: 'center', backgroundColor: '#f3f4f6', borderRadius: '0.5rem', color: '#6b7280' }}>
                                        {t('admin_dashboard.motoristas.viewer.no_file')}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end' }}>
                            <Button variant="primary" onClick={() => setViewerOpen(false)}>{t('common.close')}</Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminUserApproval;
