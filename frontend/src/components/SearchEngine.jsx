import React, { useState } from 'react';
import { Search, Mic, Camera, ChevronLeft, ChevronRight, RotateCw, Home, Shield } from 'lucide-react';

const SearchEngine = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [urlQuery, setUrlQuery] = useState();
  const [isFocused, setIsFocused] = useState(false);
  const [isUrlFocused, setIsUrlFocused] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery);
    }
  };

  const handleUrlNavigation = (e) => {
    e.preventDefault();
    if (urlQuery.trim()) {
      console.log('Navigating to:', urlQuery);
    }
  };

  const handleBack = () => {
    console.log('Going back');
  };

  const handleForward = () => {
    console.log('Going forward');
  };

  const handleReload = () => {
    console.log('Reloading page');
  };

  const quickLinks = [];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Browser Navigation Bar */}
      <div className="bg-gray-100 border-b border-gray-300 px-4 py-2">
        <div className="flex items-center space-x-3">
          {/* Navigation buttons */}
          <div className="flex items-center space-x-1">
            <button 
              onClick={handleBack}
              className="p-2 hover:bg-gray-200 rounded-full transition-colors"
              title="Back"
            >
              <ChevronLeft size={18} className="text-gray-600" />
            </button>
            <button 
              onClick={handleForward}
              className="p-2 hover:bg-gray-200 rounded-full transition-colors"
              title="Forward"
            >
              <ChevronRight size={18} className="text-gray-600" />
            </button>
            <button 
              onClick={handleReload}
              className="p-2 hover:bg-gray-200 rounded-full transition-colors"
              title="Reload"
            >
              <RotateCw size={16} className="text-gray-600" />
            </button>
          </div>

          {/* URL Bar */}
          <div className="flex-1 max-w-3xl">
            <div className={`flex items-center bg-white rounded-full border ${
              isUrlFocused ? 'border-blue-500 shadow-sm' : 'border-gray-300'
            } transition-all duration-200`}>
              <div className="flex items-center pl-4">
                <Shield size={16} className="text-gray-500 mr-2" />
              </div>
              <input
                type="text"
                value={urlQuery}
                onChange={(e) => setUrlQuery(e.target.value)}
                onFocus={() => setIsUrlFocused(true)}
                onBlur={() => setIsUrlFocused(false)}
                onKeyPress={(e) => e.key === 'Enter' && handleUrlNavigation(e)}
                className="flex-1 px-2 py-2 text-gray-900 bg-transparent outline-none text-sm"
                placeholder="Search Google or type a URL"
              />
            </div>
          </div>

          {/* Profile and menu */}
          <div className="flex items-center space-x-3">
            <button className="p-2 hover:bg-gray-200 rounded-full">
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Header with Chrome-like styling */}
      <header className="flex justify-end items-center p-4">
        <div className="flex items-center space-x-4">
          <button className="text-gray-700 hover:text-gray-900 text-sm">Gmail</button>
          <button className="text-gray-700 hover:text-gray-900 text-sm">Images</button>
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
            <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
              <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 -mt-16">
        {/* Logo */}
        <div className="mb-8">
          <div className="text-6xl font-normal text-gray-700 mb-2">
            <span className="text-blue-500">S</span>
            <span className="text-red-500">e</span>
            <span className="text-yellow-500">a</span>
            <span className="text-blue-500">r</span>
            <span className="text-green-500">c</span>
            <span className="text-red-500">h</span>
          </div>
        </div>

        {/* Search bar */}
        <div className="w-full max-w-2xl mb-8">
          <div className="relative">
            <div className={`flex items-center w-full rounded-full border ${
              isFocused ? 'border-blue-500 shadow-lg' : 'border-gray-300 hover:shadow-md'
            } transition-all duration-200 bg-white`}>
              <Search className="ml-4 text-gray-400" size={20} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch(e)}
                className="flex-1 px-4 py-3 text-gray-900 bg-transparent outline-none rounded-full"
                placeholder="Search Google or type a URL"
              />
              <div className="flex items-center space-x-3 mr-4">
                <button type="button" className="p-1 hover:bg-gray-100 rounded">
                  <Mic className="text-gray-400 hover:text-gray-600" size={20} />
                </button>
                <button type="button" className="p-1 hover:bg-gray-100 rounded">
                  <Camera className="text-gray-400 hover:text-gray-600" size={20} />
                </button>
              </div>
            </div>
          </div>

          {/* Search buttons */}
          <div className="flex justify-center space-x-4 mt-8">
            <button 
              onClick={handleSearch}
              className="px-6 py-2 bg-gray-100 hover:bg-gray-200 border border-gray-100 rounded text-gray-800 text-sm transition-colors"
            >
              Google Search
            </button>
            <button className="px-6 py-2 bg-gray-100 hover:bg-gray-200 border border-gray-100 rounded text-gray-800 text-sm transition-colors">
              I'm Feeling Lucky
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SearchEngine;