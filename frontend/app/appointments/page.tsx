'use client';

import { useEffect, useState } from 'react';

interface Doctor {
    id: number;
    name: string;
}

interface Patient {
    id: number;
    name: string;
}

export default function AppointmentsPage() {
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [patients, setPatients] = useState<Patient[]>([]);
    const [formData, setFormData] = useState({
        doctor_id: '',
        patient_id: '',
        appointment_date: '',
    });
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetch('http://localhost:3001/api/v1/doctors').then((res) => res.json()).then(setDoctors);
        fetch('http://localhost:3001/api/v1/patients').then((res) => res.json()).then(setPatients);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:3001/api/v1/appointments', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ appointment: formData }),
            });
            if (res.ok) {
                setMessage('Appointment created successfully');
                setFormData({ doctor_id: '', patient_id: '', appointment_date: '' });
            } else {
                setMessage('Error creating appointment');
            }
        } catch (err) {
            setMessage('Error creating appointment');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 sm:p-8">
            <div className="bg-card text-card-foreground w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden border border-white/20 backdrop-blur-sm">
                <div className="bg-primary p-6 text-primary-foreground text-center">
                    <h1 className="text-3xl font-bold tracking-tight">Book Appointment</h1>
                    <p className="text-blue-100 mt-2 text-sm">Schedule a visit with our specialists</p>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Select Doctor</label>
                        <div className="relative">
                            <select
                                name="doctor_id"
                                value={formData.doctor_id}
                                onChange={(e) => setFormData({ ...formData, doctor_id: e.target.value })}
                                className="w-full p-3 bg-input border-none rounded-xl focus:ring-2 focus:ring-ring transition-all duration-200 outline-none appearance-none"
                                required
                            >
                                <option value="">Choose a doctor...</option>
                                {doctors.map((d) => (
                                    <option key={d.id} value={d.id}>{d.name}</option>
                                ))}
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-gray-500">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Select Patient</label>
                        <div className="relative">
                            <select
                                name="patient_id"
                                value={formData.patient_id}
                                onChange={(e) => setFormData({ ...formData, patient_id: e.target.value })}
                                className="w-full p-3 bg-input border-none rounded-xl focus:ring-2 focus:ring-ring transition-all duration-200 outline-none appearance-none"
                                required
                            >
                                <option value="">Choose a patient...</option>
                                {patients.map((p) => (
                                    <option key={p.id} value={p.id}>{p.name}</option>
                                ))}
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-gray-500">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Appointment Date</label>
                        <input
                            type="datetime-local"
                            name="appointment_date"
                            value={formData.appointment_date}
                            onChange={(e) => setFormData({ ...formData, appointment_date: e.target.value })}
                            className="w-full p-3 bg-input border-none rounded-xl focus:ring-2 focus:ring-ring transition-all duration-200 outline-none"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-primary text-primary-foreground font-bold py-3 px-4 rounded-xl hover:opacity-90 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl"
                    >
                        Confirm Booking
                    </button>

                    {message && (
                        <div className={`mt-4 p-3 rounded-lg text-center text-sm font-medium ${message.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'} animate-pulse`}>
                            {message}
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
}
