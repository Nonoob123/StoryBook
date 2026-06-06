import React, { useState, useEffect, useCallback, useRef } from 'react';
import { 
  Home, Music, VolumeX, Volume1, Volume2, Moon, Settings, Sun,
  Play, Pause, Square, Headphones, Upload, Sparkles, Smile, Radio, Volume
} from 'lucide-react';
import { 
  playMagicSfx, playCheerSfx, playJumpSfx 
} from '../utils/sfx';

class SynthBGM {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private timer: any = null;
  private currentNoteIndex = 0;
  private volumeNode: GainNode | null = null;
  private type: 'box' | 'forest' = 'box';

  private notes = [
    261.63, 293.66, 329.63, 392.00, 440.00, // C4, D4, E4, G4, A4
    523.25, 587.33, 659.25, 783.99, 880.00, // C5, D5, E5, G5, A5
    1046.50 // C6
  ];

  private melodyBox = [
    0, 2, 4, 7, 5, 4, 2, 0,
    7, 9, 7, 5, 4, 2, 0, 2,
    4, 7, 5, 4, 7, 9, 8, 9,
    7, 5, 4, 2, 0, 2, 0, 0
  ];

  private melodyForest = [
    4, 7, 9, 7, 8, 9, 7, 4,
    2, 4, 7, 4, 9, 7, 4, 2,
    0, 4, 2, 7, 4, 9, 7, 8,
    9, 7, 4, 2, 4, 0, 2, 0
  ];

  constructor() {}

  public start(type: 'box' | 'forest', initialVolume: number) {
    this.stop();
    this.type = type;
    this.isPlaying = true;

    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      this.ctx = new AudioContextClass();
      
      this.volumeNode = this.ctx.createGain();
      this.volumeNode.connect(this.ctx.destination);
      this.setVolume(initialVolume);

      this.currentNoteIndex = 0;
      this.scheduleNextNote();
    } catch (e) {
      console.warn("Synth BGM failed to start:", e);
    }
  }

  public setVolume(vol: number) {
    if (this.volumeNode && this.ctx) {
      this.volumeNode.gain.setValueAtTime((vol / 100) * 0.12, this.ctx.currentTime);
    }
  }

  private scheduleNextNote() {
    if (!this.isPlaying || !this.ctx || this.ctx.state === 'closed') return;

    const melody = this.type === 'box' ? this.melodyBox : this.melodyForest;
    const noteIndex = melody[this.currentNoteIndex];
    const freq = this.notes[noteIndex];

    this.playNote(freq);

    this.currentNoteIndex = (this.currentNoteIndex + 1) % melody.length;

    const delay = this.type === 'box' ? 750 : 1350;
    this.timer = setTimeout(() => this.scheduleNextNote(), delay);
  }

  private playNote(freq: number) {
    if (!this.ctx || !this.volumeNode) return;

    const osc = this.ctx.createOscillator();
    const gainNode = this.ctx.createGain();

    osc.connect(gainNode);
    gainNode.connect(this.volumeNode);

    if (this.type === 'box') {
      osc.type = 'sine';
      
      gainNode.gain.setValueAtTime(0, this.ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.7, this.ctx.currentTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 1.8);
      
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      
      const osc2 = this.ctx.createOscillator();
      const gain2 = this.ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(freq * 2, this.ctx.currentTime);
      gain2.gain.setValueAtTime(0, this.ctx.currentTime);
      gain2.gain.linearRampToValueAtTime(0.25, this.ctx.currentTime + 0.01);
      gain2.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.5);
      osc2.connect(gain2);
      gain2.connect(this.volumeNode);
      osc2.start();
      osc2.stop(this.ctx.currentTime + 0.6);
    } else {
      osc.type = 'triangle';
      
      gainNode.gain.setValueAtTime(0, this.ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.4, this.ctx.currentTime + 0.1);
      gainNode.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 2.8);
      
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
    }

    osc.start();
    osc.stop(this.ctx.currentTime + (this.type === 'box' ? 2.0 : 3.0));
  }

  public stop() {
    this.isPlaying = false;
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
    if (this.ctx) {
      try {
        this.ctx.close();
      } catch (e) {}
      this.ctx = null;
    }
  }
}

const globalAudio = new Audio('/images/background_music.mp3');
globalAudio.loop = true;
let globalVolume = 50;
let globalIsDarkMode = false;
const globalSynthBgm = new SynthBGM();
let globalCustomBgmUrl: string | null = null;

interface StoryBookLayoutProps {
  children: React.ReactNode;
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  onGoHome?: () => void;
  customSettings?: React.ReactNode;
  headerControls?: React.ReactNode;
  voiceLoadingMsg?: string;
  currentText?: string;
}

const stripHtml = (html: string) => {
  if (typeof document === 'undefined') return html;
  const tmp = document.createElement('div');
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || '';
};

