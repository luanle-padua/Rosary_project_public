// functions/index.js

const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.cleanupInactiveUsers = functions.pubsub
  .schedule('every 5 minutes')
  .onRun(async (context) => {
    const db = admin.database();
    const ref = db.ref('activeUsers');
    
    // Get all users
    const snapshot = await ref.once('value');
    const users = snapshot.val();
    
    if (!users) return null;
    
    const now = Date.now();
    const updates = {};
    
    // Check each user
    Object.entries(users).forEach(([userId, userData]) => {
      if (!userData.lastActive) {
        updates[userId] = null;
        return;
      }
      
      const lastActive = new Date(userData.lastActive).getTime();
      // Remove if inactive for more than 5 minutes
      if (now - lastActive > 5 * 60 * 1000) {
        updates[userId] = null;
      }
    });
    
    // Apply updates
    if (Object.keys(updates).length > 0) {
      await ref.update(updates);
    }
    
    return null;
  });

// Rate limiting function
exports.rateLimitRequests = functions.database
  .ref('/activeUsers/{userId}')
  .onWrite(async (change, context) => {
    const userId = context.params.userId;
    const ref = change.after.ref.parent;
    
    // Get recent writes for this user
    const recent = await ref
      .orderByChild('timestamp')
      .startAt(Date.now() - 60000) // Last minute
      .once('value');
    
    if (recent.numChildren() > 10) { // Max 10 writes per minute
      await change.after.ref.remove();
      throw new functions.https.HttpsError(
        'resource-exhausted',
        'Too many requests. Please try again later.'
      );
    }
    
    return null;
  });