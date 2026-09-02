export type BotAccessMode = "everyone" | "authorized" | "closed" | "maintenance";

export type GuildBotSettings = {
  enabled?: boolean;
  channels?: {
    logs?: string | null;
    welcome?: string | null;
    alerts?: string | null;
    commands?: string | null;
    tickets?: string | null;
  };
  roles?: {
    admin?: string | null;
    moderator?: string | null;
    support?: string | null;
  };
  features?: Record<string, boolean>;
  commandPermissions?: Record<string, string[]>;
};

export type SaveGuildBotSettingsInput = {
  botId: string;
  guildId: string;
  settings: GuildBotSettings;
};

export type DiscordGuildChannel = { id: string; name: string; type: number };
export type DiscordGuildRole = { id: string; name: string; position: number };
export type DiscordGuild = { id: string; name: string; icon: string | null; owner_id?: string };