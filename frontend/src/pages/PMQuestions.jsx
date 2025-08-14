import { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import StatusFilter from '../components/StatusFilter';
import tasks from '../data/tasks.json';

function PMQuestions() {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredTasks, setFilteredTasks] = useState(tasks);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
    const [statusFilter, setStatusFilter] = useState('All');
    const [isAddProjectOpen, setIsAddProjectOpen] = useState(false);

    const totalTasks = tasks.length;
    const completedTasks = tasks.filter((t) => t.annotations === 2).length;
    const tasksLeft = tasks.filter((t) => t.annotations !== 2).length;
    const completedPercentage = ((completedTasks / totalTasks) * 100).toFixed(1);

    useEffect(() => {
        if (!searchTerm) {
            setFilteredTasks(tasks);
            return;
        }
        const term = searchTerm.toLowerCase();
        const results = tasks.filter((task) => {
            return (
                String(task.serialNumber).includes(term) ||
                task.question.text.toLowerCase().includes(term) ||
                task.question.category.toLowerCase().includes(term)
            );
        });
        setFilteredTasks(results);
    }, [searchTerm]);

    useEffect(() => {
        if (statusFilter === 'All') {
            setFilteredTasks(tasks);
        } else if (statusFilter === 'Completed') {
            setFilteredTasks(tasks.filter((t) => t.annotations === 2));
        } else if (statusFilter === 'Partial') {
            setFilteredTasks(tasks.filter((t) => t.annotations === 1));
        }
    }, [statusFilter]);

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
                const aVal = sortConfig.key === 'question' ? a.question.text : a[sortConfig.key];
                const bVal = sortConfig.key === 'question' ? b.question.text : b[sortConfig.key];
                return sortConfig.direction === 'ascending'
                    ? aVal.localeCompare(bVal)
                    : bVal.localeCompare(aVal);
            });
        }
        return sortable;
    };

    const sortedTasks = getSortedTasks();

    return (
        <div className="bg-[#f5f9fc] min-h-screen">
            <Navbar active={false} />

            <div className="p-6 space-y-6 max-w-7xl mx-auto">
                
                {/* Dashboard Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[['Total Tasks', totalTasks], ['Task Fully Completed', completedTasks],
                    ['Tasks Left', tasksLeft], ['Completed Tasks (%)', `${completedPercentage}%`]].map(([title, value], idx) => (
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
                                onChange={(e) => {
                                    const annotator = e.target.value;
                                    if (annotator === 'All') {
                                        setFilteredTasks(tasks);
                                    } else {
                                        setFilteredTasks(tasks.filter((t) => t.annotator === annotator));
                                    }
                                }}
                            >
                                <option value="All">All Annotators</option>
                                <option value="Ibrahim">Ibrahim</option>
                                <option value="Agus">Agus</option>
                            </select>
                        </div>

                        {/* Search Bar */}
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
                        <table className="min-w-full text-sm">
                            <thead className="bg-gradient-to-r from-gray-800 to-[#00AB7D] text-white">
                                <tr>
                                    <th className="px-6 py-4 text-left font-semibold">Serial</th>
                                    <th className="px-6 py-4 text-left font-semibold">Question</th>
                                    <th className="px-6 py-4 text-left font-semibold">Category</th>
                                    <th className="px-6 py-4 text-left font-semibold">Annotations</th>
                                    <th className="px-6 py-4 text-left font-semibold">Annotator</th>
                                    <th className="px-6 py-4 text-left font-semibold">Completed</th>
                                    <th className="px-6 py-4 text-left font-semibold">Date</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {sortedTasks.map((t, i) => (
                                    <tr
                                        key={i}
                                        className="hover:bg-[#f0f8ff] transition-colors cursor-pointer"
                                        onClick={() => navigate('/response')}
                                    >
                                        <td className="px-6 py-3 text-gray-800 font-medium">{t.serialNumber}</td>
                                        <td className="px-6 py-3">{t.question.text}</td>
                                        <td className="px-6 py-3">{t.question.category}</td>
                                        <td className="px-6 py-3">{t.annotations}</td>
                                        <td className="px-6 py-3">{t.annotator || 'N/A'}</td>
                                        <td className="px-6 py-3">
                                            {t.annotations === 2 ? (
                                                <span className="text-green-600 font-semibold">Yes</span>
                                            ) : (
                                                <span className="text-red-500 font-semibold">No</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-3">{t.date || '—'}</td>
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

export default PMQuestions