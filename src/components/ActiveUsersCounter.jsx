import React, { useState, useEffect, useRef } from 'react';
import { Users } from 'lucide-react';
import { database } from '../config/firebase';
import { ref, onValue, set, onDisconnect, serverTimestamp } from 'firebase/database';
import { useLanguage } from '../contexts/LanguageContext'; // Add this import


const ActiveUsersCounter = () => {
  // Get translation function from context
  const { t } = useLanguage();

  const [activeUsers, setActiveUsers] = useState(null);
  const [userId] = useState(() => Math.random().toString(36).substr(2, 9));
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPulse, setShowPulse] = useState(false);
  const previousCount = useRef(null);

  useEffect(() => {
    if (!database) {
      setError('Database not initialized');
      return;
    }

    const activeUsersRef = ref(database, 'activeUsers');
    const userRef = ref(database, `activeUsers/${userId}`);

    const setupPresence = async () => {
      try {
        await set(userRef, {
          timestamp: serverTimestamp(),
          lastActive: new Date().toISOString()
        });

        await onDisconnect(userRef).remove();

        const intervalId = setInterval(() => {
          set(userRef, {
            timestamp: serverTimestamp(),
            lastActive: new Date().toISOString()
          }).catch(console.error);
        }, 60000);

        return () => clearInterval(intervalId);
      } catch (error) {
        console.error('Error setting up presence:', error);
        setError('Connection error. Please try again.');
      }
    };

    const unsubscribe = onValue(activeUsersRef, (snapshot) => {
      try {
        const users = snapshot.val();
        if (users) {
          const now = Date.now();
          const activeCount = Object.entries(users).reduce((count, [key, userData]) => {
            if (!userData.lastActive) return count;
            const lastActive = new Date(userData.lastActive).getTime();
            if (now - lastActive < 5 * 60 * 1000) return count + 1;
            return count;
          }, 0);

          // Trigger animation if count changes
          if (previousCount.current !== null && activeCount !== previousCount.current) {
            setShowPulse(true);
            setTimeout(() => setShowPulse(false), 1000);
          }
          previousCount.current = activeCount;
          setActiveUsers(activeCount);
        } else {
          setActiveUsers(0);
        }
        setIsLoading(false);
      } catch (error) {
        console.error('Error processing active users:', error);
        setIsLoading(false);
        setError('Error loading user count');
      }
    });

    const cleanupPresence = setupPresence();

    return () => {
      unsubscribe();
      cleanupPresence.then(cleanup => cleanup?.());
      set(userRef, null).catch(console.error);
    };
  }, [userId]);

  return (
    <div className="flex flex-col items-center justify-center gap-2 text-sm">
      <div className={`
        flex items-center justify-center gap-4 
        ${error ? 'opacity-100' : 'opacity-75 transition-opacity hover:opacity-100'}
        ${showPulse ? 'animate-bounce' : ''}
      `}>
        <Users
          size={14}
          className={`
            ${error ? '' : 'animate-pulse'}
            ${showPulse ? 'text-yellow-400' : 'text-white'}
            transition-colors duration-300
          `}
        />
        <span className={`
          ${error ? 'text-red-400' : 'text-white'}
          ${showPulse ? 'scale-105' : 'scale-100'}
          transition-transform duration-300
        `}>
          {error ? error : isLoading ? (
            t('connecting')
          ) : activeUsers === 1 ? (
            <span className="text-green-400">"Keep the faith, one step at a time."</span>
          ) : (
            <span className="text-green-400">{activeUsers - 1} BELIEVERS ARE PRAYING WITH YOU</span>
          )}
        </span>
      </div>
    </div>
  );
};

export default ActiveUsersCounter;