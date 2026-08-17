import { useState } from "react";

const NAVY  = "#1A2F5E";
const BLUE  = "#1D5CA8";
const SKY   = "#3B82C4";
const CYAN  = "#4DB8E8";
const GOLD  = "#E8A020";
const WHITE = "#FFFFFF";
const LIGHT = "#F4F6FA";
const MID   = "#4A5568";

const CONFIG = {
  hrEmail: "hr@allianceglobal.ph",
  companyName: "Alliance Global Solutions",
  address: "17th Floor, North Tower 1 EDSA cor. North Avenue, Quezon City",
  website: "www.allianceglobal.ph",
  handbookUrl: "#",
  cocUrl: "#",
};

const CONTACTS = [
  { name:"John Patrick Costales", title:"HR & Compliance Manager", dept:"Human Resources", email:"jpcostales@allianceglobal.ph", initials:"JP", color:NAVY, note:"Primary point of contact for all HR matters, compliance, and policy questions." },
  { name:"Reca Febrero", title:"HR Generalist", dept:"Human Resources", email:CONFIG.hrEmail, initials:"RF", color:SKY, note:"Handles onboarding, employee records, day-to-day HR operations, and employee relations." },
  { name:"Cyril Joshua Tigranes", title:"Special Projects Lead", dept:"Human Resources", email:CONFIG.hrEmail, initials:"CJ", color:BLUE, note:"Leads cross-functional HR projects and special initiatives across teams." },
  { name:"Dither Reyes", title:"Reports Lead", dept:"Human Resources", email:CONFIG.hrEmail, initials:"DR", color:BLUE, note:"Manages HR data, analytics, reporting, and employee record accuracy." },
  { name:"Allyssa Esmino", title:"Quality & Training Specialist", dept:"Quality & Training", email:CONFIG.hrEmail, initials:"AE", color:"#0D6E74", note:"QA monitoring, training delivery, and performance coaching — Mark D. Laurente's team." },
  { name:"Raphael Bucatcat", title:"Quality & Training Specialist", dept:"Quality & Training", email:CONFIG.hrEmail, initials:"RB", color:"#0D6E74", note:"QA calibration, coaching, and continuous improvement — Paul A. Bulanadi's team." },
  { name:"Reginald Antonio", title:"IT Administrator", dept:"IT Support", email:CONFIG.hrEmail, initials:"RA", color:MID, note:"IT systems, access credentials, and technical infrastructure." },
];

const COC_TYPES = [
  { type:"TYPE A", label:"Minor Offenses", color:GOLD, textColor:NAVY,
    steps:["1st — Verbal Warning","2nd — Final Verbal Warning + −25% commission","3rd — Written Warning + −50% commission","4th — Final Written Warning + −75% commission","5th — Dismissal"],
    examples:["Non-observance of break time","Tardiness 6× a month or 60+ min","AWOL 1–2 days without approval","Late filing of planned leaves","Inefficiency / repeated mistakes","Loitering or sleeping on duty","Unauthorized workstation transfer"],
    clean:"Cleansing Period: 1 Month" },
  { type:"TYPE B", label:"Serious Offenses", color:SKY, textColor:NAVY,
    steps:["1st — Written Warning + −50% commission","2nd — Final Written Warning + −75% commission","3rd — Dismissal"],
    examples:["No Call, No Show (NCNS)","Discourtesy to colleagues or clients","Misuse of company property","Using internet for personal business","Abandonment (3+ consecutive days AWOL)","Failure to liquidate funds on time"],
    clean:"Cleansing Period: 3 Months" },
  { type:"TYPE C", label:"Grave Offenses", color:NAVY, textColor:WHITE,
    steps:["Immediate Dismissal","If retained (exceptional): 6-month incentive ineligibility"],
    examples:["Falsification of records or time sheets","Theft, fraud, or embezzlement","Sexual harassment or intimidation","Insubordination","Disclosure of trade secrets","Positive drug test result","Abuse of authority over subordinates"],
    clean:"Cleansing Period: 6 Months" },
];

