'use client';

import { useEffect, useState } from 'react';

interface Doctor {
    id: number;
    name: string;
    specialty: string;
}

export default function DoctorsPage() {
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetch('http://localhost:3001/api/v1/doctors')
            .then((res) => res.json())
            .then((data) => {
                setDoctors(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    const filteredDoctors = doctors.filter((doctor) =>
        doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen p-8">
            <div className="max-w-6xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold mb-4 text-foreground">Doktorlarımız</h1>
                    <p className="text-gray-400 mb-6">Alanında uzman doktorlarımızla tanışın</p>

                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Doktor veya uzmanlık alanı ara..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full p-4 bg-input border-none rounded-xl focus:ring-2 focus:ring-ring transition-all duration-200 outline-none text-foreground"
                        />
                        <span className="absolute right-4 top-4 text-2xl">🔍</span>
                    </div>
                </div>

                {loading ? (
                    <div className="text-center py-12">
                        <div className="text-4xl mb-4">⏳</div>
                        <p className="text-gray-400">Doktorlar yükleniyor...</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredDoctors.map((doctor) => (
                            <div
                                key={doctor.id}
                                className="bg-card p-6 rounded-2xl shadow-xl border border-white/10 hover:shadow-2xl transition-all transform hover:scale-105"
                            >
                                <div className="text-5xl mb-4">👨‍⚕️</div>
                                <h3 className="text-2xl font-bold mb-2 text-card-foreground">{doctor.name}</h3>
                                <p className="text-primary font-semibold mb-4">{doctor.specialty}</p>
                                <button className="w-full bg-primary text-primary-foreground py-2 px-4 rounded-lg hover:opacity-90 transition-all">
                                    Randevu Al
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                {!loading && filteredDoctors.length === 0 && (
                    <div className="text-center py-12">
                        <div className="text-4xl mb-4">🔍</div>
                        <p className="text-gray-400">Arama kriterlerine uygun doktor bulunamadı.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
