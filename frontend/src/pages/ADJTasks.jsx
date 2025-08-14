import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Navbar from '../components/Navbar';
import StatusFilter from '../components/StatusFilter';
// import tasks from '../data/tasks.json'; // Uncomment this line if you want to use external JSON

// Updated tasks data with proper structure (you can replace this with your JSON import)
const tasks = [
  {
    "serialNumber": "0001",
    "productType": "TV",
    "productName": "Samsung Neo QLED 4K TV",
    "imageUrl": "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=400&h=300&fit=crop",
    "question": {
      "text": "What are the key features of this TV?",
      "category": "Electronics"
    },
    "annotations": 1,
    "completed": "No",
    "annotator1": "Agus",
    "annotator2": null,
    "annotator": "Agus",
    "date": "2024-01-15"
  },
  {
    "serialNumber": "0002",
    "productType": "Remote",
    "productName": "Samsung Universal IR Remote (VG-TM1240AN)",
    "imageUrl": "https://images.unsplash.com/photo-1558618644-fcd25c85cd64?w=400&h=300&fit=crop",
    "question": {
      "text": "How does this remote work with different devices?",
      "category": "Accessories"
    },
    "annotations": 1,
    "completed": "Yes",
    "annotator1": "Ibrahim",
    "annotator2": "Agus",
    "annotator": "Ibrahim",
    "date": "2024-01-16"
  },
  {
    "serialNumber": "0003",
    "productType": "Mobile",
    "productName": "Flagship Smartphones (varied models)",
    "imageUrl": "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop",
    "question": {
      "text": "What are the performance benchmarks?",
      "category": "Mobile Devices"
    },
    "annotations": 0,
    "completed": "No",
    "annotator1": null,
    "annotator2": null,
    "annotator": "Agus",
    "date": "2024-01-17"
  },
  {
    "serialNumber": "0004",
    "productType": "Laptop",
    "productName": "Generic Laptop (e.g., Dell XPS-style)",
    "imageUrl": "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop",
    "question": {
      "text": "What are the technical specifications?",
      "category": "Computers"
    },
    "annotations": 1,
    "completed": "No",
    "annotator1": "Ibrahim",
    "annotator2": null,
    "annotator": "Ibrahim",
    "date": "2024-01-18"
  },
  {
    "serialNumber": "0005",
    "productType": "TV",
    "productName": "Samsung 55\" Crystal UHD TV",
    "imageUrl": "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=400&h=300&fit=crop",
    "question": {
      "text": "How is the picture quality in different lighting?",
      "category": "Electronics"
    },
    "annotations": 1,
    "completed": "Yes",
    "annotator1": "Agus",
    "annotator2": "Ibrahim",
    "annotator": "Agus",
    "date": "2024-01-19"
  },
  {
    "serialNumber": "0006",
    "productType": "Mobile",
    "productName": "Samsung Galaxy S25 Ultra",
    "imageUrl": "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop",
    "question": {
      "text": "What are the camera capabilities?",
      "category": "Mobile Devices"
    },
    "annotations": 0,
    "completed": "No",
    "annotator1": null,
    "annotator2": null,
    "annotator": "Ibrahim",
    "date": "2024-01-20"
  },
  {
    "serialNumber": "0007",
    "productType": "Remote",
    "productName": "GE 4-Device Universal Remote",
    "imageUrl": "https://images.unsplash.com/photo-1558618644-fcd25c85cd64?w=400&h=300&fit=crop",
    "question": {
      "text": "What is the setup process?",
      "category": "Accessories"
    },
    "annotations": 1,
    "completed": "No",
    "annotator1": "Agus",
    "annotator2": null,
    "annotator": "Agus",
    "date": "2024-01-21"
  },
  {
    "serialNumber": "0008",
    "productType": "Laptop",
    "productName": "Ultra-slim Productivity Laptop",
    "imageUrl": "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop",
    "question": {
      "text": "How is the battery life and performance?",
      "category": "Computers"
    },
    "annotations": 1,
    "completed": "Yes",
    "annotator1": "Ibrahim",
    "annotator2": "Agus",
    "annotator": "Ibrahim",
    "date": "2024-01-22"
  },
  {
    "serialNumber": "0009",
    "productType": "TV",
    "productName": "Samsung 60\" Full HD Smart TV",
    "imageUrl": "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=400&h=300&fit=crop",
    "question": {
      "text": "What smart features are available?",
      "category": "Electronics"
    },
    "annotations": 0,
    "completed": "No",
    "annotator1": "Agus",
    "annotator2": null,
    "annotator": "Agus",
    "date": "2024-01-23"
  },
  {
    "serialNumber": "0010",
    "productType": "Mobile",
    "productName": "Next-gen Foldable Phone",
    "imageUrl": "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop",
    "question": {
      "text": "How durable is the folding mechanism?",
      "category": "Mobile Devices"
    },
    "annotations": 0,
    "completed": "No",
    "annotator1": null,
    "annotator2": null,
    "annotator": "Ibrahim",
    "date": "2024-01-24"
  }
];

