import React, { useEffect, useState } from "react";
import { supabase, supabaseEnabled } from "./supabaseClient";

const authMessage = (error, fallback) => {
  const text = String(error?.message || "").toLowerCase();
  if (text.includes("security purposes") || text.includes("rate limit"))
    return "Espera un minuto antes de solicitar otro acceso.";
  if (text.includes("invalid login credentials"))
    return "Correo o contraseña incorrectos.";
  if (text.includes("email not confirmed"))
    return "Confirma tu correo antes de entrar.";
  if (text.includes("user already registered"))
    return "Ese correo ya tiene cuenta. Usa Iniciar sesión.";
  return fallback;
};

export default function AuthGate({ children }) {
  const [session, setSession] = useState(null),
    [ready, setReady] = useState(!supabaseEnabled),
    [email, setEmail] = useState(""),
    [password, setPassword] = useState(""),
    [mode, setMode] = useState("login"),
    [msg, setMsg] = useState(""),
    [submitting, setSubmitting] = useState(false),
    [sendingLink, setSendingLink] = useState(false);
  useEffect(() => {
    if (!supabase) return;
    let live = true;
    supabase.auth.getSession().then(({ data }) => {
      if (live) {
        setSession(data.session);
        setReady(true);
      }
    });
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => {
      live = false;
      subscription.unsubscribe();
    };
  }, []);
  if (!supabaseEnabled) return children;
  if (!ready)
    return (
      <main className="authshell">
        <div className="authcard">Cargando MockuPro…</div>
      </main>
    );
  if (session)
    return React.cloneElement(children, {
      mockuSession: session,
      onSignOut: () => supabase.auth.signOut(),
    });
  const submit = async (e) => {
    e.preventDefault();
    setMsg("");
    setSubmitting(true);
    try {
      const clean = email.trim().toLowerCase();
      const fn =
        mode === "login"
          ? supabase.auth.signInWithPassword({ email: clean, password })
          : supabase.auth.signUp({
              email: clean,
              password,
              options: { emailRedirectTo: location.origin + location.pathname },
            });
      const { error } = await fn;
      setMsg(
        error
          ? authMessage(error, "No pudimos completar el acceso. Intenta nuevamente.")
          : mode === "register"
            ? "Revisa tu correo para confirmar tu cuenta."
            : "",
      );
    } catch {
      setMsg("No hay conexión con el servicio de acceso. Intenta nuevamente.");
    } finally {
      setSubmitting(false);
    }
  };
  const sendAccessLink = async () => {
    const clean = email.trim().toLowerCase();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(clean)) {
      setMsg("Escribe primero un correo válido.");
      return;
    }
    setSendingLink(true);
    setMsg("");
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email: clean,
        options: {
          shouldCreateUser: false,
          emailRedirectTo: location.origin + location.pathname,
        },
      });
      setMsg(
        error
          ? authMessage(error, "No se pudo enviar el enlace. Intenta nuevamente.")
          : "Te enviamos un enlace de acceso. Revisa tu correo.",
      );
    } catch {
      setMsg("No hay conexión con el servicio de acceso. Intenta nuevamente.");
    } finally {
      setSendingLink(false);
    }
  };
  return (
    <main className="authshell">
      <form className="authcard" onSubmit={submit}>
        <img src="./mockupro-logo.svg" alt="MockuPro" />
        <h2>{mode === "login" ? "Iniciar sesión" : "Crear cuenta"}</h2>
        <input
          type="email"
          required
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          required
          minLength="8"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" disabled={submitting || sendingLink}>
          {submitting
            ? "Procesando…"
            : mode === "login"
              ? "Entrar"
              : "Registrarme"}
        </button>
        {mode === "login" && (
          <button
            className="authswitch"
            type="button"
            disabled={sendingLink}
            onClick={sendAccessLink}
          >
            {sendingLink ? "Enviando…" : "Entrar con enlace al correo"}
          </button>
        )}
        {msg && <p>{msg}</p>}
        <button
          className="authswitch"
          type="button"
          onClick={() => setMode(mode === "login" ? "register" : "login")}
        >
          {mode === "login" ? "Crear una cuenta" : "Ya tengo cuenta"}
        </button>
      </form>
    </main>
  );
}

