import React from 'react';
import { Pencil, ArrowLeftRight, Layers, ArrowDownRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface HeroProps {
  onExploreClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick }) => {
  const { theme, lang, t } = useApp();
  const isLight = theme === 'light';
  const [imgSrc, setImgSrc] = React.useState('images/profile.jpg');

  const handleImageError = () => {
    if (imgSrc === 'images/profile.jpg') {
      setImgSrc('profile.jpg');
    } else if (imgSrc === 'profile.jpg') {
      setImgSrc('/images/profile.jpg');
    }
  };

  return (
    <section className="pt-8 pb-6 md:pt-12 md:pb-8" id="home">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Main Content */}
        <div className="lg:col-span-7 xl:col-span-8 space-y-6">
          {/* Eyebrow Label */}
          <div className="flex items-center gap-3">
            <span className={`w-8 h-[1px] ${isLight ? 'bg-stone-400' : 'bg-stone-600'}`}></span>
            <p className={`uppercase tracking-[0.2em] text-[10px] font-bold ${isLight ? 'text-stone-600' : 'text-stone-500'}`}>
              {t.hero.eyebrow}
            </p>
          </div>

          {/* Main Title */}
          <h1 className={`text-4xl sm:text-6xl md:text-7xl leading-[1.1] tracking-tight ${
            lang === 'zh'
              ? 'font-zh-serif not-italic font-bold'
              : 'font-serif-italic italic'
          } ${isLight ? 'text-stone-900' : 'text-white'}`}>
            {t.hero.titlePart1}
            <span className={`font-sans font-light ${lang === 'zh' ? 'not-italic px-1 text-stone-600 dark:text-stone-400' : 'not-italic ' + (isLight ? 'text-stone-600' : 'text-stone-500')}`}>
              {t.hero.titleDialogue}
            </span>
            {t.hero.titlePart2}
            <span className={
              lang === 'zh'
                ? (isLight ? 'text-stone-800 font-zh-serif not-italic' : 'text-stone-300 font-zh-serif not-italic')
                : (isLight ? 'text-stone-700 font-serif-italic' : 'text-stone-400')
            }>
              {t.hero.titleCatalyst}
            </span>
          </h1>

          {/* Subtitle */}
          <div className={`text-lg md:text-xl font-light max-w-2xl border-l pl-6 py-1 ${isLight ? 'text-stone-700 border-stone-300' : 'text-stone-400 border-stone-800'}`}>
            {t.hero.subtitle}
          </div>

          {/* Pillars / Tags */}
          <div className={`flex flex-wrap gap-x-6 gap-y-2 text-xs uppercase tracking-[0.2em] items-center pt-2 ${isLight ? 'text-stone-600' : 'text-stone-500'}`}>
            <span className="flex items-center gap-2">
              <Pencil className={`w-3.5 h-3.5 ${isLight ? 'text-stone-700' : 'text-stone-400'}`} /> {t.hero.pillars.graphic}
            </span>
            <span className="flex items-center gap-2">
              <ArrowLeftRight className={`w-3.5 h-3.5 ${isLight ? 'text-stone-700' : 'text-stone-400'}`} /> {t.hero.pillars.theory}
            </span>
            <span className="flex items-center gap-2">
              <Layers className={`w-3.5 h-3.5 ${isLight ? 'text-stone-700' : 'text-stone-400'}`} /> {t.hero.pillars.visualComm}
            </span>
          </div>

          {/* CTA Button */}
          <div className="pt-2 flex flex-wrap gap-3 items-center">
            <button
              type="button"
              onClick={onExploreClick}
              className={`inline-flex items-center gap-2.5 px-6 py-3 rounded-full text-xs uppercase tracking-[0.2em] font-semibold transition-all cursor-pointer shadow-md group ${
                isLight
                  ? 'bg-stone-900 text-white hover:bg-stone-800 hover:shadow-lg'
                  : 'bg-[#080808] border border-white/20 hover:border-white/50 text-stone-200 hover:text-white'
              }`}
              id="hero-explore-btn"
            >
              {t.hero.exploreBtn}
              <ArrowDownRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* Hero Portrait Photo */}
        <div className="lg:col-span-5 xl:col-span-4 flex justify-center lg:justify-end">
          <div className={`relative w-full max-w-sm aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl group border ${
            isLight ? 'border-stone-300 bg-stone-100' : 'border-white/10 bg-[#080808]'
          }`}>
            <img
              src={imgSrc}
              alt={t.hero.portraitName}
              onError={handleImageError}
              className="w-full h-full object-cover object-center grayscale contrast-110 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700 ease-out"
              referrerPolicy="no-referrer"
              id="hero-portrait-img"
            />
            {/* Gradient Overlay */}
            <div className={`absolute inset-0 pointer-events-none ${
              isLight ? 'bg-gradient-to-t from-stone-950/70 via-transparent to-transparent' : 'bg-gradient-to-t from-black/80 via-black/20 to-transparent'
            }`} />
            
            {/* Badge overlay */}
            <div
              className={`absolute bottom-4 left-4 right-4 p-3.5 backdrop-blur-md rounded-2xl flex items-center justify-between border ${
                isLight
                  ? 'bg-white/85 border-stone-200 shadow-md text-stone-900'
                  : 'bg-black/70 border-white/10 text-white'
              }`}
              id="hero-portrait-badge"
            >
              <div>
                <p className={`text-xs font-semibold tracking-wide ${isLight ? 'text-stone-900' : 'text-white'}`}>
                  {t.hero.portraitName}
                </p>
                <p className={`text-[10px] font-mono ${isLight ? 'text-stone-600' : 'text-stone-400'}`}>
                  {t.hero.portraitTitle}
                </p>
              </div>
              <div className="flex items-center gap-1.5 bg-emerald-950/80 border border-emerald-500/30 px-2.5 py-1 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[9px] font-mono text-emerald-300 uppercase tracking-wider">{t.hero.activeStatus}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
