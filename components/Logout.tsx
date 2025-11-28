import { supabase } from "../supabaseClient";

export default function Logout() {
  return <button onClick={()=>supabase.auth.signOut()}>Logout</button>;
}
