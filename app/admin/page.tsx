"use client";

import { useState } from "react";
import Link from "next/link";
import { Activity, Bell, Bot, Check, ChevronLeft, CircleUserRound, LayoutDashboard, Lock, Plus, Search, Settings, ShieldCheck, ShoppingCart, Users, X } from "lucide-react";

const initialBots = [
  {name:"CODRYX Moderation", category:"Moderation", price:500, access:"مصرح لهم", status:"Active"},
  {name:"CODRYX Tickets", category:"Tickets", price:350, access:"مغلق", status:"Active"},
  {name:"CODRYX Giveaway", category:"Giveaways", price:0, access:"للجميع", status:"Active"},
  {name:"CODRYX Utility", category:"Utilities", price:250, access:"صيانة", status:"Maintenance"},
];

export default function Admin() {
  const [selected, setSelected] = useState("overview");
  const [bots, setBots] = useState(initialBots);
  const [notice, setNotice] = useState("3");
  const [open, setOpen] = useState(false);

  const setAccess = (name:string, access:string) => setBots(bots.map(b => b.name === name ? {...b, access} : b));

  return <main className="admin-shell">
    <aside className="admin-sidebar">
      <Link href="/" className="brand admin-brand"><span className="brand-mark">X</span><span>CODRYX</span></Link>
      <div className="admin-user"><div className="avatar">M</div><div><b>Admin</b><small>Store Owner</small></div></div>
      <div className="side-links">
        {[
          ["overview","نظرة عامة",LayoutDashboard],["orders","طلبات الشراء",ShoppingCart],["bots","البوتات",Bot],["users","العملاء",Users],["categories","التصنيفات",Settings],["notifications","الإشعارات",Bell]
        ].map(([id,label,Icon]:any)=><button key={id} onClick={()=>setSelected(id)} className={selected===id?"side-active":""}><Icon size={18}/>{label}{id==="orders" && <em>{notice}</em>}</button>)}
      </div>
      <div className="side-bottom"><button><ShieldCheck size={18}/> الصلاحيات</button><button><Activity size={18}/> السجلات</button></div>
    </aside>

    <section className="admin-content">
      <header className="admin-head"><div><span className="eyebrow">CONTROL CENTER</span><h1>{selected==="overview"?"نظرة عامة":selected==="bots"?"إدارة البوتات":selected==="orders"?"طلبات الشراء":"إدارة " + selected}</h1></div><button className="icon-btn" onClick={()=>setNotice("0")}><Bell size={19}/>{notice!=="0" && <i/>}</button></header>

      {selected==="overview" && <><div className="stats">
        <div><span>العملاء</span><b>1,284</b><small>+12.4% هذا الشهر</small></div><div><span>البوتات النشطة</span><b>18</b><small>16 Online الآن</small></div><div><span>طلبات معلقة</span><b>3</b><small>تحتاج مراجعة</small></div><div><span>المبيعات</span><b>48,750 <small>ج.م</small></b><small>هذا الشهر</small></div>
      </div>
      <div className="panel-grid"><div className="panel"><div className="panel-title"><b>طلبات تحتاج إجراء</b><button onClick={()=>setSelected("orders")}>عرض الكل</button></div>{["محمد — CODRYX Moderation — 500 ج.م","أحمد — CODRYX Tickets — 350 ج.م","علي — CODRYX Utility — 250 ج.م"].map((x,i)=><div className="order-row" key={x}><div className="avatar mini">{String.fromCharCode(77+i)}</div><span>{x}<small>منذ {i+2} دقيقة</small></span><button onClick={()=>setSelected("orders")}>مراجعة</button></div>)}</div>
      <div className="panel"><div className="panel-title"><b>تحكم سريع في الوصول</b><Lock size={16}/></div>{bots.slice(0,3).map(b=><div className="access-row" key={b.name}><span>{b.name}</span><select value={b.access} onChange={e=>setAccess(b.name,e.target.value)}><option>للجميع</option><option>مصرح لهم</option><option>مغلق</option><option>صيانة</option></select></div>)}</div></div></>}

      {selected==="bots" && <div className="panel"><div className="panel-title"><b>كل البوتات</b><button className="primary-small" onClick={()=>setOpen(true)}><Plus size={15}/> إضافة بوت</button></div><div className="table">{bots.map(b=><div className="table-row" key={b.name}><div className="bot-name"><div className="bot-icon small">X</div><span><b>{b.name}</b><small>{b.category}</small></span></div><span>{b.price===0?"مجاني":b.price+" ج.م"}</span><select value={b.access} onChange={e=>setAccess(b.name,e.target.value)}><option>للجميع</option><option>مصرح لهم</option><option>مغلق</option><option>صيانة</option></select><span className="live"><i/> {b.status}</span><button className="row-action"><ChevronLeft size={17}/></button></div>)}</div></div>}

      {selected==="orders" && <div className="panel"><div className="panel-title"><b>طلبات الشراء</b><div className="search compact"><Search size={16}/><input placeholder="ابحث باسم العميل أو البوت..." /></div></div>{["محمد","أحمد","علي"].map((u,i)=><div className="order-row full" key={u}><div className="avatar mini">{u[0]}</div><span><b>{u}</b><small>{["CODRYX Moderation","CODRYX Tickets","CODRYX Utility"][i]} • {[500,350,250][i]} ج.م • Website</small></span><span className="pending">Pending</span><button className="approve" onClick={()=>alert("Demo: order approved. Grant Access can be added to the backend next.")}><Check size={16}/> مراجعة</button></div>)}</div>}

      {["users","categories","notifications"].includes(selected) && <div className="empty-panel"><CircleUserRound size={42}/><h2>{selected==="users"?"العملاء":selected==="categories"?"التصنيفات":"الإشعارات"}</h2><p>الواجهة الأساسية جاهزة، والبيانات الحقيقية ستتصل بالـ database وDiscord API في مرحلة الربط.</p></div>}
    </section>

    {open && <div className="modal-backdrop" onClick={()=>setOpen(false)}><div className="modal" onClick={e=>e.stopPropagation()}><button className="modal-close" onClick={()=>setOpen(false)}><X/></button><h2>إضافة بوت جديد</h2><p>تجهيز نموذج إنشاء البوت وربطه بالـ Discord App ID في مرحلة الـ backend.</p><input placeholder="اسم البوت"/><input placeholder="Discord Application ID"/><input placeholder="السعر"/><button className="primary-btn wide" onClick={()=>setOpen(false)}>حفظ</button></div></div>}
  </main>;
}