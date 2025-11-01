import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { db } from '../../services/firebase';
import { collection, query, where, orderBy, onSnapshot, Timestamp } from 'firebase/firestore';
import { SparkleIcon, PhotoIcon } from '../icons';

interface Creation {
    id: string;
    imageUrl: string;
    createdAt: Date;
}

const CreationCard: React.FC<{ creation: Creation }> = ({ creation }) => {
    const now = new Date();
    const expiryDate = new Date(creation.createdAt.getTime() + 7 * 24 * 60 * 60 * 1000);
    const timeLeft = expiryDate.getTime() - now.getTime();
    const daysLeft = Math.ceil(timeLeft / (1000 * 60 * 60 * 24));

    let expiryText = '';
    if (daysLeft > 1) {
        expiryText = `Expires in ${daysLeft} days`;
    } else if (daysLeft === 1) {
        expiryText = 'Expires in 1 day';
    } else if (daysLeft > -1) {
        expiryText = 'Expires today';
    } else {
        expiryText = 'Expired';
    }

    return (
        <div className="relative group aspect-[9/14] rounded-lg overflow-hidden bg-gray-800">
            <img src={creation.imageUrl} alt="User creation" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute bottom-2 left-2 right-2 text-center">
                 <span className="text-xs font-medium bg-black/50 text-white px-2 py-1 rounded-full backdrop-blur-sm">{expiryText}</span>
            </div>
        </div>
    )
}

const EmptyState: React.FC = () => (
    <div className="text-center py-20">
        <PhotoIcon className="mx-auto h-16 w-16 text-gray-600" />
        <h3 className="mt-4 text-xl font-semibold text-white">No Creations Yet</h3>
        <p className="mt-2 text-gray-400">Your generated images will appear here.</p>
        {/* Potentially add a "Start Creating" button that links back to the main app */}
    </div>
);

const LoadingState: React.FC = () => (
     <div className="flex items-center justify-center py-20">
        <SparkleIcon className="h-12 w-12 text-purple-500 animate-spin" style={{ animationDuration: '3s' }}/>
        <p className="ml-4 text-lg text-gray-400">Loading your creations...</p>
    </div>
)

export const MyCreations: React.FC = () => {
    const { userProfile } = useAuth();
    const [creations, setCreations] = useState<Creation[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!userProfile) {
            setIsLoading(false);
            return;
        }

        const q = query(
            collection(db, "userCreations"),
            where("userId", "==", userProfile.uid),
            orderBy("createdAt", "desc")
        );

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const userCreations = querySnapshot.docs.map(doc => {
                const data = doc.data();
                return {
                    id: doc.id,
                    imageUrl: data.imageUrl,
                    createdAt: (data.createdAt as Timestamp).toDate()
                };
            });
            setCreations(userCreations);
            setIsLoading(false);
        }, (error) => {
            console.error("Error fetching creations in real-time: ", error);
            setIsLoading(false);
        });
        
        // Cleanup listener on component unmount
        return () => unsubscribe();

    }, [userProfile]);

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">My Creations</h1>
            <p className="text-gray-400 mb-8 max-w-2xl">
                Here are your recent creations. Please note that all images are automatically deleted after 7 days.
            </p>

            {isLoading ? <LoadingState /> :
             creations.length === 0 ? <EmptyState /> :
            (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {creations.map(creation => (
                        <CreationCard key={creation.id} creation={creation} />
                    ))}
                </div>
            )}
        </div>
    );
};