import Link from "next/link";
import { ArrowRight, Bot, CheckCircle2, LockKeyhole, Settings2, Ticket } from "lucide-react";

const data: Record<string, {name:string; description:string; price:number; category:string}> = {
  "codryx-moderation": { name:"CODRYX Moderation", description:"بوت إدارة وحماية متكامل للسيرفرات.", price:500, category:"Moderation" },
  "codryx-tickets": { name:"CODRYX Tickets", description:"نظام Tickets احترافي قابل للتخصيص.", price:350, category:"Tickets" },
  "codryx-giveaway": { name:"CODRYX Giveaway", description:"إنشاء وإدارة المسابقات بسهولة.", price:0, category:"Giveaways" },
  "codryx-utility": { name:"CODRYX Utility", description:"مجموعة أدوات Discord اليومية.", price:250, category:"Utilities" },
};

export default async function BotPage({ params }: { params: Promise<{slug:string}> }) {
  const { slug } = await params;
  const bot = data[slug] ?? data["codryx-moderation"];

  return <main className="shell">
    <header className="topbar"><Link href="/" className="brand"><span className="brand-mark">X</span><span>CODRYX</span></Link><nav><Link href="/">المتجر</Link><Link href="/admin">الإدارة</Link></nav><button className="discord-btn"><span className="discord-dot"/> تسجيل الدخول</button></header>
    <section className="bot-detail">
      <Link href="/" className="back"><ArrowRight size={16}/> رجوع للمتجر</Link>
      <div className="detail-card">
        <div className="detail-icon"><Bot size={58}/></div>
        <div className="detail-copy"><div className="eyebrow">{bot.category}</div><h1>{bot.name}</h1><p>{bot.description}</p><div className="detail-meta"><span><CheckCircle2 size={16}/> إعدادات متقدمة</span><span><Settings2 size={16}/> Dashboard مستقلة</span><span><LockKeyhole size={16}/> Access بإذن الإدارة</span></div></div>
        <aside><small>السعر</small><strong>{bot.price === 0 ? "مجاني" : bot.price + " ج.م"}</strong><button className="primary-btn wide"><Ticket size={18}/> {bot.price === 0 ? "اطلب التفعيل" : "طلب شراء"}</button><p>بعد اعتماد الطلب، يتم فتح صلاحية البوت لحسابك من الإدارة.</p></aside>
      </div>
    </section>
  </main>;
}