// Org tree data
const ORG_L2 = [
  { name:"John Patrick\nCostales", title:"HR & Compliance Mgr", gold:true, subs:[
    {name:"Cyril Joshua\nTigranes",title:"Special Projects Lead"},
    {name:"Reca\nFebrero",title:"HR Generalist"},
    {name:"Dither\nReyes",title:"Reports Lead"},
    {name:"Reginald\nAntonio",title:"IT Administrator"},
  ]},
  { name:"Mark Dwane\nLaurente", title:"Account Manager", gold:false, subs:[
    {name:"Gerald\nHilomen",title:"Team Leader"},
    {name:"Roxanne\nReyes",title:"Team Leader"},
    {name:"Allyssa\nEsmino",title:"QT Specialist",qt:true},
    {name:"Jessa\nMalinao",title:"TL in Training"},
  ]},
  { name:"Paul Anthony\nBulanadi", title:"Account Manager", gold:false, subs:[
    {name:"John T.\nPineda",title:"Team Leader"},
    {name:"Raphael\nBucatcat",title:"QT Specialist",qt:true},
  ]},
  { name:"Darell\nLomibao", title:"Account Manager", gold:false, subs:[] },
  { name:"Djanisse\nToledo", title:"Account Manager", gold:false, subs:[
    {name:"Carl S.P.\nOng",title:"Senior TL",
     subs:[{name:"Lyanah\nHutchison",title:"Team Leader"}]},
  ]},
];

function Avatar({ initials, color, size=48 }) {
  return (
    <div style={{width:size,height:size,borderRadius:"50%",background:color,display:"flex",alignItems:"center",justifyContent:"center",color:WHITE,fontWeight:700,fontSize:size*.35,flexShrink:0,fontFamily:"Georgia,serif",boxShadow:"0 2px 8px rgba(0,0,0,.18)"}}>
      {initials}
    </div>
  );
}

