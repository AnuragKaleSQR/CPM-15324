import {
  Check,
  Contrast,
  Eraser,
  Eye,
  Info,
  Keyboard,
  Layers,
  Moon,
  Move,
  Paintbrush2,
  Pause,
  Play,
  RotateCcw,
  Settings,
  Square,
  Sun,
  X,
  ZoomIn,
  ZoomOut
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import Navbar from '../components/Navbar';



const Tasks = () => {
  const [selectedTool, setSelectedTool] = useState('polygon');
  const [brushSize, setBrushSize] = useState(10);
  const [opacity, setOpacity] = useState(50);
  const [contrast, setContrast] = useState(50);
  const [zoom, setZoom] = useState(100);
  const [noAdjustmentNeeded, setNoAdjustmentNeeded] = useState(false);
  const [selectedPII, setSelectedPII] = useState('no-pii');
  const [showGuide, setShowGuide] = useState(false);
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [labelsVisible, setLabelsVisible] = useState(true);
  const [time, setTime] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  
  const canvasRef = useRef(null);
  const imageRef = useRef(null);
  
  const tasks = [
    {
      serialNumber: "0001",
      productType: "TV",
      productName: "Samsung Neo QLED 4K TV",
      imageUrl: "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=400&h=300&fit=crop",
      category: "Electronics",
      annotations: 1,
      annotator: "Agus",
      assignBy: "John",
      date: "2025-07-15",
      maskId: "mask_001_tv_samsung"
    },
  ];
  
  const productData = tasks[0];

  const tools = [
    { id: 'polygon', name: 'Polygon', icon: Square, shortcut: 'P' },
    { id: 'brush', name: 'Brush', icon: Paintbrush2, shortcut: 'B' },
    { id: 'eraser', name: 'Eraser', icon: Eraser, shortcut: 'E' },
    { id: 'pan', name: 'Pan', icon: Move, shortcut: 'H' }
  ];

  const shortcuts = [
    { key: 'B', action: 'Brush Tool' },
    { key: 'E', action: 'Eraser Tool' },
    { key: 'P', action: 'Polygon Tool' },
    { key: 'H', action: 'Pan Tool' },
    { key: 'Z', action: 'Zoom In' },
    { key: 'O', action: 'Zoom Out' },
    { key: 'Space', action: 'Pause/Resume Timer' },
    { key: '1-9', action: 'Brush Opacity (10%-90%)' },
    { key: 'Shift+Enter', action: 'Submit' },
    { key: 'Ctrl+S', action: 'Settings' },
    { key: 'Ctrl+H', action: 'Toggle Labels' }
  ];

  // Timer effect - only runs when not paused
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused) {
        setTime(prev => prev + 1);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [isPaused]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      // Prevent spacebar from scrolling the page
      if (e.key === ' ') {
        e.preventDefault();
        toggleTimer();
        return;
      }
      
      // Handle Ctrl combinations
      if (e.ctrlKey) {
        if (e.key === 's') {
          e.preventDefault();
          setShowSettings(true);
          return;
        }
        if (e.key === 'h') {
          e.preventDefault();
          setLabelsVisible(prev => !prev);
          return;
        }
      }
      
      switch(e.key.toLowerCase()) {
        case 'b':
          setSelectedTool('brush');
          break;
        case 'e':
          setSelectedTool('eraser');
          break;
        case 'p':
          setSelectedTool('polygon');
          break;
        case 'h':
          setSelectedTool('pan');
          break;
        case 'z':
          setZoom(prev => Math.min(prev + 25, 400));
          break;
        case 'o':
          setZoom(prev => Math.max(prev - 25, 25));
          break;
        default:
          if (e.key >= '1' && e.key <= '9') {
            setOpacity(parseInt(e.key) * 10);
          }
          break;
      }
      
      if (e.shiftKey && e.key === 'Enter') {
        handleSubmit();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  const toggleTimer = () => {
    setIsPaused(prev => !prev);
  };

  const handleSubmit = () => {
    alert('Task submitted successfully!');
  };

  const handleDeclineTask = () => {
    if (window.confirm('Are you sure you want to decline this task? Use only for blank images.')) {
      alert('Task declined');
    }
  };

  const handleReleaseTask = () => {
    if (window.confirm('Are you sure you want to release this task?')) {
      alert('Task released');
    }
  };

  const handleStopAndResume = () => {
    if (window.confirm('Are you sure you want to pause your work? You can resume later.')) {
      setIsPaused(true);
      alert('Work paused. You can resume later by clicking the play button.');
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  const fitToScreen = () => {
    setZoom(100);
  };

  const themeClasses = darkMode ? 'bg-gray-900 text-white' : 'bg-[#E9F1FA] text-black';
  const panelClasses = darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300';
  const buttonClasses = darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200';

  return (
    <div className={`min-h-screen ${themeClasses} relative`}>
      <Navbar active={false} />
      <div className="p-6 space-y-6">
        {/* Timer and Instructions Header */}
        <div className={`${panelClasses} p-2 rounded shadow border`}>
          <div className="flex items-center justify-between">
            <div className={`${panelClasses} px-2 py-1 rounded shadow text-center border`}>
              <div className="text-xs font-medium text-gray-600">Timer</div>
              <div className={`text-sm font-bold ${isPaused ? 'text-red-600' : (darkMode ? 'text-gray-300' : 'text-gray-700')}`}>
                {formatTime(time)}
              </div>
              <button
                onClick={toggleTimer}
                className={`mt-0.5 px-1.5 py-0.5 text-xs rounded ${
                  isPaused 
                    ? 'bg-green-500 hover:bg-green-600 text-white' 
                    : 'bg-red-500 hover:bg-red-600 text-white'
                }`}
                title="Toggle Timer (Space)"
              >
                {isPaused ? <Play size={8} /> : <Pause size={8} />}
              </button>
            </div>
            <div className="flex-1 text-center px-4">
              <h1 className={`text-base font-bold ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                Product Type: {productData.productType}
              </h1>
            </div>
            <div className="text-right">
              <div className="text-xs text-gray-600">Task ID</div>
              <div className={`font-mono text-sm ${darkMode ? 'text-gray-300' : 'text-black'}`}>
                {tasks[0].serialNumber}
              </div>
            </div>
          </div>
        </div>

        <div className="flex min-h-[600px] gap-4">
          {/* Left Toolbar */}
          <div className={`w-20 ${panelClasses} border rounded shadow flex flex-col items-center py-4 space-y-4`}>
            <h3 className="text-xs font-bold text-center mb-2">Tools</h3>
            
            {tools.map((tool) => (
              <button
                key={tool.id}
                onClick={() => setSelectedTool(tool.id)}
                className={`p-3 rounded-lg transition-colors ${
                  selectedTool === tool.id 
                    ? 'bg-blue-500 text-white' 
                    : buttonClasses
                }`}
                title={`${tool.name} (${tool.shortcut})`}
              >
                <tool.icon size={20} />
              </button>
            ))}
            
            <div className="border-t pt-4 space-y-3 w-full flex flex-col items-center border-gray-300">
              <button
                onClick={() => setZoom(prev => Math.min(prev + 25, 400))}
                className={`p-2 rounded ${buttonClasses}`}
                title="Zoom In (Z)"
              >
                <ZoomIn size={18} />
              </button>
              
              <button
                onClick={() => setZoom(prev => Math.max(prev - 25, 25))}
                className={`p-2 rounded ${buttonClasses}`}
                title="Zoom Out (O)"
              >
                <ZoomOut size={18} />
              </button>
              
              <button
                onClick={fitToScreen}
                className={`p-2 rounded ${buttonClasses}`}
                title="Fit to Screen"
              >
                <RotateCcw size={18} />
              </button>

              <button
                onClick={() => setShowSettings(true)}
                className={`p-2 rounded ${buttonClasses}`}
                title="Settings (Ctrl+S)"
              >
                <Settings size={18} />
              </button>
            </div>
          </div>

          {/* Center Image Area */}
          <div className="flex-1 flex flex-col">
            {/* Top Controls */}
            <div className={`h-12 ${panelClasses} border rounded-t shadow flex items-center px-4 space-x-4`}>
              <div className="flex items-center space-x-2">
                <Contrast size={16} />
                <span className="text-sm">Contrast:</span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={contrast}
                  onChange={(e) => setContrast(e.target.value)}
                  className="w-20"
                />
                <span className="text-sm w-8">{contrast}%</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Layers size={16} />
                <span className="text-sm">Opacity:</span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={opacity}
                  onChange={(e) => setOpacity(e.target.value)}
                  className="w-20"
                />
                <span className="text-sm w-8">{opacity}%</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <span className="text-sm">Zoom:</span>
                <span className="text-sm font-mono w-12">{zoom}%</span>
              </div>

              <button
                onClick={() => alert('Preview mode activated')}
                className="flex items-center space-x-2 px-3 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                title="Preview"
              >
                <Eye size={16} />
                <span>Preview</span>
              </button>
            </div>

            {/* Main Canvas Area */}
            <div className={`flex-1 ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} border border-t-0 rounded-b shadow relative overflow-hidden`}>
              <div 
                className="w-full h-full flex items-center justify-center"
                style={{ transform: `scale(${zoom / 100})` }}
              >
                <div className="relative">
                  <img 
                    src={productData.imageUrl} 
                    alt={productData.productName} 
                    className="w-96 h-64 object-cover rounded-lg"
                    style={{ filter: `contrast(${contrast}%)` }}
                  />
                  
                  {/* Canvas for annotations */}
                  <canvas
                    ref={canvasRef}
                    width="384"
                    height="256"
                    className="absolute top-0 left-0 cursor-crosshair"
                    style={{ opacity: opacity / 100 }}
                  />

                  {/* Sample annotation labels - only visible when labelsVisible is true */}
                  {labelsVisible && (
                    <>
                      <div className="absolute top-4 left-4 bg-blue-500 text-white px-2 py-1 rounded text-xs">
                        Product
                      </div>
                      <div className="absolute bottom-4 right-4 bg-green-500 text-white px-2 py-1 rounded text-xs">
                        Accessory
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel */}
          <div className={`w-80 ${panelClasses} border rounded shadow flex flex-col relative`}>
            {/* Header Controls */}
            <div className="p-4 border-b space-y-4">
              <div className="flex space-x-2 flex-wrap gap-2 relative">
                <button
                  onClick={() => setShowGuide(!showGuide)}
                  className="flex items-center space-x-2 px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                  title="View Instructions"
                >
                  <Info size={16} />
                  <span>Instructions</span>
                </button>
                
                <button
                  onClick={() => setShowShortcuts(!showShortcuts)}
                  className="flex items-center space-x-2 px-3 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 text-sm"
                  title="View Shortcuts"
                >
                  <Keyboard size={16} />
                  <span>Shortcuts</span>
                </button>
                
                {/* Instructions Popup */}
                {showGuide && (
                  <div className={`absolute top-full left-0 mt-2 w-70 max-h-80 ${panelClasses} border rounded-lg shadow-2xl z-50 overflow-hidden`}>
                    <div className="flex justify-between items-center p-3 border-b">
                      <h3 className="font-bold text-sm">Instructions</h3>
                      <button onClick={() => setShowGuide(false)} className="text-gray-500 hover:text-gray-700">
                        <X size={16} />
                      </button>
                    </div>
                    <div className="p-3 overflow-y-auto max-h-64 text-xs">
                      <div className="space-y-2">
                        <h4 className="font-semibold">Overview</h4>
                        <p>Segment products and accessories from images. Create masks to separate relevant parts from background.</p>
                        
                        <h4 className="font-semibold">Do's</h4>
                        <ul className="list-disc list-inside space-y-1">
                          <li>Mask every product and box items</li>
                          <li>Zoom in to 200% to check edges</li>
                          <li>Make edges clean and smooth</li>
                          <li>Include essential text</li>
                        </ul>
                        
                        <h4 className="font-semibold">Don'ts</h4>
                        <ul className="list-disc list-inside space-y-1">
                          <li>Don't mask reflections or shadows</li>
                          <li>Don't leave rough edges</li>
                          <li>Don't include floating text</li>
                          <li>Don't mask background items</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {/* Shortcuts Popup */}
                {showShortcuts && (
                  <div className={`absolute top-full right-0 mt-2 w-72 max-h-80 ${panelClasses} border rounded-lg shadow-2xl z-50 overflow-hidden`}>
                    <div className="flex justify-between items-center p-3 border-b">
                      <h3 className="font-bold text-sm">Keyboard Shortcuts</h3>
                      <button onClick={() => setShowShortcuts(false)} className="text-gray-500 hover:text-gray-700">
                        <X size={16} />
                      </button>
                    </div>
                    <div className="p-3 overflow-y-auto max-h-64">
                      <div className="space-y-2">
                        {shortcuts.map((shortcut, index) => (
                          <div key={index} className="flex justify-between items-center text-xs">
                            <span>{shortcut.action}</span>
                            <span className={`px-2 py-1 rounded font-mono text-xs ${
                              darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'
                            }`}>
                              {shortcut.key}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Reference Info Panel */}
            <div className="p-4 border-b">
              <h3 className="font-semibold mb-3">Reference Info Panel</h3>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="font-medium">Product Type:</span>
                  <span className="ml-2 font-bold text-blue-600">{productData.productType}</span>
                </div>
                <div>
                  <span className="font-medium">Image ID:</span>
                  <div className="text-xs text-gray-500 mt-1 break-all">{productData.productName}</div>
                </div>
                <div>
                  <span className="font-medium">Mask ID:</span>
                  <div className="text-xs text-gray-500 mt-1 break-all">{productData.maskId}</div>
                </div>
              </div>
            </div>

            {/* PII Selection */}
            <div className="p-4 border-b">
              <h3 className="font-semibold mb-3">PII Classification</h3>
              <div className="space-y-2">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="pii"
                    value="no-pii"
                    checked={selectedPII === 'no-pii'}
                    onChange={(e) => setSelectedPII(e.target.value)}
                  />
                  <span className="text-sm">No PII</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="pii"
                    value="has-pii"
                    checked={selectedPII === 'has-pii'}
                    onChange={(e) => setSelectedPII(e.target.value)}
                  />
                  <span className="text-sm">Contains PII</span>
                </label>
              </div>
            </div>

            {/* Tool Settings */}
            {selectedTool === 'brush' && (
              <div className="p-4 border-b">
                <h3 className="font-semibold mb-3">Brush Settings</h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium mb-1">Brush Size</label>
                    <input
                      type="range"
                      min="1"
                      max="50"
                      value={brushSize}
                      onChange={(e) => setBrushSize(e.target.value)}
                      className="w-full"
                    />
                    <span className="text-sm text-gray-500">{brushSize}px</span>
                  </div>
                </div>
              </div>
            )}

            {/* Bottom Controls */}
            <div className="p-4 space-y-4 mt-auto">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={noAdjustmentNeeded}
                  onChange={(e) => setNoAdjustmentNeeded(e.target.checked)}
                />
                <span className="text-sm">No adjustment needed</span>
              </label>

              <div className="grid grid-cols-1 gap-2">
                <button
                  onClick={handleSubmit}
                  className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 flex items-center justify-center space-x-2"
                  title="Submit (Shift+Enter)"
                >
                  <Check size={16} />
                  <span>Submit</span>
                </button>
                
                <button
                  onClick={handleDeclineTask}
                  className="w-full px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 flex items-center justify-center space-x-2"
                >
                  <X size={16} />
                  <span>Decline Task</span>
                </button>

                <button
                  onClick={handleReleaseTask}
                  className="w-full px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 flex items-center justify-center space-x-2"
                >
                  <RotateCcw size={16} />
                  <span>Release Task</span>
                </button>

                <button
                  onClick={handleStopAndResume}
                  className="w-full px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 flex items-center justify-center space-x-2"
                >
                  <Pause size={16} />
                  <span>Stop and Resume Later</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Settings Modal - Kept as full modal */}
      {showSettings && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className={`${panelClasses} p-6 rounded-lg shadow-xl max-w-md w-full`}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Settings</h2>
              <button onClick={() => setShowSettings(false)} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Theme</span>
                <button
                  onClick={() => setDarkMode(prev => !prev)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded ${
                    darkMode ? 'bg-gray-600 text-white' : 'bg-gray-200 text-black'
                  }`}
                >
                  {darkMode ? <Moon size={16} /> : <Sun size={16} />}
                  <span>{darkMode ? 'Dark' : 'Light'}</span>
                </button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Show Labels</span>
                <button
                  onClick={() => setLabelsVisible(prev => !prev)}
                  className={`px-3 py-2 rounded ${
                    labelsVisible ? 'bg-green-500 text-white' : 'bg-gray-300 text-black'
                  }`}
                >
                  {labelsVisible ? 'Visible' : 'Hidden'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tasks;