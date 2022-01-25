import '../styles/globals.css'
import { useState } from 'react';
import AppContext from '../lib/contexts/AppContext';

function MyApp({ Component, pageProps }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <AppContext.Provider
      value={{
        isMenuOpen: isMenuOpen,
        setIsMenuOpen: setIsMenuOpen,
      }}
    >
      <Component {...pageProps} />
    </AppContext.Provider>
  )

}

export default MyApp
