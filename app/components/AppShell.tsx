"use client";

import { useState, type ReactNode } from "react";
import {
  LayoutDashboard,
  Users,
  ShieldCheck,
  FileText,
  Activity as ActivityIcon,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { BrandMark } from "./ui";

export const routes = [
  ["/dashboard", "Inicio", LayoutDashboard],
  ["/clientes", "Clientes", Users],
  ["/polizas", "Pólizas", ShieldCheck],
  ["/documentos", "Documentos", FileText],
  ["/actividad", "Actividad", ActivityIcon],
] as const;

export const extra = ["Endosos", "Recibos", "Renovaciones", "Siniestros", "Comisiones", "Simulación"];

type Props = {
  path: string;
  title: string;
  onNavigate: (href: string) => void;
  onLogout: () => void;
  children: ReactNode;
};

export default function AppShell({ path, title, onNavigate, onLogout, children }: Props) {
  const [open, setOpen] = useState(false);

  function go(href: string) {
    setOpen(false);
    onNavigate(href);
  }

  const nav = (
    <div className="flex flex-col h-full">
      <div className="flex gap-2.5 items-center px-2 mb-8">
        <BrandMark size="sm" />
        <div>
          <div className="text-sm font-semibold text-white leading-tight">RíoSur Seguros</div>
          <div className="text-[11px] text-stone-500">Portal PAS</div>
        </div>
      </div>
      <p className="px-3 mb-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-stone-500">Principal</p>
      <nav className="space-y-0.5">
        {routes.map(([href, label, Icon]) => (
          <a
            key={href}
            href={href}
            className={path === href ? "active" : ""}
            data-testid={`nav-${label.toLowerCase()}`}
            onClick={(e) => {
              e.preventDefault();
              go(href);
            }}
          >
            <Icon size={16} />
            {label}
          </a>
        ))}
      </nav>
      <p className="px-3 mt-7 mb-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-stone-500">Operaciones</p>
      <nav className="space-y-0.5">
        {extra.map((x) => (
          <a key={x} href="#" onClick={(e) => e.preventDefault()} className="w-full justify-between">
            <span>{x}</span>
            <span className="text-[10px] text-stone-500">Pronto</span>
          </a>
        ))}
      </nav>
      <div className="mt-auto mx-1 rounded-xl bg-white/5 p-3">
        <div className="text-[11px] text-stone-400">Sesión local</div>
        <div className="text-xs text-stone-300 mt-0.5 truncate">productor@riosurseguros.demo</div>
      </div>
    </div>
  );

  return (
    <div className="app-shell">
      <aside className="sidebar app-sidebar">{nav}</aside>
      {open && (
        <div className="fixed inset-0 z-40 md:hidden">
          <button className="absolute inset-0 bg-black/40" aria-label="Cerrar menú" onClick={() => setOpen(false)} />
          <aside className="sidebar relative z-50 h-full w-[232px] p-4 overflow-auto flex flex-col">{nav}</aside>
        </div>
      )}
      <main className="app-main">
        <header className="app-header">
          <div className="flex items-center gap-3">
            <button className="btn btn-outline md:hidden px-2.5 h-9" onClick={() => setOpen(true)} aria-label="Abrir menú">
              {open ? <X size={16} /> : <Menu size={16} />}
            </button>
            <div>
              <div className="text-[11px] text-mute">Portal de productor</div>
              <h1 className="text-[17px] font-semibold text-ink leading-tight">{title}</h1>
            </div>
          </div>
          <div className="flex gap-3 items-center">
            <div className="hidden sm:block text-right">
              <div className="text-sm font-medium text-ink">Productor demo</div>
              <div className="text-[11px] text-mute">productor@riosurseguros.demo</div>
            </div>
            <button className="btn btn-outline h-9 w-9 p-0" data-testid="logout" onClick={onLogout} aria-label="Salir">
              <LogOut size={15} />
            </button>
          </div>
        </header>
        <div className="app-content">
          {children}
          <footer className="mt-10 pt-5 border-t border-[#e7e1d6] text-[11px] text-mute flex justify-between gap-4">
            <span>RíoSur Seguros · Portal PAS</span>
            <span>Entorno local de demostración · v1.0</span>
          </footer>
        </div>
      </main>
    </div>
  );
}
