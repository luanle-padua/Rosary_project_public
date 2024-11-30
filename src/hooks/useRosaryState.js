import { useReducer, useCallback, useEffect, useRef } from "react"
import { useLanguage } from "../contexts/LanguageContext"
import { PRAYER_TIMINGS, SPEED_OPTIONS } from "../constants/rosaryConstants"
import { getMysteryTypeFromDay } from "../utils/mysteryImages"
import { getActiveBeadId } from "../utils/rosaryMapping"
import { useAudioContext } from "../contexts/AudioContext"

// Helper function to get prayer structure based on section
const getPrayerStructure = (state) => {
  switch (state.prayerSection) {
    case "opening":
      return [
        { prayer: "signOfCross" },
        { prayer: "apostlesCreed" },
        { prayer: "ourFather" },
        { prayer: "hailMary", repeats: 3 },
        { prayer: "gloryBe" },
      ]
    case "decade":
      return [
        { prayer: "mystery" },
        { prayer: "ourFather" },
        { prayer: "hailMary", repeats: 10 },
        { prayer: "gloryBe" },
        { prayer: "fatimaPrayer" },
      ]
    case "closing":
      return [
        { prayer: "hailHolyQueen" },
        { prayer: "finalPrayer" },
        { prayer: "signOfCross" },
      ]
    default:
      return []
  }
}

const initialState = {
  // Core state
  selectedDate: new Date(),
  currentMysteryIndex: 0,
  currentPrayerIndex: 0,
  prayerSection: "opening",
  currentRepetition: 1,

  // Playback state
  isPlaying: false,
  speed: 1.0, // Set default speed
  isMuted: false,

  // UI state
  activeBeadId: null,
  progressText: "",
}

const rosaryReducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE_MUTE":
      return { ...state, isMuted: !state.isMuted }
    case "TOGGLE_PLAYBACK":
      return { ...state, isPlaying: !state.isPlaying }

    case "STOP":
      return {
        ...initialState,
        selectedDate: state.selectedDate,
        isMuted: state.isMuted,
        speed: state.speed, // Preserve speed setting
      }
    case "SET_SPEED":
      return {
        ...state,
        speed: action.payload,
      }
    case "SET_DATE":
      return { ...state, selectedDate: action.payload }

    case "SET_ACTIVE_BEAD":
      return { ...state, activeBeadId: action.payload }

    case "SET_PROGRESS_TEXT":
      return { ...state, progressText: action.payload }

    case "TOGGLE_MUTE":
      return { ...state, isMuted: !state.isMuted }

    case "NEXT_PRAYER": {
      const {
        currentRepetition,
        currentPrayerIndex,
        prayerSection,
        currentMysteryIndex,
      } = state
      const structure = getPrayerStructure(state)
      const currentStep = structure[currentPrayerIndex]

      // Handle repetitions for Hail Marys
      if (currentStep?.prayer === "hailMary") {
        const maxRepetitions = prayerSection === "opening" ? 3 : 10
        if (currentRepetition < maxRepetitions) {
          return {
            ...state,
            currentRepetition: currentRepetition + 1,
          }
        }
      }

      // Move to next prayer within section
      if (currentPrayerIndex < structure.length - 1) {
        return {
          ...state,
          currentPrayerIndex: currentPrayerIndex + 1,
          currentRepetition: 1,
        }
      }

      // Handle section transitions
      switch (prayerSection) {
        case "opening":
          return {
            ...state,
            prayerSection: "decade",
            currentPrayerIndex: 0,
            currentRepetition: 1,
          }

        case "decade":
          if (currentMysteryIndex < 4) {
            return {
              ...state,
              currentMysteryIndex: currentMysteryIndex + 1,
              currentPrayerIndex: 0,
              currentRepetition: 1,
            }
          } else {
            return {
              ...state,
              prayerSection: "closing",
              currentPrayerIndex: 0,
              currentRepetition: 1,
            }
          }

        case "closing":
          return {
            ...initialState,
            selectedDate: state.selectedDate,
            isMuted: state.isMuted,
          }

        default:
          return state
      }
    }

    case "PREVIOUS_PRAYER": {
      const {
        currentRepetition,
        currentPrayerIndex,
        prayerSection,
        currentMysteryIndex,
      } = state
      const structure = getPrayerStructure(state)
      const currentStep = structure[currentPrayerIndex]

      // Handle repetitions
      if (currentStep?.prayer === "hailMary" && currentRepetition > 1) {
        return {
          ...state,
          currentRepetition: currentRepetition - 1,
        }
      }

      // Move to previous prayer within section
      if (currentPrayerIndex > 0) {
        const prevStep = structure[currentPrayerIndex - 1]
        return {
          ...state,
          currentPrayerIndex: currentPrayerIndex - 1,
          currentRepetition:
            prevStep?.prayer === "hailMary"
              ? prayerSection === "opening"
                ? 3
                : 10
              : 1,
        }
      }

      // Handle section transitions
      switch (prayerSection) {
        case "decade":
          if (currentMysteryIndex > 0) {
            return {
              ...state,
              currentMysteryIndex: currentMysteryIndex - 1,
              currentPrayerIndex: structure.length - 1,
              currentRepetition: 1,
            }
          } else {
            const openingStructure = getPrayerStructure({
              ...state,
              prayerSection: "opening",
            })
            return {
              ...state,
              prayerSection: "opening",
              currentPrayerIndex: openingStructure.length - 1,
              currentRepetition: 1,
            }
          }

        case "closing":
          return {
            ...state,
            prayerSection: "decade",
            currentMysteryIndex: 4,
            currentPrayerIndex: structure.length - 1,
            currentRepetition: 1,
          }

        default:
          return state
      }
    }

    default:
      return state
  }
}

