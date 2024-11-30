import React, { useState, useEffect } from 'react';

const InteractiveRosary = ({ activeBeadId, isPlaying, mysteryIndex, prayerSection = 'opening' }) => {
    console.log('InteractiveRosary Props:', {
        activeBeadId,
        isPlaying,
        mysteryIndex,
        prayerSection
    });

    const [clickedState, setClickedState] = useState({});

    const handleClick = (id) => {
        if (isPlaying) return;
        setClickedState(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    const getFill = (id) => {
        console.log('getFill called for id:', id, {
            isMysteryBead: id.startsWith('middle-'),
            mysteryIndex,
            prayerSection,
            shouldHighlightMystery: id.startsWith('middle-') && 
                parseInt(id.split('-')[1]) === mysteryIndex && 
                prayerSection === 'decade'
        });

        // Check if this is a mystery bead
        if (id.startsWith('middle-')) {
            const thisCircleIndex = parseInt(id.split('-')[1]);
            // Keep mystery bead highlighted during its decade
            if (thisCircleIndex === mysteryIndex && prayerSection === 'decade') {
                return 'darkorange';
            }
        }

        // Highlight active prayer bead without affecting mystery bead highlight
        if (id === activeBeadId) {
            return 'darkorange';
        }

        // Default state
        return 'white';
    };

    const createGlowEffect = (id) => {
        // Apply glow to both mystery bead and active prayer bead
        if ((id.startsWith('middle-') && parseInt(id.split('-')[1]) === mysteryIndex && prayerSection === 'decade') 
            || id === activeBeadId) {
            return {
                filter: 'url(#glow)',
                animation: 'glowPulse 2s infinite'
            };
        }
        return {};
    };

    useEffect(() => {
        // Add any event listeners here
        
        return () => {
            // Cleanup event listeners
        };
    }, []);

    return (
        <div className="rosary-container">
            <svg viewBox="0 0 170 501.32">
                <defs>
                    <filter id="glow">
                        <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {/* String paths */}
                <path
                    d="M119,327.9V486.23a14.6,14.6,0,0,0,14.6,14.6h0a14.59,14.59,0,0,0,14.6-14.6V442.54"
                    fill="none"
                    stroke="#b3b3b3"
                    strokeWidth="0.98"
                    strokeMiterlimit="10"
                />
                <path
                    d="M12.2,55.68V193.31a12.59,12.59,0,0,0,12.59,12.58h0a12.58,12.58,0,0,0,12.58-12.58V114.18A21.63,21.63,0,0,1,59,92.55h0a21.62,21.62,0,0,1,21.63,21.63V332.65a19.18,19.18,0,0,0,19.18,19.18h0A19.17,19.17,0,0,0,119,332.65V70.28a14.6,14.6,0,0,1,14.6-14.6h0a14.6,14.6,0,0,1,14.6,14.6v395.2"
                    fill="none"
                    stroke="#b3b3b3"
                    strokeWidth="0.98"
                    strokeMiterlimit="10"
                />
                <line
                    x1="80.64"
                    y1="332.13"
                    x2="80.64"
                    y2="395.9"
                    fill="none"
                    stroke="#b3b3b3"
                    strokeWidth="0.98"
                    strokeMiterlimit="10"
                />

                {/* Cross */}
                <path
                    d="M13.1,0V11.5H24.4V13H13.1V32.22H11.35V13H0V11.5H11.35V0Z"
                    style={{
                        fill: getFill('cross'),
                        ...createGlowEffect('cross')
                    }}
                    onClick={() => handleClick('cross')}
                />

                {/* Right side beads (Decades) */}
                {[124.89, 159.29, 193.69, 228.1, 262.5, 296.9, 331.31, 365.71, 400.11, 434.52]
                    .map((cy, i) => (
                        <circle
                            key={`right-${i}`}
                            cx="148.2"
                            cy={cy}
                            r="12.2"
                            style={{
                                fill: getFill(`right-${i}`),
                                ...createGlowEffect(`right-${i}`)
                            }}
                            onClick={() => handleClick(`right-${i}`)}
                        />
                    ))}

                {/* Mystery centerpieces */}
                {[129.25, 173.16, 217.07, 260.98, 304.89].map((cy, i) => (
                    <circle
                        key={`middle-${i}`}
                        cx="80.64"
                        cy={cy}
                        r="16.57"
                        style={{
                            fill: getFill(`middle-${i}`),
                            ...createGlowEffect(`middle-${i}`)
                        }}
                        onClick={() => handleClick(`middle-${i}`)}
                    />
                ))}

                {/* Left side beads (Opening) */}
                {[82.96, 112.68, 142.4].map((cy, i) => (
                    <circle
                        key={`left-${i}`}
                        cx="12.2"
                        cy={cy}
                        r="12.2"
                        style={{
                            fill: getFill(`left-${i}`),
                            ...createGlowEffect(`left-${i}`)
                        }}
                        onClick={() => handleClick(`left-${i}`)}
                    />
                ))}

                {/* Double-ringed beads */}
                {[
                    { cx: 12.2, cy: 169.68 },   // double-0
                    { cx: 148.2, cy: 92.92 },   // double-1
                    { cx: 148.2, cy: 466.48 },  // double-2
                    { cx: 12.2, cy: 55.68 }     // double-3
                ].map((pos, i) => (
                    <g key={`double-${i}`} onClick={() => handleClick(`double-${i}`)}>
                        <circle
                            cx={pos.cx}
                            cy={pos.cy}
                            r="9.76"
                            fill="none"
                            stroke="white"
                            strokeWidth="0.69"
                            strokeMiterlimit="10"
                        />
                        <circle
                            cx={pos.cx}
                            cy={pos.cy}
                            r="7.32"
                            style={{
                                fill: getFill(`double-${i}`),
                                ...createGlowEffect(`double-${i}`)
                            }}
                        />
                    </g>
                ))}

                {/* Center medal */}
                <g onClick={() => handleClick('center')}>
                    <circle
                        cx="80.64"
                        cy="400.11"
                        r="14.25"
                        style={{
                            fill: getFill('center'),
                            ...createGlowEffect('center')
                        }}
                    />
                    <path 
                        d="M88.11,406.36a2.57,2.57,0,0,1-.29-1l-1.39-10.06a4.35,4.35,0,0,1-.06-.62,1,1,0,0,1,1.07-1.11v-.13h-2.1l-2.74,6.36-1.86-4.58h-.12l-1.86,4.65L76,393.48h-2.5v.13a1.62,1.62,0,0,1,.71.18,2.06,2.06,0,0,1,.74,1.07l-1.52,10.73a2.82,2.82,0,0,1-.11.55.62.62,0,0,1-.2.36,1,1,0,0,1-.59.12v.13h2v-.13c-.41,0-.61-.18-.61-.52a2.64,2.64,0,0,1,0-.51l1.34-9.81L78,401.86,77,404.18a2.55,2.55,0,0,1-.18.31c-.12.2-.23.31-.34.34a1.88,1.88,0,0,1-.31,0v.1h1.43v-.1c-.22,0-.34-.06-.34-.2a.69.69,0,0,1,.06-.24l.83-2.07,1.92,4.39h.09L82.27,402l1,2.47a.59.59,0,0,1,0,.21c0,.16-.1.24-.29.23v.1h2.2v-.1a.9.9,0,0,1-.48-.15,2.77,2.77,0,0,1-.59-1.05l-1.27-3.12L85,395.76l1.36,9.75a4.54,4.54,0,0,1,.06.53.51.51,0,0,1-.6.58v.13h3v-.13A.88.88,0,0,1,88.11,406.36Zm-7.45-2L79,400.41l1.33-3.33L82,401.25Z"
                        style={{
                            fill: activeBeadId === 'center' || clickedState['center'] ? '#ffffff' : '#241102',
                        }}
                    />
                </g>
            </svg>
        </div>
    );
};

export default InteractiveRosary;