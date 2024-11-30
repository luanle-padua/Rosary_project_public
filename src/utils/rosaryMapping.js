export const getActiveBeadId = (mysteryIndex, prayerSection, prayerIndex, currentRepetition = 1) => {
  // Opening prayers sequence
  if (prayerSection === 'opening') {
    switch (prayerIndex) {
      case 0: 
        return 'cross';  // Sign of Cross
      
      case 1:           // Apostles' Creed 
        return 'double-3';  // First double circle
      
      case 2:           // Our Father
        return 'double-3';  // Still on first double circle

      case 3:           // Three Hail Marys
        switch (currentRepetition) {
          case 1: return 'left-0';
          case 2: return 'left-1';
          case 3: return 'left-2';
          default: return null;
        }
      
      case 4:           // Glory Be
        return 'double-0';  // Second double circle
      
      default: 
        return null;
    }
  }

  // Decade prayers sequence
  if (prayerSection === 'decade') {
    const mysteryBead = `middle-${mysteryIndex}`;
    
    switch (prayerIndex) {
      case 0:           // Mystery announcement
        return mysteryBead;
      
      case 1:           // Our Father
        return 'double-1';
      
      case 2:           // Ten Hail Marys
        // Handle zero-based indexing for right beads
        const beadIndex = Math.min(currentRepetition - 1, 9);
        return `right-${beadIndex}`;
      
      case 3:           // Glory Be
      case 4:           // Fatima Prayer
        return 'double-2';
      
      default:
        return mysteryBead;
    }
  }

  // Closing prayers sequence
  if (prayerSection === 'closing') {
    switch (prayerIndex) {
      case 0:           // Hail Holy Queen
        return 'center';
      
      case 1:           // Final Prayer
        return 'center';
      
      case 2:           // Final Sign of Cross
        return 'cross';
      
      default: 
        return null;
    }
  }

  return null;
};

// Enhanced debug utility
export const debugBeadMapping = (state) => {
  const beadId = getActiveBeadId(
    state.mysteryIndex,
    state.prayerSection,
    state.prayerIndex,
    state.currentRepetition
  );
  
  console.log('Prayer State:', {
    section: state.prayerSection,
    mysteryIndex: state.mysteryIndex,
    prayerIndex: state.prayerIndex,
    repetition: state.currentRepetition,
    activeBead: beadId,
    message: `Section: ${state.prayerSection}, Prayer: ${state.prayerIndex}, Rep: ${state.currentRepetition}, Bead: ${beadId}`
  });
  
  return beadId;
};

// Utility function to validate bead IDs
export const validateBeadId = (beadId) => {
  const validPrefixes = ['left-', 'right-', 'middle-', 'double-', 'cross', 'center'];
  if (!beadId) return false;
  
  return validPrefixes.some(prefix => {
    if (beadId === prefix.replace('-', '')) return true;
    if (!beadId.startsWith(prefix)) return false;
    const num = parseInt(beadId.slice(prefix.length));
    return !isNaN(num);
  });
};