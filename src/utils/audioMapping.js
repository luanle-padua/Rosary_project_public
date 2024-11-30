const createAudioMapping = (language) => ({
  signOfCross: `${language}/signOfCross.mp3`,
  apostlesCreed: `${language}/apostlesCreed.mp3`,
  ourFather: `${language}/ourFather.mp3`,
  hailMary: (repetition) => `${language}/hailMary${repetition}.mp3`,
  gloryBe: `${language}/gloryBe.mp3`,
  fatimaPrayer: `${language}/fatimaPrayer.mp3`,
  hailHolyQueen: `${language}/hailHolyQueen.mp3`,
  finalPrayer: `${language}/finalPrayer.mp3`,
  mystery: (type, index) => `${language}/mysteries/${type}/${index + 1}.mp3`
});

export const getAudioPath = (prayer, language = 'en', options = {}) => {
  const mapping = createAudioMapping(language);
  
  if (typeof mapping[prayer] === 'function') {
    return mapping[prayer](options.repetition || options.mysteryIndex);
  }
  
  return mapping[prayer];
};