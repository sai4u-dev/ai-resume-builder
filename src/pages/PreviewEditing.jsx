import { useState, useRef, useEffect } from "react";
import { BsCode, BsGithub } from "react-icons/bs";
import { FaGlobe, FaLinkedinIn } from "react-icons/fa";

// ─── Dummy  data ────────────────────────────────────────────────────────────
const INIT = {
    firstName: "Alex", lastName: "Morgan", title: "Full-Stack Developer",
    email: "alex@example.com", phone: "+91 98765 43210",
    location: "Hyderabad, India", linkedin: "linkedin.com/in/alexmorgan",
    github: "github.com/alexmorgan", website: "alexmorgan.dev",
    summary: "Passionate developer with 3+ years of experience building scalable web applications. Skilled in React, Node.js, and cloud infrastructure.",
    skills: "React, Node.js, TypeScript, MongoDB, AWS, Docker, Git",
    certifications: "AWS Certified Developer, Google Cloud Associate",
    languages: "English, Hindi, Telugu",
    experience: [
        { company: "TechCorp Solutions", role: "Senior Developer", startDate: "Jan 2022", endDate: "", current: true, description: "Led a team of 5 engineers to build a real-time analytics dashboard serving 50k+ users." },
        { company: "StartupXYZ", role: "Frontend Developer", startDate: "Jun 2020", endDate: "Dec 2021", current: false, description: "Built responsive React applications and improved page load speed by 40%." },
    ],
    education: [
        { institution: "JNTU Hyderabad", degree: "B.Tech", field: "Computer Science", startYear: "2016", endYear: "2020", grade: "8.4 CGPA" },
    ],
    projects: [
        { name: "Accio Connect", description: "A social platform for developer cohorts with real-time messaging.", tech: "React, Node.js, MongoDB, Socket.io", link: "github.com/alexmorgan/accio" },
        { name: "Portfolio CMS", description: "Headless CMS for personal portfolios with drag-and-drop editing.", tech: "Next.js, Prisma, PostgreSQL", link: "github.com/alexmorgan/cms" },
    ],
};

// ─── Tiny helpers ─────────────────────────────────────────────────────────────
const arrFromCSV = (str) => str.split(",").map(s => s.trim()).filter(Boolean);

// ─── sub-components ──────────────────────────────────────────────────────────
function SectionTitle({ children }) {
    return (
        <div style={{ display: "flex", alignItems: "center", gap: 8, margin: "18px 0 10px" }}>
            <span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "#f97316" }}>{children}</span>
            <div style={{ flex: 1, height: 1.5, background: "linear-gradient(to right, #f97316, #fed7aa, transparent)" }} />
        </div>
    );
}

