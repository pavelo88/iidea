"use client";
import { requiresPasswordChange } from '@/lib/account-access-policy';


import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import {
  KeyRound,
  Mail,
  Eye,
  EyeOff,
  ShieldCheck,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  GraduationCap,
  UserPlus,
  User,
} from "lucide-react";

import { trackConversion } from "@/lib/conversions";
import { useLegalConfiguration } from "@/lib/use-legal-configuration";

type Tab = "login" | "register";

/** Destino interno seguro de `?next=` (evita redirecciones abiertas a otros dominios). */
function destinoSeguro(valor: string | null): string | null {
  if (!valor || !valor.startsWith("/") || valor.startsWith("//") || valor.startsWith("/login")) return null;
  return valor;
}

export default function LoginPage() {
  const router = useRouter();
  const { publicIntakeAvailable, policyVersion } = useLegalConfiguration();
  const { login, register, resetPassword, userProfile, currentUser, loading: authLoading } = useAuth();
  const [avisoSesion, setAvisoSesion] = useState("");

  const [tab, setTab] = useState<Tab>("login");

  // `?next=` lo pone el servidor al proteger /mi-aula, /simulador, etc. Se lee en el cliente
  // (window) para no obligar a envolver la página en Suspense por useSearchParams.
  const [siguiente, setSiguiente] = useState<string | null>(null);
  useEffect(() => {
    setSiguiente(destinoSeguro(new URLSearchParams(window.location.search).get("next")));
  }, []);

  // Si el navegador ya tiene sesión de Firebase (la cookie del servidor solo había caducado),
  // AuthProvider la renueva y aquí se devuelve al estudiante a donde iba, sin pedir la clave otra vez.
  // Solo se redirige cuando el SERVIDOR confirma la sesión. Antes bastaba con que el navegador tuviera
  // sesión de Firebase: si la cookie del servidor no era válida, /mi-aula devolvía al login y este volvía
  // a /mi-aula, en bucle. Ahora se renueva la cookie una vez y, si aún falla, se avisa en vez de rebotar.
  useEffect(() => {
    if (authLoading || !userProfile || !siguiente) return;
    let cancelado = false;
    const sesionValida = async () => {
      try {
        const r = await fetch("/api/auth/session", { cache: "no-store" });
        return r.ok && Boolean(((await r.json()) as { valida?: boolean }).valida);
      } catch { return false; }
    };
    (async () => {
      let valida = await sesionValida();
      if (!valida && currentUser) {
        try {
          const idToken = await currentUser.getIdToken(true);
          await fetch("/api/auth/session", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ idToken }) });
          valida = await sesionValida();
        } catch { /* se informa abajo */ }
      }
      if (cancelado) return;
      if (valida) {
        window.location.replace(requiresPasswordChange(userProfile) ? "/change-password" : siguiente);
        return;
      }
      setAvisoSesion("No pudimos abrir tu sesión en el servidor. Espera unos segundos y vuelve a ingresar con tu correo y clave.");
    })();
    return () => { cancelado = true; };
  }, [authLoading, userProfile, currentUser, siguiente]);

  // Login state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [forgotMsg, setForgotMsg] = useState("");
  const [forgotError, setForgotError] = useState("");

  // Register state
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regPhone, setRegPhone] = useState("");
  const [regConsent, setRegConsent] = useState(false);
  useEffect(()=>{setRegConsent(false);},[policyVersion]);
  const [politica, setPolitica] = useState<string | null>(null);
  const [regLoading, setRegLoading] = useState(false);
  const [regError, setRegError] = useState("");
  const [regSuccess, setRegSuccess] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMsg("Por favor completa tu correo y contrasena.");
      return;
    }
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");
    try {
      const res = await login(email, password);
      if (!res.success) {
        setErrorMsg(res.error || "Credenciales invalidas.");
        setLoading(false);
        return;
      }
      if (res.passwordChanged === false) {
        setSuccessMsg("Bienvenido! Crea tu contrasena personal antes de continuar...");
        setTimeout(() => router.push("/change-password"), 800);
        return;
      }
      setSuccessMsg("Bienvenido! Redirigiendo...");
      setTimeout(() => {
        if (siguiente) {
          window.location.href = siguiente;
        } else if (res.role === "super" || res.role === "admin") {
          window.location.href = "/admin";
        } else {
          window.location.href = "/dashboard";
        }
      }, 700);
    } catch (err: any) {
      setErrorMsg(err.message || "Error inesperado al iniciar sesion.");
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegError("");
    setRegSuccess("");
    if (!regName || !regEmail || !regPassword) {
      setRegError("Nombre, correo y contraseña son obligatorios.");
      return;
    }
    if (!regConsent) {
      setRegError("Debes aceptar los Términos y la Política de privacidad para crear tu cuenta.");
      return;
    }
    if(regPassword.length<8){setRegError('Usa al menos 8 caracteres en tu contraseña.');return;}
    setRegLoading(true);
    const res = await register({ name: regName, email: regEmail, password: regPassword, phone: regPhone, policyVersion });
    if (!res.success) {
      setRegLoading(false);
      setRegError(res.error || "Error al registrar. Intenta de nuevo.");
      return;
    }
    trackConversion('sign_up',crypto.randomUUID(),{method:'email'});
    setRegSuccess("¡Cuenta creada! Abriendo tu aula...");
    const ingreso = await login(regEmail, regPassword);
    setRegLoading(false);
    if (ingreso.success) {
      setTimeout(() => router.push(ingreso.passwordChanged === false ? "/change-password" : "/dashboard"), 700);
      return;
    }
    setRegSuccess("Cuenta creada. Inicia sesión con tu correo y contraseña.");
    setTab("login");
    setEmail(regEmail);
  };

    const handleForgotPassword = async () => {
    if (!email) {
      setForgotError('Por favor ingresa tu correo en el campo superior primero.');
      document.getElementById('login-email')?.focus();
      return;
    }
    setForgotError('');
    setForgotMsg('');
    try {
      const res = await resetPassword(email);
      if (res.success) {
        setForgotMsg('Correo de recuperación enviado.');
      } else {
        setForgotError(res.error || 'Error al enviar el correo.');
      }
    } catch (err: any) {
      setForgotError(err.message || 'Error inesperado.');
    }
  };

  const switchTab = (t: Tab) => {
    setTab(t);
    setErrorMsg("");
    setSuccessMsg("");
    setRegError("");
    setRegSuccess("");
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#09090f] selection:bg-orange-500 selection:text-white">
      {/* Cosmic background orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-orange-500/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-purple-700/15 blur-[100px]" />
        <div className="absolute top-[40%] right-[20%] w-[300px] h-[300px] rounded-full bg-orange-400/5 blur-[80px]" />
      </div>

      <Navbar />

      <main className="relative flex-1 flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-orange-500/30 bg-orange-500/5 text-xs font-bold text-orange-400">
              <ShieldCheck className="w-3.5 h-3.5" /> Portal Oficial IIDEA Academy Ecuador
            </div>
            <h1 className="text-3xl font-extrabold text-white font-display tracking-tight">
              {tab === "login" ? "Iniciar Sesion" : "Registro Gratuito"}
            </h1>
            <p className="text-xs sm:text-sm text-slate-400">
              {tab === "login"
                ? "Accede a tu Aula Virtual, expediente academico o panel de administracion."
                : "Crea tu cuenta y comienza tu formación en SAP Business One en IIDEA Academy hoy mismo."}
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="flex rounded-2xl border border-white/10 p-1 bg-white/[0.03] gap-1">
            <button
              onClick={() => switchTab("login")}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                tab === "login"
                  ? "bg-gradient-to-r from-orange-500 to-purple-600 text-white shadow-lg shadow-orange-500/20"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <User className="w-3.5 h-3.5" />
              Iniciar Sesion
            </button>
            <button
              onClick={() => switchTab("register")}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                tab === "register"
                  ? "bg-gradient-to-r from-orange-500 to-purple-600 text-white shadow-lg shadow-orange-500/20"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <UserPlus className="w-3.5 h-3.5" />
              Registro Gratuito
            </button>
          </div>

          {/* LOGIN FORM */}
          {tab === "login" && (
            <div className="p-8 rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl shadow-2xl shadow-black/40 space-y-6">
              {(errorMsg || avisoSesion) && (
                <div role="alert" className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs flex items-center gap-2.5 animate-in fade-in">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg || avisoSesion}</span>
                </div>
              )}
              {successMsg && (
                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs flex items-center gap-2.5 animate-in fade-in">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{successMsg}</span>
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-1.5">
                  <label htmlFor="login-email" className="text-xs font-bold text-slate-200">
                    Correo Electronico
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      id="login-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="ejemplo@empresa.com"
                      required
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-white/10 bg-white/5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/30 transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <label htmlFor="login-password" className="text-xs font-bold text-slate-200">
                      Contrasena / Cedula
                    </label>
                    <span className="text-[11px] text-slate-500">
                      (Tu contraseña personal)
                    </span>
                  </div>
                  <div className="relative">
                    <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      id="login-password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Tu contraseña"
                      required
                      className="w-full pl-10 pr-10 py-3 rounded-xl border border-white/10 bg-white/5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/30 transition-colors"
                    />
                    <button
                      aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
<div className="text-right">
  <button type="button" onClick={handleForgotPassword} className="text-orange-400 hover:text-orange-300 hover:underline text-xs mt-1">
    ¿Olvidaste tu contraseña?
  </button>
</div>
{forgotError && (
  <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs flex items-center gap-2.5 animate-in fade-in">
    <AlertCircle className="w-4 h-4 shrink-0" />
    <span>{forgotError}</span>
  </div>
)}
{forgotMsg && (
  <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs flex items-center gap-2.5 animate-in fade-in">
    <CheckCircle2 className="w-4 h-4 shrink-0" />
    <span>{forgotMsg}</span>
  </div>
)}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-orange-500 to-purple-600 hover:from-orange-400 hover:to-purple-500 text-white text-xs font-bold transition-all shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2 cursor-pointer active:scale-95 disabled:opacity-50"
                >
                  {loading ? (
                    <span>Autenticando...</span>
                  ) : (
                    <>
                      <span>Entrar al Sistema</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              <div className="pt-2 text-center">
                <p className="text-[11px] text-slate-400">
                  No tienes cuenta?{" "}
                  <button
                    onClick={() => switchTab("register")}
                    className="text-orange-400 font-bold hover:text-orange-300 hover:underline cursor-pointer"
                  >
                    Registrate gratis
                  </button>
                </p>
              </div>
            </div>
          )}

          {/* REGISTER FORM */}
          {tab === "register" && (
            <div className="p-8 rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl shadow-2xl shadow-black/40 space-y-6">
              {/* Free badge */}
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/20">
                <GraduationCap className="w-8 h-8 text-emerald-500 shrink-0" />
                <div>
                  <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400">Registro 100% Gratuito</p>
                  <p className="text-[11px] text-slate-500">Accede al track SAP Business One Core sin costo con una contraseña personal segura.</p>
                </div>
              </div>

              {regError && (
                <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs flex items-center gap-2.5 animate-in fade-in">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{regError}</span>
                </div>
              )}
              {regSuccess && (
                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs flex items-start gap-2.5 animate-in fade-in">
                  <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{regSuccess}</span>
                </div>
              )}

              {!publicIntakeAvailable && (
                <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-300 text-xs flex items-center gap-2.5">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>Las inscripciones públicas están temporalmente en pausa por actualización administrativa.</span>
                </div>
              )}

              <form onSubmit={handleRegister} className="space-y-4">
                <div className="space-y-1.5">
                  <label htmlFor="register-name" className="text-xs font-bold text-slate-200">
                    Nombre Completo *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      id="register-name"
                      type="text"
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      placeholder="Ej: Ing. Andrea Morales"
                      required
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-white/10 bg-white/5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/30 transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="register-email" className="text-xs font-bold text-slate-200">
                    Correo Electronico *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      id="register-email"
                      type="email"
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      placeholder="tucorreo@empresa.com"
                      required
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-white/10 bg-white/5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/30 transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="register-password" className="text-xs font-bold text-slate-200">
                    Contraseña personal * <span className="font-normal text-slate-400">(mínimo 8 caracteres)</span>
                  </label>
                  <div className="relative">
                    <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      id="register-password"
                      type="password"
                      inputMode="text"
                      autoComplete="new-password"
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      placeholder="Crea una contraseña de 8 caracteres o más"
                      minLength={8}
                      maxLength={128}
                      required
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-white/10 bg-white/5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/30 transition-colors font-mono"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="register-phone" className="text-xs font-bold text-slate-200">
                    Telefono / WhatsApp <span className="font-normal text-slate-400">(opcional)</span>
                  </label>
                  <input
                    id="register-phone"
                    type="text"
                    value={regPhone}
                    onChange={(e) => setRegPhone(e.target.value)}
                    placeholder="0991234567"
                    className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/30 transition-colors"
                  />
                </div>

                {/* LOPDP: consentimiento expreso, informado y no premarcado para tratar nombre, correo y cédula. */}
                <label htmlFor="register-consent" className="flex items-start gap-3 text-[11px] leading-relaxed text-slate-600 dark:text-slate-300 cursor-pointer">
                  <input
                    id="register-consent"
                    type="checkbox"
                    checked={regConsent}
                    onChange={(e) => setRegConsent(e.target.checked)}
                    required
                    className="mt-0.5 w-4 h-4 shrink-0 accent-emerald-500"
                  />
                  <span>
                    Acepto los{" "}
                    <button type="button" onClick={(e) => { e.preventDefault(); setPolitica("/terminos"); }} className="text-orange-400 underline hover:text-orange-300">Términos y condiciones</button>{" "}
                    y autorizo el tratamiento de mis datos personales, necesarios para mi cuenta, según la{" "}
                    <button type="button" onClick={(e) => { e.preventDefault(); setPolitica("/privacidad"); }} className="text-orange-400 underline hover:text-orange-300">Política de privacidad</button>.
                  </span>
                </label>

                {politica && (
                  <div role="dialog" aria-modal="true" aria-label="Política" className="fixed inset-0 z-[70] bg-black/60 flex items-center justify-center p-3">
                    <div className="w-full max-w-3xl h-[85vh] rounded-2xl overflow-hidden bg-white dark:bg-[#0e1620] flex flex-col shadow-2xl">
                      <iframe src={politica} title="Política" className="flex-1 w-full border-0" />
                      <div className="p-3 flex gap-2 justify-end border-t border-slate-200 dark:border-white/10">
                        <button type="button" onClick={() => setPolitica(null)} className="px-4 py-2 rounded-xl border border-slate-300 dark:border-white/20 text-xs font-bold active:scale-95">Cerrar</button>
                        <button type="button" onClick={() => { setRegConsent(true); setPolitica(null); }} className="px-4 py-2 rounded-xl bg-emerald-500 text-white text-xs font-bold active:scale-95">He leído y acepto</button>
                      </div>
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={regLoading || !regConsent || !publicIntakeAvailable}
                  className="w-full py-3.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold transition-all shadow-md shadow-emerald-500/20 flex items-center justify-center gap-2 cursor-pointer active:scale-95 disabled:opacity-50"
                >
                  {regLoading ? (
                    <span>Creando cuenta...</span>
                  ) : (
                    <>
                      <UserPlus className="w-4 h-4" />
                      <span>Crear Cuenta Gratis</span>
                    </>
                  )}
                </button>
              </form>

              <div className="pt-2 text-center">
                <p className="text-[11px] text-slate-500">
                  Ya tienes cuenta?{" "}
                  <button
                    onClick={() => switchTab("login")}
                    className="text-orange-400 font-bold hover:text-orange-300 hover:underline cursor-pointer"
                  >
                    Inicia sesion
                  </button>
                </p>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
