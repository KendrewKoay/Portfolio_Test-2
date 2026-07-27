import React, { useState } from 'react';
import { Mail, MapPin, Send, Copy, Check, Instagram, Facebook, Linkedin, Github } from 'lucide-react';
import { WeChatIcon } from './WeChatIcon';
import { useApp } from '../context/AppContext';

export const ContactSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [copiedWeChat, setCopiedWeChat] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const { theme, lang, t } = useApp();
  const isLight = theme === 'light';

  const email = 'kendrew_koay@hotmail.com';
  const wechat = 'KendrewKoay';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleCopyWeChat = () => {
    navigator.clipboard.writeText(wechat);
    setCopiedWeChat(true);
    setTimeout(() => setCopiedWeChat(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.message) return;

    const subject = encodeURIComponent(`Portfolio Inquiry from ${formData.name || 'Visitor'}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    
    // Open default mail client with pre-filled details addressed to kendrew_koay@hotmail.com
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;

    setFormSubmitted(true);
  };

  return (
    <section className="scroll-mt-24 py-8 pb-0" id="contact">
      <div className={`flex items-center gap-2.5 text-xs uppercase tracking-[0.3em] font-bold border-b pb-4 mb-6 ${
        isLight ? 'text-stone-700 border-stone-200' : 'text-stone-500 border-white/10'
      }`}>
        <Mail className={`w-4 h-4 ${isLight ? 'text-stone-800' : 'text-stone-400'}`} />
        {t.contact.sectionTitle}
      </div>

      <div className={`p-8 md:p-10 rounded-[32px] border shadow-2xl space-y-8 ${
        isLight
          ? 'bg-white border-stone-200/90 text-stone-900 shadow-md'
          : 'bg-[#080808] border-white/10 text-stone-200'
      }`}>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className={`text-base font-mono flex items-center gap-2 ${
                isLight ? 'text-stone-900 font-semibold' : 'text-stone-200'
              }`}>
                <Send className={`w-4 h-4 ${isLight ? 'text-stone-700' : 'text-stone-400'}`} /> {email}
              </span>
              <button
                type="button"
                onClick={handleCopyEmail}
                className={`p-1.5 rounded-full border text-[10px] uppercase font-mono tracking-wider transition-colors cursor-pointer flex items-center gap-1 px-3 ${
                  isLight
                    ? 'bg-stone-100 hover:bg-stone-200 border-stone-300 text-stone-800'
                    : 'bg-white/10 hover:bg-white/20 border-white/10 text-stone-300'
                }`}
                title="Copy email to clipboard"
                id="copy-email-btn"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    <span className="text-emerald-600 dark:text-emerald-400 font-semibold">{t.contact.copied}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>{t.contact.copy}</span>
                  </>
                )}
              </button>
            </div>

            <p className={`text-xs font-mono uppercase tracking-widest flex items-center gap-2 ${
              isLight ? 'text-stone-600' : 'text-stone-500'
            }`}>
              <MapPin className={`w-3.5 h-3.5 shrink-0 ${isLight ? 'text-stone-700' : 'text-stone-400'}`} /> {t.contact.locations}
            </p>
          </div>

          {/* Social Links */}
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="https://instagram.com/kendrewkoay"
              target="_blank"
              rel="noreferrer"
              className={`p-2.5 rounded-full border transition-all flex items-center gap-1.5 px-3.5 ${
                isLight
                  ? 'bg-stone-100 hover:bg-stone-200 border-stone-300 text-stone-800'
                  : 'bg-[#050505] hover:text-white border-white/10 hover:border-white/30 text-stone-300'
              }`}
              aria-label="Instagram (@kendrewkoay)"
              id="social-instagram"
            >
              <Instagram className="w-4 h-4" />
              <span className="text-xs font-mono">@kendrewkoay</span>
            </a>
            <a
              href="https://facebook.com/KendrewKoay"
              target="_blank"
              rel="noreferrer"
              className={`p-2.5 rounded-full border transition-all flex items-center gap-1.5 px-3.5 ${
                isLight
                  ? 'bg-stone-100 hover:bg-stone-200 border-stone-300 text-stone-800'
                  : 'bg-[#050505] hover:text-white border-white/10 hover:border-white/30 text-stone-300'
              }`}
              aria-label="Facebook (@KendrewKoay)"
              id="social-facebook"
            >
              <Facebook className="w-4 h-4" />
              <span className="text-xs font-mono">@KendrewKoay</span>
            </a>
            <button
              type="button"
              onClick={handleCopyWeChat}
              className={`p-2.5 rounded-full border transition-all flex items-center gap-1.5 px-3.5 cursor-pointer ${
                isLight
                  ? 'bg-stone-100 hover:bg-stone-200 border-stone-300 text-stone-800'
                  : 'bg-[#050505] hover:text-white border-white/10 hover:border-white/30 text-stone-300'
              }`}
              aria-label="WeChat (KendrewKoay)"
              id="social-wechat"
              title="Click to copy WeChat ID"
            >
              <WeChatIcon className="w-4 h-4" />
              <span className="text-xs font-mono">
                {copiedWeChat ? (isLight ? '已复制微信ID' : 'Copied WeChat ID!') : 'KendrewKoay'}
              </span>
            </button>
            <a
              href="https://www.linkedin.com/in/kendrewkoay"
              target="_blank"
              rel="noreferrer"
              className={`p-2.5 rounded-full border transition-all flex items-center gap-1.5 px-3.5 ${
                isLight
                  ? 'bg-stone-100 hover:bg-stone-200 border-stone-300 text-stone-800'
                  : 'bg-[#050505] hover:text-white border-white/10 hover:border-white/30 text-stone-300'
              }`}
              aria-label="LinkedIn (Kendrew Koay)"
              id="social-linkedin"
            >
              <Linkedin className="w-4 h-4" />
              <span className="text-xs font-mono">Kendrew Koay</span>
            </a>
            <a
              href="https://github.com/kendrewkoay"
              target="_blank"
              rel="noreferrer"
              className={`p-2.5 rounded-full border transition-all flex items-center gap-1.5 px-3.5 ${
                isLight
                  ? 'bg-stone-100 hover:bg-stone-200 border-stone-300 text-stone-800'
                  : 'bg-[#050505] hover:text-white border-white/10 hover:border-white/30 text-stone-300'
              }`}
              aria-label="GitHub (@kendrewkoay)"
              id="social-github"
            >
              <Github className="w-4 h-4" />
              <span className="text-xs font-mono">@kendrewkoay</span>
            </a>
          </div>
        </div>

        {/* Quick Inquiry Form */}
        <div className={`border-t pt-6 ${isLight ? 'border-stone-200' : 'border-white/10'}`}>
          <h3 className={`text-sm mb-4 ${
            lang === 'zh' ? 'font-zh-serif not-italic font-bold' : 'font-serif-italic italic'
          } ${isLight ? 'text-stone-900' : 'text-stone-200'}`}>
            {t.contact.formHeading}
          </h3>

          {formSubmitted ? (
            <div className={`p-6 rounded-2xl text-center space-y-2 border animate-in fade-in duration-300 ${
              isLight ? 'bg-stone-50 border-stone-200' : 'bg-[#050505] border-white/10'
            }`}>
              <Check className="w-8 h-8 text-emerald-500 mx-auto" />
              <h4 className={`text-base ${
                lang === 'zh' ? 'font-zh-serif not-italic font-bold' : 'font-serif-italic italic'
              } ${isLight ? 'text-stone-900' : 'text-white'}`}>
                {t.contact.thankYouTitle}
              </h4>
              <p className={`text-xs ${isLight ? 'text-stone-600' : 'text-stone-400'}`}>
                {t.contact.thankYouBody}
              </p>
              <button
                type="button"
                onClick={() => {
                  setFormSubmitted(false);
                  setFormData({ name: '', email: '', message: '' });
                }}
                className={`mt-2 text-xs underline font-mono cursor-pointer ${
                  isLight ? 'text-stone-900 hover:text-stone-600' : 'text-stone-300 hover:text-white'
                }`}
              >
                {t.contact.sendAnother}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl" id="contact-form">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={`block text-[10px] font-mono uppercase tracking-[0.2em] mb-1 ${
                    isLight ? 'text-stone-600 font-bold' : 'text-stone-500'
                  }`}>
                    {t.contact.nameLabel}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={t.contact.namePlaceholder}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={`w-full text-xs px-4 py-2.5 rounded-xl border transition-colors focus:outline-hidden ${
                      isLight
                        ? 'bg-stone-50 text-stone-900 placeholder-stone-400 border-stone-300 focus:border-stone-800'
                        : 'bg-[#050505] text-stone-200 placeholder-stone-600 border-white/10 focus:border-white/30'
                    }`}
                    id="contact-name-input"
                  />
                </div>
                <div>
                  <label className={`block text-[10px] font-mono uppercase tracking-[0.2em] mb-1 ${
                    isLight ? 'text-stone-600 font-bold' : 'text-stone-500'
                  }`}>
                    {t.contact.emailLabel}
                  </label>
                  <input
                    type="email"
                    required
                    placeholder={t.contact.emailPlaceholder}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`w-full text-xs px-4 py-2.5 rounded-xl border transition-colors focus:outline-hidden ${
                      isLight
                        ? 'bg-stone-50 text-stone-900 placeholder-stone-400 border-stone-300 focus:border-stone-800'
                        : 'bg-[#050505] text-stone-200 placeholder-stone-600 border-white/10 focus:border-white/30'
                    }`}
                    id="contact-email-input"
                  />
                </div>
              </div>

              <div>
                <label className={`block text-[10px] font-mono uppercase tracking-[0.2em] mb-1 ${
                  isLight ? 'text-stone-600 font-bold' : 'text-stone-500'
                }`}>
                  {t.contact.messageLabel}
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder={t.contact.messagePlaceholder}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className={`w-full text-xs px-4 py-2.5 rounded-xl border transition-colors focus:outline-hidden ${
                    isLight
                      ? 'bg-stone-50 text-stone-900 placeholder-stone-400 border-stone-300 focus:border-stone-800'
                      : 'bg-[#050505] text-stone-200 placeholder-stone-600 border-white/10 focus:border-white/30'
                  }`}
                  id="contact-message-input"
                />
              </div>

              <button
                type="submit"
                className={`px-6 py-3 rounded-full text-xs uppercase tracking-[0.2em] font-semibold transition-all cursor-pointer shadow-md ${
                  isLight
                    ? 'bg-stone-900 text-white hover:bg-stone-800'
                    : 'bg-white text-black hover:bg-stone-200'
                }`}
                id="contact-submit-btn"
              >
                {t.contact.sendBtn}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

