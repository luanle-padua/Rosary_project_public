export const ROSARY_SCHEDULE = {
    0: {
      name: 'THE GLORIOUS MYSTERIES',
      mysteries: [
        'The Resurrection',
        'The Ascension',
        'The Descent of the Holy Spirit',
        'The Assumption of Mary',
        'The Coronation of Mary'
      ]
    },
    1: {
      name: 'THE JOYFUL MYSTERIES',
      mysteries: [
        'The Annunciation',
        'The Visitation',
        'The Nativity',
        'The Presentation',
        'The Finding in the Temple'
      ]
    },
    2: {
      name: 'THE SORROWFUL MYSTERIES',
      mysteries: [
        'The Agony in the Garden',
        'The Scourging at the Pillar',
        'The Crowning with Thorns',
        'The Carrying of the Cross',
        'The Crucifixion'
      ]
    },
    3: {
      name: 'THE GLORIOUS MYSTERIES',
      mysteries: [
        'The Resurrection',
        'The Ascension',
        'The Descent of the Holy Spirit',
        'The Assumption of Mary',
        'The Coronation of Mary'
      ]
    },
    4: {
      name: 'THE LUMINOUS MYSTERIES',
      mysteries: [
        'The Baptism in the Jordan',
        'The Wedding at Cana',
        'The Proclamation of the Kingdom',
        'The Transfiguration',
        'The Institution of the Eucharist'
      ]
    },
    5: {
      name: 'THE SORROWFUL MYSTERIES',
      mysteries: [
        'The Agony in the Garden',
        'The Scourging at the Pillar',
        'The Crowning with Thorns',
        'The Carrying of the Cross',
        'The Crucifixion'
      ]
    },
    6: {
      name: 'THE JOYFUL MYSTERIES',
      mysteries: [
        'The Annunciation',
        'The Visitation',
        'The Nativity',
        'The Presentation',
        'The Finding in the Temple'
      ]
    }
  };
  
  export const useTodayRosaryMysteries = (day) => {
    return ROSARY_SCHEDULE[day];
  };