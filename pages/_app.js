import '../styles/globals.css'
import { useState, useEffect } from 'react';
import AppContext from '../lib/contexts/AppContext';
import Cookies from 'js-cookie'

function MyApp({ Component, pageProps }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasCookies, setCookies] = useState(false);
  useEffect(() => {
    if(Cookies.get('hasSuperChoiceCookies')){
      setCookies(true)
    }
  },[hasCookies]);


  return (
    <AppContext.Provider
      value={{
        isMenuOpen: isMenuOpen,
        setIsMenuOpen: setIsMenuOpen,
        hasCookies: hasCookies,
        setCookies: setCookies
      }}
    >
      <Component {...pageProps} />
    </AppContext.Provider>
  )
}

export default MyApp
