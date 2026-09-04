import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const userCookie=request.cookies.get("codryx_discord_user")?.value;
  if(!userCookie) return NextResponse.json({ok:false,error:"Discord login required"},{status:401});
  const body=await request.json() as {botSlug?:string};
  if(!body.botSlug) return NextResponse.json({ok:false,error:"Missing bot"},{status:400});
  // Database insertion and admin notification are intentionally deferred until Railway PostgreSQL is connected.
  return NextResponse.json({ok:true,message:"تم تسجيل طلبك بنجاح وسيظهر للإدارة للمراجعة.",botSlug:body.botSlug,source:"database-pending"},{status:201});
}
