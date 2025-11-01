import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { updateProfile, sendPasswordResetEmail } from 'firebase/auth';
// FIX: Import the 'auth' object from firebase services.
import { auth } from '../../services/firebase';

const SettingCard: React.FC<{ title: string, description: string, children: React.ReactNode }> = ({ title, description, children }) => (
    <div className="bg-[#1C1C21] border border-gray-700/50 rounded-lg">
        <div className="p-6 border-b border-gray-700/50">
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="text-gray-400 mt-1">{description}</p>
        </div>
        <div className="p-6">
            {children}
        </div>
    </div>
);


export const AccountSettings: React.FC = () => {
    const { currentUser } = useAuth();
    const [displayName, setDisplayName] = useState(currentUser?.displayName || '');
    const [isSavingName, setIsSavingName] = useState(false);
    const [nameMessage, setNameMessage] = useState('');
    const [resetEmailSent, setResetEmailSent] = useState(false);
    const [resetError, setResetError] = useState('');

    const handleNameSave = async () => {
        if (!currentUser) return;
        setIsSavingName(true);
        setNameMessage('');
        try {
            await updateProfile(currentUser, { displayName });
            setNameMessage('Your name has been updated successfully!');
            setTimeout(() => setNameMessage(''), 3000);
        } catch (error) {
            const err = error as Error;
            setNameMessage(`Error: ${err.message}`);
        } finally {
            setIsSavingName(false);
        }
    };

    const handlePasswordReset = async () => {
        if (!currentUser || !currentUser.email) return;
        setResetError('');
        setResetEmailSent(false);
        try {
            await sendPasswordResetEmail(auth, currentUser.email);
            setResetEmailSent(true);
        } catch (error) {
            const err = error as Error;
            setResetError(`Error: ${err.message}`);
        }
    };

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Account Settings</h1>
            <p className="text-gray-400 mb-8 max-w-2xl">
                Manage your personal account details and security settings.
            </p>

            <div className="space-y-8 max-w-3xl">
                <SettingCard title="Your Name" description="Please enter your full name or a display name you are comfortable with.">
                    <div className="flex items-center space-x-4">
                        <input
                            type="text"
                            value={displayName}
                            onChange={(e) => setDisplayName(e.target.value)}
                            className="flex-grow bg-[#2F2F37]/50 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-purple-500 focus:border-purple-500 transition"
                            placeholder="Your Name"
                        />
                         <button onClick={handleNameSave} disabled={isSavingName} className="px-5 py-2 text-sm font-semibold bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors disabled:opacity-50">
                           {isSavingName ? 'Saving...' : 'Save'}
                         </button>
                    </div>
                     {nameMessage && <p className="text-sm mt-2 text-green-400">{nameMessage}</p>}
                </SettingCard>

                 <SettingCard title="Your Language" description="Change the app language for your account.">
                    <select
                        disabled
                        className="w-full max-w-xs bg-[#2F2F37]/50 border border-gray-600 rounded-lg px-3 py-2 text-gray-400 focus:ring-purple-500 focus:border-purple-500 transition cursor-not-allowed"
                    >
                        <option>English</option>
                    </select>
                </SettingCard>

                <SettingCard title="Your Email" description="This is the email address associated with your account.">
                     <input
                        type="email"
                        value={currentUser?.email || ''}
                        readOnly
                        disabled
                        className="w-full bg-[#2F2F37]/50 border border-gray-600 rounded-lg px-3 py-2 text-gray-400 cursor-not-allowed"
                    />
                </SettingCard>

                <SettingCard title="Password" description="To change your password, we will send a reset link to your email address.">
                    {resetEmailSent ? (
                        <p className="text-green-400">A password reset link has been sent to your email. Please check your inbox.</p>
                    ) : (
                         <button onClick={handlePasswordReset} className="px-5 py-2 text-sm font-semibold bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
                            Send Reset Link
                         </button>
                    )}
                    {resetError && <p className="text-sm mt-2 text-red-400">{resetError}</p>}
                </SettingCard>
            </div>
        </div>
    );
};