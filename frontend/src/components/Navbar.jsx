import { Activity, CircleUserRound, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/Logo.png';
const Navbar = () => {

  const navigate = useNavigate();


  return (
    <div className="flex justify-between items-center px-6 py-3 bg-gradient-to-r from-gray-800 to-[#00AB7D] shadow-md">
      <div
      className="flex items-center gap-2 text-[#00ABE4] font-bold text-xl cursor-pointer"
     // onClick={() => navigate('/index')} // Navigates to /index on click
    >
       <img src={Logo} alt="Argos Logo" className="h-8 w-auto" />
      
    </div>
      <div className="flex items-center gap-6">
        {/* <div className={`flex items-center space-x-2 text-sm px-3 py-1 rounded-full ${active ? 'bg-green-100 border-green-500 text-green-700' : 'bg-red-100 border-red-500 text-red-700'} border`}>
          <Activity className="h-4 w-4" />
          <span>Session Active</span>
        </div> */}
        <div className="flex items-center space-x-2">
          <CircleUserRound className='text-[#FFCE70]'/>
          <span className="text-sm font-semibold text-gray-300">Ibrahim</span>
          <span className="text-sm font-semibold text-gray-300">Annotator ID</span>
        </div>
        <LogOut className="cursor-pointer text-[#FFCE70] hover:text-[#00FFB3]" onClick={() => window.location.href = '/'} />
      </div>
    </div>
  );
};
export default Navbar;