function OrgCard({ node, depth=0 }) {
  const [open, setOpen] = useState(true);
  const hasSubs = node.subs && node.subs.length > 0;
  return (
    <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
      <div onClick={()=>hasSubs&&setOpen(o=>!o)} style={{
        background: node.gold ? GOLD : node.qt ? "#0D6E74" : WHITE,
        border:`2px solid ${node.gold?GOLD:node.qt?"#0D6E74":"#CBD5E0"}`,
        borderRadius:10,padding:"8px 12px",minWidth:110,maxWidth:140,
        textAlign:"center",cursor:hasSubs?"pointer":"default",
        boxShadow:"0 2px 8px rgba(0,0,0,.08)",position:"relative",
      }}>
        <div style={{fontSize:11,fontWeight:700,color:node.gold||node.qt?WHITE:NAVY,lineHeight:1.3,whiteSpace:"pre-line"}}>{node.name}</div>
        <div style={{fontSize:9.5,color:node.gold?NAVY:node.qt?CYAN:MID,marginTop:2}}>{node.title}</div>
        {hasSubs&&<div style={{position:"absolute",bottom:-9,left:"50%",transform:"translateX(-50%)",background:BLUE,color:WHITE,borderRadius:"50%",width:16,height:16,fontSize:10,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700}}>{open?"−":"+"}</div>}
      </div>
      {hasSubs&&open&&(
        <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
          <div style={{width:2,height:20,background:"#CBD5E0",marginTop:10}}/>
          <div style={{display:"flex",gap:10,alignItems:"flex-start",position:"relative"}}>
            {node.subs.length>1&&<div style={{position:"absolute",top:0,height:2,background:"#CBD5E0",left:"8%",right:"8%"}}/>}
            {node.subs.map((s,i)=>(
              <div key={i} style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
                <div style={{width:2,height:18,background:"#CBD5E0"}}/>
                <OrgCard node={s} depth={depth+1}/>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function PageHeader({title,sub}){
  return(
    <div style={{marginBottom:24}}>
      <h1 style={{margin:"0 0 5px",fontSize:24,fontWeight:800,color:NAVY}}>{title}</h1>
      <p style={{margin:0,fontSize:13,color:MID}}>{sub}</p>
    </div>
  );
}

function InfoBox({children,color,icon}){
  return(
    <div style={{marginTop:18,background:WHITE,borderRadius:10,padding:"12px 16px",fontSize:12,color:MID,lineHeight:1.7,borderLeft:`4px solid ${color}`,boxShadow:"0 1px 6px rgba(0,0,0,.06)"}}>
      {icon&&<span style={{marginRight:7}}>{icon}</span>}{children}
    </div>
  );
}

export default function App() {
  const [tab, setTab] = useState("orgchart");
  const [cocType, setCocType] = useState(null);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({name:"",dept:"",subject:"",message:""});
  const [sent, setSent] = useState(false);

  const tabs=[
    {id:"orgchart",label:"Org Chart",icon:"🏢"},
    {id:"contacts",label:"Contacts",icon:"👥"},
    {id:"coc",label:"Code of Conduct",icon:"📋"},
    {id:"docs",label:"Documents",icon:"📄"},
    {id:"email",label:"Email HR",icon:"✉️"},
  ];

  const filtered = CONTACTS.filter(c=>
    c.name.toLowerCase().includes(search.toLowerCase())||
    c.dept.toLowerCase().includes(search.toLowerCase())||
    c.title.toLowerCase().includes(search.toLowerCase())
  );

  function sendEmail(e){
    e.preventDefault();
    const s=encodeURIComponent(`[AGS Portal] ${form.subject}`);
    const b=encodeURIComponent(`From: ${form.name} (${form.dept})\n\n${form.message}`);
    window.open(`mailto:${CONFIG.hrEmail}?subject=${s}&body=${b}`,"_blank");
    setSent(true);
    setTimeout(()=>setSent(false),4000);
  }

  return (
    <div style={{minHeight:"100vh",background:LIGHT,fontFamily:"system-ui,sans-serif"}}>

      {/* Header */}
      <header style={{background:NAVY,color:WHITE,padding:"0 20px",display:"flex",alignItems:"center",justifyContent:"space-between",height:58,position:"sticky",top:0,zIndex:100,boxShadow:"0 2px 12px rgba(0,0,0,.25)"}}>
        <div style={{display:"flex",alignItems:"center",gap:12}}>
          <div style={{width:34,height:34,borderRadius:7,background:GOLD,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900,fontSize:18,color:NAVY}}>A</div>
          <div>
            <div style={{fontWeight:700,fontSize:14,letterSpacing:.2}}>Alliance Global Solutions</div>
            <div style={{fontSize:10,color:CYAN,letterSpacing:1}}>EMPLOYEE PORTAL</div>
          </div>
        </div>
        <nav style={{display:"flex",gap:2}}>
          {tabs.map(t=>(
            <button key={t.id} onClick={()=>setTab(t.id)} style={{
              background:tab===t.id?GOLD:"transparent",
              color:tab===t.id?NAVY:"rgba(255,255,255,.8)",
              border:"none",borderRadius:7,padding:"7px 12px",
              fontWeight:tab===t.id?700:500,fontSize:12,
              cursor:"pointer",display:"flex",alignItems:"center",gap:5,
              transition:"all .15s",
            }}>
              <span>{t.icon}</span><span style={{display:"none"}}>{t.label}</span>
              <span>{t.label}</span>
            </button>
          ))}
        </nav>
      </header>

      <main style={{maxWidth:1060,margin:"0 auto",padding:"28px 18px 56px"}}>

        {/* ═══ ORG CHART ═══ */}
        {tab==="orgchart"&&(
          <section>
            <PageHeader title="Organizational Chart" sub="Click any card with + to expand. Click − to collapse."/>
            <div style={{background:WHITE,borderRadius:14,padding:"28px 16px",boxShadow:"0 2px 16px rgba(0,0,0,.07)",overflowX:"auto"}}>
              {/* Legend */}
              <div style={{display:"flex",gap:16,flexWrap:"wrap",marginBottom:24,justifyContent:"center"}}>
                {[{c:WHITE,b:"#CBD5E0",l:"Staff"},{c:GOLD,b:GOLD,l:"HR Manager"},{c:"#0D6E74",b:"#0D6E74",l:"QT Specialist"}].map((lg,i)=>(
                  <div key={i} style={{display:"flex",alignItems:"center",gap:7,fontSize:11.5,color:MID}}>
                    <div style={{width:18,height:12,borderRadius:3,background:lg.c,border:`2px solid ${lg.b}`}}/>
                    {lg.l}
                  </div>
                ))}
              </div>
              {/* Tree */}
              <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
                {/* Site Director */}
                <div style={{background:NAVY,color:WHITE,borderRadius:12,padding:"10px 24px",textAlign:"center",boxShadow:"0 4px 16px rgba(26,47,94,.35)"}}>
                  <div style={{fontSize:9,color:CYAN,letterSpacing:2,marginBottom:3}}>SITE DIRECTOR</div>
                  <div style={{fontWeight:700,fontSize:14}}>Martin Jacov De Vera</div>
                  <div style={{fontSize:10,color:CYAN,marginTop:2}}>Site Director</div>
                </div>
                <div style={{width:2,height:24,background:"#CBD5E0"}}/>
                {/* L2 row */}
                <div style={{position:"relative",display:"flex",gap:14,alignItems:"flex-start",flexWrap:"wrap",justifyContent:"center"}}>
                  <div style={{position:"absolute",top:0,height:2,background:"#CBD5E0",left:"4%",right:"4%"}}/>
                  {ORG_L2.map((mgr,i)=>(
                    <div key={i} style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
                      <div style={{width:2,height:18,background:"#CBD5E0"}}/>
                      <div style={{background:mgr.gold?GOLD:WHITE,border:`2px solid ${mgr.gold?GOLD:"#CBD5E0"}`,borderRadius:10,padding:"8px 12px",minWidth:118,maxWidth:148,textAlign:"center",boxShadow:"0 2px 10px rgba(0,0,0,.08)"}}>
                        <div style={{fontSize:11.5,fontWeight:700,color:NAVY,lineHeight:1.3,whiteSpace:"pre-line"}}>{mgr.name}</div>
                        <div style={{fontSize:10,color:mgr.gold?NAVY:BLUE,marginTop:3}}>{mgr.title}</div>
                      </div>
                      {mgr.subs.length>0&&(
                        <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
                          <div style={{width:2,height:16,background:"#CBD5E0",marginTop:4}}/>
                          <div style={{position:"relative",display:"flex",gap:8,alignItems:"flex-start"}}>
                            {mgr.subs.length>1&&<div style={{position:"absolute",top:0,height:2,background:"#CBD5E0",left:"10%",right:"10%"}}/>}
                            {mgr.subs.map((sub,j)=>(
                              <div key={j} style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
                                <div style={{width:2,height:16,background:"#CBD5E0"}}/>
                                <OrgCard node={sub} depth={2}/>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <InfoBox color={NAVY} icon="💡">
              <strong>Gold</strong> = HR & Compliance Manager (your primary HR contact). <strong>Teal</strong> = Quality & Training Specialists. Click <strong>+</strong> to expand any node.
            </InfoBox>
          </section>
        )}

        {/* ═══ CONTACTS ═══ */}
        {tab==="contacts"&&(
          <section>
            <PageHeader title="Points of Contact" sub="Find the right person. Click their email address to reach out directly."/>
            <div style={{marginBottom:18,position:"relative"}}>
              <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search by name, title, or department…" style={{width:"100%",padding:"11px 14px 11px 42px",borderRadius:9,border:"1.5px solid #CBD5E0",fontSize:13,boxSizing:"border-box",outline:"none",background:WHITE}}/>
              <span style={{position:"absolute",left:13,top:"50%",transform:"translateY(-50%)",fontSize:17,opacity:.5}}>🔍</span>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(290px,1fr))",gap:14}}>
              {filtered.map((c,i)=>(
                <div key={i} style={{background:WHITE,borderRadius:13,padding:"18px",boxShadow:"0 2px 12px rgba(0,0,0,.07)",border:"1.5px solid #EEF2F7"}}>
                  <div style={{display:"flex",gap:13,alignItems:"flex-start"}}>
                    <Avatar initials={c.initials} color={c.color} size={48}/>
                    <div style={{flex:1}}>
                      <div style={{fontWeight:700,fontSize:14,color:NAVY}}>{c.name}</div>
                      <div style={{fontSize:11.5,color:c.color,fontStyle:"italic",marginTop:2}}>{c.title}</div>
                      <div style={{display:"inline-block",marginTop:5,background:LIGHT,borderRadius:20,padding:"2px 9px",fontSize:10.5,color:MID,fontWeight:600}}>{c.dept}</div>
                    </div>
                  </div>
                  <div style={{marginTop:12,fontSize:12.5,color:MID,lineHeight:1.6}}>{c.note}</div>
                  <a href={`mailto:${c.email}`} style={{display:"flex",alignItems:"center",gap:7,marginTop:12,padding:"8px 12px",background:NAVY,color:WHITE,borderRadius:8,textDecoration:"none",fontSize:11.5,fontWeight:600,justifyContent:"center"}}>
                    ✉️ {c.email}
                  </a>
                </div>
              ))}
            </div>
            {filtered.length===0&&<div style={{textAlign:"center",padding:"50px",color:MID}}>No results for "<strong>{search}</strong>"</div>}
          </section>
        )}

        {/* ═══ CODE OF CONDUCT ═══ */}
        {tab==="coc"&&(
          <section>
            <PageHeader title="Code of Conduct" sub="Progressive discipline system. Click a card to see example offenses."/>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:14,marginBottom:26}}>
              {COC_TYPES.map((t,i)=>(
                <div key={i} onClick={()=>setCocType(cocType===i?null:i)} style={{borderRadius:13,overflow:"hidden",cursor:"pointer",boxShadow:cocType===i?`0 0 0 3px ${t.color},0 6px 20px rgba(0,0,0,.14)`:"0 2px 12px rgba(0,0,0,.07)",transition:"box-shadow .2s,transform .15s",transform:cocType===i?"translateY(-2px)":""}}>
                  <div style={{background:t.color,padding:"16px 18px"}}>
                    <div style={{fontSize:20,fontWeight:800,color:t.textColor,fontFamily:"Georgia,serif"}}>{t.type}</div>
                    <div style={{fontSize:12,color:t.textColor,opacity:.85,marginTop:2}}>{t.label}</div>
                  </div>
                  <div style={{background:WHITE,padding:"14px 18px"}}>
                    {t.steps.map((s,si)=>(
                      <div key={si} style={{fontSize:12,color:MID,marginBottom:4,display:"flex",gap:6}}>
                        <span style={{color:t.color,fontWeight:700}}>→</span>{s}
                      </div>
                    ))}
                    <div style={{marginTop:10,padding:"5px 10px",background:LIGHT,borderRadius:6,fontSize:10.5,color:NAVY,fontWeight:600,textAlign:"center"}}>{t.clean}</div>
                  </div>
                </div>
              ))}
            </div>

            {cocType!==null&&(
              <div style={{background:WHITE,borderRadius:13,padding:"22px",boxShadow:"0 4px 20px rgba(0,0,0,.10)",border:`2px solid ${COC_TYPES[cocType].color}`,marginBottom:20}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
                  <div>
                    <span style={{background:COC_TYPES[cocType].color,color:COC_TYPES[cocType].textColor,borderRadius:6,padding:"3px 10px",fontSize:12,fontWeight:700,marginRight:9}}>{COC_TYPES[cocType].type}</span>
                    <span style={{fontSize:14,fontWeight:700,color:NAVY}}>Example Offenses</span>
                  </div>
                  <button onClick={()=>setCocType(null)} style={{background:LIGHT,border:"none",borderRadius:6,padding:"5px 12px",cursor:"pointer",fontSize:12,color:MID}}>✕</button>
                </div>
                <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:9}}>
                  {COC_TYPES[cocType].examples.map((ex,ei)=>(
                    <div key={ei} style={{background:LIGHT,borderRadius:7,padding:"9px 13px",fontSize:12.5,color:MID,display:"flex",gap:7}}>
                      <span style={{color:COC_TYPES[cocType].color,fontWeight:700,flexShrink:0}}>•</span>{ex}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div style={{background:NAVY,borderRadius:13,padding:"18px 22px",color:WHITE,marginBottom:18}}>
              <div style={{fontWeight:700,fontSize:13,marginBottom:8,color:CYAN}}>📌 Cleansing Period — Incentive Reset</div>
              <div style={{fontSize:12.5,color:"rgba(255,255,255,.82)",lineHeight:1.7}}>
                After a violation, the employee must maintain a clean record for the cleansing period before regaining full eligibility for performance-based incentives. Once it lapses without a new offense, the disciplinary record for that type <strong>resets to zero.</strong>
              </div>
              <div style={{marginTop:10,fontSize:11,color:"#B0CDE8",fontStyle:"italic"}}>
                Commissions are non-mandatory benefits — adjustments apply to future cycles only and do not reduce wages already earned. (Art. 113, Labor Code)
              </div>
            </div>

            <div style={{background:WHITE,borderRadius:13,padding:"18px 22px",boxShadow:"0 2px 10px rgba(0,0,0,.06)",marginBottom:18}}>
              <div style={{fontWeight:700,fontSize:13,color:NAVY,marginBottom:12}}>📈 Effects on Promotion</div>
              {[["Verbal Warning","6-month deferral"],["Written Warning","9-month deferral"],["Final Written Warning","12-month deferral"],["Active NTE","On hold until case resolved"]].map(([w,e],i)=>(
                <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"9px 0",borderBottom:i<3?"1px solid #EEF2F7":"none",flexWrap:"wrap",gap:6}}>
                  <span style={{fontWeight:600,fontSize:13,color:NAVY}}>{w}</span>
                  <span style={{fontSize:11.5,color:WHITE,background:BLUE,borderRadius:6,padding:"3px 10px"}}>{e}</span>
                </div>
              ))}
            </div>

            <div style={{textAlign:"center"}}>
              <a href={CONFIG.cocUrl} target="_blank" rel="noreferrer" style={{display:"inline-flex",alignItems:"center",gap:7,background:NAVY,color:WHITE,padding:"11px 26px",borderRadius:9,fontWeight:700,textDecoration:"none",fontSize:13,boxShadow:"0 2px 10px rgba(26,47,94,.28)"}}>
                📄 View Full COC PDF
              </a>
            </div>
          </section>
        )}

        {/* ═══ DOCUMENTS ═══ */}
        {tab==="docs"&&(
          <section>
            <PageHeader title="Documents" sub="Official AGS documents. Click to open in a new tab."/>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:18}}>
              {[
                {title:"AGS Employee Handbook",version:"Version 2.0 — January 2026",desc:"Employment policies, work standards, leave entitlements, benefits, and separation procedures.",url:CONFIG.handbookUrl,icon:"📘",color:NAVY,tags:["Employment","Leave","Benefits","Policy"]},
                {title:"AGS Code of Conduct",version:"Version 2.0 — November 2025",desc:"Complete discipline matrix: Type A/B/C offenses, progressive steps, cleansing periods, and separation procedures.",url:CONFIG.cocUrl,icon:"📋",color:BLUE,tags:["Discipline","Conduct","Offenses","Termination"]},
              ].map((doc,i)=>(
                <div key={i} style={{background:WHITE,borderRadius:14,boxShadow:"0 2px 14px rgba(0,0,0,.08)",overflow:"hidden",border:"1.5px solid #EEF2F7"}}>
                  <div style={{background:doc.color,padding:"22px 20px",display:"flex",gap:14,alignItems:"center"}}>
                    <span style={{fontSize:36}}>{doc.icon}</span>
                    <div>
                      <div style={{fontWeight:700,fontSize:15,color:WHITE}}>{doc.title}</div>
                      <div style={{fontSize:11.5,color:"rgba(255,255,255,.7)",marginTop:3}}>{doc.version}</div>
                    </div>
                  </div>
                  <div style={{padding:"18px"}}>
                    <p style={{fontSize:12.5,color:MID,lineHeight:1.7,margin:"0 0 14px"}}>{doc.desc}</p>
                    <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:18}}>
                      {doc.tags.map((tag,ti)=><span key={ti} style={{background:LIGHT,color:MID,fontSize:10.5,padding:"2px 9px",borderRadius:20,fontWeight:600}}>{tag}</span>)}
                    </div>
                    <a href={doc.url} target="_blank" rel="noreferrer" style={{display:"flex",alignItems:"center",justifyContent:"center",gap:7,background:doc.color,color:WHITE,padding:"11px",borderRadius:9,fontWeight:700,textDecoration:"none",fontSize:13}}>
                      Open Document ↗
                    </a>
                  </div>
                </div>
              ))}
            </div>
            <InfoBox color={BLUE} icon="ℹ️">
              Documents open from Google Drive. If you see a permission error, contact HR to request access. Set links to "Anyone with the link can view" in Google Drive share settings.
            </InfoBox>
          </section>
        )}

        {/* ═══ EMAIL HR ═══ */}
        {tab==="email"&&(
          <section>
            <PageHeader title="Email HR" sub="Fill out the form — it will open pre-filled in your email app. Click Send to complete."/>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:20}}>
              <div style={{background:WHITE,borderRadius:14,padding:"24px",boxShadow:"0 2px 14px rgba(0,0,0,.08)"}}>
                <form onSubmit={sendEmail}>
                  {[{label:"Your Full Name",key:"name",ph:"e.g. Juan dela Cruz"},{label:"Department / Account",key:"dept",ph:"e.g. Operations — Mark Laurente's Team"},{label:"Subject",key:"subject",ph:"e.g. Leave Application, Payslip Concern…"}].map(f=>(
                    <div key={f.key} style={{marginBottom:14}}>
                      <label style={{fontSize:12.5,fontWeight:600,color:NAVY,display:"block",marginBottom:5}}>{f.label} <span style={{color:"red"}}>*</span></label>
                      <input required placeholder={f.ph} value={form[f.key]} onChange={e=>setForm(p=>({...p,[f.key]:e.target.value}))}
                        style={{width:"100%",padding:"9px 13px",borderRadius:8,border:"1.5px solid #CBD5E0",fontSize:13,boxSizing:"border-box",outline:"none"}}
                        onFocus={e=>e.target.style.borderColor=BLUE} onBlur={e=>e.target.style.borderColor="#CBD5E0"}/>
                    </div>
                  ))}
                  <div style={{marginBottom:18}}>
                    <label style={{fontSize:12.5,fontWeight:600,color:NAVY,display:"block",marginBottom:5}}>Message <span style={{color:"red"}}>*</span></label>
                    <textarea required rows={5} placeholder="Write your message here…" value={form.message} onChange={e=>setForm(p=>({...p,message:e.target.value}))}
                      style={{width:"100%",padding:"9px 13px",borderRadius:8,border:"1.5px solid #CBD5E0",fontSize:13,boxSizing:"border-box",resize:"vertical",outline:"none",fontFamily:"inherit"}}
                      onFocus={e=>e.target.style.borderColor=BLUE} onBlur={e=>e.target.style.borderColor="#CBD5E0"}/>
                  </div>
                  <button type="submit" style={{width:"100%",padding:"13px",background:sent?"#22C55E":NAVY,color:WHITE,border:"none",borderRadius:9,fontWeight:700,fontSize:14,cursor:"pointer",transition:"background .2s",display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
                    {sent?"✓ Email client opened!":"✉️ Open in Email App"}
                  </button>
                  <p style={{fontSize:11,color:MID,marginTop:10,textAlign:"center",lineHeight:1.6}}>
                    Opens your email app (Gmail, Outlook, etc.) pre-filled. Click Send there to complete.
                  </p>
                </form>
              </div>
              <div style={{display:"flex",flexDirection:"column",gap:14}}>
                <div style={{background:NAVY,borderRadius:13,padding:"22px",color:WHITE}}>
                  <div style={{fontSize:12,color:CYAN,fontWeight:600,letterSpacing:1,marginBottom:10}}>SENDING TO</div>
                  <div style={{fontWeight:700,fontSize:15}}>HR & Compliance Department</div>
                  <div style={{fontSize:12.5,color:"rgba(255,255,255,.7)",marginTop:3}}>Alliance Global Solutions</div>
                  <div style={{marginTop:14,padding:"10px",background:"rgba(255,255,255,.08)",borderRadius:8,fontSize:13,color:CYAN,fontWeight:600,wordBreak:"break-all"}}>
                    📧 {CONFIG.hrEmail}
                  </div>
                  <div style={{marginTop:14,fontSize:11.5,color:"rgba(255,255,255,.6)",lineHeight:1.7}}>📍 {CONFIG.address}</div>
                </div>
                <div style={{background:WHITE,borderRadius:13,padding:"18px",boxShadow:"0 2px 10px rgba(0,0,0,.07)"}}>
                  <div style={{fontWeight:700,fontSize:13,color:NAVY,marginBottom:10}}>Common HR Requests</div>
                  {["Leave application or approval","Certificate of employment","Payslip or payroll concern","Policy clarification","Personnel file request","Disciplinary concern","SSS, PhilHealth, or Pag-IBIG inquiry"].map((item,i)=>(
                    <div key={i} onClick={()=>setForm(p=>({...p,subject:item}))}
                      style={{fontSize:12.5,color:MID,padding:"7px 0",borderBottom:i<6?"1px solid #EEF2F7":"none",cursor:"pointer",display:"flex",gap:7,alignItems:"center"}}>
                      <span style={{color:GOLD,fontWeight:700}}>↗</span>{item}
                    </div>
                  ))}
                  <div style={{fontSize:11,color:MID,marginTop:8,fontStyle:"italic"}}>Click any item to use as subject line.</div>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      <footer style={{background:NAVY,color:"rgba(255,255,255,.45)",textAlign:"center",padding:"18px",fontSize:11.5,lineHeight:1.8}}>
        <div style={{color:"rgba(255,255,255,.8)",fontWeight:600,marginBottom:3}}>{CONFIG.companyName} — Employee Portal</div>
        <div>{CONFIG.address}</div>
        <div>{CONFIG.website}</div>
      </footer>

      <style>{`*{box-sizing:border-box}body{margin:0}@keyframes fadeIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}@media(max-width:680px){nav span:last-child{display:none!important}main>section>div[style*="grid-template-columns: 1fr 1fr"]{grid-template-columns:1fr!important}}`}</style>
    </div>
  );
}
