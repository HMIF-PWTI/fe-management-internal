import React, { useEffect, useState } from 'react';
import { getDivisiStats, DivisiStats } from '../service/Dashboard';
import { MdOutlinePeopleAlt, MdGroups } from "react-icons/md";

const Dashboard: React.FC = () => {
    const [stats, setStats] = useState<DivisiStats[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await getDivisiStats();
                setStats(res.data);
            } catch (err) {
                console.error("Gagal ambil data:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    const totalUser = stats.reduce((acc, curr) => acc + curr.users_count, 0);

    if (loading) return <div className="p-5 text-white">Loading data...</div>;

    return (
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6 animate-slide-in">
            {/* Card Total */}
            <div className="bg-[#332B22] border border-gold p-5 rounded-lg">
                <h3 className="text-gray-300">Total Anggota</h3>
                <div className="flex justify-between items-center mt-4">
                    <span className="text-4xl font-bold text-gold">{totalUser}</span>
                    <MdOutlinePeopleAlt className="text-4xl text-gold" />
                </div>
            </div>

            {/* Render per Divisi secara otomatis */}
            {stats.map((item) => (
                <div key={item.id} className="bg-[#332B22]/60 border border-gold/30 p-5 rounded-lg hover:border-gold transition-all">
                    <h3 className="text-gray-200 uppercase font-semibold text-sm">Divisi {item.nama}</h3>
                    <div className="flex justify-between items-center mt-4">
                        <span className="text-3xl font-bold text-gold">{item.users_count}</span>
                        <MdGroups className="text-3xl text-gold/50" />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Dashboard;