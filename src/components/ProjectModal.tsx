import React, { useState } from 'react';
import { Project } from '../types';
import { X, Sliders, Volume2, Palette, Sparkles, Tag } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const { lang, theme, t } = useApp();
  const isLight = theme === 'light';

  // State for Type Specimen Tester
  const [sampleText, setSampleText] = useState('DESIGN AS DIALOGUE');
  const [fontSize, setFontSize] = useState(32);
  const [fontWeight] = useState(500);
  const [letterSpacing, setLetterSpacing] = useState(2);

  // State for Color Perception Tester
  const [hue, setHue] = useState(210);
  const [saturation, setSaturation] = useState(80);
  const [lightness, setLightness] = useState(50);

  // State for Sonic Waveform Tester
  const [isPlayingWave, setIsPlayingWave] = useState(false);

  if (!project) return null;

  const displayTitle = (lang === 'zh' && project.titleZh) ? project.titleZh : project.title;
  const displayShort = (lang === 'zh' && project.shortDescZh) ? project.shortDescZh : project.shortDesc;
  const displayLong = (lang === 'zh' && project.longDescZh) ? project.longDescZh : (project.longDesc || project.shortDesc);
  const displayClient = (lang === 'zh' && project.clientOrInstitutionZh) ? project.clientOrInstitutionZh : project.clientOrInstitution;
  const displayRole = (lang === 'zh' && project.roleZh) ? project.roleZh : project.role;
  const displayDeliverables = (lang === 'zh' && project.deliverablesZh) ? project.deliverablesZh : project.deliverables;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
      id="project-modal-backdrop"
    >
      <div
        className={`w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl border my-auto max-h-[90vh] flex flex-col ${
          isLight
            ? 'bg-white text-stone-900 border-stone-200'
            : 'bg-[#080808] text-stone-200 border-white/10'
        }`}
        onClick={(e) => e.stopPropagation()}
        id="project-modal-content"
      >
        {/* Header Bar */}
        <div className={`flex items-center justify-between px-6 py-4 border-b sticky top-0 z-10 ${
          isLight ? 'bg-stone-50 border-stone-200' : 'bg-[#050505] border-white/10'
        }`}>
          <div className={`flex items-center gap-2 text-xs uppercase font-mono tracking-widest ${
            isLight ? 'text-stone-700 font-semibold' : 'text-stone-400'
          }`}>
            <Tag className={`w-3.5 h-3.5 ${isLight ? 'text-stone-700' : 'text-stone-500'}`} />
            {project.meta}
          </div>
          <button
            type="button"
            onClick={onClose}
            className={`p-1.5 rounded-full border transition-colors cursor-pointer ${
              isLight
                ? 'bg-stone-200 hover:bg-stone-300 border-stone-300 text-stone-800'
                : 'bg-white/10 hover:bg-white/20 border-white/10 text-stone-300 hover:text-white'
            }`}
            aria-label="Close project modal"
            id="close-modal-btn"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 md:p-8 overflow-y-auto flex-1 space-y-8">
          {/* Main Title & Hero Image */}
          <div>
            <div className="flex items-baseline justify-between mb-2">
              <h2 className={`text-3xl sm:text-4xl ${
                lang === 'zh' ? 'font-zh-serif not-italic font-bold' : 'font-serif-italic italic'
              } ${isLight ? 'text-stone-900' : 'text-white'}`}>
                {displayTitle}
              </h2>
              <span className={`text-xs font-mono ${isLight ? 'text-stone-500' : 'text-stone-500'}`}>[{project.year}]</span>
            </div>
            <p className={`text-sm leading-relaxed max-w-2xl ${isLight ? 'text-stone-700' : 'text-stone-400'}`}>
              {displayShort}
            </p>

            <div className={`mt-6 rounded-2xl overflow-hidden border shadow-lg ${
              isLight ? 'bg-stone-100 border-stone-200' : 'bg-[#050505] border-white/10'
            }`}>
              <img
                src={project.image}
                alt={displayTitle}
                onError={(e) => {
                  const target = e.currentTarget;
                  if (!target.dataset.failed) {
                    target.dataset.failed = 'true';
                    target.src = 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1000&h=700&fit=crop&crop=center';
                  }
                }}
                className="w-full h-[280px] sm:h-[400px] object-cover opacity-95"
              />
            </div>
          </div>

          {/* Project Details Grid */}
          <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 p-6 rounded-2xl border ${
            isLight ? 'bg-stone-50 border-stone-200' : 'bg-[#050505] border-white/10'
          }`}>
            {displayClient && (
              <div>
                <span className={`text-[10px] font-mono uppercase tracking-[0.2em] font-bold ${
                  isLight ? 'text-stone-600' : 'text-stone-500'
                }`}>
                  {t.projectModal.clientLabel}
                </span>
                <p className={`text-xs font-mono mt-1 ${isLight ? 'text-stone-900' : 'text-stone-200'}`}>
                  {displayClient}
                </p>
              </div>
            )}
            {displayRole && (
              <div>
                <span className={`text-[10px] font-mono uppercase tracking-[0.2em] font-bold ${
                  isLight ? 'text-stone-600' : 'text-stone-500'
                }`}>
                  {t.projectModal.roleLabel}
                </span>
                <p className={`text-xs font-mono mt-1 ${isLight ? 'text-stone-900' : 'text-stone-200'}`}>
                  {displayRole}
                </p>
              </div>
            )}
            {displayDeliverables && (
              <div>
                <span className={`text-[10px] font-mono uppercase tracking-[0.2em] font-bold ${
                  isLight ? 'text-stone-600' : 'text-stone-500'
                }`}>
                  {t.projectModal.deliverablesLabel}
                </span>
                <ul className={`text-xs mt-1 space-y-0.5 list-disc list-inside font-mono ${
                  isLight ? 'text-stone-800' : 'text-stone-300'
                }`}>
                  {displayDeliverables.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Long Description Case Study */}
          <div className="space-y-3">
            <h3 className={`text-xs uppercase tracking-[0.25em] font-mono font-bold border-b pb-2 ${
              isLight ? 'border-stone-200 text-stone-700' : 'border-white/10 text-stone-400'
            }`}>
              {t.projectModal.caseStudyHeading}
            </h3>
            <p className={`leading-relaxed text-sm font-light ${
              isLight ? 'text-stone-800' : 'text-stone-300'
            }`}>
              {displayLong}
            </p>
          </div>

          {/* Interactive Feature Block */}
          {project.interactiveType === 'type-specimen' && (
            <div className={`p-6 rounded-2xl space-y-4 border ${
              isLight ? 'bg-stone-50 border-stone-200 text-stone-900' : 'bg-[#050505] border-white/10 text-stone-200'
            }`}>
              <div className={`flex items-center justify-between border-b pb-3 ${isLight ? 'border-stone-200' : 'border-white/10'}`}>
                <span className={`text-xs font-mono uppercase tracking-wider flex items-center gap-2 ${
                  isLight ? 'text-stone-900 font-bold' : 'text-white'
                }`}>
                  <Sliders className="w-4 h-4" /> {t.projectModal.interactiveTypeSpecimen}
                </span>
                <span className="text-[10px] font-mono text-stone-500 uppercase">Live Variable Font Engine</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
                <div>
                  <label className={`block mb-1 text-[10px] ${isLight ? 'text-stone-600' : 'text-stone-400'}`}>{t.projectModal.sampleTextLabel}</label>
                  <input
                    type="text"
                    value={sampleText}
                    onChange={(e) => setSampleText(e.target.value)}
                    className={`w-full px-3 py-1.5 rounded-lg border focus:outline-hidden ${
                      isLight
                        ? 'bg-white text-stone-900 border-stone-300 focus:border-stone-800'
                        : 'bg-[#080808] text-stone-200 border-white/10 focus:border-white/30'
                    }`}
                  />
                </div>
                <div>
                  <label className={`block mb-1 text-[10px] ${isLight ? 'text-stone-600' : 'text-stone-400'}`}>{t.projectModal.fontSizeLabel} ({fontSize}px)</label>
                  <input
                    type="range"
                    min="16"
                    max="64"
                    value={fontSize}
                    onChange={(e) => setFontSize(Number(e.target.value))}
                    className="w-full accent-stone-700 cursor-pointer"
                  />
                </div>
                <div>
                  <label className={`block mb-1 text-[10px] ${isLight ? 'text-stone-600' : 'text-stone-400'}`}>{t.projectModal.trackingLabel} ({letterSpacing}px)</label>
                  <input
                    type="range"
                    min="-2"
                    max="10"
                    value={letterSpacing}
                    onChange={(e) => setLetterSpacing(Number(e.target.value))}
                    className="w-full accent-stone-700 cursor-pointer"
                  />
                </div>
              </div>

              {/* Display Area */}
              <div className={`p-6 rounded-xl overflow-x-auto min-h-[120px] flex items-center justify-center border ${
                isLight ? 'bg-white border-stone-200' : 'bg-[#080808] border-white/10'
              }`}>
                <p
                  style={{
                    fontSize: `${fontSize}px`,
                    fontWeight: fontWeight,
                    letterSpacing: `${letterSpacing}px`,
                    fontFamily: 'Inter, sans-serif',
                  }}
                  className={`text-center break-all transition-all duration-150 ${isLight ? 'text-stone-900' : 'text-white'}`}
                >
                  {sampleText || 'TYPE / SPACE'}
                </p>
              </div>
            </div>
          )}

          {project.interactiveType === 'color-perception' && (
            <div className={`p-6 rounded-2xl space-y-4 border ${
              isLight ? 'bg-stone-50 border-stone-200 text-stone-900' : 'bg-[#050505] border-white/10 text-stone-200'
            }`}>
              <div className={`flex items-center justify-between border-b pb-3 ${isLight ? 'border-stone-200' : 'border-white/10'}`}>
                <span className={`text-xs font-mono uppercase tracking-wider flex items-center gap-2 ${
                  isLight ? 'text-stone-900 font-bold' : 'text-white'
                }`}>
                  <Palette className="w-4 h-4" /> {t.projectModal.interactiveColorPerception}
                </span>
                <span className="text-[10px] font-mono text-stone-500 uppercase">HSL Spectrum Matrix</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
                <div>
                  <label className={`block mb-1 text-[10px] ${isLight ? 'text-stone-600' : 'text-stone-400'}`}>Hue ({hue}°)</label>
                  <input
                    type="range"
                    min="0"
                    max="360"
                    value={hue}
                    onChange={(e) => setHue(Number(e.target.value))}
                    className="w-full accent-stone-700 cursor-pointer"
                  />
                </div>
                <div>
                  <label className={`block mb-1 text-[10px] ${isLight ? 'text-stone-600' : 'text-stone-400'}`}>Saturation ({saturation}%)</label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={saturation}
                    onChange={(e) => setSaturation(Number(e.target.value))}
                    className="w-full accent-stone-700 cursor-pointer"
                  />
                </div>
                <div>
                  <label className={`block mb-1 text-[10px] ${isLight ? 'text-stone-600' : 'text-stone-400'}`}>Lightness ({lightness}%)</label>
                  <input
                    type="range"
                    min="20"
                    max="80"
                    value={lightness}
                    onChange={(e) => setLightness(Number(e.target.value))}
                    className="w-full accent-stone-700 cursor-pointer"
                  />
                </div>
              </div>

              <div
                style={{
                  backgroundColor: `hsl(${hue}, ${saturation}%, ${lightness}%)`,
                }}
                className="h-28 rounded-xl flex items-center justify-center transition-colors duration-200 shadow-inner border border-stone-300 dark:border-white/10"
              >
                <span className="bg-stone-900/90 text-white text-xs font-mono px-3 py-1.5 rounded-full border border-white/20 backdrop-blur-xs">
                  hsl({hue}, {saturation}%, {lightness}%)
                </span>
              </div>
            </div>
          )}

          {project.interactiveType === 'sonic-waveform' && (
            <div className={`p-6 rounded-2xl space-y-4 border ${
              isLight ? 'bg-stone-50 border-stone-200 text-stone-900' : 'bg-[#050505] border-white/10 text-stone-200'
            }`}>
              <div className={`flex items-center justify-between border-b pb-3 ${isLight ? 'border-stone-200' : 'border-white/10'}`}>
                <span className={`text-xs font-mono uppercase tracking-wider flex items-center gap-2 ${
                  isLight ? 'text-stone-900 font-bold' : 'text-white'
                }`}>
                  <Volume2 className="w-4 h-4" /> {t.projectModal.interactiveSonicWaveform}
                </span>
                <button
                  type="button"
                  onClick={() => setIsPlayingWave(!isPlayingWave)}
                  className={`text-xs px-3 py-1 rounded-full flex items-center gap-1.5 cursor-pointer font-mono border ${
                    isLight
                      ? 'bg-stone-200 hover:bg-stone-300 border-stone-300 text-stone-800'
                      : 'bg-white/10 hover:bg-white/20 text-stone-200 border-white/10'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  {isPlayingWave ? 'Pause Wave' : 'Animate Waveform'}
                </button>
              </div>

              <div className={`h-24 rounded-xl flex items-center justify-center gap-1 px-4 overflow-hidden border ${
                isLight ? 'bg-white border-stone-200' : 'bg-[#080808] border-white/10'
              }`}>
                {Array.from({ length: 40 }).map((_, i) => {
                  const height = isPlayingWave
                    ? Math.sin((i + Date.now() / 200) * 0.4) * 35 + 45
                    : Math.sin(i * 0.5) * 20 + 35;
                  return (
                    <div
                      key={i}
                      style={{ height: `${height}%` }}
                      className={`w-1.5 rounded-full transition-all duration-150 opacity-80 ${
                        isLight ? 'bg-stone-700' : 'bg-stone-300'
                      }`}
                    />
                  );
                })}
              </div>
            </div>
          )}

          {/* Project Gallery */}
          {project.gallery && project.gallery.length > 0 && (
            <div className="space-y-3">
              <h3 className={`text-xs uppercase tracking-[0.25em] font-mono font-bold ${
                isLight ? 'text-stone-700' : 'text-stone-400'
              }`}>
                {t.projectModal.galleryHeading}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {project.gallery.map((imgUrl, idx) => (
                  <div key={idx} className={`rounded-2xl overflow-hidden border ${
                    isLight ? 'bg-stone-100 border-stone-200' : 'bg-[#050505] border-white/10'
                  }`}>
                    <img
                      src={imgUrl}
                      alt={`${displayTitle} artifact ${idx + 1}`}
                      onError={(e) => {
                        const target = e.currentTarget;
                        if (!target.dataset.failed) {
                          target.dataset.failed = 'true';
                          target.src = 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=1000&h=700&fit=crop&crop=center';
                        }
                      }}
                      className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300 opacity-95 hover:opacity-100"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          <div className={`flex flex-wrap gap-2 pt-3 border-t ${isLight ? 'border-stone-200' : 'border-white/10'}`}>
            {project.tags.map((tag) => (
              <span
                key={tag}
                className={`px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider border ${
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
      </div>
    </div>
  );
};

