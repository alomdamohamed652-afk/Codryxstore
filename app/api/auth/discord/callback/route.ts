import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const code = new URL(request.url).searchParams.get("code");
  if (!code) return NextResponse.json({ok:false,error:"Missing OAuth code"}, {status:400});
  if (!process.env.DISCORD_CLIENT_ID || !process.env.DISCORD_CLIENT_SECRET || !process.env.DISCORD_REDIRECT_URI) {
    return NextResponse.json({ok:false,error:"Discord OAuth environment variables are not configured"}, {status:500});
  }
  const body = new URLSearchParams({
    client_id: process.env.DISCORD_CLIENT_ID,
    client_secret: process.env.DISCORD_CLIENT_SECRET,
    grant_type: "authorization_code",
    code,
    redirect_uri: process.env.DISCORD_REDIRECT_URI,
  });
  const tokenResponse = await fetch("https://discord.com/api/v10/oauth2/token", {
    method:"POST", headers:{"Content-Type":"application/x-www-form-urlencoded"}, body, cache:"no-store"
  });
  if (!tokenResponse.ok) return NextResponse.json({ok:false,error:"Discord token exchange failed"}, {status:502});
  const token = await tokenResponse.json();
  const meResponse = await fetch("https://discord.com/api/v10/users/@me", {
    headers:{Authorization: "Bearer " + token.access_token}, cache:"no-store"
  });
  const guildsResponse = await fetch("https://discord.com/api/v10/users/@me/guilds", {
    headers:{Authorization: "Bearer " + token.access_token}, cache:"no-store"
  });
  if (!meResponse.ok || !guildsResponse.ok) return NextResponse.json({ok:false,error:"Failed to load Discord account"}, {status:502});
  const user = await meResponse.json();
  const guilds = await guildsResponse.json();
  const response = NextResponse.redirect(new URL("/dashboard", request.url));
  response.cookies.set("codryx_discord_access", token.access_token, {httpOnly:true,secure:true,sameSite:"lax",path:"/",maxAge:token.expires_in || 604800});
  response.cookies.set("codryx_discord_user", JSON.stringify({id:user.id,username:user.username,avatar:user.avatar,guilds}), {httpOnly:true,secure:true,sameSite:"lax",path:"/",maxAge:token.expires_in || 604800});
  return response;
}