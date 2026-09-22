export type Client={id:string;name:string;doc:string;email:string;phone:string;policies:number;status:string};
export type Policy={id:string;client:string;product:string;premium:number;status:string;renewal:string};
export type Document={id:string;name:string;type:string;date:string;status:string;policyId:string};
const names=["María González","Taller Norte S.A.","Carlos Méndez","Lucía Fernández","Federico Romero","Ana Belén Soto","Grupo Andino SRL","Patricia Díaz","Jorge Acosta","Natalia Peralta","Estudio Delta","Martín Cabrera","Sofía Núñez","Cooperativa Sur","Diego Varela","Paula Benítez","Logística Río","Elena Ortiz","Ricardo Silva","Micaela Torres","Hugo Molina","Claudia Reyes","Metalúrgica Oeste","Valentina Paz","Germán Ríos","Inés Campos","Servicios Marea","Tomás Vega","Laura Ibarra","Comercial La Plaza"];
export const clients:Client[]=names.map((name,i)=>({id:`CLI-${String(i+1).padStart(3,"0")}`,name,doc:i%3===0?`30-${String(70000000+i*17321)}-9`:`${20+i}.${String(100000+i*321).padStart(6,"0")}`,email:`contacto${i+1}@demo.riosur.test`,phone:`11 ${String(4000+i*137).slice(-4)}-${String(1000+i*71).slice(-4)}`,policies:(i%5)+1,status:i===2||i===17?"Inconsistente":"Activo"}));
const products=["Auto Todo Riesgo","Integral Comercio","Hogar Plus","Vida Individual","ART Pyme","Accidentes Personales"];
export const policies:Policy[]=Array.from({length:48},(_,i)=>({id:`POL-${2024+i%3}-${String(100+i).padStart(5,"0")}`,client:clients[i%clients.length].name,product:products[i%products.length],premium:28500+(i*2175)%145000,status:i%11===0?"Vencida":i%13===0?"Suspendida":"Vigente",renewal:`${String((i%27)+1).padStart(2,"0")}/${String((i%9)+1).padStart(2,"0")}/2026`}));
const types=["Póliza","Certificado","Endoso","Recibo","Renovación"];
export const documents:Document[]=Array.from({length:50},(_,i)=>({id:`DOC-${String(i+1).padStart(4,"0")}`,name:`${types[i%5]} ${policies[i%policies.length].id}`,type:types[i%5],date:`${String((i%28)+1).padStart(2,"0")}/09/2026`,status:i%7===0?"Pendiente":i%4===0?"Descargado":"Disponible",policyId:policies[i%policies.length].id}));
export function pdf(text:string){
  const line1 = text.replace(/[^\x20-\x7E]/g, "?");
  const line2 = "Made By Simon";
  const stream = `BT /F1 16 Tf 72 720 Td (${line1}) Tj 0 -28 Td /F1 14 Tf (${line2}) Tj ET`;
  return `%PDF-1.4
1 0 obj<< /Type /Catalog /Pages 2 0 R >>endobj
2 0 obj<< /Type /Pages /Kids [3 0 R] /Count 1 >>endobj
3 0 obj<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>endobj
4 0 obj<< /Length ${stream.length} >>stream
${stream}
endstream endobj
5 0 obj<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>endobj
trailer<< /Root 1 0 R >>
%%EOF`;
}
