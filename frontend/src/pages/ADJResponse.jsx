import {
  Check,
  Eye,
  EyeOff,
  Pause,
  Play,
  RotateCcw,
  Settings,
  X,
  ZoomIn,
  ZoomOut
} from 'lucide-react';
import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';

// Mock Navbar component


const ADJResponse = () => {
  const [contrast, setContrast] = useState(50);
  const [opacity, setOpacity] = useState(50);
  const [zoom, setZoom] = useState(100);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [showMasks, setShowMasks] = useState(true);
  const [time, setTime] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedDecision, setSelectedDecision] = useState('');
  const [feedback, setFeedback] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [noAdjustmentNeeded, setNoAdjustmentNeeded] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  // Sample task data
  const taskData = {
    serialNumber: "0001",
    productType: "TV",
    productName: "Samsung Neo QLED 4K TV",
    originalImageUrl: "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=500&h=350&fit=crop",
    solvedImageUrl: "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=500&h=350&fit=crop&blend=64B5F6&sat=-100&blend-mode=multiply",
    annotator: "Agus",
    submittedAt: "2025-08-12 10:30 AM",
    maskId: "mask_001_tv_samsung",
    timeSpent: "05:32"
  };

  // Timer effect
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused) {
        setTime(prev => prev + 1);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [isPaused]);

  // Close settings when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showSettings && !event.target.closest('.settings-dropdown')) {
        setShowSettings(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showSettings]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  const handleApprove = () => {
    if (window.confirm('Are you sure you want to approve this task?')) {
      alert('Task approved successfully!');
    }
  };

  const handleReject = () => {
    if (window.confirm('Are you sure you want to reject this task?')) {
      alert('Task rejected.');
    }
  };

  const handlePauseResume = () => {
    setIsPaused(prev => !prev);
  };

  const handleStopAndResumeLater = () => {
    if (window.confirm('Are you sure you want to stop and resume later? Your progress will be saved.')) {
      alert('Work saved successfully! You can resume later.');
    }
  };

  const toggleSettings = () => {
    setShowSettings(prev => !prev);
  };

  const fitToScreen = () => {
    setZoom(100);
  };

  return (
    <div className={`min-h-screen ${isDarkTheme ? 'bg-gray-900 text-white' : 'bg-[#E9F1FA] text-black'}`}>
      <Navbar active={false} />
      
      <div className="p-6 space-y-6">
        {/* Header with Timer and Task Info */}
        <div className="bg-white p-1 rounded shadow">
          <div className="flex items-center justify-between">
            <div className="bg-white px-2 py-1 rounded shadow text-center">
              <div className="text-xs font-medium text-gray-600">Review Timer</div>
              <div className={`text-lg font-bold ${isPaused ? 'text-red-600' : 'text-gray-700'}`}>
                {formatTime(time)}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {/* {isPaused ? 'PAUSED' : 'RUNNING'} */}
              </div>
              {/* Pause/Resume Button */}
              <button
                onClick={handlePauseResume}
                className={`mt-2 p-2 rounded-full transition-colors ${
                  isPaused 
                    ? 'bg-green-500 hover:bg-green-600 text-white' 
                    : 'bg-red-500 hover:bg-red-600 text-white'
                }`}
                title={isPaused ? 'Resume Timer' : 'Pause Timer'}
              >
                {isPaused ? <Play size={16} /> : <Pause size={16} />}
              </button>
            </div>
            
            <div className="flex-1 text-center px-4">
              <h1 className="text-lg font-bold text-gray-800">Review - {taskData.productType}</h1>
              <div className="text-xs text-gray-600 mt-1">
                Annotated by: {taskData.annotator} | Time Spent: {taskData.timeSpent}
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              {/* Settings Button */}
              <div className="relative">
                <button
                  onClick={toggleSettings}
                  className={`p-2 rounded-full transition-colors ${
                    showSettings 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                  }`}
                  title="Settings"
                >
                  <Settings size={16} />
                </button>
                
                {/* Settings Dropdown */}
                {showSettings && (
                  <div className="settings-dropdown absolute right-0 top-12 bg-white border rounded-lg shadow-lg p-3 z-10 w-48">
                    <h4 className="font-semibold text-sm text-gray-800 mb-2">Theme Settings</h4>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="darkTheme"
                        checked={isDarkTheme}
                        onChange={(e) => setIsDarkTheme(e.target.checked)}
                        className="rounded"
                      />
                      <label htmlFor="darkTheme" className="text-sm text-gray-700">
                        Dark Theme
                      </label>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="text-right">
                <div className="text-xs text-gray-600">Task ID</div>
                <div className="font-mono text-gray-600 text-sm">{taskData.serialNumber}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex min-h-[600px] gap-4">
          {/* Left Panel - Controls */}
          <div className={`w-64 ${isDarkTheme ? 'bg-gray-800' : 'bg-white'} border rounded shadow flex flex-col p-4 space-y-6`}>
            <h3 className="text-lg font-bold text-center border-b pb-2">View Controls</h3>
            
            {/* Zoom Controls */}
            <div className="space-y-3">
              <h4 className="font-semibold text-sm">Zoom</h4>
              <div className="flex items-center justify-between">
                <button
                  onClick={() => setZoom(prev => Math.max(prev - 25, 25))}
                  className={`p-2 rounded ${isDarkTheme ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}
                  title="Zoom Out"
                >
                  <ZoomOut size={18} />
                </button>
                
                <span className="text-sm font-mono px-2">{zoom}%</span>
                
                <button
                  onClick={() => setZoom(prev => Math.min(prev + 25, 400))}
                  className={`p-2 rounded ${isDarkTheme ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}
                  title="Zoom In"
                >
                  <ZoomIn size={18} />
                </button>
              </div>
              
              <button
                onClick={fitToScreen}
                className={`w-full p-2 rounded ${isDarkTheme ? 'hover:bg-gray-700' : 'hover:bg-gray-200'} flex items-center justify-center space-x-2`}
              >
                <RotateCcw size={16} />
                <span className="text-sm">Fit to Screen</span>
              </button>
            </div>

            {/* Mask Controls */}
            <div className="space-y-3">
              <h4 className="font-semibold text-sm">Mask</h4>
              
              <button
                onClick={() => setShowMasks(!showMasks)}
                className={`w-full p-2 rounded flex items-center justify-center space-x-2 ${
                  showMasks 
                    ? 'bg-blue-500 text-white' 
                    : isDarkTheme ? 'hover:bg-gray-700' : 'hover:bg-gray-200'
                }`}
              >
                {showMasks ? <Eye size={16} /> : <EyeOff size={16} />}
                <span className="text-sm">{showMasks ? 'Hide Masks' : 'Show Masks'}</span>
              </button>
            </div>
          </div>

          {/* Center Panel - Images */}
          <div className="flex-1 flex flex-col">
            {/* Image Controls Bar */}
            <div className={`h-12 ${isDarkTheme ? 'bg-gray-800' : 'bg-white'} border rounded-t shadow flex items-center justify-center px-4`}>
              <div className="text-lg font-semibold">Reviewer Tools</div>
            </div>

            {/* Images Container */}
            <div className={`flex-1 ${isDarkTheme ? 'bg-gray-900' : 'bg-gray-50'} border border-t-0 rounded-b shadow overflow-hidden`}>
              <div 
                className="w-full h-full flex items-center justify-center p-4"
                style={{ transform: `scale(${zoom / 100})` }}
              >
                <div className="flex justify-center gap-6">
                  {/* Original Image */}
                  <div className="text-center">
                    <h3 className={`text-sm font-semibold mb-2 ${isDarkTheme ? 'text-gray-300' : 'text-gray-700'}`}>Original Image</h3>
                    <div className="relative">
                      <img 
                        src={taskData.originalImageUrl} 
                        alt="Original" 
                        className="w-80 h-56 object-cover rounded-lg border-2 border-gray-400"
                        style={{ 
                          filter: `contrast(${contrast}%)`
                        }}
                      />
                    </div>
                  </div>

                  {/* Solved/Annotated Image */}
                  <div className="text-center">
                    <h3 className={`text-sm font-semibold mb-2 ${isDarkTheme ? 'text-gray-300' : 'text-gray-700'}`}>Annotated Result</h3>
                    <div className="relative">
                      <img 
                        src={taskData.solvedImageUrl} 
                        alt="Annotated" 
                        className="w-80 h-56 object-cover rounded-lg border-2 border-blue-400"
                        style={{ 
                          filter: `contrast(${contrast}%)`,
                          opacity: showMasks ? opacity / 100 : 1 
                        }}
                      />
                      {showMasks && (
                        <div className="absolute inset-0 bg-blue-500 bg-opacity-30 rounded-lg pointer-events-none"></div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel - Decision Controls */}
          <div className={`w-80 ${isDarkTheme ? 'bg-gray-800' : 'bg-white'} border rounded shadow flex flex-col`}>
            {/* Task Information */}
            <div className="p-4 border-b">
              <h3 className="font-semibold mb-3 text-lg">Task Details</h3>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="font-medium">Product Type:</span>
                  <span className="ml-2 font-bold text-blue-600">{taskData.productType}</span>
                </div>
                <div>
                  <span className="font-medium">Product:</span>
                  <div className={`text-xs mt-1 ${isDarkTheme ? 'text-gray-400' : 'text-gray-500'}`}>{taskData.productName}</div>
                </div>
                <div>
                  <span className="font-medium">Annotator:</span>
                  <span className="ml-2">{taskData.annotator}</span>
                </div>
                <div>
                  <span className="font-medium">Submitted:</span>
                  <div className={`text-xs mt-1 ${isDarkTheme ? 'text-gray-400' : 'text-gray-500'}`}>{taskData.submittedAt}</div>
                </div>
                <div>
                  <span className="font-medium">Mask ID:</span>
                  <div className={`text-xs mt-1 break-all ${isDarkTheme ? 'text-gray-400' : 'text-gray-500'}`}>{taskData.maskId}</div>
                </div>
              </div>
            </div>

            {/* Feedback Section */}
            <div className="p-4 border-b flex-1">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold">Feedback</h3>
              </div>
              
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Provide feedback for the annotator..."
                className={`w-full h-32 p-3 border rounded-lg text-sm resize-none ${
                  isDarkTheme ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300'
                }`}
                rows={6}
                maxLength={500}
              />
              
              <div className={`mt-2 text-xs ${isDarkTheme ? 'text-gray-400' : 'text-gray-500'}`}>
                {feedback.length}/500 characters
              </div>
            </div>

            {/* Decision Buttons */}
            <div className="p-4 space-y-3">
              <h3 className="font-semibold mb-3">Decision</h3>
              
              {/* No Adjustment Needed Checkbox */}
              <div className={`flex items-center space-x-2 mb-4 p-3 rounded-lg border ${
                isDarkTheme 
                  ? 'bg-blue-900 border-blue-700' 
                  : 'bg-blue-50 border-blue-200'
              }`}>
                <input
                  type="checkbox"
                  id="noAdjustment"
                  checked={noAdjustmentNeeded}
                  onChange={(e) => setNoAdjustmentNeeded(e.target.checked)}
                  className="rounded text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="noAdjustment" className={`text-sm font-medium ${
                  isDarkTheme ? 'text-blue-200' : 'text-gray-700'
                }`}>
                  No adjustment needed
                </label>
              </div>
              <div className={`text-xs mb-4 ${isDarkTheme ? 'text-gray-400' : 'text-gray-500'}`}>
                Select this if the pre-annotated masks are already properly segmented and require no changes.
              </div>
              
              <button
                onClick={handleApprove}
                className="w-full px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 flex items-center justify-center space-x-2 font-semibold transition-colors"
              >
                <Check size={18} />
                <span>Approve Task</span>
              </button>
              
              <button
                onClick={handleReject}
                className="w-full px-4 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 flex items-center justify-center space-x-2 font-semibold transition-colors"
              >
                <X size={18} />
                <span>Reject Task</span>
              </button>
              
              <button
                onClick={handleStopAndResumeLater}
                className="w-full px-4 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 flex items-center justify-center space-x-2 font-semibold transition-colors"
              >
                <Pause size={18} />
                <span>Stop and Resume Later</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ADJResponse;