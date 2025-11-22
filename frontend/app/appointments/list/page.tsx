'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Appointment {
    id: number;
    doctor_id: number;
    patient_id: number;
    appointment_date: string;
    doctor?: {
        name: string;
        specialty: string;
    };
    patient?: {
        name: string;
        email: string;
    };
}

export default function AppointmentsListPage() {
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:3001/api/v1/appointments')
            .then((res) => res.json())
            .then((data) => {
                setAppointments(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('tr-TR', {
            dateStyle: 'long',
            timeStyle: 'short',
        }).format(date);
    };

    return (
        <div className="min-h-screen p-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-4xl font-bold mb-2 text-foreground">Randevularım</h1>
                        <p className="text-gray-400">Tüm randevularınızı buradan görüntüleyebilirsiniz</p>
                    </div>
                    <Link
                        href="/appointments"
                        className="bg-primary text-primary-foreground px-6 py-3 rounded-xl font-bold hover:opacity-90 transition-all shadow-lg"
                    >
                        + Yeni Randevu
                    </Link>
                </div>

                {loading ? (
                    <div className="text-center py-12">
                        <div className="text-4xl mb-4">⏳</div>
                        <p className="text-gray-400">Randevular yükleniyor...</p>
                    </div>
                ) : appointments.length === 0 ? (
                    <div className="text-center py-12 bg-card rounded-2xl border border-white/10">
                        <div className="text-6xl mb-4">📅</div>
                        <h3 className="text-2xl font-bold mb-2 text-card-foreground">Henüz randevunuz yok</h3>
                        <p className="text-gray-400 mb-6">İlk randevunuzu oluşturmak için aşağıdaki butona tıklayın</p>
                        <Link
                            href="/appointments"
                            className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded-xl font-bold hover:opacity-90 transition-all"
                        >
                            Randevu Al
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-4">
                        {appointments.map((appointment) => (
                            <div
                                key={appointment.id}
                                className="bg-card p-6 rounded-2xl shadow-xl border border-white/10 hover:shadow-2xl transition-all"
                            >
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center mb-2">
                                            <span className="text-2xl mr-3">👨‍⚕️</span>
                                            <div>
                                                <h3 className="text-xl font-bold text-card-foreground">
                                                    {appointment.doctor?.name || `Doktor #${appointment.doctor_id}`}
                                                </h3>
                                                <p className="text-primary text-sm">
                                                    {appointment.doctor?.specialty || 'Uzmanlık bilgisi yok'}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center mb-2 ml-11">
                                            <span className="text-lg mr-2">👤</span>
                                            <span className="text-gray-400">
                                                {appointment.patient?.name || `Hasta #${appointment.patient_id}`}
                                            </span>
                                        </div>
                                        <div className="flex items-center ml-11">
                                            <span className="text-lg mr-2">📅</span>
                                            <span className="text-gray-400">{formatDate(appointment.appointment_date)}</span>
                                        </div>
                                    </div>
                                    <div className="mt-4 md:mt-0 flex gap-2">
                                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all">
                                            Düzenle
                                        </button>
                                        <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all">
                                            İptal Et
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
