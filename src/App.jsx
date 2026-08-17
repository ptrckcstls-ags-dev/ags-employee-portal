import { useState, useRef, useEffect } from "react";

// ── Brand ─────────────────────────────────────────────────────────────────
const C = {
  navy:    "#1A2F5E",
  blue:    "#1D5CA8",
  sky:     "#3B82C4",
  cyan:    "#4DB8E8",
  gold:    "#E8A020",
  white:   "#FFFFFF",
  light:   "#F4F6FA",
  mid:     "#4A5568",
  sidebar: "#0F1E3D",
  sidebarHover: "#1A2F5E",
  bg:      "#F0F2F7",
};

// ── Config ────────────────────────────────────────────────────────────────
const CONFIG = {
  hrEmail:    "hr@allianceglobalsolutions.com",
  distroEmail:"hr.ags@allianceglobalsolutions.com",
  address:    "17th Floor, North Tower 1 EDSA cor. North Avenue, Quezon City",
  website:    "www.allianceglobal.ph",
  handbookUrl:"https://drive.google.com/your-handbook-link-here",
  cocUrl:     "https://drive.google.com/your-coc-link-here",
};

// ── Photo helper ──────────────────────────────────────────────────────────
const img = (id) => `https://drive.google.com/uc?export=view&id=${id}`;

// ── Org chart data (correct structure from org chart image) ───────────────
const ORG = {
  name: "Martin Jacov De Vera",
  title: "Site Director",
  photo: img("17MFEKrCCn-19yeVy03j4so4Qbn3vNrdx"),
  children: [
    {
      name: "John Patrick Costales",
      title: "HR & Compliance Manager",
      photo: img("1epdsGvkB8MnUP3L8vq4SrwOAwwijZILZ"),
      highlight: "gold",
      children: [
        { name: "Cyril Joshua Tigranes", title: "Special Projects Lead", photo: img("1SySesmIQhTMSfDjxcpPzfQXarOWv6b5d") },
        { name: "Reca Febrero", title: "HR Generalist", photo: img("1JMw9UVm9CuaMn5zdggdMyikaJCxeJ28j") },
        {
          name: "Dither Reyes", title: "Reports Analyst", photo: img("1qCtHwyLpaNtpv_IPHk2MfmcJt7iym5yg"),
          children: []
        },
        {
          name: "Reginald Antonio", title: "IT Administrator", photo: img("1aperUTDLW92eIP5vCEiAMl2v2yjnbHpu"),
          children: [
            { name: "Gino Antonio", title: "Junior Technical Support", photo: img("1lAxbwqKRh8kol545QDhOFD9WJt6WxkuN") },
          ]
        },
        { name: "Janice Banguilan", title: "Accounting Associate", photo: img("15jLr8PNBm1QPp-i_5vpWXeQaZ5_vC_fe"), dashed: true },
        { name: "Vincent John Rodriguez", title: "AI Developer", photo: img("1jjxc59AW_Zesrppdhmbp5qrwPD-Pk6YZ"), dashed: true },
      ],
    },
    {
      name: "Mark Dwane Laurente",
      title: "Account Manager",
      photo: img("1OHV4YQPttk-Fl7d45seqIyg4qoIbF5Um"),
      children: [
        { name: "Gerald Hilomen", title: "Team Leader", photo: img("1vpdoEMXdYOUXN9eUUwj4I_QXnTqpvXto") },
        { name: "Roxanne Reyes", title: "Team Leader", photo: img("1D19LFDp8d2UHsYnuNmtWHdr5EEEzYhv_") },
        { name: "Allyssa Esmino", title: "Quality & Training Specialist", photo: img("1NJNW7e4ovKQMo5hbFS1pxINggQ5r2f6J"), highlight: "teal" },
        { name: "Jessa Malinao", title: "Team Leader in Training", photo: img("1xU1s3OsBPcbgHxl29op5S4tk3ab5D4Gp") },
      ],
    },
    {
      name: "Paul Anthony Bulanadi",
      title: "Account Manager",
      photo: img("1m-uXZgdlMWWO6sFC6-ZKraleuvjQHXs9"),
      children: [
        { name: "John Tristan Pineda", title: "Team Leader", photo: img("1GVVTfTcgVY_zOqR_-3ghrXUbCzMHe5Sz") },
        { name: "Raphael Bucatcat", title: "Quality & Training Specialist", photo: img("1qfR6N6zgKYm5LQAl2j-nmotadDONN2sx"), highlight: "teal" },
      ],
    },
    {
      name: "Darell Lomibao",
      title: "Account Manager",
      photo: img("1FGroMsHiiKnVKhgKBaHKst3ruFAZys9g"),
      children: [],
    },
    {
      name: "Djanisse Toledo",
      title: "Account Manager",
      photo: img("1VcBn7xXap6ywqfeV0eQuAofPQ2E9qi9q"),
      children: [
        {
          name: "Carl Stephen Paolo Ong", title: "Senior Team Leader", photo: img("1e5a64EMLs9h0DjT1fLovQ_2TxDW2Oa79"),
          children: [
            { name: "Lyanah Katreena Hutchison", title: "Team Leader", photo: img("1inXcvJ8h3PNInp77OX9iStEMH2U7lg-s") },
          ]
        },
      ],
    },
  ],
};

