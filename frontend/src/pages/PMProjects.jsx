import { useEffect, useState } from 'react';
import { FaFileDownload, FaPlusCircle, FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import AddProject from '../components/AddProject';
import Navbar from '../components/Navbar';
import StatusFilter from '../components/StatusFilter';
import tasks from '../data/tasks.json';

const PMIndex = () => {
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

    // Dummy project data
    const dummyProjects = [
        {
            id: 1,
            name: "Sentiment Analysis",
            progress: "70%",
            activeVendors: 12,
            blockedVendors: 2,
            status: "Ongoing"
        },
        {
            id: 2,
            name: "Image Classification",
            progress: "100%",
            activeVendors: 8,
            blockedVendors: 0,
            status: "Completed"
        },
        {
            id: 3,
            name: "Speech Transcription",
            progress: "45%",
            activeVendors: 6,
            blockedVendors: 3,
            status: "Ongoing"
        },
        {
            id: 4,
            name: "OCR Tagging",
            progress: "90%",
            activeVendors: 10,
            blockedVendors: 1,
            status: "Ongoing"
        }
    ];

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
                {/* PM Tools Section */}
                <div className="flex flex-col sm:flex-row justify-between gap-4 items-center bg-white p-5 rounded-xl shadow">
                    <button
                        onClick={() => setIsAddProjectOpen(true)}
                        className="flex items-center gap-3 px-5 py-3 bg-gradient-to-r from-[#ffffff] to-[#D1FFF1] text-black rounded-lg font-semibold shadow "
                    >
                        <FaPlusCircle className="text-lg" />
                        Add Project
                    </button>
                    <button className="flex items-center gap-3 px-5 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                        <FaFileDownload className="text-lg" />
                        Download Report
                    </button>
                </div>

                {/* Dashboard Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    ['Total Projects', dummyProjects.length],
                    ['Total Tasks', totalTasks],
                    ['Active Vendors', dummyProjects.reduce((sum, p) => sum + p.activeVendors, 0)],
                    ['Completion Rate', `${completedPercentage}%`],
                ].map(([title, value], idx) => (
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
                {/* Table Section */}
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="p-4 border-b">
                        <h2 className="text-lg font-bold text-gray-800">Projects</h2>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full text-sm">
                            <thead className="bg-gradient-to-r from-gray-800 to-[#00AB7D] text-white">
                                <tr>
                                    <th className="px-6 py-4 text-left font-semibold">Project Name</th>
                                    <th className="px-6 py-4 text-left font-semibold">Progress</th>
                                    <th className="px-6 py-4 text-left font-semibold">Active Vendors</th>
                                    <th className="px-6 py-4 text-left font-semibold">Blocked Vendors</th>
                                    <th className="px-6 py-4 text-left font-semibold">Status</th>
                                    <th className="px-6 py-4 text-left font-semibold">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {dummyProjects.map((project, i) => (
                                    <tr
                                        key={project.id}
                                        onClick={() => navigate('/questions')}
                                        className="hover:bg-[#f0f8ff] transition-colors cursor-pointer"
                                    >
                                        <td className="px-6 py-3 font-medium text-gray-800">{project.name}</td>
                                        <td className="px-6 py-3">{project.progress}</td>
                                        <td className="px-6 py-3">{project.activeVendors}</td>
                                        <td className="px-6 py-3">{project.blockedVendors}</td>
                                        <td className="px-6 py-3">
                                            <span className={`font-semibold ${project.status === 'Completed' ? 'text-green-600' : 'text-blue-600'}`}>
                                                {project.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-3 text-blue-500 font-semibold">View</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>

            {/* Add Project Modal */}
            <AddProject
                isOpen={isAddProjectOpen}
                onClose={() => setIsAddProjectOpen(false)}
            />
        </div>
    );
};

export default PMIndex;