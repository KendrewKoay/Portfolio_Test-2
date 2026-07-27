import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, Theme, translations } from '../data/translations';

interface AppContextType {
  lang: Language;
  theme: Theme;
  setLang: (lang: Language) => void;
  setTheme: (theme: Theme) => void;
  toggleLang: () => void;
  toggleTheme: () => void;
  t: typeof translations['en'];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const getInitialTheme = (): Theme => {
  if (typeof window === 'undefined') return 'light';
  try {
    const saved = localStorage.getItem('portfolio_theme') as Theme | null;
    if (saved === 'light' || saved === 'dark') {
      return saved;
    }
  } catch {
    // Local storage unavailable or blocked
  }
  
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  return 'light';
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>(getInitialTheme);
  const [lang, setLangState] = useState<Language>(() => {
    if (typeof window === 'undefined') return 'en';
    try {
      const savedLang = localStorage.getItem('portfolio_lang') as Language | null;
      if (savedLang === 'en' || savedLang === 'zh') return savedLang;
    } catch {
      // ignore
    }
    return 'en';
  });

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    try {
      localStorage.setItem('portfolio_theme', newTheme);
    } catch {
      // ignore
    }
  };

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    try {
      localStorage.setItem('portfolio_lang', newLang);
    } catch {
      // ignore
    }
  };

  // Sync language attribute to document root
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  // Sync theme changes to document root
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.body.style.backgroundColor = '#050505';
      document.body.style.color = '#d6d3d1';
    } else {
      document.documentElement.classList.remove('dark');
      document.body.style.backgroundColor = '#fcfbf9';
      document.body.style.color = '#1c1917';
    }
  }, [theme]);

  // Listen for system theme changes if user hasn't explicitly saved a preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      try {
        const saved = localStorage.getItem('portfolio_theme');
        if (!saved) {
          setThemeState(e.matches ? 'dark' : 'light');
        }
      } catch {
        setThemeState(e.matches ? 'dark' : 'light');
      }
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleSystemThemeChange);
    } else if ('addListener' in mediaQuery) {
      (mediaQuery as { addListener: (cb: (e: MediaQueryListEvent) => void) => void }).addListener(handleSystemThemeChange);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleSystemThemeChange);
      } else if ('removeListener' in mediaQuery) {
        (mediaQuery as { removeListener: (cb: (e: MediaQueryListEvent) => void) => void }).removeListener(handleSystemThemeChange);
      }
    };
  }, []);

  const toggleLang = () => {
    setLang(lang === 'en' ? 'zh' : 'en');
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const t = translations[lang];

  return (
    <AppContext.Provider
      value={{
        lang,
        theme,
        setLang,
        setTheme,
        toggleLang,
        toggleTheme,
        t,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