// ── Contacts ──────────────────────────────────────────────────────────────
const CONTACTS = [
  { name:"John Patrick Costales", title:"HR & Compliance Manager", dept:"Human Resources", email:"jpc@allianceglobalsolutions.com", photo:img("1epdsGvkB8MnUP3L8vq4SrwOAwwijZILZ"), note:"Primary contact for all HR matters, compliance, and policy questions." },
  { name:"Reca Febrero", title:"HR Generalist", dept:"Human Resources", email:CONFIG.hrEmail, photo:img("1JMw9UVm9CuaMn5zdggdMyikaJCxeJ28j"), note:"Onboarding, employee records, day-to-day HR operations, and employee relations." },
  { name:"Cyril Joshua Tigranes", title:"Special Projects Lead", dept:"Human Resources", email:CONFIG.hrEmail, photo:img("1SySesmIQhTMSfDjxcpPzfQXarOWv6b5d"), note:"Cross-functional HR projects and special initiatives across teams." },
  { name:"Dither Reyes", title:"Reports Analyst", dept:"Human Resources", email:CONFIG.hrEmail, photo:img("1qCtHwyLpaNtpv_IPHk2MfmcJt7iym5yg"), note:"HR data, analytics, reporting, and employee record accuracy." },
  { name:"Allyssa Esmino", title:"Quality & Training Specialist", dept:"Quality & Training", email:CONFIG.hrEmail, photo:img("1NJNW7e4ovKQMo5hbFS1pxINggQ5r2f6J"), note:"QA monitoring, training delivery, and performance coaching — Mark D. Laurente's team." },
  { name:"Raphael Bucatcat", title:"Quality & Training Specialist", dept:"Quality & Training", email:CONFIG.hrEmail, photo:img("1qfR6N6zgKYm5LQAl2j-nmotadDONN2sx"), note:"QA calibration, coaching, and continuous improvement — Paul A. Bulanadi's team." },
  { name:"Reginald Antonio", title:"IT Administrator", dept:"IT Support", email:CONFIG.hrEmail, photo:img("1aperUTDLW92eIP5vCEiAMl2v2yjnbHpu"), note:"IT systems, access credentials, and technical infrastructure." },
];

// ── COC data ──────────────────────────────────────────────────────────────
const COC = [
  { type:"TYPE A", label:"Minor Offenses", color:C.gold, textColor:C.navy,
    steps:["1st — Verbal Warning","2nd — Final Verbal Warning + −25% commission","3rd — Written Warning + −50% commission","4th — Final Written Warning + −75% commission","5th — Dismissal"],
    examples:["Non-observance of break time","Tardiness 6× a month or 60+ min accumulated","AWOL 1–2 days without approval","Failure to file planned leaves 2 weeks in advance","Inefficiency or repeated mistakes","Loitering or sleeping on duty","Unauthorized workstation transfer","Not wearing decent clothing"],
    clean:"1 Month" },
  { type:"TYPE B", label:"Serious Offenses", color:C.sky, textColor:C.navy,
    steps:["1st — Written Warning + −50% commission","2nd — Final Written Warning + −75% commission","3rd — Dismissal"],
    examples:["No Call, No Show (NCNS)","Discourtesy or insolence to colleagues or clients","Misuse of company property","Using company internet for personal business","Abandonment of work (3+ consecutive days AWOL)","Failure to liquidate funds on time","Unauthorized disposal of company property"],
    clean:"3 Months" },
  { type:"TYPE C", label:"Grave Offenses", color:C.navy, textColor:C.white,
    steps:["Immediate Dismissal","If retained (exceptional): 6-month incentive ineligibility"],
    examples:["Falsification of records or time sheets","Theft, fraud, embezzlement, or bribery","Sexual harassment or intimidation","Insubordination","Disclosure of company trade secrets","Positive drug test result","Abuse of authority over subordinates","Hacking company accounts"],
    clean:"6 Months" },
];

// ── Chatbot knowledge base ────────────────────────────────────────────────
const KB = `
AGS EMPLOYEE HANDBOOK & CODE OF CONDUCT — KNOWLEDGE BASE

EMPLOYMENT:
- Probationary period: up to 180 calendar days
- Regular employment: after 6 months continuous service or meeting regularization standards
- Work hours: 8 hours/day max, exclusive of meal break
- Meal break: 1 hour unpaid
- Rest breaks: two 15-minute paid breaks

ATTENDANCE:
- Notify supervisor at least 2 hours before shift if absent/late
- Channels: call, SMS, or company-approved messaging (Sprout, MS Teams, Google Chat)
- AWOL: unexcused absence of 1+ days = Type A offense
- Tardiness 6x/month or 60 min accumulated = Type A offense
- NCNS (No Call No Show) = Type B offense
- Timekeeping: log via Sprout, MS Teams, Google Chat, or account tools
- Falsifying time records = Type C (Grave) offense

COMPENSATION:
- Payroll: semi-monthly
- 13th Month Pay: released by December 24, computed as 1/12 of total basic salary
- Overtime ordinary day: 125% of hourly rate
- Overtime rest/special day: 130%
- Overtime regular holiday: 200%
- Night shift differential: +10% for work 10PM–6AM
- Statutory deductions: SSS, PhilHealth, Pag-IBIG, Withholding Tax
- Allowances: meal, rice subsidy, laundry, communication, medicine (varies by position)

LEAVE:
- Vacation Leave (VL): 7 days/year, accrues 0.58 days/month, NOT convertible to cash
- Sick Leave (SL): 7 days/year, accrues 0.58 days/month, convertible to cash
- Emergency leave charged to SL credits
- VL must be filed at least 2 weeks in advance
- Medical certificate required for 2+ consecutive sick days
- Maternity Leave: 105 days normal delivery, 120 days caesarean
- Paternity Leave: 7 working days (married male employees, first 4 deliveries)
- Solo Parent Leave: 7 working days annually (valid Solo Parent ID required)
- VAWC Leave (RA 9262): 10 days paid
- Women's Special Leave (RA 9710): 2 months for gynecological surgery

DRESS CODE:
- Monday–Wednesday: Business Casual
- Thursday–Saturday: Casual / Dress Down
- Company ID must be worn visibly at all times on premises
- No revealing, offensive, or unsafe clothing

DISCIPLINE — TYPE A (Minor):
Verbal Warning → Final Verbal Warning (−25% commission) → Written Warning (−50%) → Final Written (−75%) → Dismissal
Cleansing period: 1 month
Examples: break time violations, tardiness, AWOL 1-2 days, late leave filing, inefficiency, loitering, sleeping on duty

DISCIPLINE — TYPE B (Serious):
Written Warning (−50%) → Final Written (−75%) → Dismissal
Cleansing period: 3 months
Examples: NCNS, discourtesy to clients/colleagues, misuse of property, personal internet use, abandonment (3+ days)

DISCIPLINE — TYPE C (Grave):
Immediate Dismissal (cleansing period: 6 months if retained)
Examples: falsification, theft, fraud, sexual harassment, insubordination, drug test positive, abuse of authority, hacking

PROMOTION EFFECTS:
- Active NTE: promotion on hold
- Verbal Warning: 6-month promotion deferral
- Written Warning: 9-month deferral
- Final Written Warning: 12-month deferral

POLICIES:
- Data privacy: protect all client/employee data, access only for authorized purposes (RA 10173)
- Anti-sexual harassment: zero tolerance, CODI handles complaints (RA 7877, RA 11313)
- Drug-free: no possession/use/distribution, random testing conducted
- Smoke-free: designated areas only (RA 9211)
- OSH: follow all safety rules, report incidents immediately (RA 11058)
- Equal opportunity: no discrimination based on sex, age, religion, civil status, disability

SEPARATION:
- Just causes: serious misconduct, willful disobedience, gross neglect, fraud, crime
- Authorized causes: redundancy, retrenchment, closure, incurable disease — 30-day written notice required
- Due process: two written notices required before termination for just cause

HR CONTACTS:
- Main HR email: hr@allianceglobalsolutions.com
- Distro: hr.ags@allianceglobalsolutions.com
- HR & Compliance Manager: John Patrick Costales
- HR Generalist: Reca Febrero
- Special Projects Lead: Cyril Joshua Tigranes
- Reports Analyst: Dither Reyes
`;

