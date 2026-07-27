import React, { useState } from 'react';
import { ArrowUp, Instagram, Facebook, Linkedin, Mail, Github } from 'lucide-react';
import { WeChatIcon } from './WeChatIcon';
import { useApp } from '../context/AppContext';

export const Footer: React.FC = () => {
  const [copiedWeChat, setCopiedWeChat] = useState(false);
  const { theme, t } = useApp();
  const isLight = theme === 'light';

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCopyWeChat = () => {
    navigator.clipboard.writeText('KendrewKoay');
    setCopiedWeChat(true);
    setTimeout(() => setCopiedWeChat(false), 2500);
  };

  return (
    <footer className={`mt-16 pt-8 pb-12 border-t flex flex-col sm:flex-row justify-between items-center text-xs font-mono uppercase tracking-wider gap-4 ${
      isLight ? 'border-stone-200 text-stone-600' : 'border-white/10 text-stone-500'
    }`} id="footer">
      <div>{t.footer.rights}</div>

      <div className="flex items-center gap-6">
        <div className="flex gap-4 items-center">
          <a
            href="https://instagram.com/kendrewkoay"
            target="_blank"
            rel="noreferrer"
            className={`transition-colors ${isLight ? 'text-stone-600 hover:text-stone-900' : 'text-stone-400 hover:text-white'}`}
            aria-label="Instagram (@kendrewkoay)"
            id="footer-instagram"
          >
            <Instagram className="w-4 h-4" />
          </a>
          <a
            href="https://facebook.com/KendrewKoay"
            target="_blank"
            rel="noreferrer"
            className={`transition-colors ${isLight ? 'text-stone-600 hover:text-stone-900' : 'text-stone-400 hover:text-white'}`}
            aria-label="Facebook (@KendrewKoay)"
            id="footer-facebook"
          >
            <Facebook className="w-4 h-4" />
          </a>
          <button
            type="button"
            onClick={handleCopyWeChat}
            className={`transition-colors cursor-pointer relative group ${isLight ? 'text-stone-600 hover:text-stone-900' : 'text-stone-400 hover:text-white'}`}
            aria-label="WeChat (KendrewKoay)"
            id="footer-wechat"
            title="KendrewKoay (Click to copy WeChat ID)"
          >
            <WeChatIcon className="w-4 h-4" />
            {copiedWeChat && (
              <span className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-[9px] rounded border whitespace-nowrap ${
                isLight ? 'bg-stone-800 text-stone-100 border-stone-700' : 'bg-stone-800 text-stone-200 border-white/10'
              }`}>
                {isLight ? '已复制微信ID' : 'Copied WeChat ID!'}
              </span>
            )}
          </button>
          <a
            href="https://www.linkedin.com/in/kendrewkoay"
            target="_blank"
            rel="noreferrer"
            className={`transition-colors ${isLight ? 'text-stone-600 hover:text-stone-900' : 'text-stone-400 hover:text-white'}`}
            aria-label="LinkedIn (Kendrew Koay)"
            id="footer-linkedin"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <a
            href="https://github.com/kendrewkoay"
            target="_blank"
            rel="noreferrer"
            className={`transition-colors ${isLight ? 'text-stone-600 hover:text-stone-900' : 'text-stone-400 hover:text-white'}`}
            aria-label="GitHub (@kendrewkoay)"
            id="footer-github"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href="mailto:kendrew_koay@hotmail.com"
            className={`transition-colors ${isLight ? 'text-stone-600 hover:text-stone-900' : 'text-stone-400 hover:text-white'}`}
            aria-label="Email"
            id="footer-email"
          >
            <Mail className="w-4 h-4" />
          </a>
        </div>

        <button
          type="button"
          onClick={scrollToTop}
          className={`p-2 rounded-full border transition-colors cursor-pointer ${
            isLight
              ? 'bg-stone-100 border-stone-300 text-stone-700 hover:bg-stone-200'
              : 'bg-[#080808] border-white/10 text-stone-300 hover:text-white'
          }`}
          title={t.footer.backToTop}
          aria-label={t.footer.backToTop}
          id="back-to-top-btn"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      </div>
    </footer>
  );
};

