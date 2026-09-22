"use client";

import { Search, ChevronLeft, ChevronRight, Download, Users, ShieldCheck, FileText, Activity as ActivityIcon } from "lucide-react";
import { clients, policies, documents } from "../lib/mock";
import { Badge } from "./ui";

export function Dashboard({ go }: { go: (s: string) => void }) {
  const vencidas = policies.filter((p) => p.status === "Vencida").length;
  const inconsistentes = clients.filter((c) => c.status === "Inconsistente").length;
  const pendientes = documents.filter((d) => d.status === "Pendiente").length;
  const date = new Date().toLocaleDateString("es-AR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const kpis = [
    ["Clientes", String(clients.length), "/clientes", "Cartera activa", Users],
    ["Pólizas", String(policies.length), "/polizas", `${vencidas} vencidas`, ShieldCheck],
    ["Documentos", String(documents.length), "/documentos", `${pendientes} pendientes`, FileText],
    ["Actividad", "24", "/actividad", "Eventos recientes", ActivityIcon],
  ] as const;

  return (
    <>
      <div className="mb-7">
        <p className="text-sm text-mute capitalize">{date}</p>
        <h2 className="text-[26px] font-semibold tracking-tight text-ink mt-1">Buen día, productor</h2>
      </div>
      <div className="kpi-row mb-6">
        {kpis.map(([label, value, href, hint, Icon]) => (
          <button className="card p-5 text-left hover:border-teal/40" key={label} onClick={() => go(href)}>
            <div className="flex items-center justify-between mb-5">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-teal/10 text-teal">
                <Icon size={16} />
              </span>
            </div>
            <div className="text-[12px] text-mute">{label}</div>
            <div className="text-[30px] font-semibold tracking-tight text-ink mt-0.5 tabular-nums">{value}</div>
            <div className="text-[12px] text-mute mt-1">{hint}</div>
          </button>
        ))}
      </div>
      <div className="grid lg:grid-cols-2 gap-4">
        <div className="card p-6">
          <h3 className="text-sm font-semibold text-ink mb-2">Casos de desarrollo</h3>
          <p className="text-sm text-mute leading-relaxed">
            Datos consistentes e inconsistentes incluidos para probar validaciones, estados y persistencia local.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Badge status="warn">{inconsistentes} inconsistentes</Badge>
            <Badge status="bad">{vencidas} vencidas</Badge>
            <Badge>{pendientes} docs pendientes</Badge>
          </div>
        </div>
        <div className="card p-6">
          <h3 className="text-sm font-semibold text-ink mb-3">Atajos</h3>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              ["/documentos", "Buscar documentos"],
              ["/polizas", "Revisar renovaciones"],
              ["/clientes", "Ver cartera"],
              ["/actividad", "Auditoría local"],
            ].map(([href, label]) => (
              <button key={href} className="btn btn-outline justify-between" onClick={() => go(href)}>
                {label}
                <span className="text-mute">→</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export function Clients() {
  return (
    <DataTable
      title="Clientes"
      headers={["ID", "Nombre", "Documento", "Contacto", "Pólizas", "Estado"]}
      rows={clients.map((c) => [
        c.id,
        c.name,
        c.doc,
        c.email,
        c.policies,
        <Badge key={c.id} status={c.status === "Inconsistente" ? "warn" : "ok"}>
          {c.status}
        </Badge>,
      ])}
    />
  );
}

export function Policies() {
  return (
    <DataTable
      title="Pólizas"
      headers={["Póliza", "Asegurado", "Producto", "Prima", "Estado", "Renovación"]}
      rows={policies.map((p) => [
        p.id,
        p.client,
        p.product,
        `$ ${p.premium.toLocaleString("es-AR")}`,
        <Badge key={p.id} status={p.status === "Vencida" ? "bad" : p.status === "Suspendida" ? "warn" : "ok"}>
          {p.status}
        </Badge>,
        p.renewal,
      ])}
    />
  );
}

function DataTable({ title, headers, rows }: { title: string; headers: string[]; rows: any[][] }) {
  return (
    <>
      <div className="flex items-baseline gap-2 mb-4">
        <h2 className="text-[18px] font-semibold text-ink">{title}</h2>
        <span className="text-sm text-mute">{rows.length}</span>
      </div>
      <div className="card table-wrap">
        <table className="w-full text-sm">
          <thead className="bg-[#faf7f2] text-left">
            <tr>
              {headers.map((h) => (
                <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-mute" key={h}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr className="border-t border-[#eee8dc] hover:bg-[#faf7f2]" key={i}>
                {r.map((v, j) => (
                  <td className="px-4 py-3.5 text-ink" key={j}>
                    {v}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export function Documents({
  docs,
  total,
  q,
  setQ,
  filter,
  setFilter,
  page,
  setPage,
  downloaded,
  mark,
}: {
  docs: any[];
  total: number;
  q: string;
  setQ: (s: string) => void;
  filter: string;
  setFilter: (s: string) => void;
  page: number;
  setPage: (n: number) => void;
  downloaded: string[];
  mark: (id: string) => void;
}) {
  return (
    <>
      <div className="flex flex-wrap justify-between items-center gap-3 mb-4">
        <div>
          <h2 className="text-[18px] font-semibold text-ink">Documentos</h2>
          <p className="text-sm text-mute">{total} documentos · paginación de 10</p>
        </div>
        <a className="btn btn-primary" href="/api/documents/DOC-0001/download" download>
          <Download size={15} />
          Descargar ejemplo
        </a>
      </div>
      <div className="card p-3 mb-4 flex flex-wrap gap-2 items-center">
        <div className="relative">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-mute" />
          <input
            className="input pl-9 min-w-[220px] h-10"
            placeholder="Buscar..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
            data-testid="documents-search"
          />
        </div>
        {["Todos", "Póliza", "Certificado", "Endoso", "Recibo", "Renovación"].map((f) => (
          <button
            key={f}
            className={`btn text-[13px] h-9 ${filter === f ? "btn-primary" : "btn-outline"}`}
            data-testid={`filter-${f}`}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>
      <div className="card overflow-auto">
        <table className="w-full text-sm">
          <thead className="bg-[#faf7f2] text-left">
            <tr>
              {["Documento", "Tipo", "Fecha", "Estado", "Acción"].map((x) => (
                <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-mute" key={x}>
                  {x}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {docs.map((d) => (
              <tr className="border-t border-[#eee8dc] hover:bg-[#faf7f2]" key={d.id}>
                <td className="px-4 py-3.5 font-medium text-ink">
                  {d.name}
                  <div className="text-[12px] text-mute font-normal">{d.id}</div>
                </td>
                <td className="px-4 py-3.5">{d.type}</td>
                <td className="px-4 py-3.5 tabular-nums">{d.date}</td>
                <td className="px-4 py-3.5">
                  <Badge status={d.status === "Pendiente" && !downloaded.includes(d.id) ? "warn" : "ok"}>
                    {downloaded.includes(d.id) ? "Descargado" : d.status}
                  </Badge>
                </td>
                <td className="px-4 py-3.5">
                  <a
                    className="btn btn-outline text-xs h-8"
                    href={`/api/documents/${d.id}/download`}
                    download
                    onClick={() => mark(d.id)}
                    data-testid={`download-${d.id}`}
                  >
                    Descargar
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!docs.length && <div className="p-8 text-center text-mute">Sin resultados</div>}
        <div className="px-4 py-3 border-t border-[#eee8dc] flex justify-between items-center">
          <span className="text-sm text-mute">Mostrando {docs.length} de {total}</span>
          <div className="flex gap-2 items-center">
            <button className="btn btn-outline h-8 w-8 p-0" disabled={page === 1} onClick={() => setPage(page - 1)}>
              <ChevronLeft size={15} />
            </button>
            <span className="text-sm tabular-nums">Página {page}</span>
            <button className="btn btn-outline h-8 w-8 p-0" disabled={page * 10 >= total} onClick={() => setPage(page + 1)}>
              <ChevronRight size={15} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export function Activity() {
  const events = [
    "Inicio de sesión exitoso",
    "Documento DOC-0001 descargado",
    "Filtro de documentos aplicado: Póliza",
    "Consulta de póliza POL-2024-00100",
    "Simulación activada",
  ];
  return (
    <>
      <h2 className="text-[18px] font-semibold text-ink mb-4">Actividad</h2>
      <div className="card divide-y divide-[#eee8dc]">
        {events.map((e, i) => (
          <div className="px-4 py-3.5 flex justify-between gap-4" key={e}>
            <span>
              <div className="text-sm font-medium text-ink">{e}</div>
              <div className="text-[12px] text-mute mt-0.5">Operación local de demostración</div>
            </span>
            <span className="text-[12px] text-mute whitespace-nowrap">Hace {i * 7 + 2} min</span>
          </div>
        ))}
      </div>
    </>
  );
}
