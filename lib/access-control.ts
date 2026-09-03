import type { BotAccessMode } from "./config-contract";

export type AccessDecision = { allowed:boolean; reason:"everyone"|"authorized"|"closed"|"maintenance"|"inactive" };

export function canAccessBot(mode:BotAccessMode, authorized:boolean, active=true):AccessDecision {
  if(!active) return {allowed:false,reason:"inactive"};
  if(mode==="maintenance") return {allowed:false,reason:"maintenance"};
  if(mode==="closed") return {allowed:false,reason:"closed"};
  if(mode==="everyone") return {allowed:true,reason:"everyone"};
  return authorized ? {allowed:true,reason:"authorized"} : {allowed:false,reason:"authorized"};
}

export type AdminAccessAction="open_all"|"close_all"|"open_existing"|"close_existing";

export function applyGlobalAccessAction(current:BotAccessMode,action:AdminAccessAction):BotAccessMode {
  if(action==="open_all") return "everyone";
  if(action==="close_all") return "closed";
  if(action==="open_existing") return "authorized";
  if(action==="close_existing") return "closed";
  return current;
}