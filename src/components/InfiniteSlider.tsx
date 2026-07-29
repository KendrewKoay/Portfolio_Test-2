import React, { useState } from 'react';
import { SLIDER_IMAGES } from '../data/portfolioData';
import { Maximize2, X } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const InfiniteSlider: React.FC = () => {
  const [activeImage, setActiveImage] = useState<{ url: string; alt: string; caption: string } | null>(null);
  const { theme, lang, t } = useApp();
  const isLight = theme === 'light';

  // Duplicate for seamless infinite scrolling loop
  const slides = [...SLIDER_IMAGES, ...SLIDER_IMAGES];

  return (
    <div className={`w-full py-4 md:py-6 overflow-hidden my-2 transition-colors ${
      isLight ? 'bg-stone-100/50' : 'bg-[#050505]'
    }`}>
      <div className="relative w-full overflow-hidden group">
        <div className="animate-marquee flex gap-6 px-3">
          {slides.map((slide, index) => (
            <div
              key={`${slide.alt}-${index}`}
              onClick={() => setActiveImage(slide)}
              className={`w-[220px] sm:w-[280px] h-[160px] sm:h-[200px] shrink-0 rounded-2xl overflow-hidden cursor-pointer relative group/item transition-all duration-300 border ${
                isLight
                  ? 'bg-white border-stone-200/90 shadow-2xs hover:shadow-lg hover:border-stone-400'
                  : 'bg-[#080808] border-white/10 shadow-md hover:border-white/30'
              }`}
              id={`slider-item-${index}`}
            >
              <img
                src={slide.url}
                alt={slide.alt}
                onError={(e) => {
                  const target = e.currentTarget;
                  if (!target.dataset.failed) {
                    target.dataset.failed = 'true';
                    target.src = 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop&crop=center';
                  }
                }}
                className="w-full h-full object-cover transition-transform duration-500 group-hover/item:scale-105 opacity-90 group-hover/item:opacity-100"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/0 group-hover/item:bg-black/30 transition-colors flex items-center justify-center">
                <span className={`opacity-0 group-hover/item:opacity-100 transition-opacity text-xs font-medium px-3 py-1.5 rounded-full flex items-center gap-1.5 backdrop-blur-xs ${
                  isLight
                    ? 'bg-white/90 text-stone-900 border border-stone-300 shadow-md'
                    : 'bg-[#080808]/80 text-stone-200 border border-white/20'
                }`}>
                  <Maximize2 className="w-3.5 h-3.5" /> {t.slider.viewBtn}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeImage && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setActiveImage(null)}
          id="slider-lightbox-modal"
        >
          <div
            className={`relative max-w-4xl w-full rounded-2xl overflow-hidden shadow-2xl border ${
              isLight
                ? 'bg-white text-stone-900 border-stone-200'
                : 'bg-[#080808] text-stone-200 border-white/10'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActiveImage(null)}
              className={`absolute top-4 right-4 z-10 p-2 rounded-full transition-colors cursor-pointer border ${
                isLight
                  ? 'bg-stone-100 hover:bg-stone-200 text-stone-800 border-stone-300'
                  : 'bg-white/10 hover:bg-white/20 text-stone-300 border-white/10'
              }`}
              aria-label="Close Lightbox"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={activeImage.url}
              alt={activeImage.alt}
              className={`w-full max-h-[75vh] object-contain ${isLight ? 'bg-stone-50' : 'bg-[#050505]'}`}
            />
            <div className={`p-5 text-center border-t ${
              isLight ? 'bg-white border-stone-200' : 'bg-[#080808] border-white/10'
            }`}>
              <p className={`text-base ${
                lang === 'zh' ? 'font-zh-serif not-italic font-bold' : 'font-serif-italic italic'
              } ${isLight ? 'text-stone-900' : 'text-white'}`}>{activeImage.caption}</p>
              <p className={`text-xs mt-1 uppercase tracking-widest ${isLight ? 'text-stone-500' : 'text-stone-500'}`}>{activeImage.alt}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

