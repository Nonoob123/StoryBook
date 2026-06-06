import React, { useState, useEffect, useCallback } from 'react';
import StoryBookLayout from './StoryBookLayout';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { playPageSpecificSfxByMapping, playMagicSfx } from '../utils/sfx';
import { vocabularyDatabase, VocabularyCard } from '../data/vocabulary';

interface Scene {
  image: string;
  text: string;
}

interface BookViewerProps {
  title: string;
  scenes: Scene[];
  onGoHome: () => void;
}

type LayoutMode = 'left' | 'right' | 'top' | 'bottom';

const LayoutButton = ({ mode, currentMode, onClick, label }: { mode: LayoutMode, currentMode: LayoutMode, onClick: (v: LayoutMode) => void, label: string }) => {
  const active = mode === currentMode;
  return (
    <button 
      onClick={() => onClick(mode)}
      className={`px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-colors ${active ? 'bg-[#6B5EDB] text-white shadow-md' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700'}`}
    >
      {label}
    </button>
  );
};

export default function BookViewer({ title, scenes, onGoHome }: BookViewerProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [layoutMode, setLayoutMode] = useState<LayoutMode>(() => {
    const saved = localStorage.getItem('story_layout');
    return saved && saved !== 'overlay' ? (saved as LayoutMode) : 'left';
  });
  const [fontSize, setFontSize] = useState<number>(() => {
    const saved = localStorage.getItem('story_fontSize');
    return saved ? parseInt(saved, 10) : 22;
  });
  const [isZoomed, setIsZoomed] = useState(false);
  const totalPages = scenes.length;

  useEffect(() => {
    localStorage.setItem('story_layout', layoutMode);
  }, [layoutMode]);

  useEffect(() => {
    localStorage.setItem('story_fontSize', fontSize.toString());
  }, [fontSize]);

  const currentScene = scenes[currentPage - 1];

  const playPageTurnSound = () => {
    if (localStorage.getItem('story_sfx_enabled') === 'false') return;
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(320, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(700, ctx.currentTime + 0.12);
      
      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.12);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start();
      osc.stop(ctx.currentTime + 0.13);
    } catch (e) {
      console.warn('SFX playback failed:', e);
    }
  };

  const [activeVocab, setActiveVocab] = useState<VocabularyCard | null>(null);

  useEffect(() => {
    // Scroll to top on page change
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // Reset zoom state on page change
    setIsZoomed(false);
    // Play page-turn layout sound
    playPageTurnSound();

    // Play special scene-specific sound if "自動播頁面音效" is active/enabled!
    const autoPlayPageSfx = localStorage.getItem('story_autoplay_page_sfx') !== 'false';
    if (autoPlayPageSfx) {
      const isRainbowBook = title.includes("彩虹");
      // Delayed slightly to not overlap with page turn
      const sfxTimer = setTimeout(() => {
        playPageSpecificSfxByMapping(isRainbowBook, currentPage);
      }, 550);
      return () => clearTimeout(sfxTimer);
    }
  }, [currentPage, title]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePrev = useCallback(() => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
  }, []);

  const handleNext = useCallback(() => {
    setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));
  }, [totalPages]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'Escape') {
        setIsZoomed(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlePrev, handleNext]);

  const getContainerClasses = () => {
    switch (layoutMode) {
      case 'left': return 'flex-col md:flex-row';
      case 'right': return 'flex-col md:flex-row-reverse';
      case 'top': return 'flex-col';
      case 'bottom': return 'flex-col-reverse';
      default: return 'flex-col md:flex-row';
    }
  };

  const getImageClasses = () => {
    const base = 'relative w-full flex items-center justify-center z-0 cursor-zoom-in group transition-all duration-300 overflow-hidden';
    switch (layoutMode) {
      case 'left': return `${base} md:w-1/2 md:flex-1 md:border-r border-gray-100 dark:border-slate-700 p-1 md:p-3 lg:p-4 min-h-[300px] bg-slate-50/50 dark:bg-slate-900/30`;
      case 'right': return `${base} md:w-1/2 md:flex-1 md:border-l border-gray-100 dark:border-slate-700 p-1 md:p-3 lg:p-4 min-h-[300px] bg-slate-50/50 dark:bg-slate-900/30`;
      case 'top': return `${base} h-[58vh] md:h-[65vh] lg:h-[70vh] border-b border-gray-100 dark:border-slate-700 p-1 md:p-2 flex-shrink-0`;
      case 'bottom': return `${base} h-[58vh] md:h-[65vh] lg:h-[70vh] border-t border-gray-100 dark:border-slate-700 p-1 md:p-2 flex-shrink-0`;
      default: return base;
    }
  };

  const getTextClasses = () => {
    switch (layoutMode) {
      case 'left': 
      case 'right': return 'w-full md:w-1/2 md:flex-1 p-5 md:p-8 lg:p-10 xl:p-12 flex flex-col justify-center relative z-10 overflow-y-auto h-full';
      case 'top': 
      case 'bottom': return 'w-full flex-1 p-4 md:p-6 lg:p-8 flex flex-col justify-center relative z-10 overflow-y-auto h-full';
      default: return '';
    }
  };

  const handleResetSettings = () => {
    setFontSize(22);
    setLayoutMode('left');
  };

  const playVocabClick = (card: VocabularyCard) => {
    // Play magic chime first
    playMagicSfx();
    setActiveVocab(card);

    // Instantly speak word and card explanation!
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      const speech = new SpeechSynthesisUtterance(`${card.word}。${card.explanation}`);
      
      // Try to set reference voice
      const savedVoice = localStorage.getItem('story_tts_voice');
      if (savedVoice) {
        const allVoices = window.speechSynthesis.getVoices();
        const match = allVoices.find(v => v.name === savedVoice);
        if (match) {
          speech.voice = match;
        }
      }
      // Slow down vocab guide slightly so it is crystal clear for kids
      speech.rate = 0.85; 
      window.speechSynthesis.speak(speech);
    }
  };

  const matchedVocabList = Object.keys(vocabularyDatabase).filter((key) => {
    return currentScene.text.includes(key);
  });

  const settingsPanel = (
    <div className="flex flex-col gap-4 text-left">
      <div>
        <h4 className="text-xs font-semibold text-gray-450 dark:text-slate-400 uppercase tracking-wider mb-2.5">排版模式</h4>
        <div className="grid grid-cols-2 gap-1.5">
          <LayoutButton mode="left" currentMode={layoutMode} onClick={setLayoutMode} label="左圖右文" />
          <LayoutButton mode="right" currentMode={layoutMode} onClick={setLayoutMode} label="左文右圖" />
          <LayoutButton mode="top" currentMode={layoutMode} onClick={setLayoutMode} label="上圖下文" />
          <LayoutButton mode="bottom" currentMode={layoutMode} onClick={setLayoutMode} label="上文下圖" />
        </div>
      </div>

      <div className="pt-3.5 border-t border-gray-150 dark:border-slate-700/50">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-xs font-semibold text-gray-450 dark:text-slate-400 uppercase tracking-wider">字體大小</h4>
          <span className="text-sm font-bold text-[#6B5EDB] dark:text-indigo-400">{fontSize}px</span>
        </div>
        
        <input
          type="range"
          min="16"
          max="32"
          step="1"
          value={fontSize}
          onChange={(e) => setFontSize(Number(e.target.value))}
          className="w-full h-1.5 bg-gray-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-[#6B5EDB]"
        />
        <div className="flex justify-between text-[10px] text-gray-400 dark:text-slate-500 mt-1 select-none">
          <span>適中 (16px)</span>
          <span>特大 (32px)</span>
        </div>
      </div>

      <button
        onClick={handleResetSettings}
        className="mt-1 w-full py-2.5 px-4 rounded-2xl text-xs font-bold bg-gray-100 hover:bg-gray-150 dark:bg-slate-700 dark:hover:bg-slate-600 text-gray-650 dark:text-slate-200 transition-colors cursor-pointer text-center shadow-inner"
      >
        重置排版設置
      </button>
    </div>
  );

  return (
    <StoryBookLayout
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={handlePageChange}
      onGoHome={onGoHome}
      customSettings={settingsPanel}
      currentText={currentScene.text}
    >
      {/* Floating Side Navigation */}
      <div className="fixed inset-y-0 left-0 flex items-center justify-start px-2 md:px-8 z-45 pointer-events-none">
        <button 
          onClick={handlePrev}
          disabled={currentPage === 1}
          className="pointer-events-auto w-10 h-10 md:w-16 md:h-16 flex items-center justify-center rounded-full bg-white/95 dark:bg-slate-800/95 shadow-lg md:shadow-2xl text-[#6B5EDB] disabled:opacity-0 transition-all hover:scale-110 active:scale-95 border border-indigo-50 dark:border-slate-700 dark:text-indigo-400"
          aria-label="上一頁"
        >
          <ChevronLeft size={32} className="md:w-9 md:h-9" />
        </button>
      </div>

      <div className="fixed inset-y-0 right-0 flex items-center justify-end px-2 md:px-8 z-45 pointer-events-none">
        <button 
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="pointer-events-auto w-10 h-10 md:w-16 md:h-16 flex items-center justify-center rounded-full bg-white/95 dark:bg-slate-800/95 shadow-lg md:shadow-2xl text-[#6B5EDB] disabled:opacity-0 transition-all hover:scale-110 active:scale-95 border border-indigo-50 dark:border-slate-700 dark:text-indigo-400"
          aria-label="下一頁"
        >
          <ChevronRight size={32} className="md:w-9 md:h-9" />
        </button>
      </div>

      <div className="flex flex-col items-center justify-center w-full max-w-[98vw] px-1 md:px-2 py-1 mt-12 md:mt-8 min-h-[calc(100vh-90px)] flex-1">
        
        {/* Book Page Card */}
        <div className={`flex bg-white dark:bg-slate-800 rounded-3xl shadow-xl shadow-purple-500/5 w-full h-[84vh] md:h-[88vh] lg:h-[90vh] transition-colors duration-300 ${getContainerClasses()}`}>
          
          {/* Image Container */}
          <div className={getImageClasses()} onClick={() => setIsZoomed(true)}>
            <img 
              src={currentScene.image} 
              alt={`${title} - Page ${currentPage}`}
              className="w-full h-full transform group-hover:scale-[1.03] transition-transform duration-700 ease-out object-contain drop-shadow-md rounded-2xl max-h-[75vh] md:max-h-full p-1 md:p-3"
              referrerPolicy="no-referrer"
            />
            {/* Page Number Badge */}
            <div className="absolute top-6 left-6 md:top-8 md:left-8 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-medium text-gray-600 dark:text-gray-300 shadow-sm transition-colors border border-gray-150 dark:border-slate-700" onClick={(e) => e.stopPropagation()}>
              第 {currentPage} 頁
            </div>
          </div>

          {/* Text Container */}
          <div className={`${getTextClasses()} flex flex-col`}>
            <div className="flex-1 overflow-y-auto pr-1 flex flex-col justify-center min-h-0">
              <div 
                className="prose dark:prose-invert max-w-none text-gray-805 dark:text-gray-200"
                style={{ fontSize: `${fontSize}px`, lineHeight: '1.6' }}
                dangerouslySetInnerHTML={{ __html: currentScene.text }}
              />
            </div>

            {/* 單字點讀卡 section */}
            {matchedVocabList.length > 0 && (
              <div className="mt-6 pt-4 border-t border-dashed border-indigo-150/40 dark:border-slate-700/50">
                <span className="text-xs font-bold text-[#6B5EDB] dark:text-indigo-400 block mb-2.5 flex items-center gap-1.5 select-none hover:scale-102 transition-transform">
                  💡 點讀小百科 (點擊聽語音 & 看說明):
                </span>
                <div className="flex flex-wrap gap-2.5 max-h-[14vh] overflow-y-auto py-1">
                  {matchedVocabList.map((wordKey) => {
                    const card = vocabularyDatabase[wordKey];
                    return (
                      <button
                        key={wordKey}
                        onClick={() => playVocabClick(card)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-indigo-50/50 hover:bg-[#6B5EDB]/10 dark:bg-slate-700/30 dark:hover:bg-slate-700/60 text-xs font-bold text-slate-700 dark:text-slate-200 transition-all shadow-sm border border-indigo-100/30 dark:border-slate-700/50 hover:scale-105 active:scale-95 cursor-pointer"
                        title={`聽發音: ${card.word}`}
                      >
                        <span className="text-sm">{card.emoji}</span>
                        <span className="text-[#6B5EDB] dark:text-indigo-300 underline decoration-dotted underline-offset-4">{card.word}</span>
                        <span className="text-[10px] text-gray-400 dark:text-slate-400 font-mono">({card.pinyin})</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom progress bar */}
        <div className="w-full max-w-md mt-6 flex-col items-center gap-2 hidden md:flex">
          <div className="w-full h-1.5 bg-gray-200/80 dark:bg-slate-700/80 rounded-full overflow-hidden backdrop-blur-sm shadow-sm border border-gray-300/50 dark:border-slate-600/50">
            <div 
              className="h-full bg-gradient-to-r from-[#667eea] to-[#764ba2] transition-all duration-350 ease-out"
              style={{ width: `${(currentPage / totalPages) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Lightbox zoom overlay */}
      <AnimatePresence>
        {isZoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsZoomed(false)}
            className="fixed inset-0 bg-black/95 dark:bg-slate-950/98 backdrop-blur-xl z-55 flex flex-col items-center justify-center p-4 md:p-8 cursor-zoom-out select-none"
          >
            <motion.button
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => {
                e.stopPropagation();
                setIsZoomed(false);
              }}
              className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 active:scale-95 text-white transition-all shadow-lg border border-white/20 cursor-pointer z-50 text-xl font-bold"
              aria-label="關閉"
            >
              <X size={24} />
            </motion.button>

            <div className="relative max-w-full max-h-[85vh] md:max-h-[88vh] flex items-center justify-center cursor-default" onClick={(e) => e.stopPropagation()}>
              <motion.img
                initial={{ scale: 0.9, y: 30 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 30 }}
                transition={{ type: "spring", damping: 25, stiffness: 220 }}
                src={currentScene.image}
                alt={`${title} - Dynamic Zoom`}
                className="max-w-[95vw] sm:max-w-[90vw] max-h-[80vh] md:max-h-[84vh] object-contain rounded-2xl shadow-2xl border-4 border-white/20 select-none bg-slate-900/40 cursor-zoom-out"
                onClick={() => setIsZoomed(false)}
                referrerPolicy="no-referrer"
              />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
              exit={{ opacity: 0, y: 10 }}
              className="mt-4 md:mt-6 text-white/80 bg-white/10 backdrop-blur-md border border-white/10 px-5 py-2 rounded-full text-xs md:text-sm font-medium tracking-wide flex items-center gap-2 select-none"
            >
              <span>✨ 點擊圖片或任意空白處返回故事書</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Vocab details modal with rich content */}
      <AnimatePresence>
        {activeVocab && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              if (typeof window !== 'undefined' && window.speechSynthesis) {
                window.speechSynthesis.cancel();
              }
              setActiveVocab(null);
            }}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-55 flex items-center justify-center p-4 cursor-pointer"
          >
            <motion.div
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-xs sm:max-w-sm rounded-[32px] p-6 shadow-2xl border flex flex-col items-center text-center bg-white border-gray-150 text-gray-800 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-100 cursor-default"
            >
              <div className="text-5xl mb-4 p-4 rounded-full bg-indigo-50/50 dark:bg-slate-700/50">
                {activeVocab.emoji}
              </div>
              
              <h3 className="text-2xl font-black text-[#6B5EDB] dark:text-indigo-400 mb-2 flex items-center gap-1.5 justify-center">
                {activeVocab.word}
              </h3>

              <div className="flex flex-wrap gap-2.5 mb-4 justify-center select-none">
                <span className="px-2.5 py-0.5 text-xs bg-[#6B5EDB]/10 dark:bg-[#6B5EDB]/25 text-[#6B5EDB] dark:text-indigo-300 rounded-full font-bold">
                  拼音 {activeVocab.pinyin}
                </span>
                <span className="px-2.5 py-0.5 text-xs bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-full font-bold">
                  注音 {activeVocab.zhuyin}
                </span>
              </div>

              <div className="w-full text-left bg-gray-50 dark:bg-slate-900/40 p-4 rounded-2xl mb-5 border border-gray-100 dark:border-slate-700/50">
                <span className="text-[10px] font-bold text-gray-400 dark:text-slate-500 block mb-1 uppercase tracking-wider">詞語小辭典</span>
                <p className="text-sm leading-relaxed text-gray-650 dark:text-slate-200 font-medium">
                  {activeVocab.explanation}
                </p>
              </div>

              <div className="flex gap-2.5 w-full">
                <button
                  onClick={() => {
                    if (typeof window !== 'undefined' && window.speechSynthesis) {
                      window.speechSynthesis.cancel();
                      const speech = new SpeechSynthesisUtterance(`${activeVocab.word}。${activeVocab.explanation}`);
                      const savedVoice = localStorage.getItem('story_tts_voice');
                      if (savedVoice) {
                        const allVoices = window.speechSynthesis.getVoices();
                        const match = allVoices.find(v => v.name === savedVoice);
                        if (match) speech.voice = match;
                      }
                      speech.rate = 0.85;
                      window.speechSynthesis.speak(speech);
                    }
                  }}
                  className="flex-1 py-3 px-4 rounded-2xl bg-[#6B5EDB] hover:bg-[#5A4FC4] text-white font-bold text-xs flex items-center justify-center gap-1 shadow-md hover:scale-[1.02] active:scale-95 transition-all cursor-pointer border-0"
                >
                  🔊 聽說明
                </button>
                <button
                  onClick={() => {
                    if (typeof window !== 'undefined' && window.speechSynthesis) {
                      window.speechSynthesis.cancel();
                    }
                    setActiveVocab(null);
                  }}
                  className="px-5 py-3 rounded-2xl bg-gray-100 hover:bg-gray-150 dark:bg-slate-700 dark:hover:bg-slate-650 text-gray-550 dark:text-slate-200 font-bold text-xs transition-colors cursor-pointer border-0"
                >
                  關閉
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </StoryBookLayout>
  );
}
