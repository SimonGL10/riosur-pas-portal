import {NextResponse} from "next/server"; import {documents} from "../../lib/mock";
export async function GET(){return NextResponse.json({data:documents,total:documents.length})}


