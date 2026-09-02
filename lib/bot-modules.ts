export type BotModule =
  | "overview"
  | "general"
  | "channels"
  | "roles"
  | "automod"
  | "logs"
  | "tickets"
  | "commands"
  | "permissions";

export type ChannelSetting = {
  key: string;
  label: string;
  description: string;
  value: string;
};

export type BotDefinition = {
  slug: string;
  name: string;
  modules: BotModule[];
};

export const botDefinitions: Record<string, BotDefinition> = {
  "codryx-moderation": {
    slug: "codryx-moderation",
    name: "CODRYX Moderation",
    modules: ["overview", "general", "channels", "roles", "automod", "logs", "commands", "permissions"],
  },
  "codryx-tickets": {
    slug: "codryx-tickets",
    name: "CODRYX Tickets",
    modules: ["overview", "general", "channels", "roles", "tickets", "logs", "commands", "permissions"],
  },
  "codryx-giveaway": {
    slug: "codryx-giveaway",
    name: "CODRYX Giveaway",
    modules: ["overview", "general", "channels", "roles", "logs", "commands", "permissions"],
  },
};