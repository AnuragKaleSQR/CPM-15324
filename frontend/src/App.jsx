// App.jsx
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Tasks from './pages/Tasks';
import Index from './pages/Index';
import PMIndex from './pages/PMProjects';
import ProtectedRoute from './routes/ProtectedRoute';
//import DynamicIndexRoute from './routes/DynamicIndexRoute';

import PMQuestions from './pages/PMQuestions';
import PMResponse from './pages/PMResponse';

import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Login />} />

        {/* Annotators Routes */}
        <Route
          path="/index"
          element={
            <ProtectedRoute>
              <Index />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tasks/:serialNumber"
          element={
            <ProtectedRoute>
              <Tasks />
            </ProtectedRoute>
          }
        />

        {/* PM Routes */}

        <Route
          path="/projects"
          element={
            <ProtectedRoute>
              <PMIndex />
            </ProtectedRoute>
          }
        />

        <Route
          path="/questions"
          element={
            <ProtectedRoute>
              <PMQuestions />
            </ProtectedRoute>
          }
        />

        <Route
          path="/response"
          element={
            <ProtectedRoute>
              <PMResponse />
            </ProtectedRoute>
          }
        />

      </Routes>
    </AuthProvider>
  );
}

export default App;
