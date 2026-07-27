import React, { useState } from 'react';
import { TEACHING } from '../data/portfolioData';
import { TeachingExperience } from '../types';
import { GraduationCap, Landmark, TrendingUp, Users, BookOpen, ChevronRight, Check, X } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const TeachingSection: React.FC = () => {
  const [selectedCourse, setSelectedCourse] = useState<TeachingExperience | null>(null);
  const { lang, theme, t } = useApp();
  const isLight = theme === 'light';

  const getIcon = (iconName: string) => {
    const iconClass = `w-6 h-6 mb-3 ${isLight ? 'text-stone-800' : 'text-stone-300'}`;
    switch (iconName) {
      case 'University':
        return <Landmark className={iconClass} />;
      case 'TrendingUp':
        return <TrendingUp className={iconClass} />;
      case 'Users':
        return <Users className={iconClass} />;
      case 'BookOpen':
        return <BookOpen className={iconClass} />;
      default:
        return <GraduationCap className={iconClass} />;
    }
  };

  return (
    <section className="scroll-mt-24 py-8" id="teaching">
      <div className={`flex items-center gap-2.5 text-xs uppercase tracking-[0.3em] font-bold border-b pb-4 mb-6 ${
        isLight ? 'text-stone-700 border-stone-200' : 'text-stone-500 border-white/10'
      }`}>
        <GraduationCap className={`w-4 h-4 ${isLight ? 'text-stone-800' : 'text-stone-400'}`} />
        {t.teaching.sectionTitle}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {TEACHING.map((item, index) => {
          const displayTitle = (lang === 'zh' && item.titleZh) ? item.titleZh : item.title;
          const displayInst = (lang === 'zh' && item.institutionZh) ? item.institutionZh : item.institution;
          const displayDesc = (lang === 'zh' && item.descriptionZh) ? item.descriptionZh : item.description;

          return (
            <div
              key={item.id}
              onClick={() => setSelectedCourse(item)}
              className={`p-7 rounded-3xl border transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col justify-between group relative ${
                isLight
                  ? 'bg-white border-stone-200/90 shadow-xs hover:shadow-lg hover:border-stone-400'
                  : 'bg-[#080808] border-white/10 shadow-lg hover:border-white/30'
              }`}
              id={`teaching-card-${item.id}`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  {getIcon(item.icon)}
                  <span className={`text-[10px] font-mono ${isLight ? 'text-stone-400' : 'text-stone-600'}`}>0{index + 1}</span>
                </div>
                <h4 className={`text-base transition-colors mb-1 ${
                  lang === 'zh' ? 'font-zh-serif not-italic font-bold' : 'font-serif-italic italic'
                } ${
                  isLight ? 'text-stone-900 group-hover:text-stone-700' : 'text-stone-200 group-hover:text-white'
                }`}>
                  {displayTitle}
                </h4>
                <div className={`text-xs font-mono uppercase tracking-wider mb-3 ${
                  isLight ? 'text-stone-500' : 'text-stone-500'
                }`}>
                  {displayInst}
                </div>
                <p className={`text-xs leading-relaxed ${isLight ? 'text-stone-600' : 'text-stone-400'}`}>
                  {displayDesc}
                </p>
              </div>

              <div className={`mt-5 pt-3 border-t flex items-center justify-between text-[11px] uppercase tracking-wider font-mono transition-colors ${
                isLight
                  ? 'border-stone-100 text-stone-500 group-hover:text-stone-900'
                  : 'border-white/5 text-stone-500 group-hover:text-stone-300'
              }`}>
                <span>{t.teaching.topicsLabel}</span>
                <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Course Detail Modal */}
      {selectedCourse && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setSelectedCourse(null)}
          id="course-modal-backdrop"
        >
          <div
            className={`max-w-lg w-full rounded-3xl p-6 md:p-8 shadow-2xl border ${
              isLight
                ? 'bg-white text-stone-900 border-stone-200'
                : 'bg-[#080808] text-stone-200 border-white/10'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className={`text-2xl ${
                  lang === 'zh' ? 'font-zh-serif not-italic font-bold' : 'font-serif-italic italic'
                } ${isLight ? 'text-stone-900' : 'text-white'}`}>
                  {(lang === 'zh' && selectedCourse.titleZh) ? selectedCourse.titleZh : selectedCourse.title}
                </h3>
                <p className={`text-xs font-mono uppercase tracking-widest mt-1 ${isLight ? 'text-stone-500' : 'text-stone-500'}`}>
                  {(lang === 'zh' && selectedCourse.institutionZh) ? selectedCourse.institutionZh : selectedCourse.institution}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedCourse(null)}
                className={`p-1.5 rounded-full cursor-pointer transition-colors ${
                  isLight
                    ? 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                    : 'bg-white/10 hover:bg-white/20 text-stone-300'
                }`}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className={`text-xs leading-relaxed mb-6 ${isLight ? 'text-stone-700' : 'text-stone-300'}`}>
              {(lang === 'zh' && selectedCourse.descriptionZh) ? selectedCourse.descriptionZh : selectedCourse.description}
            </p>

            {selectedCourse.topics && (
              <div className={`space-y-3 p-5 rounded-2xl border ${
                isLight ? 'bg-stone-50 border-stone-200' : 'bg-[#050505] border-white/10'
              }`}>
                <h4 className={`text-[10px] uppercase tracking-[0.25em] font-mono font-bold ${
                  isLight ? 'text-stone-600' : 'text-stone-500'
                }`}>
                  {t.teaching.modalCurriculum}
                </h4>
                <ul className="space-y-2">
                  {((lang === 'zh' && selectedCourse.topicsZh) ? selectedCourse.topicsZh : selectedCourse.topics).map((topic, i) => (
                    <li key={i} className={`flex items-center gap-2.5 text-xs font-light ${
                      isLight ? 'text-stone-800' : 'text-stone-300'
                    }`}>
                      <Check className={`w-3.5 h-3.5 shrink-0 ${isLight ? 'text-stone-600' : 'text-stone-400'}`} />
                      {topic}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