function InputField({ label, value, onChange, placeholder, multiline, style }) {
    const base = {
        width: "100%", boxSizing: "border-box",
        border: "1.5px solid #e2e8f0", borderRadius: 10,
        padding: "9px 12px", fontSize: 13,
        fontFamily: "'DM Sans',sans-serif", color: "#1e293b",
        background: "#fff", outline: "none",
        transition: "border-color .2s, box-shadow .2s",
        ...style,
    };
    return (
        <div style={{ marginBottom: 10 }}>
            {label && <label style={{ display: "block", fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", color: "#94a3b8", marginBottom: 5 }}>{label}</label>}
            {multiline
                ? <textarea rows={3} value={value} onChange={onChange} placeholder={placeholder} style={{ ...base, resize: "vertical" }} onFocus={e => { e.target.style.borderColor = "#f97316"; e.target.style.boxShadow = "0 0 0 3px rgba(249,115,22,.1)"; }} onBlur={e => { e.target.style.borderColor = "#e2e8f0"; e.target.style.boxShadow = "none"; }} />
                : <input value={value} onChange={onChange} placeholder={placeholder} style={base} onFocus={e => { e.target.style.borderColor = "#f97316"; e.target.style.boxShadow = "0 0 0 3px rgba(249,115,22,.1)"; }} onBlur={e => { e.target.style.borderColor = "#e2e8f0"; e.target.style.boxShadow = "none"; }} />
            }
        </div>
    );
}

function AddBtn({ onClick, label }) {
    return (
        <button type="button" onClick={onClick} style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 14px", borderRadius: 8, border: "1.5px dashed #f97316", background: "rgba(249,115,22,.05)", color: "#f97316", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans',sans-serif", transition: "background .2s" }}
            onMouseEnter={e => e.currentTarget.style.background = "rgba(249,115,22,.12)"}
            onMouseLeave={e => e.currentTarget.style.background = "rgba(249,115,22,.05)"}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 1v10M1 6h10" stroke="#f97316" strokeWidth="1.8" strokeLinecap="round" /></svg>
            {label}
        </button>
    );
}

function RemoveBtn({ onClick }) {
    return (
        <button type="button" onClick={onClick} title="Remove" style={{ width: 24, height: 24, border: "none", borderRadius: 6, background: "rgba(239,68,68,.1)", color: "#ef4444", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "background .2s", flexShrink: 0 }}
            onMouseEnter={e => e.currentTarget.style.background = "rgba(239,68,68,.2)"}
            onMouseLeave={e => e.currentTarget.style.background = "rgba(239,68,68,.1)"}>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M1 1l8 8M9 1L1 9" stroke="#ef4444" strokeWidth="1.6" strokeLinecap="round" /></svg>
        </button>
    );
}

// ─── PREVIEW ─────────────────────────────────────────────────────────────────
function ResumePreview({ data, accentColor }) {
    const skills = arrFromCSV(data.skills);
    const certs = arrFromCSV(data.certifications);
    const langs = arrFromCSV(data.languages);

    const divider = <div style={{ height: 1, background: "#f1f5f9", margin: "12px 0" }} />;

    const Tag = ({ text }) => (
        <span style={{ display: "inline-block", padding: "3px 10px", borderRadius: 20, background: `${accentColor}18`, color: accentColor, fontSize: 11, fontWeight: 600, margin: "2px 3px 2px 0", fontFamily: "'DM Sans',sans-serif" }}>{text}</span>
    );

    return (
        <div id="resume-preview" style={{ fontFamily: "'DM Sans',sans-serif", background: "#FFFFFF", minHeight: "100%", fontSize: 13, color: "#1e293b", lineHeight: 1.6 }}>

            {/* Header */}
            <div style={{ background: `linear-gradient(135deg, ${accentColor} 0%, #3b82f6 100%)`, padding: "24px 32px 24px", color: "#fff" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16 }}>
                    <div>
                        <h1 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 26, margin: 0, letterSpacing: "-0.01em" }}>
                            {data.firstName} {data.lastName}
                        </h1>
                        <p style={{ margin: "4px 0 0", fontSize: 14, opacity: 0.88, fontWeight: 500 }}>{data.title}</p>
                    </div>
                    <div style={{ textAlign: "right", fontSize: 11, opacity: 0.9, lineHeight: 1.8, paddingTop: "10px" }}>
                        {data.email && <div>✉ {data.email}</div>}
                        {data.phone && <div>📞 {data.phone}</div>}
                        {data.location && <div>📍 {data.location}</div>}
                    </div>
                </div>
                {(data.linkedin || data.github || data.website) && (
                    <div style={{ marginTop: 10, display: "flex", gap: 16, fontSize: 11, opacity: 0.85 }}>
                        <a href={`https://${data.linkedin}`} target="_blank"
                            rel="noopener noreferrer" className="flex  items-center text-[12px]" style={{ textDecorationColor: "#3b7ff5", color: "white", fontSize: "12px" }}>  <FaLinkedinIn style={{ marginRight: "4px" }} /> {data.linkedin}</a>
                        <a href={`https://${data.github}`} target="_blank"
                            rel="noopener noreferrer" className="flex  items-center text-[12px]" style={{ textDecorationColor: "#3b7ff5", color: "white", fontSize: "12px" }}> <BsGithub style={{ marginRight: "4px", }} />{data.github}  </a>
                        <a href={`https://leetcode.com/u/sai4u/`} target="_blank"
                            rel="noopener noreferrer" className="flex  items-center text-[12px]" style={{ textDecorationColor: "#3b7ff5", color: "white", fontSize: "12px" }}><BsCode style={{ marginRight: "4px" }} />{`leetcode.com/u/sai4u`}</a>
                        <a href={`https://${data.website}`} target="_blank"
                            rel="noopener noreferrer" className="flex  items-center text-[12px]" style={{ textDecorationColor: "#3b7ff5", color: "white", fontSize: "12px" }}> <FaGlobe style={{ marginRight: "4px", }} />{data.website}</a>
                        {/* {data.linkedin && <span>🔗 {data.linkedin}</span>}
                        {data.github && <span>⌨ {data.github}</span>}
                        {data.website && <span>🌐 {`leetcode.com/sai4u`}</span>}
                        {data.website && <span>🌐 {data.website}</span>} */}
                    </div>
                )}
            </div>

            <div style={{ padding: "20px 32px" }}>
                {/* Summary */}
                {data.summary && (
                    <>
                        <SectionTitle>Summary</SectionTitle>
                        <p style={{ color: "#475569", fontSize: 13, margin: 0, lineHeight: 1.7 }}>{data.summary}</p>
                    </>
                )}

                {/* Skills */}
                {skills.length > 0 && (
                    <>
                        {divider}
                        <SectionTitle>Skills</SectionTitle>
                        <div style={{ display: "flex", flexWrap: "wrap" }}>
                            {skills.map((s, i) => <Tag key={i} text={s} />)}
                        </div>
                    </>
                )}

                {/* Experience */}
                {data.experience?.length > 0 && (
                    <>
                        {divider}
                        <SectionTitle>Experience</SectionTitle>
                        {data.experience.map((exp, i) => (
                            <div key={i} style={{ marginBottom: 14, paddingLeft: 12, borderLeft: `2.5px solid ${accentColor}30` }}>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: 4 }}>
                                    <span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 13, color: "#0f172a" }}>{exp.role}</span>
                                    <span style={{ fontSize: 11, color: "#94a3b8", whiteSpace: "nowrap" }}>{exp.startDate}{exp.endDate ? ` – ${exp.endDate}` : exp.current ? " – Present" : ""}</span>
                                </div>
                                <div style={{ fontSize: 12, color: accentColor, fontWeight: 600, marginBottom: 3 }}>{exp.company}</div>
                                {exp.description && <p style={{ margin: 0, color: "#475569", fontSize: 12, lineHeight: 1.6 }}>{exp.description}</p>}
                            </div>
                        ))}
                    </>
                )}

                {/* Education */}
                {data.education?.length > 0 && (
                    <>
                        {divider}
                        <SectionTitle>Education</SectionTitle>
                        {data.education.map((edu, i) => (
                            <div key={i} style={{ marginBottom: 10, paddingLeft: 12, borderLeft: `2.5px solid #3b82f630` }}>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: 4 }}>
                                    <span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 13, color: "#0f172a" }}>{edu.degree} {edu.field && `– ${edu.field}`}</span>
                                    <span style={{ fontSize: 11, color: "#94a3b8" }}>{edu.startYear}{edu.endYear ? ` – ${edu.endYear}` : ""}</span>
                                </div>
                                <div style={{ fontSize: 12, color: "#3b82f6", fontWeight: 600 }}>{edu.institution}</div>
                                {edu.grade && <div style={{ fontSize: 11, color: "#94a3b8" }}>Grade: {edu.grade}</div>}
                            </div>
                        ))}
                    </>
                )}

                {/* Projects */}
                {data.projects?.length > 0 && (
                    <>
                        {divider}
                        <SectionTitle>Projects</SectionTitle>
                        {data.projects.map((p, i) => (
                            <div key={i} style={{ marginBottom: 12, paddingLeft: 12, borderLeft: `2.5px solid ${accentColor}30` }}>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: 4 }}>
                                    <span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 13, color: "#0f172a" }}>{p.name}</span>
                                    {p.link && <a href={`https://${p.link}`} target="_blank"
                                        rel="noopener noreferrer"><span style={{ fontSize: 11, color: "#3b82f6" }}>{p.link}</span></a>}
                                </div>
                                {/* {p.description && <p style={{ margin: "2px 0 4px", color: "#475569", fontSize: 12, lineHeight: 1.6 }}>{p.description}</p>} */}
                                <ul style={{ margin: "2px 0 4px", color: "#475569", fontSize: 12, lineHeight: 1.6 }}>
                                    {p.description.split("\n").map((line, idx) => (
                                        line.trim() && <li key={idx}>{line}</li>
                                    ))}
                                </ul>
                                {p.tech && (
                                    <div style={{ display: "flex", flexWrap: "wrap" }}>
                                        {arrFromCSV(p.tech).map((t, j) => (
                                            <span key={j} style={{ fontSize: 10, padding: "1px 7px", borderRadius: 4, background: "#f1f5f9", color: "#64748b", marginRight: 4, marginBottom: 2, fontWeight: 600 }}>{t}</span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </>
                )}

                {/* Certs + Languages */}
                {(certs.length > 0 || langs.length > 0) && (
                    <>
                        {divider}
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                            {certs.length > 0 && (
                                <div>
                                    <SectionTitle>Certifications</SectionTitle>
                                    {certs.map((c, i) => (
                                        <div key={i} style={{ fontSize: 12, color: "#475569", padding: "2px 0", display: "flex", alignItems: "center", gap: 6 }}>
                                            <span style={{ color: accentColor, fontSize: 10 }}>●</span>{c}
                                        </div>
                                    ))}
                                </div>
                            )}
                            {langs.length > 0 && (
                                <div>
                                    <SectionTitle>Languages</SectionTitle>
                                    {langs.map((l, i) => (
                                        <div key={i} style={{ fontSize: 12, color: "#475569", padding: "2px 0", display: "flex", alignItems: "center", gap: 6 }}>
                                            <span style={{ color: "#3b82f6", fontSize: 10 }}>●</span>{l}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div >
    );
}
const STORAGE_KEY = "resume-data";

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────
export default function ResumeBuilder() {
    const [data, setData] = useState(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            return saved ? JSON.parse(saved) : INIT;
        } catch (err) {
            console.error("Failed to parse resume data", err);
            return INIT;
        }
    });
    const [accentColor, setAccentColor] = useState("#f97316");
    const [activeTab, setActiveTab] = useState("personal");
    const [downloading, setDownloading] = useState(false);
    const previewRef = useRef(null);

    const set = (field) => (e) =>
        setData((prev) => ({ ...prev, [field]: e.target.value }));

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }, [data]);

    useEffect(() => {
        const resumeData = JSON.stringify(data);
        localStorage.setItem("resume-data", resumeData)
    }, [data])

    // Experience helpers
    const addExp = () => setData(p => ({ ...p, experience: [...p.experience, { company: "", role: "", startDate: "", endDate: "", current: false, description: "" }] }));
    const updExp = (i, f) => (e) => setData(p => { const a = [...p.experience]; a[i] = { ...a[i], [f]: e.target.value }; return { ...p, experience: a }; });
    const remExp = (i) => setData(p => ({ ...p, experience: p.experience.filter((_, idx) => idx !== i) }));

    // Education helpers
    const addEdu = () => setData(p => ({ ...p, education: [...p.education, { institution: "", degree: "", field: "", startYear: "", endYear: "", grade: "" }] }));
    const updEdu = (i, f) => (e) => setData(p => { const a = [...p.education]; a[i] = { ...a[i], [f]: e.target.value }; return { ...p, education: a }; });
    const remEdu = (i) => setData(p => ({ ...p, education: p.education.filter((_, idx) => idx !== i) }));

    // Project helpers
    const addProj = () => setData(p => ({ ...p, projects: [...p.projects, { name: "", description: "", tech: "", link: "" }] }));
    const updProj = (i, f) => (e) => setData(p => { const a = [...p.projects]; a[i] = { ...a[i], [f]: e.target.value }; return { ...p, projects: a }; });
    const remProj = (i) => setData(p => ({ ...p, projects: p.projects.filter((_, idx) => idx !== i) }));

    // PDF download via print
    const downloadPDF = () => {
        setDownloading(true);
        const preview = document.getElementById("resume-preview");
        if (!preview) { setDownloading(false); return; }

        const printWindow = window.open("", "_blank");
        const fonts = `<link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet">`;
        printWindow.document.write(`
                <html>
                    <head>
                        <title>${data.firstName} ${data.lastName} - Resume</title>
                        ${fonts}
                        <style>
                            * {margin: 0; padding: 0; box-sizing: border-box; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
                            body {font - family: 'DM Sans', sans-serif; background: #fff; }
                            @page {margin: 0; size: A4; }
                            @media print {body {-webkit - print - color - adjust: exact; } }
                        </style>
                    </head>
                    <body>${preview.innerHTML}</body>
                </html>
                `);
        printWindow.document.close();
        setTimeout(() => {
            printWindow.print();
            printWindow.close();
            setDownloading(false);
        }, 800);
    };

    const TABS = ["personal", "experience", "education", "projects", "skills"];

    const tabStyle = (t) => ({
        padding: "8px 14px",
        borderRadius: 8,
        border: "none",
        fontFamily: "'Syne',sans-serif",
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        cursor: "pointer",
        transition: "all .2s",
        background: activeTab === t ? accentColor : "transparent",
        color: activeTab === t ? "#fff" : "#94a3b8",
        boxShadow: activeTab === t ? `0 4px 12px ${accentColor}40` : "none",
    });

    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');
        .resume-root { font-family: 'DM Sans', sans-serif; }
        .left-scroll::-webkit-scrollbar { width: 4px; }
        .left-scroll::-webkit-scrollbar-thumb { background: #fed7aa; border-radius: 4px; }
        .preview-scroll::-webkit-scrollbar { width: 4px; }
        .preview-scroll::-webkit-scrollbar-thumb { background: #bfdbfe; border-radius: 4px; }
        .tab-bar::-webkit-scrollbar { display: none; }
        input::placeholder, textarea::placeholder { color: #cbd5e1; }
        .exp-card { background: #fff; border: 1.5px solid #f1f5f9; border-radius: 14px; padding: 14px; margin-bottom: 12px; transition: box-shadow .2s; }
        .exp-card:hover { box-shadow: 0 4px 16px rgba(249,115,22,.08); }
      `}</style>

            <div className="resume-root" style={{ minHeight: "100vh", background: "linear-gradient(135deg, #fff7ed 0%, #eff6ff 60%, #f8fafc 100%)", display: "flex", flexDirection: "column" }}>

                {/* ── Top Bar ── */}
                <div style={{ background: "#fff", borderBottom: "1px solid #f1f5f9", padding: "14px 28px", display: "flex", alignItems: "center", justifyContent: "space-between", boxShadow: "0 1px 12px rgba(0,0,0,.05)", position: "sticky", top: 0, zIndex: 20 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div style={{ width: 32, height: 32, borderRadius: 8, background: `linear-gradient(135deg, ${accentColor}, #3b82f6)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="2" y="1" width="12" height="14" rx="2" stroke="white" strokeWidth="1.5" /><path d="M5 5h6M5 8h6M5 11h4" stroke="white" strokeWidth="1.3" strokeLinecap="round" /></svg>
                        </div>
                        <span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 16, color: "#0f172a" }}>Resume<span style={{ color: accentColor }}>Builder</span></span>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        {/* Accent color picker */}
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            <span style={{ fontSize: 11, color: "#94a3b8", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" }}>Accent</span>
                            {["#f97316", "#3b82f6", "#8b5cf6", "#ef4444", "#10b981"].map(c => (
                                <button key={c} onClick={() => setAccentColor(c)} style={{ width: 20, height: 20, borderRadius: "50%", background: c, border: accentColor === c ? `2.5px solid #0f172a` : "2px solid transparent", cursor: "pointer", outline: "none", transition: "transform .15s", transform: accentColor === c ? "scale(1.2)" : "scale(1)" }} />
                            ))}
                            <input type="color" value={accentColor} onChange={e => setAccentColor(e.target.value)} style={{ width: 24, height: 24, border: "none", borderRadius: "50%", cursor: "pointer", padding: 0, background: "none" }} title="Custom color" />
                        </div>

                        <button onClick={downloadPDF} disabled={downloading} style={{ display: "flex", alignItems: "center", gap: 7, padding: "9px 18px", borderRadius: 10, border: "none", background: `linear-gradient(135deg, ${accentColor}, #3b82f6)`, color: "#fff", fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: "0.06em", cursor: downloading ? "not-allowed" : "pointer", opacity: downloading ? 0.7 : 1, boxShadow: `0 4px 16px ${accentColor}40`, transition: "all .2s" }}>
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1v8M4 6l3 3 3-3M2 11h10" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                            {downloading ? "Opening..." : "Download PDF"}
                        </button>
                    </div>
                </div>

                {/* ── Body ── */}
                <div style={{ display: "grid", gridTemplateColumns: "600px 1fr", flex: 1, gap: 0, minHeight: "calc(100vh - 65px)" }}>

                    {/* ═══ LEFT PANEL ═══ */}
                    {/* <div style={{ background: "#fff", borderRight: "1px solid #f1f5f9", display: "flex", flexDirection: "column", boxShadow: "2px 0 16px rgba(0,0,0,.04)" }}> */}
                    <div style={{ background: "#fff", borderRight: "1px solid #f1f5f9", display: "flex", flexDirection: "column", boxShadow: "2px 0 16px rgba(0,0,0,.04)", marginLeft: "20px", marginTop: "10px" }}>

                        {/* Tab bar */}
                        <div className="tab-bar" style={{ display: "flex", gap: 4, padding: "12px 16px", background: "#fafafa", borderBottom: "1px solid #f1f5f9", overflowX: "auto" }}>
                            {TABS.map(t => (
                                <button key={t} style={tabStyle(t)} onClick={() => setActiveTab(t)}>{t}</button>
                            ))}
                        </div>

                        {/* Form area */}
                        <div className="left-scroll" style={{ flex: 1, overflowY: "auto", padding: "20px 20px 32px" }}>

                            {/* ── PERSONAL ── */}
                            {activeTab === "personal" && (
                                <>
                                    <SectionTitle>Personal Info</SectionTitle>
                                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 10px" }}>
                                        <InputField label="First Name" value={data.firstName} onChange={set("firstName")} placeholder="Alex" />
                                        <InputField label="Last Name" value={data.lastName} onChange={set("lastName")} placeholder="Morgan" />
                                    </div>
                                    <InputField label="Professional Title" value={data.title} onChange={set("title")} placeholder="Full-Stack Developer" />
                                    <InputField label="Email" value={data.email} onChange={set("email")} placeholder="alex@example.com" />
                                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 10px" }}>
                                        <InputField label="Phone" value={data.phone} onChange={set("phone")} placeholder="+91 98765 43210" />
                                        <InputField label="Location" value={data.location} onChange={set("location")} placeholder="Hyderabad, India" />
                                    </div>
                                    <InputField label="LinkedIn" value={data.linkedin} onChange={set("linkedin")} placeholder="linkedin.com/in/username" />
                                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 10px" }}>
                                        <InputField label="GitHub" value={data.github} onChange={set("github")} placeholder="github.com/username" />
                                        <InputField label="Website" value={data.website} onChange={set("website")} placeholder="yoursite.dev" />
                                    </div>
                                    <SectionTitle>Summary</SectionTitle>
                                    <InputField value={data.summary} onChange={set("summary")} placeholder="Write a short professional summary..." multiline />
                                </>
                            )}

                            {/* ── EXPERIENCE ── */}
                            {activeTab === "experience" && (
                                <>
                                    <SectionTitle>Work Experience</SectionTitle>
                                    {data.experience.map((exp, i) => (
                                        <div key={i} className="exp-card">
                                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                                                <span style={{ fontSize: 11, fontWeight: 700, color: accentColor, textTransform: "uppercase", letterSpacing: "0.08em" }}>#{i + 1}</span>
                                                <RemoveBtn onClick={() => remExp(i)} />
                                            </div>
                                            <InputField label="Company" value={exp.company} onChange={updExp(i, "company")} placeholder="TechCorp Solutions" />
                                            <InputField label="Role / Title" value={exp.role} onChange={updExp(i, "role")} placeholder="Senior Developer" />
                                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 10px" }}>
                                                <InputField label="Start Date" value={exp.startDate} onChange={updExp(i, "startDate")} placeholder="Jan 2022" />
                                                <InputField label="End Date" value={exp.endDate} onChange={updExp(i, "endDate")} placeholder="Dec 2023 / Present" />
                                            </div>
                                            <InputField label="Description" value={exp.description} onChange={updExp(i, "description")} placeholder="Describe your role and achievements..." multiline />
                                        </div>
                                    ))}
                                    <AddBtn onClick={addExp} label="Add Experience" />
                                </>
                            )}

                            {/* ── EDUCATION ── */}
                            {activeTab === "education" && (
                                <>
                                    <SectionTitle>Education</SectionTitle>
                                    {data.education.map((edu, i) => (
                                        <div key={i} className="exp-card">
                                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                                                <span style={{ fontSize: 11, fontWeight: 700, color: "#3b82f6", textTransform: "uppercase", letterSpacing: "0.08em" }}>#{i + 1}</span>
                                                <RemoveBtn onClick={() => remEdu(i)} />
                                            </div>
                                            <InputField label="Institution" value={edu.institution} onChange={updEdu(i, "institution")} placeholder="JNTU Hyderabad" />
                                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 10px" }}>
                                                <InputField label="Degree" value={edu.degree} onChange={updEdu(i, "degree")} placeholder="B.Tech" />
                                                <InputField label="Field of Study" value={edu.field} onChange={updEdu(i, "field")} placeholder="Computer Science" />
                                            </div>
                                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0 10px" }}>
                                                <InputField label="Start Year" value={edu.startYear} onChange={updEdu(i, "startYear")} placeholder="2016" />
                                                <InputField label="End Year" value={edu.endYear} onChange={updEdu(i, "endYear")} placeholder="2020" />
                                                <InputField label="Grade / GPA" value={edu.grade} onChange={updEdu(i, "grade")} placeholder="8.4 CGPA" />
                                            </div>
                                        </div>
                                    ))}
                                    <AddBtn onClick={addEdu} label="Add Education" />
                                </>
                            )}

                            {/* ── PROJECTS ── */}
                            {activeTab === "projects" && (
                                <>
                                    <SectionTitle>Projects</SectionTitle>
                                    {data.projects.map((p, i) => (
                                        <div key={i} className="exp-card">
                                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                                                <span style={{ fontSize: 11, fontWeight: 700, color: accentColor, textTransform: "uppercase", letterSpacing: "0.08em" }}>#{i + 1}</span>
                                                <RemoveBtn onClick={() => remProj(i)} />
                                            </div>
                                            <InputField label="Project Name" value={p.name} onChange={updProj(i, "name")} placeholder="Accio Connect" />
                                            <InputField label="Description" value={p.description} onChange={updProj(i, "description")} placeholder="What does it do?" multiline />
                                            <InputField label="Tech Stack (comma-separated)" value={p.tech} onChange={updProj(i, "tech")} placeholder="React, Node.js, MongoDB" />
                                            <InputField label="Link / GitHub URL" value={p.link} onChange={updProj(i, "link")} placeholder="github.com/username/repo" />
                                        </div>
                                    ))}
                                    <AddBtn onClick={addProj} label="Add Project" />
                                </>
                            )}

                            {/* ── SKILLS ── */}
                            {activeTab === "skills" && (
                                <>
                                    <SectionTitle>Skills</SectionTitle>
                                    <InputField label="Skills (comma-separated)" value={data.skills} onChange={set("skills")} placeholder="React, Node.js, TypeScript, AWS..." multiline />

                                    <SectionTitle>Certifications</SectionTitle>
                                    <InputField label="Certifications (comma-separated)" value={data.certifications} onChange={set("certifications")} placeholder="AWS Certified Developer, GCP Associate..." multiline />

                                    <SectionTitle>Languages</SectionTitle>
                                    <InputField label="Languages (comma-separated)" value={data.languages} onChange={set("languages")} placeholder="English, Hindi, Telugu..." />
                                </>
                            )}
                        </div>
                    </div>

                    {/* ═══ RIGHT: PREVIEW ═══ */}
                    <div className="preview-scroll" style={{ overflowY: "auto", background: "#f1f5f9", padding: "28px 32px" }}>
                        {/* Paper shadow */}
                        <div style={{ maxWidth: 720, margin: "0 auto", background: "#fff", borderRadius: 4, boxShadow: "0 4px 6px rgba(0,0,0,.05), 0 20px 60px rgba(0,0,0,.12)", overflow: "hidden" }} ref={previewRef}>
                            <ResumePreview data={data} accentColor={accentColor} />
                        </div>

                        {/* Footer hint */}
                        <p style={{ textAlign: "center", marginTop: 20, fontSize: 12, color: "#94a3b8", fontFamily: "'DM Sans',sans-serif" }}>
                            Live preview · Accio Job · Click <strong>Download PDF</strong> to export
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}