const API = "https://discord.com/api/v10";

export async function discordRequest<T>(path: string, token: string, init: RequestInit = {}): Promise<T> {
  const response = await fetch(API + path, {
    ...init,
    headers: {
      Authorization: "Bot " + token,
      "Content-Type": "application/json",
      ...(init.headers || {}),
    },
    cache: "no-store",
  });
  if (!response.ok) throw new Error("Discord API " + response.status + ": " + await response.text());
  return response.json() as Promise<T>;
}

export function getGuildChannels(guildId: string, botToken: string) {
  return discordRequest("/guilds/" + guildId + "/channels", botToken);
}

export function getGuildRoles(guildId: string, botToken: string) {
  return discordRequest("/guilds/" + guildId + "/roles", botToken);
}