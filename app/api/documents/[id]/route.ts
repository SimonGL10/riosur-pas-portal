import {documents,pdf} from "../../../lib/mock";
export async function GET(_:Request,{params}:{params:{id:string}}){const d=documents.find(x=>x.id===params.id);if(!d)return new Response("Not found",{status:404});return new Response(pdf(`RíoSur Seguros - ${d.name}`),{headers:{"Content-Type":"application/pdf","Content-Disposition":`inline; filename=${d.id}.pdf`}})}
