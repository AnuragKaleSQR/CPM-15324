import { useState } from 'react';
import { FaTimes, FaUpload, FaFile } from 'react-icons/fa';

const AddProject = ({ isOpen, onClose }) => {
  const [dragActive, setDragActive] = useState(false);
  const [projectFile, setProjectFile] = useState(null);
  const [vendorFile, setVendorFile] = useState(null);
  const [view, setView] = useState('project'); // "project" or "vendor"
  const [projectName, setProjectName] = useState('');

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const file = e.dataTransfer.files?.[0];
    if (!file) return;

    if (view === 'project') {
      if (file.name.endsWith('.zip')) setProjectFile(file);
      else alert('Please select a ZIP file');
    } else {
      if (file.name.endsWith('.json')) setVendorFile(file);
      else alert('Please select a JSON file');
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (view === 'project') {
      if (file.name.endsWith('.zip')) setProjectFile(file);
      else alert('Please select a ZIP file');
    } else {
      if (file.name.endsWith('.csv')) setVendorFile(file);
      else alert('Please select a CSV file');
    }
  };

  const handleUpload = () => {

    if (view === 'vendor') {
      if (vendorFile) {
        alert(`Project "${projectName}" with vendor list uploaded successfully!`);
        handleClose();
      } else {
        alert('Please upload a vendor JSON file first.');
      }
    }

    if (view === 'project' && projectFile && projectName.trim()) {
      alert(`Project "${projectName}" uploaded successfully!`);
      setProjectFile(null);
      setProjectName('');
      onClose();
    }

    // Inside handleFileChange
    if (view === 'project') {
      if (file.name.endsWith('.zip')) setProjectFile(file);
      else alert('Please select a ZIP file');
    } else {
      if (file.name.endsWith('.json')) setVendorFile(file);
      else alert('Please select a JSON file');
    }
  };

  const handleNext = () => {
    if (!projectName.trim()) return alert("Please enter a project name.");
    if (!projectFile) return alert("Please upload a ZIP file for the project.");
    setView('vendor');
  };
  


  const handleClose = () => {
    setProjectFile(null);
    setVendorFile(null);
    setProjectName('');
    setDragActive(false);
    setView('project');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/10 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full mx-4">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-bold text-gray-800">Add New Project</h2>
          <button onClick={handleClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <FaTimes size={20} />
          </button>
        </div>

        {/* Toggle Buttons */}
        <div className="flex justify-center gap-2 p-4 border-b">
          <button
            className={`w-1/2 px-4 py-2 rounded-full text-sm font-semibold border transition ${view === 'project'
              ? 'bg-green-100 text-green-800 border-green-300'
              : 'bg-gray-100 text-gray-600 border-gray-200'
              }`}
            onClick={() => setView('project')}
          >
            Add Project
          </button>
          <button
            className={`w-1/2 px-4 py-2 rounded-full text-sm font-semibold border transition ${view === 'vendor'
              ? 'bg-green-100 text-green-800 border-green-300'
              : 'bg-gray-100 text-gray-600 border-gray-200'
              }`}
            onClick={() => setView('vendor')}
          >
            Upload Vendors List
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          {view === 'project' ? (
            <>
              <label className="block text-sm font-medium text-gray-700 mb-2">Project Name</label>
              <input
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-green-400"
                placeholder="Enter project name"
              />

              {/* Project File Upload */}
              <div
                className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${dragActive ? 'border-green-400 bg-green-50' : 'border-gray-300 hover:border-gray-400'
                  }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  accept=".zip"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="flex flex-col items-center">
                  <FaUpload className="text-4xl text-gray-400 mb-4" />
                  <p className="text-gray-600 mb-2">
                    Drag and drop your .zip file here, or{' '}
                    <span className="text-green-600 font-semibold">click to browse</span>
                  </p>
                  <p className="text-sm text-gray-400">Only .zip files are supported</p>
                </div>
              </div>

              {/* Selected Project File */}
              {projectFile && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg flex items-center justify-between">
                  <div className="flex items-center">
                    <FaFile className="text-green-600 mr-3" />
                    <div>
                      <p className="font-medium text-gray-800">{projectFile.name}</p>
                      <p className="text-sm text-gray-500">
                        {(projectFile.size / 1024).toFixed(1)} KB
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setProjectFile(null)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTimes size={16} />
                  </button>
                </div>
              )}
            </>
          ) : (
            <>
              {/* Vendors File Upload */}
              <div
                className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${dragActive ? 'border-green-400 bg-green-50' : 'border-gray-300 hover:border-gray-400'
                  }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  accept=".json,application/json"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="flex flex-col items-center">
                  <FaUpload className="text-4xl text-gray-400 mb-4" />
                  <p className="text-gray-600 mb-2">
                    Drag and drop your JSON file here, or{' '}
                    <span className="text-green-600 font-semibold">click to browse</span>
                  </p>
                  <p className="text-sm text-gray-400">
                    Upload a JSON file containing vendor names and email addresses
                  </p>
                </div>
              </div>

              {/* Selected Vendor File */}
              {vendorFile && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg flex items-center justify-between">
                  <div className="flex items-center">
                    <FaFile className="text-green-600 mr-3" />
                    <div>
                      <p className="font-medium text-gray-800">{vendorFile.name}</p>
                      <p className="text-sm text-gray-500">
                        {(vendorFile.size / 1024).toFixed(1)} KB
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setVendorFile(null)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTimes size={16} />
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 border-t bg-gray-50 rounded-b-xl">
  <button
    onClick={handleClose}
    className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
  >
    Cancel
  </button>

  {view === 'project' ? (
    <button
      onClick={handleNext}
      disabled={!projectFile || !projectName.trim()}
      className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
        projectFile && projectName.trim()
          ? 'bg-green-500 text-white hover:bg-green-600'
          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
      }`}
    >
      Next
    </button>
  ) : (
    <button
      onClick={handleUpload}
      disabled={!vendorFile}
      className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
        vendorFile
          ? 'bg-green-500 text-white hover:bg-green-600'
          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
      }`}
    >
      Upload
    </button>
  )}
</div>

      </div>
    </div>
  );
};

export default AddProject;
