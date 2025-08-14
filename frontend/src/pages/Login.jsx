import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const { login } = useAuth();
  const [username, setUsername] = useState('Ibrahim');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!username || !password || !role) {
      setError('All fields are required');
      return;
    }

    // axios.post('http://127.0.0.1:8000/api/auth/login/', { username, password, role })
    //   .then(response => {
    //     alert('Login successful');
        
    //    })
    //   .catch(err => {
    //     setError('Invalid credentials');  
    //     return;
    //   });

    setError('');
    login({ username, role });

    if(role=='annotator'){
      navigate('/index');
    }else if(role=='pm'){
      navigate('/projects');
    }else if(role=='adjudicator'){
      navigate('/review-tasks');   
    }
    
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center p-4"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800"><rect fill="%23059669" width="1200" height="800"/><g fill-opacity="0.1"><polygon fill="%23ffffff" points="1200,160 0,360 0,800 1200,800"/><polygon fill="%23ffffff" points="1200,0 0,200 0,640 1200,440"/></g></svg>')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md bg-opacity-90">
        <div className="flex justify-center mb-6">
          <img src="/Logo.png" alt="Argos Logo" className="h-16 w-auto" />
        </div>

        <h2 className="text-4xl leading-tight font-bold text-center bg-gradient-to-r from-green-600 via-green-500 to-emerald-600 bg-clip-text text-transparent mb-5">
          Welcome to Argos
        </h2>


        {error && (
          <div className="mb-6 p-3 bg-red-50 text-red-500 rounded-lg text-center border border-red-200">
            {error}
          </div>
        )}

        <div className="space-y-6">
          <div>
            <label className="block text-gray-700 mb-2 font-medium">Select Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00ABE4] transition"
            >
              <option value="">Choose your role</option>
              <option value="annotator">Annotator</option>
              <option value="adjudicator">Reviewer</option>
              <option value="pm">Myraid</option>
              
            </select>
          </div>

          <div>
            <label className="block text-gray-700 mb-2 font-medium">
              {role === 'annotator' ? 'Annotator ID' : 'Username'}
            </label>
            <input
              type="text"
              placeholder={role === 'annotator' ? 'Enter your annotator ID' : 'Enter your username'}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00ABE4] transition"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2 font-medium">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00ABE4] transition"
            />
          </div>

          <button
            onClick={handleLogin}
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold transition duration-300 shadow-md hover:shadow-lg"
          >
            Login
          </button>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-100">
          <button className="w-full flex items-center justify-center gap-3 border border-gray-300 py-3 px-4 rounded-lg hover:bg-gray-50 transition duration-300">
            <FcGoogle className="text-xl" />
            <span className="font-medium">Login with Google</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
