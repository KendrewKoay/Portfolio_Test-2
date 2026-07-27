import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, Globe } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface HeaderProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeSection, setActiveSection }) => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { lang, theme, toggleLang, toggleTheme, t } = useApp();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'work', label: t.nav.work },
    { id: 'teaching', label: t.nav.teaching },
    { id: 'research', label: t.nav.research },
    { id: 'about', label: t.nav.about },
    { id: 'contact', label: t.nav.contact },
  ];

  const handleNavClick = (id: string) => {
    setActiveSection(id);
    setMobileNavOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const isLight = theme === 'light';

  return (
    <header
      className={`fixed top-0 left-0 w-full h-[70px] z-50 flex justify-between items-center px-4 md:px-12 border-b transition-all duration-200 ${
        isLight
          ? scrolled
            ? 'bg-[#fcfbf9]/95 backdrop-blur-md border-stone-200 shadow-xs'
            : 'bg-[#fcfbf9]/85 backdrop-blur-sm border-stone-200/60'
          : scrolled
            ? 'bg-[#080808]/95 backdrop-blur-md border-white/10 shadow-lg'
            : 'bg-[#080808]/80 backdrop-blur-sm border-white/10'
      }`}
    >
      {/* Logo & Brand Name */}
      <a
        href="#home"
        onClick={(e) => {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: 'smooth' });
          setActiveSection('home');
        }}
        className="flex items-center gap-3.5 no-underline shrink-0 group"
        id="nav-logo"
      >
        <div
          className={`w-9 h-9 border rotate-45 flex items-center justify-center transition-all duration-300 ${
            isLight
              ? 'border-stone-800 bg-stone-100 group-hover:bg-stone-200 group-hover:border-stone-900'
              : 'border-white/20 bg-[#0a0a0a] group-hover:border-white/50 group-hover:bg-white/10'
          }`}
        >
          <span className={`logo-k-italic text-lg -rotate-45 font-medium transition-colors ${
            isLight ? 'text-stone-900' : 'text-white'
          }`}>K.</span>
        </div>
        <div className={`h-5 w-[1px] hidden sm:block ${isLight ? 'bg-stone-300' : 'bg-white/10'}`}></div>
        <span
          className={`text-sm font-light tracking-[0.2em] uppercase transition-colors ${
            isLight
              ? 'text-stone-900 group-hover:text-stone-600 font-medium'
              : 'text-white group-hover:text-stone-300'
          }`}
        >
          Kendrew Koay 郭肯儒
        </span>
      </a>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-6 lg:gap-8">
        <nav className="flex gap-6 lg:gap-8 items-center text-[11px] uppercase tracking-[0.22em]" id="desktop-nav">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.id);
                }}
                className={`no-underline transition-colors relative py-1.5 ${
                  isActive
                    ? isLight
                      ? 'text-stone-900 font-semibold'
                      : 'text-white font-medium'
                    : isLight
                      ? 'text-stone-500 hover:text-stone-900'
                      : 'text-stone-500 hover:text-stone-200'
                }`}
                id={`nav-link-${item.id}`}
              >
                {item.label}
                {isActive && (
                  <span
                    className={`absolute bottom-0 left-0 w-full h-[1.5px] ${
                      isLight ? 'bg-stone-900' : 'bg-stone-400'
                    }`}
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Controls: Language & Theme Toggles */}
        <div className="flex items-center gap-2 pl-3 border-l border-stone-200 dark:border-white/10">
          {/* Language Switcher Button */}
          <button
            type="button"
            onClick={toggleLang}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-mono tracking-wider transition-all cursor-pointer border ${
              isLight
                ? 'bg-stone-100 hover:bg-stone-200 text-stone-800 border-stone-200'
                : 'bg-white/10 hover:bg-white/20 text-stone-200 border-white/10'
            }`}
            id="lang-toggle-btn"
            title="Switch Language / 切换语言"
            aria-label="Toggle language between English and Chinese"
          >
            <Globe className="w-3.5 h-3.5" />
            <span className="font-semibold">{lang === 'en' ? 'EN' : '中文'}</span>
            <span className="text-[9px] opacity-60">({lang === 'en' ? '中文' : 'EN'})</span>
          </button>

          {/* Theme Switcher Button */}
          <button
            type="button"
            onClick={toggleTheme}
            className={`p-2 rounded-full transition-all cursor-pointer border ${
              isLight
                ? 'bg-stone-100 hover:bg-stone-200 text-stone-800 border-stone-200'
                : 'bg-white/10 hover:bg-white/20 text-stone-200 border-white/10'
            }`}
            id="theme-toggle-btn"
            title={isLight ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
            aria-label="Toggle light/dark theme"
          >
            {isLight ? <Moon className="w-4 h-4 text-stone-700" /> : <Sun className="w-4 h-4 text-amber-300" />}
          </button>
        </div>
      </div>

      {/* Mobile Controls & Hamburger Button */}
      <div className="flex md:hidden items-center gap-2">
        {/* Language Switcher Mobile */}
        <button
          type="button"
          onClick={toggleLang}
          className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-semibold transition-all cursor-pointer border ${
            isLight
              ? 'bg-stone-100 text-stone-800 border-stone-300'
              : 'bg-white/10 text-stone-200 border-white/20'
          }`}
          id="mobile-lang-toggle-btn"
        >
          {lang === 'en' ? '中文' : 'EN'}
        </button>

        {/* Theme Switcher Mobile */}
        <button
          type="button"
          onClick={toggleTheme}
          className={`p-1.5 rounded-full transition-all cursor-pointer border ${
            isLight
              ? 'bg-stone-100 text-stone-800 border-stone-300'
              : 'bg-white/10 text-stone-200 border-white/20'
          }`}
          id="mobile-theme-toggle-btn"
        >
          {isLight ? <Moon className="w-4 h-4 text-stone-700" /> : <Sun className="w-4 h-4 text-amber-300" />}
        </button>

        <button
          type="button"
          onClick={() => setMobileNavOpen(!mobileNavOpen)}
          className={`p-2 focus:outline-hidden ${isLight ? 'text-stone-800' : 'text-stone-300'}`}
          aria-label="Toggle navigation menu"
          id="hamburger-btn"
        >
          {mobileNavOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Nav Overlay */}
      {mobileNavOpen && (
        <div
          className={`fixed top-[70px] left-0 w-full shadow-2xl flex flex-col z-40 md:hidden animate-in slide-in-from-top-2 duration-200 border-b ${
            isLight ? 'bg-[#fcfbf9] border-stone-200' : 'bg-[#080808] border-white/10'
          }`}
          id="mobile-nav-menu"
        >
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(item.id);
              }}
              className={`no-underline text-xs uppercase tracking-[0.25em] px-8 py-4 border-b transition-colors ${
                isLight
                  ? 'text-stone-800 border-stone-200/60 hover:bg-stone-100'
                  : 'text-stone-300 border-white/5 hover:bg-white/5'
              }`}
              id={`mobile-nav-link-${item.id}`}
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
};