// ── OrgNode component ─────────────────────────────────────────────────────
function OrgNode({ node, depth = 0 }) {
  const [open, setOpen] = useState(depth < 1);
  const hasChildren = node.children && node.children.length > 0;
  const borderColor = node.highlight === "gold" ? C.gold : node.highlight === "teal" ? "#0D6E74" : "#CBD5E0";
  const bgColor = node.highlight === "gold" ? "#FFF8E7" : node.highlight === "teal" ? "#E8F5F6" : C.white;

  return (
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center" }}>
      <div
        onClick={() => hasChildren && setOpen(o => !o)}
        style={{
          background: bgColor,
          border: `2px solid ${borderColor}`,
          borderStyle: node.dashed ? "dashed" : "solid",
          borderRadius: 14,
          padding: "10px 12px",
          width: 120,
          textAlign: "center",
          cursor: hasChildren ? "pointer" : "default",
          boxShadow: node.highlight ? `0 4px 14px ${borderColor}40` : "0 2px 8px rgba(0,0,0,0.08)",
          transition: "all 0.2s",
          position: "relative",
        }}
        onMouseEnter={e => { if(hasChildren) e.currentTarget.style.transform = "translateY(-2px)"; }}
        onMouseLeave={e => { e.currentTarget.style.transform = ""; }}
      >
        <img
          src={node.photo}
          alt={node.name}
          style={{ width: 52, height: 52, borderRadius: "50%", objectFit: "cover", marginBottom: 6, border: `3px solid ${borderColor}` }}
          onError={e => { e.target.style.display="none"; e.target.nextSibling.style.display="flex"; }}
        />
        <div style={{
          width: 52, height: 52, borderRadius: "50%", background: borderColor,
          display: "none", alignItems: "center", justifyContent: "center",
          color: C.white, fontWeight: 700, fontSize: 16, margin: "0 auto 6px",
        }}>
          {node.name.split(" ").map(w=>w[0]).slice(0,2).join("")}
        </div>
        <div style={{ fontSize: 10.5, fontWeight: 700, color: C.navy, lineHeight: 1.3 }}>{node.name}</div>
        <div style={{ fontSize: 9, color: node.highlight === "gold" ? C.gold : node.highlight === "teal" ? "#0D6E74" : C.mid, marginTop: 2, lineHeight: 1.3 }}>{node.title}</div>
        {hasChildren && (
          <div style={{
            position: "absolute", bottom: -10, left: "50%", transform: "translateX(-50%)",
            background: C.blue, color: C.white, borderRadius: "50%",
            width: 18, height: 18, fontSize: 12, display: "flex",
            alignItems: "center", justifyContent: "center", fontWeight: 700,
            boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
          }}>{open ? "−" : "+"}</div>
        )}
      </div>

      {hasChildren && open && (
        <div style={{ display:"flex", flexDirection:"column", alignItems:"center" }}>
          <div style={{ width:2, height:22, background:"#CBD5E0", marginTop:10 }} />
          <div style={{ display:"flex", gap:12, alignItems:"flex-start", position:"relative" }}>
            {node.children.length > 1 && (
              <div style={{ position:"absolute", top:0, height:2, background:"#CBD5E0", left:"8%", right:"8%" }} />
            )}
            {node.children.map((child, i) => (
              <div key={i} style={{ display:"flex", flexDirection:"column", alignItems:"center" }}>
                <div style={{ width:2, height:20, background:"#CBD5E0" }} />
                <OrgNode node={child} depth={depth+1} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Chatbot ───────────────────────────────────────────────────────────────
function Chatbot({ onClose }) {
  const [messages, setMessages] = useState([
    { role:"assistant", text:"Hi! I'm the AGS HR Assistant. Ask me anything about the Employee Handbook or Code of Conduct — leave policies, discipline, benefits, attendance, and more." }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior:"smooth" }); }, [messages]);

  async function send() {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setInput("");
    setMessages(m => [...m, { role:"user", text:userMsg }]);
    setLoading(true);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method:"POST",
        headers:{ "Content-Type":"application/json" },
        body: JSON.stringify({
          model:"claude-sonnet-4-6",
          max_tokens:1000,
          system:`You are the AGS HR Assistant for Alliance Global Solutions. Answer employee questions about company policies using ONLY the knowledge base below. Be concise, friendly, and accurate. If a question is not covered in the knowledge base, say "I don't have that information — please contact HR at hr@allianceglobalsolutions.com". Never make up policies.\n\nKNOWLEDGE BASE:\n${KB}`,
          messages:[{ role:"user", content:userMsg }]
        })
      });
      const data = await res.json();
      const text = data.content?.[0]?.text || "Sorry, I couldn't get a response. Please try again.";
      setMessages(m => [...m, { role:"assistant", text }]);
    } catch {
      setMessages(m => [...m, { role:"assistant", text:"Connection error. Please try again or contact HR directly." }]);
    }
    setLoading(false);
  }

  return (
    <div style={{
      position:"fixed", bottom:24, right:24, width:380, height:520,
      background:C.white, borderRadius:20, boxShadow:"0 8px 40px rgba(0,0,0,0.2)",
      display:"flex", flexDirection:"column", zIndex:1000,
      border:`2px solid ${C.cyan}`,
      overflow:"hidden",
    }}>
      {/* Header */}
      <div style={{ background:C.navy, padding:"14px 18px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <div style={{ width:36, height:36, borderRadius:"50%", background:C.gold, display:"flex", alignItems:"center", justifyContent:"center", fontSize:18 }}>🤖</div>
          <div>
            <div style={{ color:C.white, fontWeight:700, fontSize:14 }}>AGS HR Assistant</div>
            <div style={{ color:C.cyan, fontSize:11 }}>Handbook & COC Q&A</div>
          </div>
        </div>
        <button onClick={onClose} style={{ background:"rgba(255,255,255,0.1)", border:"none", color:C.white, borderRadius:"50%", width:28, height:28, cursor:"pointer", fontSize:16, display:"flex", alignItems:"center", justifyContent:"center" }}>✕</button>
      </div>

      {/* Messages */}
      <div style={{ flex:1, overflowY:"auto", padding:"16px", display:"flex", flexDirection:"column", gap:12 }}>
        {messages.map((m, i) => (
          <div key={i} style={{ display:"flex", justifyContent: m.role==="user" ? "flex-end" : "flex-start" }}>
            <div style={{
              maxWidth:"82%", padding:"10px 14px", borderRadius: m.role==="user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
              background: m.role==="user" ? C.navy : C.light,
              color: m.role==="user" ? C.white : C.navy,
              fontSize:13, lineHeight:1.6,
              boxShadow:"0 1px 4px rgba(0,0,0,0.08)",
            }}>{m.text}</div>
          </div>
        ))}
        {loading && (
          <div style={{ display:"flex", justifyContent:"flex-start" }}>
            <div style={{ background:C.light, borderRadius:"18px 18px 18px 4px", padding:"10px 16px", fontSize:13, color:C.mid }}>
              <span style={{ animation:"pulse 1s infinite" }}>Thinking…</span>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Suggested questions */}
      {messages.length === 1 && (
        <div style={{ padding:"0 12px 8px", display:"flex", flexWrap:"wrap", gap:6 }}>
          {["How many leave days do I get?","What is a Type B offense?","How do I file a leave?","What is the dress code?"].map((q,i) => (
            <button key={i} onClick={() => { setInput(q); }} style={{
              background:C.light, border:`1px solid ${C.cyan}`, borderRadius:20,
              padding:"5px 12px", fontSize:11.5, color:C.navy, cursor:"pointer",
            }}>{q}</button>
          ))}
        </div>
      )}

      {/* Input */}
      <div style={{ padding:"12px", borderTop:`1px solid ${C.light}`, display:"flex", gap:8 }}>
        <input
          value={input}
          onChange={e=>setInput(e.target.value)}
          onKeyDown={e=>e.key==="Enter"&&send()}
          placeholder="Ask about policies, leave, COC…"
          style={{ flex:1, padding:"10px 14px", borderRadius:10, border:`1.5px solid #CBD5E0`, fontSize:13, outline:"none" }}
          onFocus={e=>e.target.style.borderColor=C.cyan}
          onBlur={e=>e.target.style.borderColor="#CBD5E0"}
        />
        <button onClick={send} disabled={loading} style={{
          background:C.navy, color:C.white, border:"none", borderRadius:10,
          width:42, cursor:"pointer", fontSize:18, display:"flex", alignItems:"center", justifyContent:"center",
        }}>➤</button>
      </div>
    </div>
  );
}

// ── Main App ──────────────────────────────────────────────────────────────
export default function App() {
  const [tab, setTab] = useState("orgchart");
  const [chatOpen, setChatOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [cocExpanded, setCocExpanded] = useState(null);
  const [form, setForm] = useState({ name:"", dept:"", subject:"", message:"" });
  const [sent, setSent] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = [
    { id:"orgchart", label:"Org Chart",       icon:"🏢" },
    { id:"contacts", label:"Points of Contact", icon:"👥" },
    { id:"coc",      label:"Code of Conduct",  icon:"📋" },
    { id:"docs",     label:"Documents",        icon:"📄" },
    { id:"email",    label:"Email HR",         icon:"✉️" },
  ];

  const filtered = CONTACTS.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.dept.toLowerCase().includes(search.toLowerCase()) ||
    c.title.toLowerCase().includes(search.toLowerCase())
  );

  function sendEmail(e) {
    e.preventDefault();
    const s = encodeURIComponent(`[AGS Portal] ${form.subject}`);
    const b = encodeURIComponent(`From: ${form.name} (${form.dept})\n\n${form.message}`);
    window.open(`mailto:${CONFIG.hrEmail}?subject=${s}&body=${b}`, "_blank");
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  }

  return (
    <div style={{ display:"flex", minHeight:"100vh", background:C.bg, fontFamily:"system-ui,-apple-system,sans-serif" }}>

      {/* ── Sidebar ── */}
      <aside style={{
        width: 220, background:C.sidebar, display:"flex", flexDirection:"column",
        position:"fixed", top:0, left:0, height:"100vh", zIndex:200,
        boxShadow:"2px 0 16px rgba(0,0,0,0.25)",
        transform: sidebarOpen ? "translateX(0)" : undefined,
      }}>
        {/* Logo */}
        <div style={{ padding:"24px 20px 16px", borderBottom:"1px solid rgba(255,255,255,0.08)" }}>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <div style={{ width:40, height:40, borderRadius:10, background:C.gold, display:"flex", alignItems:"center", justifyContent:"center", fontWeight:900, fontSize:22, color:C.navy, flexShrink:0 }}>A</div>
            <div>
              <div style={{ color:C.white, fontWeight:700, fontSize:14, lineHeight:1.2 }}>AGS</div>
              <div style={{ color:C.cyan, fontSize:10, letterSpacing:1 }}>EMPLOYEE PORTAL</div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ flex:1, padding:"12px 10px" }}>
          <div style={{ fontSize:10, color:"rgba(255,255,255,0.35)", letterSpacing:1.5, padding:"8px 10px 4px", fontWeight:600 }}>NAVIGATE</div>
          {navItems.map(item => (
            <button key={item.id} onClick={() => { setTab(item.id); setSidebarOpen(false); }} style={{
              width:"100%", display:"flex", alignItems:"center", gap:12,
              padding:"11px 12px", borderRadius:10, border:"none", cursor:"pointer",
              background: tab===item.id ? C.navy : "transparent",
              color: tab===item.id ? C.white : "rgba(255,255,255,0.65)",
              fontSize:13.5, fontWeight: tab===item.id ? 700 : 400,
              transition:"all 0.15s", marginBottom:2,
              boxShadow: tab===item.id ? `inset 3px 0 0 ${C.gold}` : "none",
            }}
              onMouseEnter={e => { if(tab!==item.id) e.currentTarget.style.background="rgba(255,255,255,0.08)"; }}
              onMouseLeave={e => { if(tab!==item.id) e.currentTarget.style.background="transparent"; }}
            >
              <span style={{ fontSize:17 }}>{item.icon}</span>
              {item.label}
            </button>
          ))}

          <div style={{ fontSize:10, color:"rgba(255,255,255,0.35)", letterSpacing:1.5, padding:"16px 10px 4px", fontWeight:600 }}>TOOLS</div>
          <button onClick={() => setChatOpen(o=>!o)} style={{
            width:"100%", display:"flex", alignItems:"center", gap:12,
            padding:"11px 12px", borderRadius:10, border:"none", cursor:"pointer",
            background: chatOpen ? C.navy : "transparent",
            color: chatOpen ? C.white : "rgba(255,255,255,0.65)",
            fontSize:13.5, fontWeight:400, transition:"all 0.15s",
            boxShadow: chatOpen ? `inset 3px 0 0 ${C.cyan}` : "none",
          }}
            onMouseEnter={e => { if(!chatOpen) e.currentTarget.style.background="rgba(255,255,255,0.08)"; }}
            onMouseLeave={e => { if(!chatOpen) e.currentTarget.style.background="transparent"; }}
          >
            <span style={{ fontSize:17 }}>🤖</span>
            HR Assistant
            <span style={{ marginLeft:"auto", background:C.cyan, color:C.navy, fontSize:9, fontWeight:700, padding:"2px 6px", borderRadius:10 }}>AI</span>
          </button>
        </nav>

        {/* Footer */}
        <div style={{ padding:"16px 20px", borderTop:"1px solid rgba(255,255,255,0.08)", fontSize:11, color:"rgba(255,255,255,0.35)", lineHeight:1.6 }}>
          <div style={{ color:"rgba(255,255,255,0.6)", fontWeight:600, marginBottom:2 }}>Alliance Global Solutions</div>
          <div>17F North Tower 1 EDSA</div>
          <div>Quezon City</div>
        </div>
      </aside>

      {/* ── Main content ── */}
      <div style={{ flex:1, marginLeft:220, display:"flex", flexDirection:"column", minHeight:"100vh" }}>

        {/* Top bar */}
        <header style={{
          background:C.white, height:60, display:"flex", alignItems:"center",
          padding:"0 28px", justifyContent:"space-between",
          boxShadow:"0 1px 8px rgba(0,0,0,0.08)", position:"sticky", top:0, zIndex:100,
        }}>
          <div>
            <div style={{ fontWeight:700, fontSize:17, color:C.navy }}>
              {navItems.find(n=>n.id===tab)?.icon} {navItems.find(n=>n.id===tab)?.label}
            </div>
            <div style={{ fontSize:11.5, color:C.mid }}>Alliance Global Solutions — Employee Portal</div>
          </div>
          <div style={{ display:"flex", gap:10, alignItems:"center" }}>
            <a href={`mailto:${CONFIG.hrEmail}`} style={{
              background:C.navy, color:C.white, padding:"7px 16px",
              borderRadius:8, textDecoration:"none", fontSize:12.5, fontWeight:600,
              display:"flex", alignItems:"center", gap:6,
            }}>✉️ Email HR</a>
          </div>
        </header>

        {/* Content */}
        <main style={{ flex:1, padding:"28px", overflowX:"auto" }}>

          {/* ═══ ORG CHART ═══ */}
          {tab==="orgchart" && (
            <div>
              <div style={{ marginBottom:20 }}>
                <h1 style={{ margin:"0 0 4px", fontSize:22, fontWeight:800, color:C.navy }}>Organizational Chart</h1>
                <p style={{ margin:0, fontSize:13, color:C.mid }}>Click any card with + to expand its direct reports. Click − to collapse.</p>
              </div>

              {/* Legend */}
              <div style={{ display:"flex", gap:16, flexWrap:"wrap", marginBottom:20 }}>
                {[
                  { bg:"#FFF8E7", border:C.gold, label:"HR & Compliance" },
                  { bg:"#E8F5F6", border:"#0D6E74", label:"Quality & Training" },
                  { bg:C.white, border:"#CBD5E0", label:"Operations / Staff" },
                  { bg:C.white, border:"#CBD5E0", dashed:true, label:"Dotted-line / Support" },
                ].map((l,i)=>(
                  <div key={i} style={{ display:"flex", alignItems:"center", gap:7, fontSize:12, color:C.mid }}>
                    <div style={{ width:20, height:14, borderRadius:4, background:l.bg, border:`2px ${l.dashed?"dashed":"solid"} ${l.border}` }}/>
                    {l.label}
                  </div>
                ))}
              </div>

              <div style={{ background:C.white, borderRadius:16, padding:"32px 20px", boxShadow:"0 2px 16px rgba(0,0,0,0.07)", overflowX:"auto" }}>
                <OrgNode node={ORG} depth={0} />
              </div>
            </div>
          )}

          {/* ═══ CONTACTS ═══ */}
          {tab==="contacts" && (
            <div>
              <div style={{ marginBottom:20 }}>
                <h1 style={{ margin:"0 0 4px", fontSize:22, fontWeight:800, color:C.navy }}>Points of Contact</h1>
                <p style={{ margin:0, fontSize:13, color:C.mid }}>Find the right person for your concern.</p>
              </div>
              <div style={{ marginBottom:18, position:"relative" }}>
                <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search by name, title, or department…"
                  style={{ width:"100%", padding:"11px 14px 11px 42px", borderRadius:10, border:"1.5px solid #CBD5E0", fontSize:13, boxSizing:"border-box", outline:"none", background:C.white }}
                  onFocus={e=>e.target.style.borderColor=C.cyan} onBlur={e=>e.target.style.borderColor="#CBD5E0"}/>
                <span style={{ position:"absolute", left:14, top:"50%", transform:"translateY(-50%)", fontSize:17, opacity:.5 }}>🔍</span>
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))", gap:16 }}>
                {filtered.map((c,i)=>(
                  <div key={i} style={{ background:C.white, borderRadius:14, padding:"20px", boxShadow:"0 2px 12px rgba(0,0,0,0.07)", border:"1.5px solid #EEF2F7" }}>
                    <div style={{ display:"flex", gap:14, alignItems:"center" }}>
                      <img src={c.photo} alt={c.name} style={{ width:56, height:56, borderRadius:"50%", objectFit:"cover", border:`3px solid ${C.cyan}`, flexShrink:0 }}
                        onError={e=>{ e.target.style.display="none"; e.target.nextSibling.style.display="flex"; }}/>
                      <div style={{ width:56, height:56, borderRadius:"50%", background:C.navy, display:"none", alignItems:"center", justifyContent:"center", color:C.white, fontWeight:700, fontSize:18, flexShrink:0 }}>
                        {c.name.split(" ").map(w=>w[0]).slice(0,2).join("")}
                      </div>
                      <div>
                        <div style={{ fontWeight:700, fontSize:14.5, color:C.navy }}>{c.name}</div>
                        <div style={{ fontSize:12, color:C.sky, fontStyle:"italic", marginTop:2 }}>{c.title}</div>
                        <div style={{ display:"inline-block", marginTop:5, background:C.light, borderRadius:20, padding:"2px 10px", fontSize:10.5, color:C.mid, fontWeight:600 }}>{c.dept}</div>
                      </div>
                    </div>
                    <div style={{ marginTop:12, fontSize:12.5, color:C.mid, lineHeight:1.6 }}>{c.note}</div>
                    <a href={`mailto:${c.email}`} style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:7, marginTop:12, padding:"9px", background:C.navy, color:C.white, borderRadius:8, textDecoration:"none", fontSize:12.5, fontWeight:600 }}>
                      ✉️ {c.email}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ═══ COC ═══ */}
          {tab==="coc" && (
            <div>
              <div style={{ marginBottom:20 }}>
                <h1 style={{ margin:"0 0 4px", fontSize:22, fontWeight:800, color:C.navy }}>Code of Conduct</h1>
                <p style={{ margin:0, fontSize:13, color:C.mid }}>Progressive discipline system. Click a card to see example offenses.</p>
              </div>

              <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:16, marginBottom:24 }}>
                {COC.map((t,i)=>(
                  <div key={i} onClick={()=>setCocExpanded(cocExpanded===i?null:i)} style={{
                    borderRadius:14, overflow:"hidden", cursor:"pointer",
                    boxShadow:cocExpanded===i?`0 0 0 3px ${t.color},0 6px 24px rgba(0,0,0,0.14)`:"0 2px 12px rgba(0,0,0,0.07)",
                    transition:"all 0.2s", transform:cocExpanded===i?"translateY(-2px)":"",
                  }}>
                    <div style={{ background:t.color, padding:"18px 20px" }}>
                      <div style={{ fontSize:22, fontWeight:800, color:t.textColor, fontFamily:"Georgia,serif" }}>{t.type}</div>
                      <div style={{ fontSize:13, color:t.textColor, opacity:.85, marginTop:2 }}>{t.label}</div>
                    </div>
                    <div style={{ background:C.white, padding:"14px 20px" }}>
                      {t.steps.map((s,si)=>(
                        <div key={si} style={{ fontSize:12, color:C.mid, marginBottom:5, display:"flex", gap:6 }}>
                          <span style={{ color:t.color, fontWeight:700 }}>→</span>{s}
                        </div>
                      ))}
                      <div style={{ marginTop:10, padding:"5px 10px", background:C.light, borderRadius:6, fontSize:11, color:C.navy, fontWeight:600, textAlign:"center" }}>
                        Cleansing Period: {t.clean}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {cocExpanded !== null && (
                <div style={{ background:C.white, borderRadius:14, padding:"22px", boxShadow:"0 4px 20px rgba(0,0,0,0.10)", border:`2px solid ${COC[cocExpanded].color}`, marginBottom:20 }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
                    <div>
                      <span style={{ background:COC[cocExpanded].color, color:COC[cocExpanded].textColor, borderRadius:6, padding:"3px 10px", fontSize:12, fontWeight:700, marginRight:9 }}>{COC[cocExpanded].type}</span>
                      <span style={{ fontSize:14, fontWeight:700, color:C.navy }}>Example Offenses</span>
                    </div>
                    <button onClick={()=>setCocExpanded(null)} style={{ background:C.light, border:"none", borderRadius:6, padding:"5px 12px", cursor:"pointer", fontSize:12, color:C.mid }}>✕ Close</button>
                  </div>
                  <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))", gap:9 }}>
                    {COC[cocExpanded].examples.map((ex,ei)=>(
                      <div key={ei} style={{ background:C.light, borderRadius:8, padding:"9px 13px", fontSize:12.5, color:C.mid, display:"flex", gap:7 }}>
                        <span style={{ color:COC[cocExpanded].color, fontWeight:700, flexShrink:0 }}>•</span>{ex}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div style={{ background:C.navy, borderRadius:14, padding:"20px 24px", color:C.white, marginBottom:16 }}>
                <div style={{ fontWeight:700, fontSize:13, marginBottom:8, color:C.cyan }}>📌 Cleansing Period — Incentive Reset Rule</div>
                <div style={{ fontSize:12.5, color:"rgba(255,255,255,0.82)", lineHeight:1.7 }}>
                  After a violation is sanctioned, the employee must maintain a clean record for the cleansing period before becoming fully eligible again for performance-based incentives or commissions. Once the period lapses without a new offense, the record <strong>resets to zero.</strong>
                </div>
                <div style={{ marginTop:10, fontSize:11, color:"#B0CDE8", fontStyle:"italic" }}>
                  Commissions are non-mandatory benefits — adjustments apply to future cycles only and do not reduce wages already earned. (Art. 113, Labor Code)
                </div>
              </div>

              <div style={{ background:C.white, borderRadius:14, padding:"20px 24px", boxShadow:"0 2px 10px rgba(0,0,0,0.06)", marginBottom:20 }}>
                <div style={{ fontWeight:700, fontSize:13, color:C.navy, marginBottom:12 }}>📈 Effects on Promotion</div>
                {[["Verbal Warning","6-month deferral"],["Written Warning","9-month deferral"],["Final Written Warning","12-month deferral"],["Active NTE","On hold until case resolved"]].map(([w,e],i)=>(
                  <div key={i} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"9px 0", borderBottom:i<3?"1px solid #EEF2F7":"none", flexWrap:"wrap", gap:6 }}>
                    <span style={{ fontWeight:600, fontSize:13, color:C.navy }}>{w}</span>
                    <span style={{ fontSize:11.5, color:C.white, background:C.blue, borderRadius:6, padding:"3px 10px" }}>{e}</span>
                  </div>
                ))}
              </div>

              <div style={{ textAlign:"center" }}>
                <a href={CONFIG.cocUrl} target="_blank" rel="noreferrer" style={{ display:"inline-flex", alignItems:"center", gap:7, background:C.navy, color:C.white, padding:"12px 28px", borderRadius:10, fontWeight:700, textDecoration:"none", fontSize:14 }}>
                  📄 View Full COC PDF
                </a>
              </div>
            </div>
          )}

          {/* ═══ DOCUMENTS ═══ */}
          {tab==="docs" && (
            <div>
              <div style={{ marginBottom:20 }}>
                <h1 style={{ margin:"0 0 4px", fontSize:22, fontWeight:800, color:C.navy }}>Documents</h1>
                <p style={{ margin:0, fontSize:13, color:C.mid }}>Official AGS documents. Click to open in a new tab.</p>
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))", gap:20 }}>
                {[
                  { title:"AGS Employee Handbook", version:"Version 2.0 — January 2026", desc:"Employment policies, work standards, leave entitlements, benefits, compensation, and separation procedures.", url:CONFIG.handbookUrl, icon:"📘", color:C.navy, tags:["Employment","Leave","Benefits","Policy","Compensation"] },
                  { title:"AGS Code of Conduct", version:"Version 2.0 — November 2025", desc:"Complete discipline matrix: Type A/B/C offense classifications, progressive disciplinary steps, cleansing periods, and separation procedures.", url:CONFIG.cocUrl, icon:"📋", color:C.blue, tags:["Discipline","Conduct","Offenses","Termination"] },
                ].map((doc,i)=>(
                  <div key={i} style={{ background:C.white, borderRadius:16, boxShadow:"0 2px 14px rgba(0,0,0,0.08)", overflow:"hidden" }}>
                    <div style={{ background:doc.color, padding:"24px 20px", display:"flex", gap:14, alignItems:"center" }}>
                      <span style={{ fontSize:42 }}>{doc.icon}</span>
                      <div>
                        <div style={{ fontWeight:700, fontSize:16, color:C.white }}>{doc.title}</div>
                        <div style={{ fontSize:12, color:"rgba(255,255,255,0.7)", marginTop:3 }}>{doc.version}</div>
                      </div>
                    </div>
                    <div style={{ padding:"20px" }}>
                      <p style={{ fontSize:13, color:C.mid, lineHeight:1.7, margin:"0 0 14px" }}>{doc.desc}</p>
                      <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginBottom:18 }}>
                        {doc.tags.map((tag,ti)=><span key={ti} style={{ background:C.light, color:C.mid, fontSize:11, padding:"2px 10px", borderRadius:20, fontWeight:600 }}>{tag}</span>)}
                      </div>
                      <a href={doc.url} target="_blank" rel="noreferrer" style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:7, background:doc.color, color:C.white, padding:"12px", borderRadius:10, fontWeight:700, textDecoration:"none", fontSize:14 }}>
                        Open Document ↗
                      </a>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop:16, background:C.white, borderRadius:10, padding:"12px 16px", fontSize:12.5, color:C.mid, lineHeight:1.7, borderLeft:`4px solid ${C.blue}`, boxShadow:"0 1px 6px rgba(0,0,0,0.06)" }}>
                ℹ️ Documents open from Google Drive. If you see a permission error, contact HR at <a href={`mailto:${CONFIG.hrEmail}`} style={{ color:C.blue }}>{CONFIG.hrEmail}</a>.
              </div>
            </div>
          )}

          {/* ═══ EMAIL HR ═══ */}
          {tab==="email" && (
            <div>
              <div style={{ marginBottom:20 }}>
                <h1 style={{ margin:"0 0 4px", fontSize:22, fontWeight:800, color:C.navy }}>Email HR</h1>
                <p style={{ margin:0, fontSize:13, color:C.mid }}>Fill out the form — it opens pre-filled in your email app. Click Send to complete.</p>
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:24 }}>
                <div style={{ background:C.white, borderRadius:14, padding:"26px", boxShadow:"0 2px 14px rgba(0,0,0,0.08)" }}>
                  <form onSubmit={sendEmail}>
                    {[{label:"Your Full Name",key:"name",ph:"e.g. Juan dela Cruz"},{label:"Department / Account",key:"dept",ph:"e.g. Operations — Mark Laurente's Team"},{label:"Subject",key:"subject",ph:"e.g. Leave Application, Policy Clarification…"}].map(f=>(
                      <div key={f.key} style={{ marginBottom:14 }}>
                        <label style={{ fontSize:12.5, fontWeight:600, color:C.navy, display:"block", marginBottom:5 }}>{f.label} <span style={{ color:"red" }}>*</span></label>
                        <input required placeholder={f.ph} value={form[f.key]} onChange={e=>setForm(p=>({...p,[f.key]:e.target.value}))}
                          style={{ width:"100%", padding:"10px 13px", borderRadius:8, border:"1.5px solid #CBD5E0", fontSize:13, boxSizing:"border-box", outline:"none" }}
                          onFocus={e=>e.target.style.borderColor=C.cyan} onBlur={e=>e.target.style.borderColor="#CBD5E0"}/>
                      </div>
                    ))}
                    <div style={{ marginBottom:18 }}>
                      <label style={{ fontSize:12.5, fontWeight:600, color:C.navy, display:"block", marginBottom:5 }}>Message <span style={{ color:"red" }}>*</span></label>
                      <textarea required rows={5} placeholder="Write your message here…" value={form.message} onChange={e=>setForm(p=>({...p,message:e.target.value}))}
                        style={{ width:"100%", padding:"10px 13px", borderRadius:8, border:"1.5px solid #CBD5E0", fontSize:13, boxSizing:"border-box", resize:"vertical", outline:"none", fontFamily:"inherit" }}
                        onFocus={e=>e.target.style.borderColor=C.cyan} onBlur={e=>e.target.style.borderColor="#CBD5E0"}/>
                    </div>
                    <button type="submit" style={{ width:"100%", padding:"13px", background:sent?"#22C55E":C.navy, color:C.white, border:"none", borderRadius:9, fontWeight:700, fontSize:14, cursor:"pointer", transition:"background 0.2s", display:"flex", alignItems:"center", justifyContent:"center", gap:8 }}>
                      {sent?"✓ Email client opened!":"✉️ Open in Email App"}
                    </button>
                    <p style={{ fontSize:11, color:C.mid, marginTop:10, textAlign:"center", lineHeight:1.6 }}>Opens Gmail/Outlook pre-filled. Click Send there to complete.</p>
                  </form>
                </div>
                <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
                  <div style={{ background:C.navy, borderRadius:13, padding:"22px", color:C.white }}>
                    <div style={{ fontSize:12, color:C.cyan, fontWeight:600, letterSpacing:1, marginBottom:10 }}>SENDING TO</div>
                    <div style={{ fontWeight:700, fontSize:15 }}>HR & Compliance Department</div>
                    <div style={{ fontSize:12.5, color:"rgba(255,255,255,.7)", marginTop:3 }}>Alliance Global Solutions</div>
                    <div style={{ marginTop:12, padding:"10px", background:"rgba(255,255,255,.08)", borderRadius:8, fontSize:13, color:C.cyan, fontWeight:600 }}>📧 {CONFIG.hrEmail}</div>
                    <div style={{ marginTop:8, padding:"10px", background:"rgba(255,255,255,.05)", borderRadius:8, fontSize:12, color:"rgba(255,255,255,.6)" }}>📧 Distro: {CONFIG.distroEmail}</div>
                    <div style={{ marginTop:12, fontSize:11.5, color:"rgba(255,255,255,.5)", lineHeight:1.7 }}>📍 {CONFIG.address}</div>
                  </div>
                  <div style={{ background:C.white, borderRadius:13, padding:"18px", boxShadow:"0 2px 10px rgba(0,0,0,.07)" }}>
                    <div style={{ fontWeight:700, fontSize:13, color:C.navy, marginBottom:10 }}>Common HR Requests</div>
                    {["Leave application or approval","Certificate of employment","Payslip or payroll concern","Policy clarification","Personnel file request","Disciplinary concern","SSS, PhilHealth, or Pag-IBIG inquiry","Government loan disclosure"].map((item,i)=>(
                      <div key={i} onClick={()=>setForm(p=>({...p,subject:item}))}
                        style={{ fontSize:12.5, color:C.mid, padding:"7px 0", borderBottom:i<7?"1px solid #EEF2F7":"none", cursor:"pointer", display:"flex", gap:7, alignItems:"center" }}
                        onMouseEnter={e=>e.currentTarget.style.color=C.navy}
                        onMouseLeave={e=>e.currentTarget.style.color=C.mid}
                      >
                        <span style={{ color:C.gold, fontWeight:700 }}>↗</span>{item}
                      </div>
                    ))}
                    <div style={{ fontSize:11, color:C.mid, marginTop:8, fontStyle:"italic" }}>Click any item to use as subject line.</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* ── Chatbot ── */}
      {chatOpen && <Chatbot onClose={() => setChatOpen(false)} />}

      {/* ── Floating chat button ── */}
      {!chatOpen && (
        <button onClick={() => setChatOpen(true)} style={{
          position:"fixed", bottom:24, right:24,
          background:C.navy, color:C.white, border:`2px solid ${C.cyan}`,
          borderRadius:"50%", width:58, height:58, fontSize:26,
          cursor:"pointer", boxShadow:"0 4px 20px rgba(0,0,0,0.25)",
          display:"flex", alignItems:"center", justifyContent:"center",
          transition:"transform 0.2s",
          zIndex:999,
        }}
          onMouseEnter={e=>e.currentTarget.style.transform="scale(1.1)"}
          onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}
          title="Ask HR Assistant"
        >🤖</button>
      )}

      <style>{`
        * { box-sizing: border-box; }
        body { margin: 0; }
        @media (max-width: 768px) {
          aside { transform: translateX(-220px); transition: transform 0.25s; }
          aside.open { transform: translateX(0) !important; }
          main > div > div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; }
          div[style*="marginLeft: 220"] { margin-left: 0 !important; }
        }
      `}</style>
    </div>
  );
}
