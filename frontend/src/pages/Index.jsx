import { useEffect, useState } from 'react';
import { FaChevronDown, FaChevronUp, FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import StatusFilter from '../components/StatusFilter';

// Updated tasks data with proper structure, dates adjusted to 2025-07, assignBy added, question.text removed, category made top-level
const tasks = [
  {
    "serialNumber": "0001",
    "productType": "TV",
    "productName": "Samsung Neo QLED 4K TV",
    "imageUrl": "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=400&h=300&fit=crop",
    "category": "Electronics",
    "annotations": 1,
    "annotator": "Agus",
    "assignBy": "John",
    "date": "2025-07-15"
  },
  {
    "serialNumber": "0002",
    "productType": "Remote",
    "productName": "Samsung Universal IR Remote (VG-TM1240AN)",
    "imageUrl": "https://images.unsplash.com/photo-1558618644-fcd25c85cd64?w=400&h=300&fit=crop",
    "category": "Accessories",
    "annotations": 2,
    "annotator": "Ibrahim",
    "assignBy": "John",
    "date": "2025-07-16"
  },
  {
    "serialNumber": "0003",
    "productType": "Mobile",
    "productName": "Flagship Smartphones (varied models)",
    "imageUrl": "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop",
    "category": "Mobile Devices",
    "annotations": 0,
    "annotator": "Agus",
    "assignBy": "John",
    "date": "2025-07-17"
  },
  {
    "serialNumber": "0004",
    "productType": "Laptop",
    "productName": "Generic Laptop (e.g., Dell XPS-style)",
    "imageUrl": "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop",
    "category": "Computers",
    "annotations": 1,
    "annotator": "Ibrahim",
    "assignBy": "John",
    "date": "2025-07-18"
  },
  {
    "serialNumber": "0005",
    "productType": "TV",
    "productName": "Samsung 55\" Crystal UHD TV",
    "imageUrl": "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=400&h=300&fit=crop",
    "category": "Electronics",
    "annotations": 2,
    "annotator": "Agus",
    "assignBy": "John",
    "date": "2025-07-19"
  },
  {
    "serialNumber": "0006",
    "productType": "Mobile",
    "productName": "Samsung Galaxy S25 Ultra",
    "imageUrl": "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop",
    "category": "Mobile Devices",
    "annotations": 0,
    "annotator": "Ibrahim",
    "assignBy": "John",
    "date": "2025-07-20"
  },
  {
    "serialNumber": "0007",
    "productType": "Remote",
    "productName": "GE 4-Device Universal Remote",
    "imageUrl": "https://images.unsplash.com/photo-1558618644-fcd25c85cd64?w=400&h=300&fit=crop",
    "category": "Accessories",
    "annotations": 1,
    "annotator": "Agus",
    "assignBy": "John",
    "date": "2025-07-21"
  },
  {
    "serialNumber": "0008",
    "productType": "Laptop",
    "productName": "Ultra-slim Productivity Laptop",
    "imageUrl": "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop",
    "category": "Computers",
    "annotations": 2,
    "annotator": "Ibrahim",
    "assignBy": "John",
    "date": "2025-07-22"
  },
  {
    "serialNumber": "0009",
    "productType": "TV",
    "productName": "Samsung 60\" Full HD Smart TV",
    "imageUrl": "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=400&h=300&fit=crop",
    "category": "Electronics",
    "annotations": 1,
    "annotator": "Agus",
    "assignBy": "John",
    "date": "2025-07-23"
  },
  {
    "serialNumber": "0010",
    "productType": "Mobile",
    "productName": "Next-gen Foldable Phone",
    "imageUrl": "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop",
    "category": "Mobile Devices",
    "annotations": 0,
    "annotator": "Ibrahim",
    "assignBy": "John",
    "date": "2025-07-24"
  }
];

const Index = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [statusFilter, setStatusFilter] = useState('All');

  // Filter tasks to show only those with annotator Ibrahim
  const ibrahimTasks = tasks.filter(t => t.annotator === 'Ibrahim');
  
  const totalTasks = ibrahimTasks.length;
  const completedTasks = ibrahimTasks.filter(t => t.annotations === 2).length;
  const tasksLeft = ibrahimTasks.filter(t => t.annotations !== 2).length;
  const revertedTasks = ibrahimTasks.filter(t => t.annotations === 1).length;

  // Card colors
  const cardColors = [
    'bg-gradient-to-r from-[#ffffff] to-[#D1FFF1] border-l-4 border-[#00AB7D]',
    'bg-gradient-to-r from-[#ffffff] to-[#D1FFF1] border-l-4 border-[#00AB7D]',
    'bg-gradient-to-r from-[#ffffff] to-[#D1FFF1] border-l-4 border-[#00AB7D]'
  ];

  // Initialize filtered tasks with Ibrahim's tasks
  useEffect(() => {
    setFilteredTasks(ibrahimTasks);
  }, []);

  // Combined filter for status and search
  useEffect(() => {
    let filtered = ibrahimTasks;

    if (statusFilter === 'Completed') {
      filtered = filtered.filter(t => t.annotations === 2);
    } else if (statusFilter === 'Partial') {
      filtered = filtered.filter(t => t.annotations === 1);
    } else if (statusFilter === 'Not Started') {
      filtered = filtered.filter(t => t.annotations === 0);
    }

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(task => {
        return (
          String(task.serialNumber).toLowerCase().includes(term) ||
          task.productName.toLowerCase().includes(term) ||
          String(task.annotations).toLowerCase().includes(term) ||
          task.category.toLowerCase().includes(term) ||
          task.annotator.toLowerCase().includes(term) ||
          task.assignBy.toLowerCase().includes(term) ||
          task.date.toLowerCase().includes(term)
        );
      });
    }

    setFilteredTasks(filtered);
  }, [searchTerm, statusFilter]);

  // Sorting functionality
  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const getSortedTasks = () => {
    const sortableTasks = [...filteredTasks];
    if (sortConfig.key) {
      sortableTasks.sort((a, b) => {
        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];

        if (sortConfig.key === 'serialNumber') {
          aValue = parseInt(a.serialNumber);
          bValue = parseInt(b.serialNumber);
        } else if (sortConfig.key === 'date') {
          aValue = new Date(a.date);
          bValue = new Date(b.date);
        }

        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return sortConfig.direction === 'ascending'
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        } else {
          return sortConfig.direction === 'ascending'
            ? aValue - bValue
            : bValue - aValue;
        }
      });
    }
    return sortableTasks;
  };

  const sortedTasks = getSortedTasks();

  return (
    <div className="bg-[#f5f9fc] min-h-screen">
      <Navbar active={false} />

      <div className="p-6 space-y-6 max-w-7xl mx-auto">
        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[['Total Tasks', totalTasks], ['Task Completed', completedTasks], ['Tasks Left', tasksLeft]].map(([title, count], idx) => (
            <div key={idx} className={`${cardColors[idx]} p-5 rounded-xl shadow transition-all duration-300 hover:shadow-lg`}>
              <div className="text-3xl font-bold text-gray-800">{count}</div>
              <div className="text-md font-semibold text-gray-600 mt-2">{title}</div>
            </div>
          ))}
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
         

          <div className="flex flex-col md:flex-row justify-between items-center p-4 border-b">
            <StatusFilter value={statusFilter} onChange={setStatusFilter} />
            <div className="relative w-full md:w-64">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search tasks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00ABE4]"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gradient-to-r from-gray-800 to-[#00AB7D] text-white">
                <tr>
                  {[
                    { key: 'serialNumber', label: 'Task ID' },
                    { key: 'image', label: 'Image' },
                    { key: 'annotations', label: 'Status' },
                    { key: 'category', label: 'Category' },
                    // { key: 'annotator', label: 'Annotator' },
                    // { key: 'assignBy', label: 'Assign By' },
                    { key: 'date', label: 'Assign Date' }
                  ].map((header) => (
                    <th
                      key={header.key}
                      className={`px-6 py-4 text-left font-semibold ${header.key !== 'image' ? 'cursor-pointer' : ''}`}
                      onClick={header.key !== 'image' ? () => requestSort(header.key) : undefined}
                    >
                      <div className="flex items-center">
                        {header.label}
                        {sortConfig.key === header.key && (
                          sortConfig.direction === 'ascending'
                            ? <FaChevronUp className="ml-1" size={12} />
                            : <FaChevronDown className="ml-1" size={12} />
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {sortedTasks.map((t, i) => (
                  <tr
                    key={i}
                    className="text-sm hover:bg-[#f0f8ff] transition-colors cursor-pointer"
                    onClick={() => navigate(`/tasks/${t.serialNumber}`)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{t.serialNumber}</td>
                    <td className="px-6 py-4">
                      <img
                        src={t.imageUrl}
                        alt={t.productName}
                        className="w-16 h-16 object-cover rounded"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/64x64?text=No+Image';
                        }}
                      />
                    </td>
                    <td className="px-6 py-4">
                      {t.annotations === 0 && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                          Not Started
                        </span>
                      )}
                      {t.annotations === 1 && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                          Pending
                        </span>
                      )}
                      {t.annotations === 2 && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                          Complete
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-md">
                        {t.category}
                      </span>
                    </td>
                    {/* <td className="px-6 py-4">{t.annotator}</td> */}
                    {/* <td className="px-6 py-4">{t.assignBy}</td> */}
                    <td className="px-6 py-4">{t.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;