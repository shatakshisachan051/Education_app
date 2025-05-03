import { ref, set, get, orderByChild, limitToLast, query } from 'firebase/database';
import { db } from './config';

// Update user's leaderboard entry
export async function updateLeaderboardEntry(userId, userData) {
  try {
    await set(ref(db, `leaderboard/${userId}`), {
      ...userData,
      lastUpdated: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error updating leaderboard:', error);
    throw error;
  }
}

// Get top users from leaderboard
export async function getTopUsers(limit = 10) {
  try {
    const leaderboardRef = ref(db, 'leaderboard');
    const leaderboardQuery = query(
      leaderboardRef,
      orderByChild('points'),
      limitToLast(limit)
    );
    
    const snapshot = await get(leaderboardQuery);
    if (snapshot.exists()) {
      const users = [];
      snapshot.forEach((childSnapshot) => {
        users.push({
          id: childSnapshot.key,
          ...childSnapshot.val()
        });
      });
      // Sort in descending order (since we used limitToLast)
      return users.sort((a, b) => b.points - a.points);
    }
    return [];
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    throw error;
  }
}

// Get user's current rank
export async function getUserRank(userId) {
  try {
    const leaderboardRef = ref(db, 'leaderboard');
    const snapshot = await get(leaderboardRef);
    
    if (snapshot.exists()) {
      const users = [];
      snapshot.forEach((childSnapshot) => {
        users.push({
          id: childSnapshot.key,
          ...childSnapshot.val()
        });
      });
      
      const sortedUsers = users.sort((a, b) => b.points - a.points);
      const userIndex = sortedUsers.findIndex(user => user.id === userId);
      return userIndex + 1; // +1 because array is 0-indexed
    }
    return null;
  } catch (error) {
    console.error('Error fetching user rank:', error);
    throw error;
  }
} 