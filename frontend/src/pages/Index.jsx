import { useEffect, useState } from 'react';
import { FaChevronDown, FaChevronUp, FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import StatusFilter from '../components/StatusFilter';
import tasks from '../data/tasks.json';

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

  // Search functionality
  useEffect(() => {
    if (!searchTerm) {
      setFilteredTasks(ibrahimTasks);
      return;
    }

    const term = searchTerm.toLowerCase();
    const results = ibrahimTasks.filter(task => {
      return (
        String(task.serialNumber).toLowerCase().includes(term) ||
        task.question.text.toLowerCase().includes(term) ||
        String(task.annotations).toLowerCase().includes(term) ||
        task.question.category.toLowerCase().includes(term) ||
        task.annotator.toLowerCase().includes(term) ||
        'John'.toLowerCase().includes(term) ||
        '2025-07-23'.toLowerCase().includes(term)
      );
    });
    setFilteredTasks(results);
  }, [searchTerm]);

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
        let aValue, bValue;

        if (sortConfig.key === 'question') {
          aValue = a.question.text;
          bValue = b.question.text;
        } else if (sortConfig.key === 'annotator') {
          aValue = a.annotator;
          bValue = b.annotator;
        } else if (sortConfig.key === 'assignBy') {
          aValue = 'John';
          bValue = 'John';
        } else if (sortConfig.key === 'date') {
          aValue = '2025-07-23';
          bValue = '2025-07-23';
        } else if (sortConfig.key === 'category') {
          aValue = a.question.category;
          bValue = b.question.category;
        } else {
          aValue = a[sortConfig.key];
          bValue = b[sortConfig.key];
        }

        if (aValue < bValue) return sortConfig.direction === 'ascending' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'ascending' ? 1 : -1;
        return 0;
      });
    }
    return sortableTasks;
  };

  // Filter logic - now working with Ibrahim's tasks only
  useEffect(() => {
    if (statusFilter === 'All') {
      setFilteredTasks(ibrahimTasks);
    } else if (statusFilter === 'Completed') {
      setFilteredTasks(ibrahimTasks.filter(t => t.annotations === 2));
    } else if (statusFilter === 'Partial') {
      setFilteredTasks(ibrahimTasks.filter(t => t.annotations === 1));
    } else if (statusFilter === 'Not Started') {
      setFilteredTasks(ibrahimTasks.filter(t => t.annotations === 0));
    }
  }, [statusFilter]);

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
                    { key: 'question', label: 'Question' },
                    { key: 'annotations', label: 'Status' },
                    { key: 'category', label: 'Category' },
                    { key: 'annotator', label: 'Annotator' },
                    { key: 'assignBy', label: 'Assign By' },
                    { key: 'date', label: 'Date' }
                  ].map((header) => (
                    <th
                      key={header.key}
                      className="px-6 py-4 text-left font-semibold cursor-pointer"
                      onClick={() => requestSort(header.key)}
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
                    <td className="px-6 py-4 max-w-xs">{t.question.text}</td>
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
                        {t.question.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">{t.annotator}</td>
                    <td className="px-6 py-4">John</td>
                    <td className="px-6 py-4">2025-07-23</td>
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