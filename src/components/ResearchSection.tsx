import React, { useState } from 'react';
import { RESEARCH_ITEMS } from '../data/portfolioData';
import { ResearchItem } from '../types';
import { FlaskConical, HelpCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ResearchSection: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const { lang, theme, t } = useApp();
  const isLight = theme === 'light';

  return (
    <section className="scroll-mt-24 py-8" id="research">
      <div className={`flex items-center gap-2.5 text-xs uppercase tracking-[0.3em] font-bold border-b pb-4 mb-6 ${
        isLight ? 'text-stone-700 border-stone-200' : 'text-stone-500 border-white/10'
      }`}>
        <FlaskConical className={`w-4 h-4 ${isLight ? 'text-stone-800' : 'text-stone-400'}`} />
        {t.research.sectionTitle}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {RESEARCH_ITEMS.map((item: ResearchItem) => {
          const isExpanded = expandedId === item.id;
          const displayTitle = (lang === 'zh' && item.titleZh) ? item.titleZh : item.title;
          const displayDesc = (lang === 'zh' && item.descriptionZh) ? item.descriptionZh : item.description;
          const displayQuestion = (lang === 'zh' && item.keyQuestionZh) ? item.keyQuestionZh : item.keyQuestion;

          return (
            <div
              key={item.id}
              className={`rounded-2xl overflow-hidden border flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 ${
                isLight
                  ? 'bg-white border-stone-200/90 shadow-xs hover:shadow-lg hover:border-stone-400'
                  : 'bg-[#080808] border-white/10 shadow-lg hover:border-white/30'
              }`}
              id={`research-card-${item.id}`}
            >
              <div>
                <div className={`h-[180px] overflow-hidden relative border-b ${
                  isLight ? 'bg-stone-100 border-stone-100' : 'bg-[#050505] border-white/10'
                }`}>
                  <img
                    src={item.image}
                    alt={displayTitle}
                    className="w-full h-full object-cover opacity-85 hover:opacity-100 transition-all duration-500 hover:scale-105"
                    loading="lazy"
                  />
                  <span className={`absolute top-3 left-3 text-[9px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-full backdrop-blur-xs border ${
                    isLight
                      ? 'bg-white/90 border-stone-300 text-stone-800 font-semibold'
                      : 'bg-[#080808]/90 border-white/20 text-stone-200'
                  }`}>
                    {item.meta}
                  </span>
                </div>

                <div className="p-6">
                  <h3 className={`text-xl mb-2 ${
                    lang === 'zh' ? 'font-zh-serif not-italic font-bold' : 'font-serif-italic italic'
                  } ${
                    isLight ? 'text-stone-900' : 'text-stone-200'
                  }`}>
                    {displayTitle}
                  </h3>
                  <p className={`text-xs leading-relaxed mb-4 ${
                    isLight ? 'text-stone-600' : 'text-stone-400'
                  }`}>
                    {displayDesc}
                  </p>

                  {/* Key Question Accordion */}
                  {displayQuestion && (
                    <div className="mt-3">
                      <button
                        type="button"
                        onClick={() => setExpandedId(isExpanded ? null : item.id)}
                        className={`text-xs font-mono uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer ${
                          isLight
                            ? 'text-stone-600 hover:text-stone-900 font-medium'
                            : 'text-stone-400 hover:text-white'
                        }`}
                        id={`research-question-toggle-${item.id}`}
                      >
                        <HelpCircle className={`w-3.5 h-3.5 ${isLight ? 'text-stone-600' : 'text-stone-500'}`} />
                        {isExpanded ? t.research.hideInquiry : t.research.viewInquiry}
                      </button>

                      {isExpanded && (
                        <div className={`mt-2.5 p-3.5 rounded-xl border text-xs ${
                          lang === 'zh' ? 'font-zh-serif not-italic font-medium' : 'italic font-serif-italic'
                        } animate-in fade-in duration-200 ${
                          isLight
                            ? 'bg-stone-50 border-stone-200 text-stone-800'
                            : 'bg-[#050505] border-white/10 text-stone-300'
                        }`}>
                          "{displayQuestion}"
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div className={`px-6 pb-6 pt-3 border-t flex flex-wrap gap-1.5 ${
                isLight ? 'border-stone-100' : 'border-white/5'
              }`}>
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider border ${
                      isLight
                        ? 'bg-stone-100 border-stone-200 text-stone-700'
                        : 'bg-white/5 border-white/10 text-stone-400'
                    }`}
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

