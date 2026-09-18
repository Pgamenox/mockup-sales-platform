import React,{useEffect,useState}from'react';
import{supabase,supabaseEnabled}from'./supabaseClient';

export default function AuthGate({children}){
 const[session,setSession]=useState(null),[ready,setReady]=useState(!supabaseEnabled),[email,setEmail]=useState(''),[password,setPassword]=useState(''),[mode,setMode]=useState('login'),[msg,setMsg]=useState('');
 useEffect(()=>{if(!supabase)return;let live=true;supabase.auth.getSession().then(({data})=>{if(live){setSession(data.session);setReady(true)}});const{data:{subscription}}=supabase.auth.onAuthStateChange((_e,s)=>setSession(s));return()=>{live=false;subscription.unsubscribe()}},[]);
 if(!supabaseEnabled)return children;
 if(!ready)return <main className="authshell"><div className="authcard">Cargando MockuPro…</div></main>;
 if(session)return React.cloneElement(children,{mockuSession:session,onSignOut:()=>supabase.auth.signOut()});
 const submit=async e=>{e.preventDefault();setMsg('');const fn=mode==='login'?supabase.auth.signInWithPassword({email,password}):supabase.auth.signUp({email,password,options:{emailRedirectTo:location.origin+location.pathname}});const{error}=await fn;setMsg(error?error.message:mode==='register'?'Revisa tu correo para confirmar tu cuenta.':'')};
 return <main className="authshell"><form className="authcard" onSubmit={submit}><img src="./mockupro-logo.svg" alt="MockuPro"/><h2>{mode==='login'?'Iniciar sesión':'Crear cuenta'}</h2><input type="email" required placeholder="Correo" value={email} onChange={e=>setEmail(e.target.value)}/><input type="password" required minLength="8" placeholder="Contraseña" value={password} onChange={e=>setPassword(e.target.value)}/><button type="submit">{mode==='login'?'Entrar':'Registrarme'}</button>{msg&&<p>{msg}</p>}<button className="authswitch" type="button" onClick={()=>setMode(mode==='login'?'register':'login')}>{mode==='login'?'Crear una cuenta':'Ya tengo cuenta'}</button></form></main>;
}
