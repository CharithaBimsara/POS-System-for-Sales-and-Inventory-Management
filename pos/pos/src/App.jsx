import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from '../components/Login';
import Dashboard1 from '../components/Dashboard1';
import Dashboard2 from '../components/Dashboard2';
import ProtectedRoute from '../components/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        {/* Direct access to Dashboard1 without login */}
        <Route path="/dashboard-1" element={<Dashboard1 />} />  
        <Route path="/dashboard-2" element={<Dashboard2 />} />  
        
        <Route 
          path="/dashboard-2" 
          element={
            <ProtectedRoute allowedRole="shopowner">
              <Dashboard2 />
            </ProtectedRoute>
          } 
        />
        
        {/* Redirect root path to Dashboard1 */}
        <Route path="/" element={<Login />} />
        
        <Route 
          path="/unauthorized" 
          element={
            <div className="p-6 text-center">
              <h1 className="text-2xl text-red-600">Unauthorized Access</h1>
              <p>You don't have permission to access this page.</p>
            </div>
          } 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
