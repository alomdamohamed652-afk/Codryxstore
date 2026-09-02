"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Activity, ArrowRight, Bell, Bot, Check, ChevronDown, Hash, LayoutDashboard, Lock, MessageSquare, Radio, RefreshCw, Save, Settings2, Shield, SlidersHorizontal, Users, Wrench } from "lucide-react";
import { botDefinitions } from "@/lib/bot-modules";

const servers = [
  { id: "demo-1", name: "CODRYX Community", icon: "C" },
  { id: "demo-2", name: "Gaming Hub", icon: "G" },
  { id: "demo-3", name: "Friends Server", icon: "F" },
];

const channels = [
  { id: "none", name: "اختار روم..." },
  { id: "general", name: "#・general" },
  { id: "logs", name: "#・logs" },
  { id: "mod-log", name: "#・mod-logs" },
  { id: "welcome", name: "#・welcome" },
];

const roles = ["اختار رول...", "@everyone", "Moderator", "Admin", "Support Team"];

export default function BotDashboard({ params }: { params: Promise<{ slug: string }> }) {
  const [slug, setSlug] = useState("codryx-moderation");
  const [server, setServer] = useState(servers[0].id);
  const [section, setSection] = useState("overview");
  const [saved, setSaved] = useState(false);
  const bot = botDefinitions[slug] ?? botDefinitions["codryx-moderation"];

  const serverName = useMemo(() => servers.find(s => s.id === server)?.name ?? "Server", [server]);

  const save = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 1800);
  };

  const moduleItems = [
    ["overview", "Overview", LayoutDashboard],
    ["general", "الإعدادات العامة", Settings2],
    ["channels", "الرومات", Hash],
    ["roles", "الرولات", Users],
    ...(bot.modules.includes("automod") ? [["automod", "Auto Moderation", Shield]] : []),
    ...(bot.modules.includes("tickets") ? [["tickets", "Tickets", MessageSquare]] : []),
    ["logs", "Logs", Activity],
    ["commands", "الأوامر", SlidersHorizontal],
    ["permissions", "الصلاحيات", Lock],
  ] as const;

  return (
    <main className="dash-shell">
      <header className="dash-topbar">
        <Link href="/" className="brand"><span className="brand-mark">X</span><span>CODRYX</span></Link>
        <div className="dash-top-actions">
          <span className="bot-online"><i /> {bot.name}</span>
          <button className="icon-btn"><Bell size={18} /></button>
        </div>
      </header>

      <div className="dash-layout">
        <aside className="dash-sidebar">
          <Link href="/" className="dash-back"><ArrowRight size={15} /> المتجر</Link>

          <div className="server-picker">
            <small>السيرفر الحالي</small>
            <div className="server-select">
              <div className="server-avatar">{servers.find(s => s.id === server)?.icon}</div>
              <select value={server} onChange={e => setServer(e.target.value)}>
                {servers.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
              </select>
              <ChevronDown size={15} />
            </div>
          </div>

          <div className="bot-switcher">
            <small>البوت</small>
            <select value={slug} onChange={e => { setSlug(e.target.value); setSection("overview"); }}>
              {Object.values(botDefinitions).map(b => <option key={b.slug} value={b.slug}>{b.name}</option>)}
            </select>
          </div>

          <div className="dash-nav">
            {moduleItems.map(([id, label, Icon]) => (
              <button key={id} className={section === id ? "dash-nav-active" : ""} onClick={() => setSection(id)}>
                <Icon size={17} /> {label}
              </button>
            ))}
          </div>
        </aside>

        <section className="dash-main">
          <div className="dash-heading">
            <div>
              <span className="eyebrow">SERVER CONFIGURATION</span>
              <h1>{section === "overview" ? "نظرة عامة" : moduleItems.find(x => x[0] === section)?.[1]}</h1>
              <p>{bot.name} · {serverName}</p>
            </div>
            <button className="save-btn" onClick={save}>{saved ? <><Check size={17}/> تم الحفظ</> : <><Save size={17}/> حفظ التغييرات</>}</button>
          </div>

          {section === "overview" && <div className="dash-grid">
            <div className="dash-stat"><Radio size={19}/><span>حالة البوت</span><b>Online</b><small>متصل بالسيرفر</small></div>
            <div className="dash-stat"><Hash size={19}/><span>الرومات</span><b>24</b><small>يمكن للبوت الوصول إليها</small></div>
            <div className="dash-stat"><Users size={19}/><span>الأعضاء</span><b>1,842</b><small>في السيرفر</small></div>
            <div className="dash-stat"><Wrench size={19}/><span>Modules</span><b>{bot.modules.length}</b><small>متاحة لهذا البوت</small></div>

            <div className="dash-panel wide-panel">
              <div className="dash-panel-title"><div><b>إعداد سريع</b><small>أكثر الإعدادات استخدامًا</small></div><RefreshCw size={17}/></div>
              <ConfigRow label="روم الـ Logs" description="المكان الذي يرسل إليه البوت سجلات الأحداث." value="logs" />
              <ConfigRow label="رول الإدارة" description="الرول المسموح له باستخدام أوامر الإدارة." value="Moderator" />
              <ConfigRow label="روم الترحيب" description="الروم المخصص لرسائل الترحيب." value="welcome" />
            </div>
          </div>}

          {section === "channels" && <ConfigPanel title="تخصيص الرومات" description="حدد الرومات التي يستخدمها البوت داخل هذا السيرفر.">
            <ConfigRow label="روم الـ Logs" description="كل أحداث البوت الإدارية." value="logs" />
            <ConfigRow label="روم الترحيب" description="رسائل دخول الأعضاء الجدد." value="welcome" />
            <ConfigRow label="روم التنبيهات" description="تنبيهات الإدارة والمخالفات." value="mod-log" />
            <ConfigRow label="روم الأوامر" description="الروم المسموح فيه بأوامر البوت." value="general" />
          </ConfigPanel>}

          {section === "roles" && <ConfigPanel title="الرولات والصلاحيات" description="تحكم في الرولات التي تستطيع استخدام وظائف البوت.">
            <ConfigRow label="رول الإدارة" description="صلاحيات الإدارة الكاملة." value="Moderator" role />
            <ConfigRow label="رول الدعم" description="صلاحيات الدعم والتعامل مع الطلبات." value="Support Team" role />
            <ConfigRow label="رول مستثنى" description="منع هذا الرول من وظائف البوت." value="@everyone" role />
          </ConfigPanel>}

          {section === "general" && <ConfigPanel title="الإعدادات العامة" description="الإعدادات الأساسية الخاصة بهذا السيرفر.">
            <ToggleRow label="تفعيل البوت" description="تشغيل وظائف البوت في السيرفر." checked />
            <ToggleRow label="رسائل الحالة" description="إظهار تحديثات حالة البوت." checked />
            <ToggleRow label="الردود التلقائية" description="السماح للبوت بالرد تلقائيًا." checked />
            <ToggleRow label="وضع الصيانة" description="إيقاف الوظائف مؤقتًا مع إبقاء البوت متصلًا." />
          </ConfigPanel>}

          {section === "automod" && <ConfigPanel title="Auto Moderation" description="إعدادات الحماية التلقائية للسيرفر.">
            <ToggleRow label="مكافحة السبام" description="اكتشاف الرسائل المتكررة بسرعة." checked />
            <ToggleRow label="فلترة الروابط" description="منع الروابط غير المسموحة." />
            <ToggleRow label="مكافحة المنشن" description="الحد من المنشنات المزعجة." checked />
          </ConfigPanel>}

          {section === "logs" && <ConfigPanel title="Logs" description="حدد الأحداث التي يتم تسجيلها.">
            <ToggleRow label="Member Join / Leave" description="تسجيل دخول وخروج الأعضاء." checked />
            <ToggleRow label="Moderation Actions" description="تسجيل Ban / Kick / Warn." checked />
            <ToggleRow label="Settings Changes" description="تسجيل تغييرات إعدادات البوت." checked />
          </ConfigPanel>}

          {(section === "tickets" || section === "commands" || section === "permissions") && <ConfigPanel title={moduleItems.find(x => x[0] === section)?.[1] as string} description="هذه الوحدة ستكون مرتبطة بإعدادات البوت الفعلية بعد ربط الـ API وقاعدة البيانات.">
            <div className="coming-box"><Bot size={28}/><b>Module جاهز للربط</b><span>الواجهة منفصلة لكل بوت، والـ configuration هيتحفظ لكل Server بشكل مستقل.</span></div>
          </ConfigPanel>}
        </section>
      </div>
    </main>;
}

function ConfigPanel({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
  return <div className="dash-panel config-panel"><div className="dash-panel-title"><div><b>{title}</b><small>{description}</small></div><Settings2 size={18}/></div>{children}</div>;
}

function ConfigRow({ label, description, value, role = false }: { label: string; description: string; value: string; role?: boolean }) {
  return <div className="config-row"><div><b>{label}</b><small>{description}</small></div><select defaultValue={value}>{(role ? roles : channels).map((x: any) => <option key={typeof x === "string" ? x : x.id} value={typeof x === "string" ? x : x.id}>{typeof x === "string" ? x : x.name}</option>)}</select></div>;
}

function ToggleRow({ label, description, checked = false }: { label: string; description: string; checked?: boolean }) {
  const [on, setOn] = useState(checked);
  return <div className="config-row"><div><b>{label}</b><small>{description}</small></div><button className={"toggle " + (on ? "on" : "")} onClick={() => setOn(!on)}><span /></button></div>;
}