const getCurrentPrayer = (state, rosary, currentMysteryType, currentLanguage) => {
  const structure = getPrayerStructure(state)
  const currentStep = structure[state.currentPrayerIndex]

  if (!currentStep) return { name: "", content: "" }

  if (currentStep.prayer === "mystery") {
    const mystery =
      rosary.mysteries[currentMysteryType.toLowerCase()]?.mysteries[
        state.currentMysteryIndex
      ]
    return {
      name: mystery?.title || "",
      content: mystery?.meditation || "",
    }
  }

  const prayerContent = rosary.commonPrayers[currentStep.prayer] || ""
  const baseName = rosary.prayerNames[currentStep.prayer] || currentStep.prayer

  if (currentStep.prayer === "hailMary") {
    const maxReps = state.prayerSection === "opening" ? 3 : 10
    if (state.prayerSection === "opening") {
      const intentions = {
        en: ["Faith", "Hope", "Charity"],
        vi: ["Đức Tin", "Đức Cậy", "Đức Mến"]
      }
      const currentIntention = intentions[currentLanguage][state.currentRepetition - 1]
      return {
        name: `${baseName} (${currentIntention})`,
        content: prayerContent,
      }
    } else {
      return {
        name: `${baseName} (${state.currentRepetition}/${maxReps})`,
        content: prayerContent,
      }
    }
  }

  return {
    name: baseName,
    content: prayerContent,
  }
}

