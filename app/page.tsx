"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { documents } from "./lib/mock";
import LoginScreen from "./components/LoginScreen";
import AppShell, { routes } from "./components/AppShell";
import { Activity, Clients, Dashboard, Documents, Policies } from "./components/views";

export default function Portal() {
  const path = usePathname();
  const router = useRouter();
  const [auth, setAuth] = useState(false);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState("Todos");
  const [page, setPage] = useState(1);
  const [downloaded, setDownloaded] = useState<string[]>([]);

  useEffect(() => {
    setAuth(localStorage.getItem("rs-auth") === "1");
    setDownloaded(JSON.parse(localStorage.getItem("rs-downloaded") || "[]"));
  }, []);

  function login() {
    if (email === "productor@riosurseguros.demo" && pass === "Demo2026!") {
      localStorage.setItem("rs-auth", "1");
      setAuth(true);
      router.push("/dashboard");
    } else setErr("Credenciales inválidas. Verificá email y contraseña.");
  }

  function logout() {
    localStorage.removeItem("rs-auth");
    setAuth(false);
    router.push("/");
  }

  function mark(id: string) {
    const next = Array.from(new Set(downloaded.concat(id)));
    setDownloaded(next);
    localStorage.setItem("rs-downloaded", JSON.stringify(next));
  }

  if (!auth) {
    return (
      <LoginScreen
        email={email}
        pass={pass}
        setEmail={setEmail}
        setPass={setPass}
        err={err}
        login={login}
      />
    );
  }

  const title =
    routes.find((x) => x[0] === path)?.[1] ||
    (path === "/clientes"
      ? "Clientes"
      : path === "/polizas"
        ? "Pólizas"
        : path === "/documentos"
          ? "Documentos"
          : path === "/actividad"
            ? "Actividad"
            : "Inicio");
  const docs = documents.filter(
    (d) => (filter === "Todos" || d.type === filter) && d.name.toLowerCase().includes(q.toLowerCase())
  );
  const visible = docs.slice((page - 1) * 10, page * 10);
  const go = (p: string) => router.push(p);

  return (
    <AppShell path={path} title={title} onNavigate={go} onLogout={logout}>
      {path === "/documentos" ? (
        <Documents
          docs={visible}
          total={docs.length}
          q={q}
          setQ={(v) => {
            setQ(v);
            setPage(1);
          }}
          filter={filter}
          setFilter={(v) => {
            setFilter(v);
            setPage(1);
          }}
          page={page}
          setPage={setPage}
          downloaded={downloaded}
          mark={mark}
        />
      ) : path === "/clientes" ? (
        <Clients />
      ) : path === "/polizas" ? (
        <Policies />
      ) : path === "/actividad" ? (
        <Activity />
      ) : (
        <Dashboard go={go} />
      )}
    </AppShell>
  );
}


