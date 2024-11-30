// src/utils/debugUtils.js

export const debugFirebase = {
    logDatabaseConnection: () => {
      const activeUsersRef = ref(database, 'activeUsers');
      
      onValue(activeUsersRef, (snapshot) => {
        console.log('Database connection status:', {
          connected: snapshot.exists(),
          timestamp: new Date().toISOString(),
          data: snapshot.val()
        });
      });
    },
  
    logUserPresence: (userId) => {
      const userRef = ref(database, `activeUsers/${userId}`);
      
      onValue(userRef, (snapshot) => {
        console.log('User presence status:', {
          userId,
          exists: snapshot.exists(),
          data: snapshot.val(),
          timestamp: new Date().toISOString()
        });
      });
    },
  
    monitorErrors: () => {
      const connectedRef = ref(database, '.info/connected');
      
      onValue(connectedRef, (snap) => {
        if (snap.val() === true) {
          console.log('Connected to Firebase');
        } else {
          console.log('Disconnected from Firebase');
        }
      });
    }
  };