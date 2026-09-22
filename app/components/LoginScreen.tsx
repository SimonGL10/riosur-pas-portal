"use client";

import type { FormEvent } from "react";
import { BrandMark } from "./ui";

type Props = {
  email: string;
  pass: string;
  err: string;
  setEmail: (v: string) => void;
  setPass: (v: string) => void;
  login: () => void;
};

export default function LoginScreen({ email, pass, err, setEmail, setPass, login }: Props) {
  function onSubmit(e: FormEvent) {
    e.preventDefault();
    login();
  }

  return (
    <div className="login-bg">
      <form className="card w-full max-w-[420px] p-9" onSubmit={onSubmit}>
        <div className="flex items-center gap-3 mb-8">
          <BrandMark size="lg" />
          <div>
            <h1 className="text-lg font-semibold tracking-tight text-ink">RíoSur Seguros</h1>
            <p className="text-sm text-mute">Portal de productores asesores</p>
          </div>
        </div>
        <h2 className="text-[22px] font-semibold tracking-tight text-ink mb-1">Ingresar</h2>
        <p className="text-sm text-mute mb-6">Accedé con tu cuenta de demostración.</p>
        <label className="block text-[13px] font-medium text-ink">
          Email
          <input
            className="input w-full mt-1.5 mb-4"
            data-testid="login-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="username"
          />
        </label>
        <label className="block text-[13px] font-medium text-ink">
          Contraseña
          <input
            type="password"
            className="input w-full mt-1.5 mb-4"
            data-testid="login-password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            autoComplete="current-password"
          />
        </label>
        {err && (
          <div className="bg-red-50 text-red-700 rounded-lg px-3 py-2.5 mb-4 text-sm" data-testid="login-error">
            {err}
          </div>
        )}
        <button className="btn btn-primary w-full h-11" data-testid="login-submit" type="submit">
          Ingresar
        </button>
        <p className="text-xs text-mute mt-5">Demo: productor@riosurseguros.demo / Demo2026!</p>
      </form>
    </div>
  );
}
