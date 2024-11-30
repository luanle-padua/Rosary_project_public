import React from 'react';

const ARTWORK_METADATA = {
  'the-resurrection': {
    title: 'The Resurrection of Christ',
    artist: 'Peter Paul Rubens',
    year: '1611-1612'
  },
  'the-ascension': {
    title: 'The Ascension',
    artist: 'Benjamin West',
    year: 'Unknown'
  },
  'the-descent-of-the-holy-spirit': {
    title: 'Pentecost',
    artist: 'Jean II Restout',
    year: '1732'
  },
  'the-assumption-of-mary': {
    title: 'The Assumption of the Virgin',
    artist: 'Bartolomé Esteban Murillo',
    year: '1670s'
  },
  'the-coronation-of-mary': {
    title: 'The Coronation of the Virgin',
    artist: 'Annibale Carracci',
    year: 'After 1595'
  }
};

const ImageMetadata = ({ imageId }) => {
  const metadata = ARTWORK_METADATA[imageId];

  if (!metadata) return null;

  return (
    <div className="font-secondary">
      <h3 className="text-lg font-medium mb-1">
        {metadata.title}
      </h3>
      <p className="text-sm opacity-80">
        {metadata.artist} • {metadata.year}
      </p>
    </div>
  );
};

export default ImageMetadata;