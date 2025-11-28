import { useState } from "react";
import { supabase } from "../supabaseClient";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  async function handleEmailAuth(e:any) {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) alert(error.message);
  }

  async function handleSignup(e:any) {
    e.preventDefault();
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) alert(error.message);
    else alert("Check your email to confirm!");
  }

  async function loginWithGoogle() {
    await supabase.auth.signInWithOAuth({ provider:"google" });
  }

  async function loginWithGithub() {
    await supabase.auth.signInWithOAuth({ provider:"github" });
  }

  async function loginWithOTP() {
    const { error } = await supabase.auth.signInWithOtp({ phone });
    if (error) alert(error.message);
    else alert("OTP sent!");
  }

  return (
    <div style={{maxWidth:320, margin:"auto"}}>
      <h2>Login</h2>

      <form onSubmit={handleEmailAuth}>
        <input type="email" placeholder="Email" onChange={e=>setEmail(e.target.value)} /><br/>
        <input type="password" placeholder="Password" onChange={e=>setPassword(e.target.value)} /><br/>
        <button type="submit">Login</button>
      </form>

      <button onClick={handleSignup} style={{marginTop:10}}>Sign Up</button>

      <hr/>

      <button onClick={loginWithGoogle}>Continue with Google</button>
      <button onClick={loginWithGithub} style={{marginTop:10}}>Continue with GitHub</button>

      <hr/>

      <h3>Phone Login (OTP)</h3>
      <input type="text" placeholder="+91XXXXXXXXXX" onChange={e=>setPhone(e.target.value)} />
      <button onClick={loginWithOTP} style={{marginTop:10}}>Send OTP</button>
    </div>
  );
}
