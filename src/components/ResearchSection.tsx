import React, { useState } from 'react';
import { RESEARCH_ITEMS, ACADEMIC_ACTIVITIES, AWARDS, SCHOLARSHIPS, EXHIBITIONS } from '../data/portfolioData';
import { ResearchItem } from '../types';
import { FlaskConical, HelpCircle, Award, Award as Trophy, Sparkles, Presentation } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ResearchSection: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'inquiry' | 'forums' | 'awards' | 'exhibitions'>('inquiry');
  const { lang, theme, t } = useApp();
  const isLight = theme === 'light';

  return (
    <section className="scroll-mt-24 py-8" id="research">
      <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4 mb-6 ${
        isLight ? 'border-stone-200' : 'border-white/10'
      }`}>
        <div className={`flex items-center gap-2.5 text-xs uppercase tracking-[0.3em] font-bold ${
          isLight ? 'text-stone-700' : 'text-stone-500'
        }`}>
          <FlaskConical className={`w-4 h-4 ${isLight ? 'text-stone-800' : 'text-stone-400'}`} />
          {t.research.sectionTitle}
        </div>

        {/* View switcher tabs */}
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('inquiry')}
            className={`px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider transition-colors cursor-pointer ${
              activeTab === 'inquiry'
                ? isLight ? 'bg-stone-900 text-white font-semibold' : 'bg-white text-black font-semibold'
                : isLight ? 'bg-stone-100 text-stone-600 hover:text-stone-900' : 'bg-white/5 text-stone-400 hover:text-white'
            }`}
          >
            {lang === 'zh' ? '学术发表与课题' : 'Publications & Research'}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('forums')}
            className={`px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider transition-colors cursor-pointer ${
              activeTab === 'forums'
                ? isLight ? 'bg-stone-900 text-white font-semibold' : 'bg-white text-black font-semibold'
                : isLight ? 'bg-stone-100 text-stone-600 hover:text-stone-900' : 'bg-white/5 text-stone-400 hover:text-white'
            }`}
          >
            {lang === 'zh' ? '学术活动 / 论坛' : 'Academic Forums'}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('awards')}
            className={`px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider transition-colors cursor-pointer ${
              activeTab === 'awards'
                ? isLight ? 'bg-stone-900 text-white font-semibold' : 'bg-white text-black font-semibold'
                : isLight ? 'bg-stone-100 text-stone-600 hover:text-stone-900' : 'bg-white/5 text-stone-400 hover:text-white'
            }`}
          >
            {lang === 'zh' ? '奖项与奖学金' : 'Awards & Scholarships'}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('exhibitions')}
            className={`px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider transition-colors cursor-pointer ${
              activeTab === 'exhibitions'
                ? isLight ? 'bg-stone-900 text-white font-semibold' : 'bg-white text-black font-semibold'
                : isLight ? 'bg-stone-100 text-stone-600 hover:text-stone-900' : 'bg-white/5 text-stone-400 hover:text-white'
            }`}
          >
            {lang === 'zh' ? '艺术展览' : 'Exhibitions'}
          </button>
        </div>
      </div>

      {activeTab === 'inquiry' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 animate-in fade-in duration-300">
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
                      onError={(e) => {
                        const target = e.currentTarget;
                        if (!target.src.includes('/images/academic-research-cover.jpg')) {
                          target.src = '/images/academic-research-cover.jpg';
                        }
                      }}
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
      )}

      {/* Forums Tab */}
      {activeTab === 'forums' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-in fade-in duration-300">
          {ACADEMIC_ACTIVITIES.map((activity, idx) => (
            <div
              key={idx}
              className={`p-6 rounded-2xl border ${
                isLight ? 'bg-white border-stone-200' : 'bg-[#080808] border-white/10'
              }`}
            >
              <div className="flex items-center gap-2 mb-4">
                <Presentation className={`w-4 h-4 ${isLight ? 'text-stone-800' : 'text-stone-300'}`} />
                <h4 className={`text-sm font-bold uppercase tracking-wider font-mono ${
                  isLight ? 'text-stone-900' : 'text-white'
                }`}>
                  {lang === 'zh' ? activity.roleZh : activity.roleEn}
                </h4>
              </div>
              <ul className="space-y-3">
                {activity.items.map((item, i) => (
                  <li key={i} className="flex flex-col sm:flex-row sm:items-start justify-between gap-1 text-xs border-b pb-2.5 last:border-0 last:pb-0 border-dashed border-stone-200 dark:border-white/10">
                    <span className={`font-medium ${isLight ? 'text-stone-800' : 'text-stone-200'}`}>
                      {lang === 'zh' ? item.titleZh : item.titleEn}
                    </span>
                    <span className={`text-[10px] font-mono shrink-0 ${isLight ? 'text-stone-500' : 'text-stone-500'}`}>
                      {item.date}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {/* Awards & Scholarships Tab */}
      {activeTab === 'awards' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-in fade-in duration-300">
          <div className={`p-6 rounded-2xl border ${isLight ? 'bg-white border-stone-200' : 'bg-[#080808] border-white/10'}`}>
            <div className="flex items-center gap-2 mb-4">
              <Trophy className={`w-4 h-4 ${isLight ? 'text-stone-800' : 'text-stone-300'}`} />
              <h4 className={`text-sm font-bold uppercase tracking-wider font-mono ${isLight ? 'text-stone-900' : 'text-white'}`}>
                {lang === 'zh' ? '获奖荣誉 (Awards)' : 'Awards & Competition Honors'}
              </h4>
            </div>
            <ul className="space-y-3">
              {AWARDS.map((award, i) => (
                <li key={i} className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 text-xs border-b pb-2.5 last:border-0 last:pb-0 border-dashed border-stone-200 dark:border-white/10">
                  <span className={`font-medium ${isLight ? 'text-stone-800' : 'text-stone-200'}`}>
                    {lang === 'zh' ? award.titleZh : award.titleEn}
                  </span>
                  <span className={`text-[10px] font-mono shrink-0 ${isLight ? 'text-stone-500' : 'text-stone-500'}`}>
                    {award.year}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className={`p-6 rounded-2xl border ${isLight ? 'bg-white border-stone-200' : 'bg-[#080808] border-white/10'}`}>
            <div className="flex items-center gap-2 mb-4">
              <Award className={`w-4 h-4 ${isLight ? 'text-stone-800' : 'text-stone-300'}`} />
              <h4 className={`text-sm font-bold uppercase tracking-wider font-mono ${isLight ? 'text-stone-900' : 'text-white'}`}>
                {lang === 'zh' ? '奖学金 (Scholarships)' : 'Academic Scholarships'}
              </h4>
            </div>
            <ul className="space-y-3">
              {SCHOLARSHIPS.map((sch, i) => (
                <li key={i} className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 text-xs border-b pb-2.5 last:border-0 last:pb-0 border-dashed border-stone-200 dark:border-white/10">
                  <span className={`font-medium ${isLight ? 'text-stone-800' : 'text-stone-200'}`}>
                    {lang === 'zh' ? sch.titleZh : sch.titleEn}
                  </span>
                  <span className={`text-[10px] font-mono shrink-0 ${isLight ? 'text-stone-500' : 'text-stone-500'}`}>
                    {sch.period}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Exhibitions Tab */}
      {activeTab === 'exhibitions' && (
        <div className={`p-6 rounded-2xl border animate-in fade-in duration-300 ${isLight ? 'bg-white border-stone-200' : 'bg-[#080808] border-white/10'}`}>
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className={`w-4 h-4 ${isLight ? 'text-stone-800' : 'text-stone-300'}`} />
            <h4 className={`text-sm font-bold uppercase tracking-wider font-mono ${isLight ? 'text-stone-900' : 'text-white'}`}>
              {lang === 'zh' ? '参展经历 (Exhibitions & Showcases)' : 'Exhibitions & Art Showcases'}
            </h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {EXHIBITIONS.map((ex, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-xl border border-stone-100 dark:border-white/5 text-xs">
                <span className={`font-medium ${isLight ? 'text-stone-800' : 'text-stone-200'}`}>
                  {lang === 'zh' ? ex.titleZh : ex.titleEn}
                </span>
                <span className={`text-[10px] font-mono ml-2 shrink-0 ${isLight ? 'text-stone-500' : 'text-stone-500'}`}>
                  {ex.year}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};


