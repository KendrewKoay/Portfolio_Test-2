import React, { useState, useMemo } from 'react';
import { Project, CategoryFilter } from '../types';
import { FolderOpen, Search, Filter } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface ProjectGridProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
}

export const ProjectGrid: React.FC<ProjectGridProps> = ({ projects, onSelectProject }) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const { lang, theme, t } = useApp();
  const isLight = theme === 'light';

  const categories: CategoryFilter[] = [
    'All',
    'Key Visual Design',
    'Branding Design',
    'Cultural & Creative Design',
    'Other Design',
  ];

  const getCategoryLabel = (cat: CategoryFilter) => {
    return t.projects.categories[cat] || cat;
  };

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesCategory =
        selectedCategory === 'All' ||
        project.category === selectedCategory ||
        project.tags.includes(selectedCategory);

      const title = (lang === 'zh' && project.titleZh) ? project.titleZh : project.title;
      const desc = (lang === 'zh' && project.shortDescZh) ? project.shortDescZh : project.shortDesc;

      const matchesSearch =
        searchQuery.trim() === '' ||
        title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesSearch;
    });
  }, [projects, selectedCategory, searchQuery, lang]);

  return (
    <section className="scroll-mt-24 py-8" id="work">
      {/* Section Header */}
      <div className={`flex flex-col md:flex-row md:items-center justify-between border-b pb-4 mb-6 gap-4 ${
        isLight ? 'border-stone-200' : 'border-white/10'
      }`}>
        <div className={`flex items-center gap-2.5 text-xs uppercase tracking-[0.3em] font-bold ${
          isLight ? 'text-stone-700' : 'text-stone-500'
        }`}>
          <FolderOpen className={`w-4 h-4 ${isLight ? 'text-stone-800' : 'text-stone-400'}`} />
          {t.projects.sectionTitle}
        </div>

        {/* Search Input */}
        <div className="relative max-w-xs w-full">
          <Search className={`w-3.5 h-3.5 absolute left-3.5 top-1/2 -translate-y-1/2 ${
            isLight ? 'text-stone-400' : 'text-stone-600'
          }`} />
          <input
            type="text"
            placeholder={t.projects.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full text-xs pl-9 pr-3.5 py-2 rounded-full border transition-colors focus:outline-hidden ${
              isLight
                ? 'bg-white text-stone-900 placeholder-stone-400 border-stone-300 focus:border-stone-800 shadow-2xs'
                : 'bg-[#080808] text-stone-200 placeholder-stone-600 border-white/10 focus:border-white/30'
            }`}
            id="project-search-input"
          />
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap gap-2 mb-8 items-center" id="category-filter-bar">
        <span className={`text-[10px] font-bold uppercase tracking-[0.25em] mr-1 flex items-center gap-1 ${
          isLight ? 'text-stone-500' : 'text-stone-600'
        }`}>
          <Filter className="w-3 h-3" /> {t.projects.filterLabel}:
        </span>
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-[11px] font-medium transition-all cursor-pointer ${
                isSelected
                  ? isLight
                    ? 'bg-stone-900 text-white font-semibold shadow-xs'
                    : 'bg-stone-200 text-black border border-stone-200 font-semibold'
                  : isLight
                    ? 'bg-stone-100 text-stone-700 border border-stone-200 hover:bg-stone-200 hover:text-stone-900'
                    : 'bg-[#080808] text-stone-400 border border-white/10 hover:text-white hover:border-white/25'
              }`}
              id={`filter-btn-${cat.toLowerCase()}`}
            >
              {getCategoryLabel(cat)}
            </button>
          );
        })}
      </div>

      {/* Grid */}
      {filteredProjects.length === 0 ? (
        <div className={`text-center py-12 rounded-2xl border ${
          isLight ? 'bg-white border-stone-200 shadow-2xs' : 'bg-[#080808] border-white/10'
        }`}>
          <p className={`text-xs ${isLight ? 'text-stone-600' : 'text-stone-500'}`}>
            {t.projects.noResults} "{searchQuery}".
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedCategory('All');
              setSearchQuery('');
            }}
            className={`mt-3 text-xs underline font-medium cursor-pointer ${
              isLight ? 'text-stone-900 hover:text-stone-600' : 'text-stone-300 hover:text-white'
            }`}
          >
            {t.projects.clearFilters}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => {
            const displayTitle = (lang === 'zh' && project.titleZh) ? project.titleZh : project.title;
            const displayDesc = (lang === 'zh' && project.shortDescZh) ? project.shortDescZh : project.shortDesc;

            return (
              <div
                key={project.id}
                onClick={() => onSelectProject(project)}
                className={`rounded-2xl overflow-hidden border transition-all duration-300 hover:-translate-y-1.5 cursor-pointer flex flex-col group relative ${
                  isLight
                    ? 'bg-white border-stone-200/90 shadow-xs hover:shadow-lg hover:border-stone-400'
                    : 'bg-[#080808] border-white/10 shadow-lg hover:border-white/30'
                }`}
                id={`project-card-${project.id}`}
              >
                {/* Accent Bar on Hover */}
                <div className={`absolute left-0 top-0 bottom-0 w-[2.5px] bg-transparent transition-colors duration-300 z-10 ${
                  isLight ? 'group-hover:bg-stone-900' : 'group-hover:bg-stone-300'
                }`} />

                <div className={`h-[220px] relative overflow-hidden border-b ${
                  isLight ? 'bg-stone-100 border-stone-100' : 'bg-[#050505] border-white/10'
                }`}>
                  <img
                    src={project.image}
                    alt={displayTitle}
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (!target.dataset.failed) {
                        target.dataset.failed = '1';
                        target.src = '/images/academic-research-cover.jpg';
                      } else if (target.dataset.failed === '1') {
                        target.dataset.failed = '2';
                        target.src = 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop&crop=center';
                      }
                    }}
                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-all duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className={`absolute top-3 right-3 text-[9px] uppercase tracking-widest font-mono px-2.5 py-1 rounded-full backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity border ${
                    isLight
                      ? 'bg-white/90 border-stone-300 text-stone-800'
                      : 'bg-[#080808]/90 border-white/20 text-stone-200'
                  }`}>
                    {t.projects.caseStudyBadge}
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-baseline justify-between mb-1">
                      <h3 className={`text-xl transition-colors ${
                        lang === 'zh' ? 'font-zh-serif not-italic font-bold' : 'font-serif-italic italic'
                      } ${
                        isLight ? 'text-stone-900 group-hover:text-stone-700' : 'text-stone-200 group-hover:text-white'
                      }`}>
                        {displayTitle}
                      </h3>
                      <span className={`text-[10px] font-mono ${isLight ? 'text-stone-400' : 'text-stone-600'}`}>
                        [{project.year}]
                      </span>
                    </div>
                    <div className={`text-[10px] uppercase tracking-widest font-mono mb-3 ${
                      isLight ? 'text-stone-500' : 'text-stone-500'
                    }`}>
                      {project.meta}
                    </div>
                    <p className={`text-xs leading-relaxed mb-4 ${
                      isLight ? 'text-stone-600' : 'text-stone-400'
                    }`}>
                      {displayDesc}
                    </p>
                  </div>

                  <div className={`flex flex-wrap gap-1.5 pt-3 border-t ${
                    isLight ? 'border-stone-100' : 'border-white/5'
                  }`}>
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider border ${
                          isLight
                            ? 'bg-stone-100 border-stone-200 text-stone-700'
                            : 'bg-white/5 border border-white/10 text-stone-400'
                        }`}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

