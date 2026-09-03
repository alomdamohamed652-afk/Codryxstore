export type BotModuleType = "general" | "channels" | "roles" | "automod" | "logs" | "commands" | "tickets" | "giveaways" | "store";
export type BotModule = { key:string; label:string; description:string; type:BotModuleType; enabled:boolean };

export const DEFAULT_BOT_MODULES: BotModule[] = [
 {key:"general",label:"General",description:"Core bot settings",type:"general",enabled:true},
 {key:"channels",label:"Channels",description:"Choose Discord channels used by the bot",type:"channels",enabled:true},
 {key:"roles",label:"Roles",description:"Assign roles used by bot features",type:"roles",enabled:true},
 {key:"automod",label:"Auto Moderation",description:"Configure moderation and protection",type:"automod",enabled:true},
 {key:"logs",label:"Logs",description:"Configure audit and action logs",type:"logs",enabled:true},
 {key:"commands",label:"Commands",description:"Configure commands and permissions",type:"commands",enabled:true},
];

export const TICKETS_BOT_MODULES: BotModule[] = [
 {key:"general",label:"General",description:"Core bot settings",type:"general",enabled:true},
 {key:"channels",label:"Channels",description:"Ticket panel and transcript channels",type:"channels",enabled:true},
 {key:"roles",label:"Staff Roles",description:"Roles allowed to manage tickets",type:"roles",enabled:true},
 {key:"tickets",label:"Tickets",description:"Panels, categories and ticket behavior",type:"tickets",enabled:true},
 {key:"logs",label:"Transcripts & Logs",description:"Ticket transcripts and activity logs",type:"logs",enabled:true},
];