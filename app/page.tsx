"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Bot, ChevronLeft, Crown, Search, ShieldCheck, Sparkles, Ticket, Zap } from "lucide-react";

type BotItem = {
  slug: string;
  name: string;
  description: string;
  category: string;
  price: number;
  status: "available" | "restricted" | "maintenance";
  featured?: boolean;
  accent: string;
};

const bots: BotItem[] = [
  { slug: "codryx-moderation", name: "CODRYX Moderation", description: "حماية وإدارة متقدمة لسيرفر Discord.", category: "Moderation", price: 500, status: "available", featured: true, accent: "MOD" },
  { slug: "codryx-tickets", name: "CODRYX Tickets", description: "نظام تذاكر احترافي مع إدارة كاملة.", category: "Tickets", price: 350, status: "restricted", accent: "TKT" },
  { slug: "codryx-giveaway", name: "CODRYX Giveaway", description: "Giveaways سريعة ومرنة للسيرفرات.", category: "Giveaways", price: 0, status: "available", accent: "GIV" },
  { slug: "codryx-utility", name: "CODRYX Utility", description: "أدوات Discord الأساسية في بوت واحد.", category: "Utilities", price: 250, status: "maintenance", accent: "UTL" },
];

export default function Home() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("الكل");
  const [tab, setTab] = useState("all");

  const categories = ["الكل", "Moderation", "Tickets", "Giveaways", "Utilities"];

  const filtered = useMemo(() => bots.filter((bot) => {
    const matchesSearch = (bot.name + " " + bot.description).toLowerCase().includes(query.toLowerCase());
    const matchesCategory = category === "الكل" || bot.category === category;
    const matchesTab =
      tab === "all" ||
      (tab === "owned" && bot.slug === "codryx-moderation") ||
      (tab === "offers" && (bot.featured || bot.price === 0));
    return matchesSearch && matchesCategory && matchesTab;
  }), [query, category, tab]);

  return (
    <main className="shell">
      <header className="topbar">
        <Link href="/" className="brand"><span className="brand-mark">X</span><span>CODRYX</span></Link>
        <nav>
          <a href="#bots">البوتات</a>
          <a href="#offers">العروض</a>
          <Link href="/admin">لوحة الإدارة</Link>
        </nav>
        <button className="discord-btn"><span className="discord-dot" /> تسجيل الدخول عبر Discord</button>
      </header>

      <section className="hero">
        <div>
          <div className="eyebrow"><Sparkles size={15} /> منصة CODRYX لإدارة البوتات</div>
          <h1>كل بوتاتك في <span>مكان واحد.</span></h1>
          <p>اكتشف البوت المناسب، اطلبه، وبعد التفعيل تحكم فيه بالكامل من لوحة CODRYX.</p>
          <div className="hero-actions">
            <a className="primary-btn" href="#bots">استكشف البوتات <ChevronLeft size={18} /></a>
            <a className="ghost-btn" href="#offers">شوف العروض</a>
          </div>
          <div className="trust-row"><span><ShieldCheck size={16}/> تفعيل يدوي من الإدارة</span><span><Zap size={16}/> Dashboards مستقلة</span><span><Crown size={16}/> صلاحيات مرنة</span></div>
        </div>
        <div className="hero-orb">
          <div className="orb-ring ring-a" /><div className="orb-ring ring-b" />
          <div className="orb-core"><Bot size={78} strokeWidth={1.3}/><b>CODRYX</b><small>BOT STORE</small></div>
        </div>
      </section>

      <section id="bots" className="store-section">
        <div className="section-head">
          <div><div className="eyebrow">BOT STORE</div><h2>اختار البوت اللي يناسبك</h2></div>
          <div className="search"><Search size={18}/><input value={query} onChange={e => setQuery(e.target.value)} placeholder="ابحث عن بوت..." /></div>
        </div>

        <div className="tabs">
          <button className={tab === "all" ? "active" : ""} onClick={() => setTab("all")}>كل البوتات</button>
          <button className={tab === "owned" ? "active" : ""} onClick={() => setTab("owned")}>مشترك فيها</button>
          <button className={tab === "offers" ? "active" : ""} onClick={() => setTab("offers")}>عروض</button>
        </div>

        <div className="categories">{categories.map(c => <button key={c} className={category === c ? "cat-active" : ""} onClick={() => setCategory(c)}>{c}</button>)}</div>

        <div className="bot-grid">
          {filtered.map(bot => (
            <Link href={"/bots/" + bot.slug} className="bot-card" key={bot.slug}>
              <div className="bot-card-top">
                <div className="bot-icon">{bot.accent}</div>
                {bot.featured && <span className="featured">مميز</span>}
              </div>
              <div className="status-line"><span className={"status-dot " + bot.status} /> {bot.status === "available" ? "متاح" : bot.status === "restricted" ? "يتطلب تفعيل" : "صيانة"}</div>
              <h3>{bot.name}</h3><p>{bot.description}</p>
              <div className="card-footer"><strong>{bot.price === 0 ? "مجاني" : bot.price + " ج.م"}</strong><span>التفاصيل <ChevronLeft size={15}/></span></div>
            </Link>
          ))}
        </div>
      </section>

      <section id="offers" className="feature-strip">
        <div><Ticket size={26}/><div><b>طلب شراء واضح</b><span>الطلب يوصل مباشرة للـ Admin Panel.</span></div></div>
        <div><ShieldCheck size={26}/><div><b>Access تحت سيطرتك</b><span>الإدارة هي اللي تحدد مين يقدر يضيف كل بوت.</span></div></div>
        <div><Zap size={26}/><div><b>جاهز للتوسع</b><span>Categories وBots وDashboards بدون إعادة بناء النظام.</span></div></div>
      </section>

      <footer>© 2026 CODRYX Store — Bot management platform.</footer>
    </main>
  );
}