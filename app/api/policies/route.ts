import {NextResponse} from "next/server"; import {policies} from "../../lib/mock";
export async function GET(){return NextResponse.json({data:policies,total:policies.length})}


