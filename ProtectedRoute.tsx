import { Navigate } from "react-router-dom";
import { supabase } from "./supabaseClient";

export default function ProtectedRoute({ children }: any) {
  return supabase.auth.getSession().then(({ data }) => {
    if (!data.session) return <Navigate to="/" />;
    return children;
  });
}
