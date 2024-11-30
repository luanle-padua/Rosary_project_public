// src/utils/prayer/prayerStateManager.js

export const getPrayerStructure = (currentMysteryIndex, prayerSection, rosaryData) => {
  if (currentMysteryIndex === 0 && prayerSection === 'opening') {
    return rosaryData.structure.opening;
  }
  if (currentMysteryIndex === 4 && prayerSection === 'closing') {
    return rosaryData.structure.closing;
  }
  return rosaryData.structure.decade;
};

export const getNextPrayerState = (currentState, rosaryData) => {
  const {
    mysteryIndex: currMysteryIndex,
    prayerSection: currSection,
    prayerIndex: currPrayerIndex,
    currentRepetition: currRepetition
  } = currentState;

  const structure = getPrayerStructure(currMysteryIndex, currSection, rosaryData);
  const currentStep = structure[currPrayerIndex];

  // Handle repetitions first (like Hail Mary prayers)
  if (currentStep?.prayer === 'hailMary') {
    const maxRepetitions = currSection === 'opening' ? 3 : 10;
    if (currRepetition < maxRepetitions) {
      return {
        mysteryIndex: currMysteryIndex,
        prayerSection: currSection,
        prayerIndex: currPrayerIndex,
        currentRepetition: currRepetition + 1
      };
    }
  }

  // Move to next prayer within current section
  if (currPrayerIndex < structure.length - 1) {
    return {
      mysteryIndex: currMysteryIndex,
      prayerSection: currSection,
      prayerIndex: currPrayerIndex + 1,
      currentRepetition: 1
    };
  }

  // Handle section transitions
  switch (currSection) {
    case 'opening':
      return {
        mysteryIndex: currMysteryIndex,
        prayerSection: 'decade',
        prayerIndex: 0,
        currentRepetition: 1
      };

    case 'decade':
      if (currMysteryIndex < 4) {
        return {
          mysteryIndex: currMysteryIndex + 1,
          prayerSection: 'decade',
          prayerIndex: 0,
          currentRepetition: 1
        };
      } else {
        return {
          mysteryIndex: currMysteryIndex,
          prayerSection: 'closing',
          prayerIndex: 0,
          currentRepetition: 1
        };
      }

    case 'closing':
      return null; // End of rosary

    default:
      return null;
  }
};

export const getPreviousPrayerState = (currentState, rosaryData) => {
  const {
    mysteryIndex: currMysteryIndex,
    prayerSection: currSection,
    prayerIndex: currPrayerIndex,
    currentRepetition: currRepetition
  } = currentState;

  const structure = getPrayerStructure(currMysteryIndex, currSection, rosaryData);

  // Handle repetitions first
  if (structure[currPrayerIndex]?.prayer === 'hailMary') {
    if (currRepetition > 1) {
      return {
        mysteryIndex: currMysteryIndex,
        prayerSection: currSection,
        prayerIndex: currPrayerIndex,
        currentRepetition: currRepetition - 1
      };
    }
  }

  // Move to previous prayer within current section
  if (currPrayerIndex > 0) {
    const prevStep = structure[currPrayerIndex - 1];
    return {
      mysteryIndex: currMysteryIndex,
      prayerSection: currSection,
      prayerIndex: currPrayerIndex - 1,
      currentRepetition: prevStep?.prayer === 'hailMary' ?
        (currSection === 'opening' ? 3 : 10) : 1
    };
  }

  // Handle section transitions
  switch (currSection) {
    case 'decade':
      if (currMysteryIndex === 0) {
        // Go back to opening prayers
        const openingStructure = rosaryData.structure.opening;
        return {
          mysteryIndex: 0,
          prayerSection: 'opening',
          prayerIndex: openingStructure.length - 1,
          currentRepetition: 1
        };
      } else {
        // Go back to previous mystery
        const decadeStructure = rosaryData.structure.decade;
        return {
          mysteryIndex: currMysteryIndex - 1,
          prayerSection: 'decade',
          prayerIndex: decadeStructure.length - 1,
          currentRepetition: 1
        };
      }

    case 'closing':
      // Go back to last decade
      const decadeStructure = rosaryData.structure.decade;
      return {
        mysteryIndex: 4,
        prayerSection: 'decade',
        prayerIndex: decadeStructure.length - 1,
        currentRepetition: 1
      };

    default:
      return null; // Can't go back further than opening prayers
  }
};

export const getCurrentPrayer = (state, rosaryData, currentMysteries) => {
  const { mysteryIndex, prayerSection, prayerIndex, currentRepetition } = state;
  const structure = getPrayerStructure(mysteryIndex, prayerSection, rosaryData);
  const currentStep = structure[prayerIndex];

  if (!currentStep) return { name: '', content: '' };

  const getPrayerContent = (prayerKey) => {
    return rosaryData.commonPrayers[prayerKey] || '';
  };

  if (prayerSection === 'opening') {
    switch (currentStep.prayer) {
      case 'signOfCross':
        return { name: 'Sign of the Cross', content: getPrayerContent('signOfCross') };
      case 'apostlesCreed':
        return { name: 'Apostles\' Creed', content: getPrayerContent('apostlesCreed') };
      case 'ourFather':
        return { name: 'Our Father', content: getPrayerContent('ourFather') };
      case 'hailMary':
        const hailMaryIntentions = ['For an increase of Faith', 'For an increase of Hope', 'For an increase of Charity'];
        return {
          name: `Hail Mary (${currentRepetition}/3) - ${hailMaryIntentions[currentRepetition - 1]}`,
          content: getPrayerContent('hailMary')
        };
      case 'gloryBe':
        return { name: 'Glory Be', content: getPrayerContent('gloryBe') };
      case 'fatimaPrayer':
        return { name: 'Fatima Prayer', content: getPrayerContent('fatimaPrayer') };
      default:
        return { name: '', content: '' };
    }
  }

  if (prayerSection === 'decade') {
    switch (currentStep.prayer) {
      case 'mystery':
        return {
          name: `Mystery ${mysteryIndex + 1}: ${currentMysteries?.mysteries[mysteryIndex]?.title || ''}`,
          content: currentMysteries?.mysteries[mysteryIndex]?.meditation || ''
        };
      case 'ourFather':
        return { name: 'Our Father', content: getPrayerContent('ourFather') };
      case 'hailMary':
        return { name: `Hail Mary (${currentRepetition}/10)`, content: getPrayerContent('hailMary') };
      case 'gloryBe':
        return { name: 'Glory Be', content: getPrayerContent('gloryBe') };
      case 'fatimaPrayer':
        return { name: 'Fatima Prayer', content: getPrayerContent('fatimaPrayer') };
      default:
        return { name: '', content: '' };
    }
  }

  if (prayerSection === 'closing') {
    switch (currentStep.prayer) {
      case 'hailHolyQueen':
        return { name: 'Hail Holy Queen', content: getPrayerContent('hailHolyQueen') };
      case 'finalPrayer':
        return { name: 'Final Prayer', content: getPrayerContent('finalPrayer') };
      case 'signOfCross':
        return { name: 'Sign of the Cross', content: getPrayerContent('signOfCross') };
      default:
        return { name: '', content: '' };
    }
  }

  return { name: '', content: '' };
};