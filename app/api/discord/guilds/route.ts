import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const token=request.cookies.get("codryx_discord_access")?.value;
  if(!token) return NextResponse.json({ok:false,error:"Discord login required"},{status:401});
  const r=await fetch("https://discord.com/api/v10/users/@me/guilds",{headers:{Authorization:"Bearer "+token},cache:"no-store"});
  if(!r.ok) return NextResponse.json({ok:false,error:"Discord session expired"},{status:401});
  const guilds=await r.json();
  return NextResponse.json({ok:true,guilds});
}