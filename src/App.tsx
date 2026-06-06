/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import StoryBookLayout from './components/StoryBookLayout';
import BookViewer from './components/BookViewer';
import { BookOpen, Library } from 'lucide-react';
import { rainbowBookScenes } from './data/rainbowBook';
import { grasslandBookScenes } from './data/grasslandBook';

type ViewState = 'home' | 'rainbowBook' | 'grasslandBook';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewState>('home');

  if (currentView === 'rainbowBook') {
    return (
      <BookViewer 
        title="彩虹種子" 
        scenes={rainbowBookScenes} 
        onGoHome={() => setCurrentView('home')} 
      />
    );
  }

  if (currentView === 'grasslandBook') {
    return (
      <BookViewer 
        title="草原小英雄" 
        scenes={grasslandBookScenes} 
        onGoHome={() => setCurrentView('home')} 
      />
    );
  }

  return (
    <StoryBookLayout onGoHome={() => setCurrentView('home')}>
      <div className="w-full max-w-5xl px-6 z-10 relative flex flex-col items-center py-10 mt-16">
        
        <div className="flex items-center gap-3 mb-10 text-slate-800 dark:text-slate-100">
           <Library size={32} className="text-[#6B5EDB]" />
           <h1 className="text-3xl font-bold tracking-tight">我的故事書坊</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
          {/* 第一本書：彩虹種子 */}
          <div className="bg-white dark:bg-slate-800 rounded-[2rem] shadow-xl shadow-purple-500/5 px-10 py-12 flex flex-col items-center text-center transition-transform hover:-translate-y-2 duration-300 w-full">
            <div className="text-7xl leading-none mb-6 mt-2 select-none drop-shadow-sm filter">
              🌈
            </div>
            <h2 className="text-3xl font-bold tracking-tight mb-3 text-[#BDB23B]">
              彩虹種子
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-8 tracking-wide">
              一個關於耐心、友誼和團隊合作的美好故事
            </p>
            <div className="flex flex-wrap justify-center gap-2 mb-8">
               <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#EBF4FF] text-[#4295F5] dark:bg-blue-900/30 dark:text-blue-400">🌱 耐心</span>
               <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#EEF8E4] text-[#5CAE28] dark:bg-green-900/30 dark:text-green-400">🤝 合作</span>
               <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#FDE5EF] text-[#DE4283] dark:bg-pink-900/30 dark:text-pink-400">💖 友情</span>
            </div>
            <button 
              onClick={() => setCurrentView('rainbowBook')}
              className="flex items-center justify-center gap-2 bg-[#6B5EDB] hover:bg-[#5A4FC4] text-white py-3 px-8 rounded-full font-medium transition-all shadow-md hover:shadow-lg w-full max-w-xs"
            >
              <BookOpen size={18} />
              开始阅读
            </button>
          </div>

          {/* 第二本書：草原小英雄 */}
          <div className="bg-white dark:bg-slate-800 rounded-[2rem] shadow-xl shadow-blue-500/5 px-10 py-12 flex flex-col items-center text-center transition-transform hover:-translate-y-2 duration-300 w-full">
            <div className="text-7xl leading-none mb-6 mt-2 select-none drop-shadow-sm filter">
              🦅
            </div>
            <h2 className="text-3xl font-bold tracking-tight mb-3 text-[#5A9EED]">
              草原小英雄
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-8 tracking-wide">
              波波擁抱飛行夢想的堅持之旅
            </p>
            <div className="flex flex-wrap justify-center gap-2 mb-8">
               <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#FFF4E5] text-[#FF9800] dark:bg-orange-900/30 dark:text-orange-400">✨ 夢想</span>
               <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#E8EAF6] text-[#3F51B5] dark:bg-indigo-900/30 dark:text-indigo-400">💪 堅持</span>
               <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#E0F7FA] text-[#00BCD4] dark:bg-cyan-900/30 dark:text-cyan-400">勇敢</span>
            </div>
            <button 
              onClick={() => setCurrentView('grasslandBook')}
              className="flex items-center justify-center gap-2 bg-[#5A9EED] hover:bg-[#488AD9] text-white py-3 px-8 rounded-full font-medium transition-all shadow-md hover:shadow-lg w-full max-w-xs"
            >
              <BookOpen size={18} />
              开始阅读
            </button>
          </div>

        </div>
      </div>
    </StoryBookLayout>
  );
}

