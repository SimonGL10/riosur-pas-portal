import {NextResponse} from "next/server"; import {clients} from "../../lib/mock";
export async function GET(){return NextResponse.json({data:clients,total:clients.length})}