function ADJTasks() {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredTasks, setFilteredTasks] = useState(tasks);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
    const [statusFilter, setStatusFilter] = useState('All');

    const totalTasks = tasks.length;
    const completedTasks = tasks.filter((t) => t.annotations === 1).length;
    const tasksLeft = tasks.filter((t) => t.annotations !== 1).length;
    const completedPercentage = ((completedTasks / totalTasks) * 100).toFixed(1);

    useEffect(() => {
        let filtered = tasks;

        // Apply status filter first
        if (statusFilter === 'Completed') {
            filtered = filtered.filter((t) => t.annotations === 1);
        } else if (statusFilter === 'Partial') {
            filtered = filtered.filter((t) => t.annotations === 0);
        }

        // Then apply search filter
        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            filtered = filtered.filter((task) => {
                return (
                    String(task.serialNumber).includes(term) ||
                    task.question.text.toLowerCase().includes(term) ||
                    task.question.category.toLowerCase().includes(term) ||
                    task.productName.toLowerCase().includes(term)
                );
            });
        }

        setFilteredTasks(filtered);
    }, [searchTerm, statusFilter]);

    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const getSortedTasks = () => {
        const sortable = [...filteredTasks];
        if (sortConfig.key) {
            sortable.sort((a, b) => {
                let aVal, bVal;
                
                if (sortConfig.key === 'question') {
                    aVal = a.question.text;
                    bVal = b.question.text;
                } else if (sortConfig.key === 'category') {
                    aVal = a.question.category;
                    bVal = b.question.category;
                } else {
                    aVal = a[sortConfig.key];
                    bVal = b[sortConfig.key];
                }
                
                if (typeof aVal === 'string' && typeof bVal === 'string') {
                    return sortConfig.direction === 'ascending'
                        ? aVal.localeCompare(bVal)
                        : bVal.localeCompare(aVal);
                } else {
                    return sortConfig.direction === 'ascending'
                        ? aVal - bVal
                        : bVal - aVal;
                }
            });
        }
        return sortable;
    };

    const sortedTasks = getSortedTasks();

    const handleAnnotatorFilter = (annotator) => {
        if (annotator === 'All') {
            // Reset to show all tasks, but still apply other filters
            setFilteredTasks(tasks);
        } else {
            const filtered = tasks.filter((t) => t.annotator === annotator);
            setFilteredTasks(filtered);
        }
    };

    return (
        <div className="bg-[#f5f9fc] min-h-screen">
            <Navbar active={false} />

            <div className="p-6 space-y-6 max-w-7xl mx-auto">
                
                {/* Dashboard Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[['Total Tasks', totalTasks], ['Total Review Task', completedTasks],
                    ['Pending Reviews', tasksLeft], ['Completed Tasks (%)', `${completedPercentage}%`]].map(([title, value], idx) => (
                        <div
                            key={idx}
                            className="p-5 rounded-xl shadow bg-gradient-to-r from-[#ffffff] to-[#D1FFF1] border-l-4 border-[#00AB7D]"
                        >
                            <div className="text-3xl font-bold text-gray-800">{value}</div>
                            <div className="text-md font-semibold text-gray-600 mt-2">{title}</div>
                        </div>
                    ))}
                </div>

                {/* Table Section */}
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="flex flex-col md:flex-row justify-between items-center p-4 border-b gap-4">
                        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
                            <StatusFilter value={statusFilter} onChange={setStatusFilter} />

                            {/* Annotator Dropdown */}
                            <select
                                className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#00ABE4]"
                                onChange={(e) => handleAnnotatorFilter(e.target.value)}
                            >
                                <option value="All">All Annotators</option>
                                <option value="Ibrahim">Ibrahim</option>
                                <option value="Agus">Agus</option>
                            </select>
                        </div>

                        {/* Search Bar */}
                        <div className="relative w-full md:w-64">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <Search className="text-gray-400 h-4 w-4" />
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
                        <table className="min-w-full text-sm">
                            <thead className="bg-gradient-to-r from-gray-800 to-[#00AB7D] text-white">
                                <tr>
                                    <th className="px-6 py-4 text-left font-semibold">Serial</th>
                                    <th className="px-6 py-4 text-left font-semibold">Image</th>
                                    <th className="px-6 py-4 text-left font-semibold">Category</th>
                                    <th className="px-6 py-4 text-left font-semibold">Annotations</th>
                                    <th className="px-6 py-4 text-left font-semibold">Date</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {sortedTasks.map((t, i) => (
                                    <tr
                                        key={i}
                                        className="hover:bg-[#f0f8ff] transition-colors cursor-pointer"
                                        onClick={() => navigate('/annotator-response')}
                                    >
                                        <td className="px-6 py-3 text-gray-800 font-medium">{t.serialNumber}</td>
                                        <td className="px-6 py-3">
                                            <img
                                                src={t.imageUrl}
                                                alt={t.productName}
                                                className="w-16 h-16 object-cover rounded"
                                                onError={(e) => {
                                                    e.target.src = 'https://via.placeholder.com/64x64?text=No+Image';
                                                }}
                                            />
                                        </td>
                                        <td className="px-6 py-3">{t.question.category}</td>
                                        <td className="px-6 py-3">
                                            {t.annotations === 0 ? (
                                                <span className="text-blue-600 font-semibold">Ready to Review</span>
                                            ) : (
                                                <span className="text-green-600 font-semibold">Reviewed</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-3">{t.date || '—'}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {sortedTasks.length === 0 && (
                        <div className="text-center py-8 text-gray-500">
                            No tasks found matching your criteria.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ADJTasks;