import React from 'react';
import { useAuth } from '../../contexts/AuthContext';

const StatCard: React.FC<{ title: string; value: string; change?: string; changeType?: 'gain' | 'loss' }> = ({ title, value, change, changeType }) => {
    const changeColor = changeType === 'gain' ? 'text-green-400' : 'text-red-400';
    return (
        <div className="bg-[#1C1C21] border border-gray-700/50 rounded-lg p-4">
            <p className="text-sm text-gray-400">{title}</p>
            <div className="flex items-baseline space-x-2 mt-1">
                <p className="text-2xl font-bold">{value}</p>
                {change && <p className={`text-sm font-semibold ${changeColor}`}>{change}</p>}
            </div>
        </div>
    );
};

export const Credits: React.FC = () => {
    const { userProfile } = useAuth();

    // Mock transaction data for now, as full transaction history is a larger feature
    const transactions = [
        { type: 'BONUS CREDITS', description: 'Welcome bonus credits', amount: '+30', balance: 30, time: '1 day ago' },
    ];

    const currentCredits = userProfile?.credits ?? 0;
    const totalEarned = 30; // Static for now
    const totalSpent = totalEarned - currentCredits;

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Credits</h1>
            <p className="text-gray-400 mb-8 max-w-2xl">
                Manage your credits, view transaction history, and complete tasks to earn more credits.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <StatCard title="Current Balance" value={currentCredits.toString()} />
                <StatCard title="This Month Usage" value="0" />
                <StatCard title="Total Earned" value={totalEarned.toString()} change={`+${totalEarned}`} changeType="gain" />
                <StatCard title="Total Spent" value={totalSpent.toString()} change={`-${totalSpent}`} changeType="loss" />
            </div>

            <div className="bg-red-900/30 border border-red-700/50 text-red-300 text-center p-4 rounded-lg mb-8">
                Credit packs are only available for subscribers.
            </div>

            <div>
                <h2 className="text-xl font-semibold mb-4">Transaction History</h2>
                <div className="bg-[#1C1C21] border border-gray-700/50 rounded-lg">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="border-b border-gray-700/50">
                                <tr>
                                    <th className="p-4 text-sm font-semibold text-gray-400">Type</th>
                                    <th className="p-4 text-sm font-semibold text-gray-400">Description</th>
                                    <th className="p-4 text-sm font-semibold text-gray-400">Amount</th>
                                    <th className="p-4 text-sm font-semibold text-gray-400">Balance</th>
                                    <th className="p-4 text-sm font-semibold text-gray-400">Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                {transactions.map((tx, index) => (
                                    <tr key={index} className="border-b border-gray-800 last:border-b-0">
                                        <td className="p-4">
                                            <span className="px-2 py-1 text-xs font-semibold bg-green-800/50 text-green-300 rounded-md">
                                                {tx.type}
                                            </span>
                                        </td>
                                        <td className="p-4 text-gray-300">{tx.description}</td>
                                        <td className="p-4 font-medium text-green-400">{tx.amount}</td>
                                        <td className="p-4 text-gray-300">{tx.balance}</td>
                                        <td className="p-4 text-gray-400">{tx.time}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};