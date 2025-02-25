// import SettingsIcon from './assets/settings.svg';
import LandingPage from './screens/LandingPage';
import { Routes, Route, useLocation } from 'react-router-dom';

import { SiteData } from './contexts/SiteData';
import { useContext } from 'react';
import Timer from './components/Timer';
import Settings from './screens/Settings';
import SettingsIcon from './components/SettingsIcon';
import { getTimerData } from './EncoderDecoder/numberLookup';

type ThemeColors = {
  primary: string;
  secondary: string;
};

const themeMap: Record<number, ThemeColors> = {
  0: { primary: '#F0EDCC', secondary: '#02343F' },
  1: { primary: '#F9EDED', secondary: '#3F418D' },
  2: { primary: '#F8EE00', secondary: '#111A24' },
  3: { primary: '#EF6B6E', secondary: '#F7ED7E' },
  4: { primary: '#FCF7F7', secondary: '#9A0001' },
  5: { primary: '#D3C5E5', secondary: '#735DA5' },
  6: { primary: '#FFF2D7', secondary: '#F98866' },
  7: { primary: '#C2DFE5', secondary: '#65A4AC' },
  8: { primary: '#F1F1F2', secondary: '#1995AD' },
  9: { primary: '#F1D3B2', secondary: '#46211A' },
};

function switchTheme(input?: number): ThemeColors {
  if (!input) {
    return themeMap[0];
  }
  return themeMap[input] || themeMap[0];
}

function Handler() {
  const location = useLocation();
  const themeData = getTimerData(location.pathname.substring(1));
  // console.log(themeData);

  const colours: ThemeColors = switchTheme(themeData.theme.color);

  return (
    <div
      className="w-screen h-screen flex flex-col justify-center items-center"
      style={{ backgroundColor: colours.primary }}
    >
      <SettingsIcon color={colours.secondary} />
      <Routes>
        <Route
          path="/*"
          element={
            <LandingPage color={colours.secondary} color2={colours.primary} />
          }
        />
        <Route path="/settings/:context" element={<Settings />} />
        <Route
          path="/timer/:context"
          element={
            <Timer primary={colours?.primary} secondary={colours?.secondary} />
          }
        />
      </Routes>
      <div
        className="text-xs sm:text-sm absolute right-4 bottom-4"
        style={{ color: colours?.secondary }}
      >
        A project by{' '}
        <span className="underline">
          <a href="https://github.com/poseidon0z">Poseidon0z</a>
        </span>{' '}
        and{' '}
        <span className="underline">
          <a href="https://github.com/Azaken1248">Azaken</a>
        </span>
      </div>
    </div>
  );
}

export default Handler;