export default function StoryBookLayout({
  children,
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  onGoHome,
  customSettings,
  headerControls,
  voiceLoadingMsg,
  currentText
}: StoryBookLayoutProps) {
  // Static controls for background music
  const [volume, setVolume] = useState(() => {
    const saved = localStorage.getItem('story_bgm_volume');
    return saved ? parseInt(saved, 10) : 40;
  });
  const [isPlaying, setIsPlaying] = useState(() => {
    const saved = localStorage.getItem('story_bgm_playing');
    return saved === 'true';
  });
  const [bgmType, setBgmType] = useState<'default' | 'box' | 'forest' | 'custom'>(() => {
    return (localStorage.getItem('story_bgm_type') as any) || 'default';
  });
  const [customBgmUrl, setCustomBgmUrl] = useState<string | null>(globalCustomBgmUrl);
  
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (customBgmUrl) {
        URL.revokeObjectURL(customBgmUrl);
      }
      const url = URL.createObjectURL(file);
      setCustomBgmUrl(url);
      setBgmType('custom');
      setIsPlaying(true);
    }
  };

  const [isVolumeVisible, setIsVolumeVisible] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('story_dark_mode');
    return saved ? saved === 'true' : globalIsDarkMode;
  });
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [jumpInput, setJumpInput] = useState(currentPage.toString());
  const [isSfxEnabled, setIsSfxEnabled] = useState(() => {
    const saved = localStorage.getItem('story_sfx_enabled');
    return saved !== 'false';
  });
  const [autoPlayPageSfx, setAutoPlayPageSfx] = useState(() => {
    const saved = localStorage.getItem('story_autoplay_page_sfx');
    return saved === 'true';
  });

  // TTS (Text to Speech) State
  const [ttsSpeed, setTtsSpeed] = useState(() => {
    const saved = localStorage.getItem('story_tts_speed');
    return saved ? parseFloat(saved) : 1.0;
  });
  const [ttsVolume, setTtsVolume] = useState(() => {
    const saved = localStorage.getItem('story_tts_volume');
    return saved ? parseFloat(saved) : 1.0;
  });
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoiceName, setSelectedVoiceName] = useState(() => {
    return localStorage.getItem('story_tts_voice') || '';
  });
  const [isPlayingTts, setIsPlayingTts] = useState(false);
  const [isPausedTts, setIsPausedTts] = useState(false);
  const [storyMode, setStoryMode] = useState(() => {
    return localStorage.getItem('story_mode') === 'true';
  });
  const [speechCompletedThisPage, setSpeechCompletedThisPage] = useState(false);
  const [voiceLoadingMsgLocal, setVoiceLoadingMsgLocal] = useState('');

  const isInitialMount = useRef(true);
  const prevVoiceRef = useRef(selectedVoiceName);
  const isManualVoiceChangeRef = useRef(false);

  useEffect(() => {
    isInitialMount.current = false;
  }, []);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('story_autoplay_page_sfx', autoPlayPageSfx.toString());
  }, [autoPlayPageSfx]);

  useEffect(() => {
    localStorage.setItem('story_sfx_enabled', isSfxEnabled.toString());
  }, [isSfxEnabled]);

  useEffect(() => {
    localStorage.setItem('story_tts_speed', ttsSpeed.toString());
  }, [ttsSpeed]);

  useEffect(() => {
    localStorage.setItem('story_tts_volume', ttsVolume.toString());
  }, [ttsVolume]);

  useEffect(() => {
    localStorage.setItem('story_mode', storyMode.toString());
  }, [storyMode]);

  useEffect(() => {
    if (selectedVoiceName) {
      localStorage.setItem('story_tts_voice', selectedVoiceName);
    }
  }, [selectedVoiceName]);

  // Load SpeechSynthesis voices cleanly
  useEffect(() => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    
    const updateVoices = () => {
      const allVoices = window.speechSynthesis.getVoices();
      // Filter for Chinese voices first
      const filtered = allVoices.filter(v => 
        v.lang.includes('zh') || v.lang.includes('ZH') || v.lang.includes('cn') || v.lang.includes('tw') || v.lang.includes('hk')
      );
      // Sort: zh-TW first, then zh-HK, then zh-CN, then others
      const sorted = (filtered.length > 0 ? filtered : allVoices.slice(0, 10)).sort((a, b) => {
        const getPriority = (lang: string) => {
          if (lang.includes('zh-TW') || lang.includes('zh-tw')) return 0;
          if (lang.includes('zh-HK') || lang.includes('zh-hk')) return 1;
          if (lang.includes('zh-CN') || lang.includes('zh-cn')) return 2;
          if (lang.includes('zh')) return 3;
          return 4;
        };
        return getPriority(a.lang) - getPriority(b.lang);
      });
      setVoices(sorted);
      
      // Auto-select zh-TW voice as default if no voice is saved
      const savedVoice = localStorage.getItem('story_tts_voice');
      if (!savedVoice && sorted.length > 0) {
        const twVoice = sorted.find(v => v.lang.includes('zh-TW') || v.lang.includes('zh-tw'));
        if (twVoice) {
          setSelectedVoiceName(twVoice.name);
        } else {
          setSelectedVoiceName(sorted[0].name);
        }
      }
    };

    updateVoices();
    window.speechSynthesis.onvoiceschanged = updateVoices;
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.onvoiceschanged = null;
      }
    };
  }, []);

  // SpeechSynthesis Play/Pause/Stop control functions
  const startSpeaking = useCallback(() => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;

    window.speechSynthesis.cancel();

    // Determine the content to speak
    const textToRead = currentText ? stripHtml(currentText) : "歡迎來到我的故事書坊！選一本書，開啟精彩的冒險吧！";
    if (!textToRead) return;

    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.rate = ttsSpeed;
    utterance.volume = ttsVolume;

    let chosenVoiceName = '系統預設';
    const allVoices = window.speechSynthesis.getVoices();
    if (selectedVoiceName) {
      const match = allVoices.find(v => v.name === selectedVoiceName);
      if (match) {
        utterance.voice = match;
        chosenVoiceName = match.name.replace(/Microsoft|Google|Apple|Chinese/g, '').trim();
      }
    } else {
      const chineseVoice = allVoices.find(v => 
        v.lang.includes('zh-TW') || v.lang.includes('zh-HK') || v.lang.includes('zh-CN') || v.lang.includes('zh')
      );
      if (chineseVoice) {
        utterance.voice = chineseVoice;
        chosenVoiceName = chineseVoice.name.replace(/Microsoft|Google|Apple|Chinese/g, '').trim();
      }
    }

    // Only show loading message outside story mode
    if (!storyMode) {
      setVoiceLoadingMsgLocal(`語音資源載入中... (初次切換可能需要下載 ${chosenVoiceName})`);
    }

    utterance.onstart = () => {
      setIsPlayingTts(true);
      setIsPausedTts(false);
      setSpeechCompletedThisPage(false);
      // Only show voice loaded notification when NOT in story mode (avoid spam on every page turn)
      if (!storyMode) {
        setVoiceLoadingMsgLocal(`語音載入成功，已啟用 ${chosenVoiceName}！`);
        setTimeout(() => setVoiceLoadingMsgLocal(''), 3550);
      }
    };

    utterance.onend = () => {
      setIsPlayingTts(false);
      setIsPausedTts(false);
      setSpeechCompletedThisPage(true);
      setVoiceLoadingMsgLocal('');

      // Story Mode: auto-turn to next page upon completion
      if (storyMode && currentText && onPageChange && currentPage && totalPages && currentPage < totalPages) {
        onPageChange(currentPage + 1);
      }
    };

    utterance.onerror = (e) => {
      console.warn('TTS error:', e);
      setIsPlayingTts(false);
      setIsPausedTts(false);
      setSpeechCompletedThisPage(true);
      setVoiceLoadingMsgLocal('語音包載入中，請稍待...');
      setTimeout(() => setVoiceLoadingMsgLocal(''), 4000);
    };

    setIsPlayingTts(true);
    setIsPausedTts(false);
    window.speechSynthesis.speak(utterance);
  }, [currentText, ttsSpeed, selectedVoiceName, ttsVolume, storyMode, onPageChange, currentPage, totalPages]);

  const pauseSpeaking = useCallback(() => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    if (isPlayingTts && !isPausedTts) {
      window.speechSynthesis.pause();
      setIsPausedTts(true);
    }
  }, [isPlayingTts, isPausedTts]);

  const resumeSpeaking = useCallback(() => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    if (isPlayingTts && isPausedTts) {
      window.speechSynthesis.resume();
      setIsPausedTts(false);
    } else {
      startSpeaking();
    }
  }, [isPlayingTts, isPausedTts, startSpeaking]);

  const stopSpeaking = useCallback(() => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setIsPlayingTts(false);
    setIsPausedTts(false);
    setSpeechCompletedThisPage(true);
  }, []);

  // Handle immediate update of TTS Volume when dragging (safely debounced to optimize browser synthesizers)
  const volumeDebounceRef = useRef<NodeJS.Timeout | null>(null);
  useEffect(() => {
    if (isInitialMount.current) return;
    if (isPlayingTts && !isPausedTts) {
      if (volumeDebounceRef.current) clearTimeout(volumeDebounceRef.current);
      volumeDebounceRef.current = setTimeout(() => {
        // Restart speech with the new volume value safely
        startSpeaking();
      }, 200);
    }
    return () => {
      if (volumeDebounceRef.current) clearTimeout(volumeDebounceRef.current);
    };
  }, [ttsVolume]);

  // Handle voice change during active reading instantly
  useEffect(() => {
    if (prevVoiceRef.current === selectedVoiceName) return;
    prevVoiceRef.current = selectedVoiceName;

    if (!selectedVoiceName) return;
    if (typeof window === 'undefined' || !window.speechSynthesis) return;

    if (!isManualVoiceChangeRef.current) {
      return; // DO NOT speak "語音切換成功" when loading state or changing/navigating pages!
    }
    isManualVoiceChangeRef.current = false; // Reset toggle

    if (isPlayingTts) {
      // If we are currently reading, cancel and instantly speak current text with preferred voice
      startSpeaking();
    } else {
      // If idle, speak the success tone
      window.speechSynthesis.cancel();
      const testUtterance = new SpeechSynthesisUtterance("語音切換成功");
      testUtterance.volume = ttsVolume;
      const allVoices = window.speechSynthesis.getVoices();
      const match = allVoices.find(v => v.name === selectedVoiceName);
      let name = '系統預設';
      if (match) {
        testUtterance.voice = match;
        name = match.name.replace(/Microsoft|Google|Apple|Chinese/g, '').trim();
      }
      setVoiceLoadingMsgLocal(`正在更新並下載語音包: ${name}...`);
      testUtterance.onstart = () => {
        setVoiceLoadingMsgLocal(`語音加載成功！已啟用 - ${name}`);
        setTimeout(() => setVoiceLoadingMsgLocal(''), 3000);
      };
      testUtterance.onerror = () => setVoiceLoadingMsgLocal('');
      window.speechSynthesis.speak(testUtterance);
    }
  }, [selectedVoiceName]);

  // Handle speed and auto play changes instantly during play
  useEffect(() => {
    if (isInitialMount.current) return;
    if (isPlayingTts && !isPausedTts) {
      startSpeaking();
    }
  }, [ttsSpeed]);

  // Story Mode: auto-start reading when page changes
  useEffect(() => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    
    if (currentText && storyMode) {
      setSpeechCompletedThisPage(false);
      const timer = setTimeout(() => {
        startSpeaking();
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setSpeechCompletedThisPage(true);
      setIsPlayingTts(false);
      setIsPausedTts(false);
    }
  }, [currentPage, currentText, storyMode]);

  // Close Settings popover on clicking outside
  useEffect(() => {
    if (!isSettingsOpen) return;
    const handleOutsideClick = () => {
      setIsSettingsOpen(false);
    };
    window.addEventListener('click', handleOutsideClick);
    return () => window.removeEventListener('click', handleOutsideClick);
  }, [isSettingsOpen]);

  // Sync page jump inputs
  useEffect(() => {
    setJumpInput(currentPage.toString());
  }, [currentPage]);

  // Central music volume manager
  useEffect(() => {
    globalVolume = volume;
    globalAudio.volume = volume / 100;
    globalSynthBgm.setVolume(volume);
  }, [volume]);

  // Sync background music type preference to localStorage
  useEffect(() => {
    localStorage.setItem('story_bgm_type', bgmType);
  }, [bgmType]);

  // Handle caching state on unmount
  useEffect(() => {
    globalCustomBgmUrl = customBgmUrl;
  }, [customBgmUrl]);

  // Comprehensive background music player & synthesizer controller
  useEffect(() => {
    localStorage.setItem('story_bgm_playing', isPlaying.toString());
    localStorage.setItem('story_bgm_type', bgmType);
    localStorage.setItem('story_bgm_volume', volume.toString());

    // 1. Stop all playback first
    globalAudio.pause();
    globalSynthBgm.stop();

    if (!isPlaying) return;

    if (bgmType === 'default') {
      globalAudio.src = '/images/background_music.mp3';
      globalAudio.volume = volume / 100;
      globalAudio.play().catch((err) => {
        console.warn("Play default BGM error:", err);
      });
    } else if (bgmType === 'custom' && customBgmUrl) {
      globalAudio.src = customBgmUrl;
      globalAudio.volume = volume / 100;
      globalAudio.play().catch((err) => {
        console.warn("Play custom BGM error:", err);
        setBgmType('default');
      });
    } else if (bgmType === 'box') {
      globalSynthBgm.start('box', volume);
    } else if (bgmType === 'forest') {
      globalSynthBgm.start('forest', volume);
    }

    return () => {
      globalAudio.pause();
      globalSynthBgm.stop();
    };
  }, [isPlaying, bgmType, volume, customBgmUrl]);

  // Manage Dark Mode
  useEffect(() => {
    localStorage.setItem('story_dark_mode', isDarkMode.toString());
    globalIsDarkMode = isDarkMode;
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleJump = () => {
    const page = parseInt(jumpInput);
    if (!isNaN(page) && page >= 1 && page <= totalPages) {
      onPageChange?.(page);
    } else {
      setJumpInput(currentPage.toString());
    }
  };

  // Determine outer sound icon beautifully based on active audio modes
  const renderAudioIcon = () => {
    const isBgmActive = isPlaying && volume > 0;
    
    // If BOTH background music is off and page-turn SFX is off, show VolumeX
    if (!isBgmActive && !isSfxEnabled) {
      return <VolumeX size={20} className={isDarkMode ? 'text-indigo-400 opacity-50' : 'text-[#4838b0] opacity-50'} />;
    }
    
    // If BGM is active, show Music / Volume2
    if (isBgmActive) {
      return <Music size={20} className={isDarkMode ? 'text-indigo-400' : 'text-[#4838b0]'} />;
    }
    
    // If BGM is muted but page SFX is active, show Volume1 to indicate sound is still active
    return <Volume1 size={20} className={isDarkMode ? 'text-indigo-400' : 'text-[#4838b0]'} />;
  };

  const showLoaderMsg = voiceLoadingMsg || voiceLoadingMsgLocal;

  return (
    <div className={`relative w-full h-screen overflow-hidden flex flex-col font-sans transition-colors duration-300 ${isDarkMode ? 'dark bg-slate-900 text-white' : 'bg-gradient-to-br from-[#fdf2f4] via-[#f3ecfa] to-[#eef0f9]'}`}>
      
      {/* 頂部左側：返回首頁 */}
      {totalPages > 1 && onGoHome && (
        <div className="fixed top-6 left-6 z-50">
          <button
            onClick={onGoHome}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full shadow-sm transition-all hover:-translate-y-0.5 border ${isDarkMode ? 'bg-slate-800 text-slate-200 hover:bg-slate-700 border-slate-700' : 'bg-white/90 backdrop-blur-sm text-gray-700 hover:bg-white border-white'}`}
          >
            <Home size={18} className={isDarkMode ? 'text-indigo-400' : 'text-[#6B5EDB]'} />
            <span className="font-medium text-sm tracking-wide">返回首頁</span>
          </button>
        </div>
      )}

      {/* 頂部右側：控制欄（包含整排功能控調，首頁與故事書中皆顯示！） */}
      <div className={`fixed top-6 right-6 z-50 flex items-center gap-2.5 sm:gap-3 px-4 py-2 rounded-full shadow-md transition-colors border ${isDarkMode ? 'bg-slate-800 text-slate-200 border-slate-700' : 'bg-white/95 backdrop-blur-md text-gray-700 border-white'}`}>
        
        {/* Playback Controls (Play / Pause / Stop) */}
        <div className="flex items-center gap-1.5 shrink-0 select-none">
          {!isPlayingTts || isPausedTts ? (
            <button 
              onClick={resumeSpeaking}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-[#6B5EDB]/90 hover:bg-[#6B5EDB] text-white shadow-sm transition-all cursor-pointer active:scale-95 border-0"
              title="開始朗讀"
            >
              <Play size={9} fill="currentColor" />
              <span>朗讀</span>
            </button>
          ) : (
            <button 
              onClick={pauseSpeaking}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-[#6B5EDB]/10 hover:bg-[#6B5EDB]/25 text-[#6B5EDB] dark:text-indigo-400 border border-[#6B5EDB]/20 transition-all cursor-pointer active:scale-95"
              title="暫停"
            >
              <Pause size={9} fill="currentColor" />
              <span>暫停</span>
            </button>
          )}

          {isPlayingTts && (
            <button 
              onClick={stopSpeaking}
              className="p-1 px-1.5 rounded-full text-gray-500 hover:text-gray-750 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-800 transition-all cursor-pointer border-0 bg-transparent flex items-center justify-center animate-pulse"
              title="停止"
            >
              <Square size={9} fill="currentColor" className="text-rose-500" />
            </button>
          )}
        </div>

        <div className={`w-px h-5 ${isDarkMode ? 'bg-slate-700' : 'bg-gray-250/90'}`}></div>

        {/* Voice and Speech parameters (Voice, Speed, TTS Volume slider inline) */}
        <div className="flex items-center gap-2 sm:gap-3 text-xs text-gray-650 dark:text-slate-350 shrink-0 select-none">
          {voices.length > 0 && (
            <div className="hidden sm:flex items-center gap-1">
              <span className="font-semibold text-gray-400 dark:text-slate-500 text-[11px]">配音:</span>
              <select 
                value={selectedVoiceName}
                onChange={(e) => {
                  isManualVoiceChangeRef.current = true;
                  setSelectedVoiceName(e.target.value);
                }}
                className="bg-transparent text-gray-700 dark:text-slate-200 text-xs rounded py-0.5 max-w-[85px] sm:max-w-[100px] truncate focus:outline-none cursor-pointer font-bold border-0"
              >
                {voices.map((v) => (
                  <option key={v.name} value={v.name} className="bg-white dark:bg-slate-800 text-gray-800 dark:text-slate-100">
                    {v.name.replace(/Microsoft|Google|Apple|Chinese/g, '').trim()}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="hidden xs:flex items-center gap-1">
            <span className="font-semibold text-gray-400 dark:text-slate-500 text-[11px]">語速:</span>
            <select 
              value={ttsSpeed}
              onChange={(e) => setTtsSpeed(parseFloat(e.target.value))}
              className="bg-transparent text-gray-700 dark:text-slate-200 text-xs rounded py-0.5 focus:outline-none cursor-pointer font-bold border-0"
            >
              <option value="0.75" className="bg-white dark:bg-slate-800 text-gray-800 dark:text-slate-100">0.75x</option>
              <option value="1" className="bg-white dark:bg-slate-800 text-gray-800 dark:text-slate-100">1.0x</option>
              <option value="1.25" className="bg-white dark:bg-slate-800 text-gray-800 dark:text-slate-100">1.25x</option>
              <option value="1.5" className="bg-white dark:bg-slate-800 text-gray-800 dark:text-slate-100">1.5x</option>
            </select>
          </div>

          {/* Narration Vol Slider with customized progress line styling & percentage percentage values */}
          <div className="hidden sm:flex items-center gap-2">
            <Volume2 size={13} className="text-gray-400 dark:text-slate-500" />
            <input 
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={ttsVolume}
              onChange={(e) => setTtsVolume(parseFloat(e.target.value))}
              className="w-16 h-1 rounded-lg appearance-none cursor-pointer accent-[#6B5EDB] transition-all"
              style={{
                background: `linear-gradient(to right, #6B5EDB 0%, #6B5EDB ${ttsVolume * 100}%, ${isDarkMode ? '#334155' : '#E2E8F0'} ${ttsVolume * 100}%)`,
                WebkitAppearance: 'none'
              }}
              title={`朗讀音量: ${Math.round(ttsVolume * 100)}%`}
            />
            <span className="text-[11px] font-bold text-gray-500 dark:text-slate-400 w-8 select-none font-mono text-left">
              {Math.round(ttsVolume * 100)}%
            </span>
          </div>
        </div>

        {/* Story Mode toggle (only inside books) */}
        {currentText && (
          <>
            <div className={`hidden md:block w-px h-5 ${isDarkMode ? 'bg-slate-700' : 'bg-gray-250/90'}`}></div>
            
            <div className="hidden md:flex items-center gap-2 text-xs shrink-0 select-none">
              <button
                onClick={() => {
                  const newMode = !storyMode;
                  setStoryMode(newMode);
                  // If turning on story mode and not currently playing, start reading
                  if (newMode && !isPlayingTts && currentText) {
                    setTimeout(() => startSpeaking(), 150);
                  }
                  // If turning off story mode, stop any active reading
                  if (!newMode && isPlayingTts) {
                    stopSpeaking();
                  }
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all border ${
                  storyMode 
                    ? 'bg-[#6B5EDB] text-white border-[#6B5EDB] shadow-md shadow-purple-500/20' 
                    : 'text-gray-500 hover:text-gray-700 dark:text-slate-400 dark:hover:text-slate-200 border-gray-200 dark:border-slate-700 hover:bg-gray-50/80 dark:hover:bg-slate-800 bg-transparent'
                }`}
                title={storyMode ? "故事模式已開啟：自動朗讀並翻頁" : "點擊開啟故事模式：自動朗讀整本書"}
              >
                <Headphones size={12} className={storyMode ? 'animate-pulse' : ''} />
                <span>📖 故事模式</span>
              </button>

              {storyMode && isPlayingTts && currentPage < totalPages && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#6B5EDB]/10 text-[#6B5EDB] dark:text-indigo-400 border border-[#6B5EDB]/20 text-[10px] font-bold select-none whitespace-nowrap animate-pulse">
                  🎙️ 朗讀中 · 讀完自動翻頁
                </span>
              )}
              
              {storyMode && !isPlayingTts && speechCompletedThisPage && currentPage >= totalPages && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-[10px] font-bold select-none whitespace-nowrap">
                  ✅ 故事讀完了！
                </span>
              )}
            </div>
          </>
        )}

        <div className={`w-px h-5 ${isDarkMode ? 'bg-slate-700' : 'bg-gray-250/90'}`}></div>

        {/* BGM Toggle button with popup */}
        <div className="relative flex items-center">
          <button 
            onClick={() => setIsVolumeVisible(!isVolumeVisible)}
            className={`transition-transform hover:scale-110 outline-none flex items-center justify-center w-8 h-8 rounded-full ${isVolumeVisible ? (isDarkMode ? 'bg-slate-700' : 'bg-gray-100') : ''}`}
            title="音量與靜音設定"
          >
            {renderAudioIcon()}
          </button>
          
          {/* Audio Popover */}
          {isVolumeVisible && (
            <div className={`absolute top-full right-0 mt-3 p-4 rounded-3xl shadow-2xl border w-72 ${isDarkMode ? 'bg-slate-800 border-slate-700 text-slate-200' : 'bg-white border-gray-150 text-gray-700'} animate-in fade-in slide-in-from-top-2 origin-top-right z-50`} onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-4">
                <span className="font-bold text-sm text-[#6B5EDB] dark:text-indigo-400 flex items-center gap-1">📻 背景音樂</span>
                <button 
                  onClick={() => setIsPlaying(!isPlaying)}
                  className={`text-xs px-3 py-1 rounded-full font-bold transition-colors ${isPlaying ? (isDarkMode ? 'bg-indigo-500 text-white' : 'bg-[#6B5EDB]/10 text-[#6B5EDB]') : (isDarkMode ? 'bg-slate-700 text-slate-400' : 'bg-gray-100 text-gray-500')}`}
                >
                  {isPlaying ? '播放中' : '已暫停'}
                </button>
              </div>
              
              <div className="flex items-center gap-3 mb-4">
                <button 
                  onClick={() => {
                    if (volume > 0) {
                      setVolume(0);
                    } else {
                      setVolume(50);
                      if (!isPlaying) setIsPlaying(true);
                    }
                  }}
                  className="hover:scale-110 active:scale-95 transition-transform"
                  title={volume === 0 ? "取消靜音" : "靜音"}
                >
                  {volume > 0 ? <Music size={18} className="text-[#6B5EDB]" /> : <VolumeX size={18} className="text-gray-400" />}
                </button>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={volume}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    setVolume(val);
                    if (val > 0 && !isPlaying) setIsPlaying(true);
                  }}
                  className="flex-1 h-1.5 rounded-lg appearance-none cursor-pointer accent-[#6B5EDB]"
                  style={{
                    background: `linear-gradient(to right, #6B5EDB 0%, #6B5EDB ${volume}%, ${isDarkMode ? '#334155' : '#E2E8F0'} ${volume}%)`,
                    WebkitAppearance: 'none'
                  }}
                />
                <span className="text-xs font-bold w-9 text-right select-none font-mono">{volume}%</span>
              </div>

              {/* BGM Track Selector */}
              <div className="mt-3 pt-3 border-t border-gray-100 dark:border-slate-700/50">
                <span className="text-xs text-gray-400 dark:text-slate-500 font-bold block mb-2 tracking-wide uppercase">
                  音樂風格
                </span>
                <div className="grid grid-cols-1 gap-1.5">
                  <button
                    onClick={() => { setBgmType('default'); if(!isPlaying) setIsPlaying(true); }}
                    className={`text-left text-xs px-2.5 py-1.5 rounded-xl font-bold transition-all flex items-center justify-between ${bgmType === 'default' ? 'bg-[#6B5EDB]/10 text-[#6B5EDB]' : 'hover:bg-gray-50 dark:hover:bg-slate-700 text-gray-650 dark:text-slate-300 bg-transparent'}`}
                  >
                    <span>🎹 溫馨鋼琴 (預設)</span>
                    {bgmType === 'default' && <span className="w-1.5 h-1.5 rounded-full bg-[#6B5EDB]" />}
                  </button>
                  <button
                    onClick={() => { setBgmType('box'); if(!isPlaying) setIsPlaying(true); }}
                    className={`text-left text-xs px-2.5 py-1.5 rounded-xl font-bold transition-all flex items-center justify-between ${bgmType === 'box' ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400' : 'hover:bg-gray-50 dark:hover:bg-slate-700 text-gray-655 dark:text-slate-300 bg-transparent'}`}
                  >
                    <span>🎵 夢幻童話音樂盒</span>
                    {bgmType === 'box' && <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />}
                  </button>
                  <button
                    onClick={() => { setBgmType('forest'); if(!isPlaying) setIsPlaying(true); }}
                    className={`text-left text-xs px-2.5 py-1.5 rounded-xl font-bold transition-all flex items-center justify-between ${bgmType === 'forest' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'hover:bg-gray-50 dark:hover:bg-slate-700 text-gray-655 dark:text-slate-300 bg-transparent'}`}
                  >
                    <span>🌲 晨曦精靈風鈴</span>
                    {bgmType === 'forest' && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />}
                  </button>
                  
                  {/* Upload option */}
                  <label className={`text-left text-xs px-2.5 py-1.5 rounded-xl font-bold transition-all flex items-center justify-between cursor-pointer ${bgmType === 'custom' ? 'bg-[#6B5EDB]/10 text-[#6B5EDB]' : 'hover:bg-gray-50 dark:hover:bg-slate-700 text-gray-655 dark:text-slate-300 bg-transparent'}`}>
                    <span className="flex items-center gap-1.5 truncate">
                      <Upload size={12} className={bgmType === 'custom' ? 'text-[#6B5EDB]' : 'text-gray-400'} />
                      <span className="truncate">{customBgmUrl ? '📤 已導入個人音樂' : '📤 上傳自訂 MP3'}</span>
                    </span>
                    <input 
                      type="file" 
                      accept="audio/*" 
                      onChange={handleFileUpload} 
                      className="hidden" 
                    />
                    {bgmType === 'custom' && <span className="w-1.5 h-1.5 rounded-full bg-[#6B5EDB]" />}
                  </label>
                </div>
              </div>

              {/* Toggle Slide Page sound effect */}
              <div className="mt-3 pt-3 border-t border-gray-100 dark:border-slate-700/50 flex justify-between items-center bg-transparent">
                <span className="text-xs text-gray-500 dark:text-slate-400 font-bold">開啟翻頁音效</span>
                <button 
                  onClick={() => setIsSfxEnabled(!isSfxEnabled)}
                  className={`text-[11px] px-2.5 py-1 rounded-full font-bold transition-all shadow-sm cursor-pointer border ${isSfxEnabled ? 'bg-[#6B5EDB] hover:bg-[#5A4FC4] text-white border-transparent' : 'bg-transparent text-gray-500 border-gray-200 dark:border-slate-700'}`}
                >
                  {isSfxEnabled ? '已開啟' : '已關閉'}
                </button>
              </div>

              {/* Toggle Story Mode sound effect */}
              <div className="mt-2.5 pt-2.5 border-t border-gray-100 dark:border-slate-700/50 flex justify-between items-center bg-transparent">
                <span className="text-xs text-gray-500 dark:text-slate-400 font-bold">故事模式音效</span>
                <button 
                  onClick={() => setAutoPlayPageSfx(!autoPlayPageSfx)}
                  className={`text-[11px] px-2.5 py-1 rounded-full font-bold transition-all shadow-sm cursor-pointer border ${autoPlayPageSfx ? 'bg-amber-500 hover:bg-amber-600 text-white border-transparent' : 'bg-transparent text-gray-500 border-gray-200 dark:border-slate-700'}`}
                >
                  {autoPlayPageSfx ? '已開啟' : '已關閉'}
                </button>
              </div>
            </div>
          )}
        </div>

        <div className={`w-px h-5 ${isDarkMode ? 'bg-slate-700' : 'bg-gray-250/90'}`}></div>

        {/* Dark Mode toggle */}
        <button onClick={() => setIsDarkMode(!isDarkMode)} className="transition-transform hover:scale-110 outline-none w-8 h-8 flex items-center justify-center rounded-full" aria-label="Toggle dark mode">
          {isDarkMode ? <Sun size={19} className="text-yellow-450 animate-spin-slow" /> : <Moon size={19} className="text-amber-500" />}
        </button>

        {/* Global Settings (if customSettings has content) */}
        {customSettings && (
          <div className="relative flex items-center" onClick={(e) => e.stopPropagation()}>
            <div className={`w-px h-5 ${isDarkMode ? 'bg-slate-700' : 'bg-gray-250/90'} mx-1`}></div>
            <button 
              onClick={() => setIsSettingsOpen(!isSettingsOpen)} 
              className={`transition-transform hover:scale-110 outline-none w-8 h-8 flex items-center justify-center rounded-full ${isSettingsOpen ? (isDarkMode ? 'bg-slate-700' : 'bg-gray-100') : ''}`}
              title="系統設定"
              aria-label="Toggle settings"
            >
              <Settings size={18} className={isDarkMode ? 'text-slate-300' : 'text-gray-650'} />
            </button>

            {/* floating popover settings */}
            {isSettingsOpen && (
              <div className={`absolute top-full right-0 mt-3 p-5 rounded-3xl shadow-2xl border w-72 sm:w-80 ${isDarkMode ? 'bg-slate-800 border-slate-700 text-slate-100' : 'bg-white border-gray-150 text-gray-800'} animate-in fade-in slide-in-from-top-2 origin-top-right z-50`}>
                <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-100 dark:border-slate-700/50">
                  <h3 className="text-sm font-bold flex items-center gap-1.5 text-[#6B5EDB] dark:text-indigo-400">
                    <Settings size={18} className="animate-spin-slow" />
                    系統設定
                  </h3>
                  <button 
                    onClick={() => setIsSettingsOpen(false)} 
                    className={`w-6 h-6 flex items-center justify-center rounded-full text-xs font-semibold ${isDarkMode ? 'hover:bg-slate-700 text-slate-400' : 'hover:bg-gray-150 text-gray-400'}`}
                  >
                    ✕
                  </button>
                </div>
                {customSettings}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Speech package bubble notification */}
      {showLoaderMsg && (
        <div className={`fixed top-20 right-6 z-55 text-[10px] sm:text-xs font-bold px-3 py-2 shadow-xl rounded-2xl flex items-center gap-2 select-none pointer-events-none transform animate-bounce border ${isDarkMode ? 'bg-slate-800 text-indigo-400 border-slate-700' : 'bg-white text-[#6B5EDB] border-indigo-50'}`}>
          <span className="h-2 w-2 bg-indigo-500 dark:bg-indigo-400 rounded-full animate-ping"></span>
          <span>{showLoaderMsg}</span>
        </div>
      )}

      {/* Main viewport */}
      <div className="flex-1 w-full flex flex-col items-center justify-center relative z-0 overflow-y-auto p-1 md:p-2">
        {children}
      </div>

      {/* Floating Kids Fun Toy Soundbox */}
      <div className="fixed bottom-6 left-6 z-40 flex items-center gap-1.5 bg-white/95 dark:bg-slate-800/95 backdrop-blur-md px-3 py-2 rounded-2xl shadow-xl border border-gray-100 dark:border-slate-700/50">
        <span className="text-[11px] font-bold text-[#6B5EDB] dark:text-indigo-400 uppercase tracking-widest block mr-1 select-none flex items-center gap-1">
          <Smile size={12} className="text-[#6B5EDB] dark:text-indigo-400" />
          <span className="hidden xs:inline">故事音效箱:</span>
        </span>
        <button
          onClick={playMagicSfx}
          className="flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-indigo-50 hover:bg-[#6B5EDB] dark:bg-indigo-950/40 dark:hover:bg-indigo-900 border border-indigo-100/50 dark:border-indigo-900/40 text-[#6B5EDB] dark:text-indigo-300 hover:text-white dark:hover:text-white transition-all transform hover:scale-105 active:scale-95 cursor-pointer"
          title="魔法星光"
        >
          <Sparkles size={11} className="text-amber-500" />
          <span>魔法</span>
        </button>
        <button
          onClick={playJumpSfx}
          className="flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-amber-50 hover:bg-amber-500 dark:bg-amber-950/40 dark:hover:bg-amber-900 border border-amber-100/50 dark:border-amber-900/40 text-amber-600 dark:text-amber-300 hover:text-white dark:hover:text-white transition-all transform hover:scale-105 active:scale-95 cursor-pointer"
          title="趣味蹦蹦"
        >
          <span>🐰 蹦蹦</span>
        </button>
        <button
          onClick={playCheerSfx}
          className="flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-rose-50 hover:bg-rose-500 dark:bg-rose-950/40 dark:hover:bg-rose-900 border border-rose-100/50 dark:border-rose-900/40 text-rose-500 dark:text-rose-300 hover:text-white dark:hover:text-white transition-all transform hover:scale-105 active:scale-95 cursor-pointer"
          title="歡樂喝采"
        >
          <span>🎉 歡呼</span>
        </button>
      </div>

      {/* Dynamic Jumper layout controls */}
      {onPageChange && totalPages > 1 && (
        <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-2 rounded-full shadow-md transition-colors border ${isDarkMode ? 'bg-slate-800 text-slate-200 border-slate-700' : 'bg-white/95 backdrop-blur-md text-gray-700 border-white'}`}>
          <span className="font-medium text-sm">跳轉到：</span>
          <input
            type="text"
            value={jumpInput}
            onChange={(e) => setJumpInput(e.target.value)}
            className={`w-14 h-7 border rounded text-center text-sm font-medium focus:outline-none focus:ring-1 focus:ring-[#6B5EDB] focus:border-transparent transition-all ${isDarkMode ? 'bg-slate-700 border-slate-600 text-white' : 'bg-white border-gray-250 text-gray-800'}`}
          />
          <button
            onClick={handleJump}
            className="bg-[#6B5EDB] hover:bg-[#5A4FC4] active:bg-[#4E44AA] text-white px-5 py-1 rounded-full text-sm font-medium shadow-sm transition-colors cursor-pointer"
          >
            跳轉
          </button>
        </div>
      )}
    </div>
  );
}
