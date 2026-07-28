import React, { useState } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface AboutSectionProps {
  onContactClick: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onContactClick }) => {
  const [activeTab, setActiveTab] = useState<'bio' | 'philosophy' | 'cv'>('bio');
  const { theme, lang, t } = useApp();
  const isLight = theme === 'light';

  return (
    <section className="scroll-mt-24 py-8" id="about">
      {/* Main About Block */}
      <div className={`p-8 md:p-12 rounded-[32px] border flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 shadow-2xl relative overflow-hidden ${
        isLight
          ? 'bg-white border-stone-200/90 text-stone-900 shadow-md'
          : 'bg-[#080808] border-white/10 text-stone-200'
      }`}>
        {/* Decorative corner line */}
        <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl pointer-events-none ${
          isLight ? 'from-stone-200/50 to-transparent' : 'from-white/5 to-transparent'
        }`} />

        <div className="max-w-2xl space-y-5">
          <div className="flex items-center gap-3">
            <span className={`w-6 h-[1px] ${isLight ? 'bg-stone-400' : 'bg-stone-600'}`}></span>
            <p className={`uppercase tracking-[0.3em] text-[10px] font-bold ${isLight ? 'text-stone-600' : 'text-stone-500'}`}>
              {t.about.sectionTitle}
            </p>
          </div>

          <h2 className={`text-2xl sm:text-4xl leading-tight ${
            lang === 'zh' ? 'font-zh-serif not-italic font-bold' : 'font-serif-italic italic'
          } ${
            isLight ? 'text-stone-900' : 'text-white'
          }`}>
            {t.about.heading}
          </h2>

          <p className={`text-sm leading-relaxed font-light ${
            isLight ? 'text-stone-700' : 'text-stone-300'
          }`}>
            {t.about.body1}
          </p>

          <p className={`text-xs font-mono ${isLight ? 'text-stone-500' : 'text-stone-400'}`}>
            {t.about.body2}
          </p>

          {/* Tab Navigation */}
          <div className={`flex gap-2 pt-3 border-t ${isLight ? 'border-stone-200' : 'border-white/10'}`}>
            <button
              type="button"
              onClick={() => setActiveTab('bio')}
              className={`px-3.5 py-1 rounded-full text-[11px] font-mono uppercase tracking-wider cursor-pointer transition-colors ${
                activeTab === 'bio'
                  ? isLight
                    ? 'bg-stone-900 text-white font-semibold'
                    : 'bg-white text-black font-semibold'
                  : isLight
                    ? 'text-stone-600 hover:text-stone-900 bg-stone-100'
                    : 'text-stone-400 hover:text-white bg-white/5'
              }`}
            >
              {t.about.tabs.overview}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('philosophy')}
              className={`px-3.5 py-1 rounded-full text-[11px] font-mono uppercase tracking-wider cursor-pointer transition-colors ${
                activeTab === 'philosophy'
                  ? isLight
                    ? 'bg-stone-900 text-white font-semibold'
                    : 'bg-white text-black font-semibold'
                  : isLight
                    ? 'text-stone-600 hover:text-stone-900 bg-stone-100'
                    : 'text-stone-400 hover:text-white bg-white/5'
              }`}
            >
              {t.about.tabs.philosophy}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('cv')}
              className={`px-3.5 py-1 rounded-full text-[11px] font-mono uppercase tracking-wider cursor-pointer transition-colors ${
                activeTab === 'cv'
                  ? isLight
                    ? 'bg-stone-900 text-white font-semibold'
                    : 'bg-white text-black font-semibold'
                  : isLight
                    ? 'text-stone-600 hover:text-stone-900 bg-stone-100'
                    : 'text-stone-400 hover:text-white bg-white/5'
              }`}
            >
              {t.about.tabs.cv}
            </button>
          </div>

          {activeTab === 'philosophy' && (
            <div className={`p-4 rounded-2xl text-xs space-y-2 border animate-in fade-in duration-200 ${
              isLight ? 'bg-stone-50 border-stone-200 text-stone-800' : 'bg-[#050505] border-white/10 text-stone-300'
            }`}>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${isLight ? 'text-stone-700' : 'text-stone-400'}`} />
                <span><strong className={isLight ? 'text-stone-900' : 'text-white'}>{t.about.philosophyPillars.p1Title}</strong> {t.about.philosophyPillars.p1Desc}</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${isLight ? 'text-stone-700' : 'text-stone-400'}`} />
                <span><strong className={isLight ? 'text-stone-900' : 'text-white'}>{t.about.philosophyPillars.p2Title}</strong> {t.about.philosophyPillars.p2Desc}</span>
              </div>
            </div>
          )}

          {activeTab === 'cv' && (
            <div className={`p-5 rounded-2xl text-xs space-y-3 border animate-in fade-in duration-200 ${
              isLight ? 'bg-stone-50 border-stone-200 text-stone-800' : 'bg-[#050505] border-white/10 text-stone-300'
            }`}>
              <div className="space-y-1.5 font-mono">
                <p><strong className={isLight ? 'text-stone-900' : 'text-white'}>{t.about.cvDetails.deg1}</strong> {t.about.cvDetails.sch1}</p>
                <p><strong className={isLight ? 'text-stone-900' : 'text-white'}>{t.about.cvDetails.deg2}</strong> {t.about.cvDetails.sch2}</p>
                {t.about.cvDetails.deg3 && (
                  <p><strong className={isLight ? 'text-stone-900' : 'text-white'}>{t.about.cvDetails.deg3}</strong> {t.about.cvDetails.sch3}</p>
                )}
                {t.about.cvDetails.deg4 && (
                  <p><strong className={isLight ? 'text-stone-900' : 'text-white'}>{t.about.cvDetails.deg4}</strong> {t.about.cvDetails.sch4}</p>
                )}
              </div>
              <div className={`pt-2.5 border-t ${isLight ? 'border-stone-200' : 'border-white/10'}`}>
                <p className="leading-relaxed"><strong className={isLight ? 'text-stone-900' : 'text-white'}>{t.about.cvDetails.honorsTitle}</strong> {t.about.cvDetails.honorsDesc}</p>
              </div>
            </div>
          )}
        </div>

        <div className="shrink-0 pt-2 lg:pt-0">
          <button
            type="button"
            onClick={onContactClick}
            className={`inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full font-semibold text-xs uppercase tracking-[0.2em] transition-all cursor-pointer shadow-lg ${
              isLight
                ? 'bg-stone-900 text-white hover:bg-stone-800'
                : 'bg-white text-black hover:bg-stone-200'
            }`}
            id="about-contact-btn"
          >
            <ArrowRight className="w-4 h-4" />
            {t.about.contactBtn}
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        <div className={`p-6 rounded-2xl border text-center ${
          isLight ? 'bg-white border-stone-200/90 shadow-2xs' : 'bg-[#080808] border-white/10'
        }`}>
          <div className={`text-3xl font-serif-italic italic ${isLight ? 'text-stone-900' : 'text-white'}`}>10+</div>
          <div className={`text-[10px] uppercase tracking-[0.25em] font-mono mt-1 ${isLight ? 'text-stone-500' : 'text-stone-500'}`}>
            {t.about.stats.teachingYears}
          </div>
        </div>
        <div className={`p-6 rounded-2xl border text-center ${
          isLight ? 'bg-white border-stone-200/90 shadow-2xs' : 'bg-[#080808] border-white/10'
        }`}>
          <div className={`text-3xl font-serif-italic italic ${isLight ? 'text-stone-900' : 'text-white'}`}>9</div>
          <div className={`text-[10px] uppercase tracking-[0.25em] font-mono mt-1 ${isLight ? 'text-stone-500' : 'text-stone-500'}`}>
            {t.about.stats.exhibitions}
          </div>
        </div>
        <div className={`p-6 rounded-2xl border text-center ${
          isLight ? 'bg-white border-stone-200/90 shadow-2xs' : 'bg-[#080808] border-white/10'
        }`}>
          <div className={`text-3xl font-serif-italic italic ${isLight ? 'text-stone-900' : 'text-white'}`}>3</div>
          <div className={`text-[10px] uppercase tracking-[0.25em] font-mono mt-1 ${isLight ? 'text-stone-500' : 'text-stone-500'}`}>
            {t.about.stats.publications}
          </div>
        </div>
        <div className={`p-6 rounded-2xl border text-center ${
          isLight ? 'bg-white border-stone-200/90 shadow-2xs' : 'bg-[#080808] border-white/10'
        }`}>
          <div className={`text-3xl font-serif-italic italic ${isLight ? 'text-stone-900' : 'text-white'}`}>4</div>
          <div className={`text-[10px] uppercase tracking-[0.25em] font-mono mt-1 ${isLight ? 'text-stone-500' : 'text-stone-500'}`}>
            {t.about.stats.institutions}
          </div>
        </div>
      </div>
    </section>
  );
};

