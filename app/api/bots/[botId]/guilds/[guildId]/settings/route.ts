import { NextResponse } from "next/server";
import type { GuildBotSettings, SaveGuildBotSettingsInput } from "@/lib/config-contract";

export async function GET(_request: Request, { params }: { params: Promise<{ botId: string; guildId: string }> }) {
  const { botId, guildId } = await params;
  return NextResponse.json({ ok: true, botId, guildId, settings: {} satisfies GuildBotSettings, source: "database-pending" });
}

export async function PUT(request: Request, { params }: { params: Promise<{ botId: string; guildId: string }> }) {
  const { botId, guildId } = await params;
  const body = (await request.json()) as Partial<SaveGuildBotSettingsInput>;
  if (!body.settings || typeof body.settings !== "object") {
    return NextResponse.json({ ok: false, error: "Invalid settings payload" }, { status: 400 });
  }
  return NextResponse.json({ ok: true, botId, guildId, settings: body.settings, source: "database-pending" });
}