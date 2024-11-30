import React, { useState, useCallback } from "react";
import { LanguageProvider } from "./contexts/LanguageContext";
import { AudioProvider } from "./contexts/AudioContext";
import ResponsiveLayout from "./components/ResponsiveLayout";
import DesktopLanding from "./components/layout/DesktopLanding";
import MobileLanding from "./components/layout/MobileLanding";
import { useLayoutManager } from "./hooks/useLayoutManager";

const App = () => {
  const [hasStarted, setHasStarted] = useState(() => false);
  const { isMobile } = useLayoutManager();

  const handleStart = useCallback(() => {
    // Prevent potential double invocation
    setHasStarted(true);
  }, []);

  // Prevent unnecessary re-renders
  const landingComponent = isMobile ? (
    <MobileLanding onStart={handleStart} />
  ) : (
    <DesktopLanding onStart={handleStart} />
  );

  const mainComponent = <ResponsiveLayout />;

  return (
    <LanguageProvider>
      <AudioProvider>
        {!hasStarted ? landingComponent : mainComponent}
      </AudioProvider>
    </LanguageProvider>
  );
};

export default App;