export const useRosaryState = () => {
  const { t, rosary, currentLanguage } = useLanguage() // Properly destructure currentLanguage
  const {
    playPrayer,
    pause,
    resume,
    stop: stopAudio,
    toggleMute: toggleAudioMute,
    onVolumeChange,
    volume
  } = useAudioContext();
  const [state, dispatch] = useReducer(rosaryReducer, initialState)
  const timeoutRef = useRef(null)
  const originalTimingRef = useRef(null)
  const currentPrayerRef = useRef(null)
  const currentMysteryType = getMysteryTypeFromDay(state.selectedDate.getDay())

  // Update active bead ID whenever relevant state changes
  useEffect(() => {
    const activeBeadId = getActiveBeadId(
      state.currentMysteryIndex,
      state.prayerSection,
      state.currentPrayerIndex,
      state.currentRepetition
    )
    if (activeBeadId !== state.activeBeadId) {
      dispatch({ type: "SET_ACTIVE_BEAD", payload: activeBeadId })
    }
  }, [
    state.currentMysteryIndex,
    state.prayerSection,
    state.currentPrayerIndex,
    state.currentRepetition,
  ])

  // Handle auto-advance during playback
  // Update the playback effect to use language-specific timing
  useEffect(() => {
    if (state.isPlaying) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      const structure = getPrayerStructure(state);
      const currentStep = structure[state.currentPrayerIndex];

      if (currentStep) {
        const shouldRestartAudio = currentPrayerRef.current !== `${currentStep.prayer}_${state.currentRepetition}`;
        
        if (shouldRestartAudio) {
          currentPrayerRef.current = `${currentStep.prayer}_${state.currentRepetition}`;
          
          let hasTriggeredEnd = false;
          const handlePrayerEnd = () => {
            if (hasTriggeredEnd) return;
            hasTriggeredEnd = true;
            
            console.log(`Prayer ended: ${currentStep.prayer} (${state.currentRepetition})`);
            originalTimingRef.current = null;
            currentPrayerRef.current = null;
            dispatch({ type: "NEXT_PRAYER" });
          };

          if (currentStep.prayer === "mystery") {
            playPrayer("mystery", {
              mysteryTitle: rosary.mysteries[currentMysteryType.toLowerCase()]?.mysteries[state.currentMysteryIndex]?.title,
              speed: state.speed,
              onEnded: handlePrayerEnd
            });
          } else if (currentStep.prayer === "hailMary") {
            playPrayer("hailMary", {
              repetition: state.currentRepetition,
              speed: state.speed,
              onEnded: handlePrayerEnd
            });
          } else {
            playPrayer(currentStep.prayer, {
              speed: state.speed,
              onEnded: handlePrayerEnd
            });
          }

          // Log timing information
          const baseTiming = PRAYER_TIMINGS[currentLanguage][currentStep.prayer];
          const adjustedTiming = Math.floor(baseTiming / state.speed);
          console.log(`Prayer: ${currentStep.prayer} (${state.currentRepetition}/${currentStep.repeats || 1})`);
          console.log(`Base Duration: ${baseTiming}ms`);
          console.log(`Adjusted Duration (${state.speed}x): ${adjustedTiming}ms`);
          console.log('------------------------');
        }
      }
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [state.isPlaying, state.currentPrayerIndex, state.currentRepetition, state.speed, currentLanguage]);

  // Add this effect after the main playback effect
  useEffect(() => {
    if (state.isPlaying) {
      // Clear existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      const structure = getPrayerStructure(state);
      const currentStep = structure[state.currentPrayerIndex];

      if (currentStep) {
        // Immediately update audio speed
        playPrayer(currentStep.prayer, {
          mysteryTitle: currentStep.prayer === "mystery" ? 
            rosary.mysteries[currentMysteryType.toLowerCase()]?.mysteries[state.currentMysteryIndex]?.title : undefined,
          repetition: currentStep.prayer === "hailMary" ? state.currentRepetition : undefined,
          speed: state.speed,
          maintainPosition: true // Add this flag to maintain current position
        });

        // Recalculate remaining time with new speed
        const baseTiming = PRAYER_TIMINGS[currentLanguage][currentStep.prayer];
        const adjustedTiming = Math.floor(baseTiming / state.speed);
        
        timeoutRef.current = setTimeout(() => {
          originalTimingRef.current = null;
          currentPrayerRef.current = null;
          dispatch({ type: "NEXT_PRAYER" });
        }, adjustedTiming);
      }
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [state.speed]); // Only trigger on speed changes

  // Actions
  const actions = {
    handlePlayPause: useCallback(() => {
      if (state.isPlaying) {
        pause()
      } else {
        resume()
      }
      dispatch({ type: "TOGGLE_PLAYBACK" })
    }, [state.isPlaying, pause, resume]),

    handleStop: useCallback(() => {
      stopAudio()
      dispatch({ type: "STOP" })
    }, [stopAudio]),

    handleNextPrayer: useCallback(() => {
      if (!state.isPlaying) {
        dispatch({ type: "NEXT_PRAYER" })
      }
    }, [state.isPlaying]),

    handlePreviousPrayer: useCallback(() => {
      if (!state.isPlaying) {
        dispatch({ type: "PREVIOUS_PRAYER" })
      }
    }, [state.isPlaying]),

    handleDateChange: useCallback((newDate) => {
      dispatch({ type: "SET_DATE", payload: newDate })
    }, []),
    handleSpeedChange: useCallback((newSpeed) => {
      if ([1.0, 1.1, 1.2, 1.3].includes(newSpeed)) {
        dispatch({ type: "SET_SPEED", payload: newSpeed })
      }
    }, []),
    toggleMute: useCallback(() => {
      toggleAudioMute()
      dispatch({ type: "TOGGLE_MUTE" })
    }, [toggleAudioMute]),
  }
    // Add keyboard control effect after defining actions
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      switch (e.code) {
        case 'Space':
          e.preventDefault();
          actions.handlePlayPause();
          break;
        case 'Escape':  // Add Escape key for stop
          e.preventDefault();
          actions.handleStop();
          break;
        case 'ArrowUp':
          e.preventDefault();
          if (!state.isPlaying) {
            actions.handlePreviousPrayer();
          }
          break;
        case 'ArrowDown':
          e.preventDefault();
          if (!state.isPlaying) {
            actions.handleNextPrayer();
          }
          break;
        case 'ArrowLeft':
          e.preventDefault();
          // Show volume slider and adjust volume
          onVolumeChange(Math.max(0, volume - 0.1));
          break;
        case 'ArrowRight':
          e.preventDefault();
          // Show volume slider and adjust volume
          onVolumeChange(Math.min(1, volume + 0.1));
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [actions, onVolumeChange, volume, state.isPlaying]);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key.toLowerCase() === 's') {
        const currentSpeedIndex = SPEED_OPTIONS.indexOf(state.speed);
        const nextSpeedIndex = (currentSpeedIndex + 1) % SPEED_OPTIONS.length;
        dispatch({ type: "SET_SPEED", payload: SPEED_OPTIONS[nextSpeedIndex] });
        
        // Log speed change for debugging
        console.log(`Speed changed to: ${SPEED_OPTIONS[nextSpeedIndex]}x`);
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [state.speed]);

  return {
    state: {
      ...state,
      mysteryType: currentMysteryType,
    },
    actions,
    currentPrayer: getCurrentPrayer(state, rosary, currentMysteryType, currentLanguage),
    currentMystery: rosary.mysteries[currentMysteryType.toLowerCase()]?.mysteries[state.currentMysteryIndex],
  }
}

export default useRosaryState
