import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import Auth from "./components/Auth";
import Logout from "./components/Logout";
import ProtectedRoute from "./ProtectedRoute";

function Dashboard() {
  return <h1>Dashboard - Protected</h1>;
}

function Settings() {
  return <h1>Settings - Protected</h1>;
}

function App() {
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    supabase.auth.onAuthStateChange((_e, session) => setSession(session));
  }, []);

  return (
    <BrowserRouter>
      <div>
        {!session ? <Auth /> : <Logout />}

        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }/>
          <Route path="/settings" element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
