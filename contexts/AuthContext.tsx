import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import {
  User,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  getAdditionalUserInfo,
  UserCredential
} from 'firebase/auth';
import { auth, googleProvider, db } from '../services/firebase';
import { doc, getDoc, setDoc, onSnapshot, Unsubscribe } from 'firebase/firestore';

export interface UserProfile {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  credits: number;
}

interface AuthContextType {
  currentUser: User | null; // Keep original firebase user for some direct operations
  userProfile: UserProfile | null;
  loading: boolean;
  signup: (email: string, password: string) => Promise<UserCredential>;
  login: (email: string, password: string) => Promise<UserCredential>;
  loginWithGoogle: () => Promise<UserCredential>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const handleNewUser = async (userCredential: UserCredential) => {
    const { user } = userCredential;
    const additionalInfo = getAdditionalUserInfo(userCredential);
    if (additionalInfo?.isNewUser) {
      const profileRef = doc(db, 'userProfiles', user.uid);
      const newProfile: UserProfile = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          credits: 30 // Assign 30 credits to new users
      };
      await setDoc(profileRef, newProfile);
    }
  };

  const signup = async (email: string, password: string) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await handleNewUser(userCredential);
    return userCredential;
  };

  const login = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  
  const loginWithGoogle = async () => {
    const userCredential = await signInWithPopup(auth, googleProvider);
    await handleNewUser(userCredential);
    return userCredential;
  }

  const logout = () => {
    setUserProfile(null);
    return signOut(auth);
  };

  useEffect(() => {
    let unsubscribeProfile: Unsubscribe | undefined;

    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      if (unsubscribeProfile) {
        unsubscribeProfile();
        unsubscribeProfile = undefined;
      }

      if (user) {
        const profileRef = doc(db, 'userProfiles', user.uid);
        unsubscribeProfile = onSnapshot(profileRef, (docSnap) => {
          if (docSnap.exists()) {
            setUserProfile(docSnap.data() as UserProfile);
          } else {
            // This case might happen for users created before the profile system
            // Or if the new user creation logic failed.
            console.log("No user profile found for UID:", user.uid);
            // Optionally create a default profile here if one doesn't exist
            const newProfile: UserProfile = {
              uid: user.uid,
              email: user.email,
              displayName: user.displayName,
              photoURL: user.photoURL,
              credits: 30
            };
            setDoc(doc(db, 'userProfiles', user.uid), newProfile);
            setUserProfile(newProfile);
          }
          setLoading(false);
        });
      } else {
        setUserProfile(null);
        setLoading(false);
      }
    });

    return () => {
        unsubscribeAuth();
        if (unsubscribeProfile) {
          unsubscribeProfile();
        }
    };
  }, []);

  const value = {
    currentUser,
    userProfile,
    loading,
    signup,
    login,
    loginWithGoogle,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};