import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaLock, FaTimes } from "react-icons/fa";
import { templates, TEMPLATES_ID } from "../constant";
import { useDispatch, useSelector } from "react-redux";
import { clearStoreData, updateStoreData } from "../features/formDataSlice";
import templateOneInitialState from "../utils/templatesQuestions/template_1";
import templateTwoInitialState from "../utils/templatesQuestions/template_2";

function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.theme);
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  function handleProceed() {
    if (!selectedTemplate) return;
    let selectedQuestions;
    if (selectedTemplate.id === TEMPLATES_ID.TEMPLATE_1) selectedQuestions = templateOneInitialState;
    else if (selectedTemplate.id === TEMPLATES_ID.TEMPLATE_2) selectedQuestions = templateTwoInitialState;
    dispatch(updateStoreData(selectedQuestions));
    localStorage.setItem("userData", JSON.stringify(selectedQuestions));
    navigate("/userDetails");
  }

  useEffect(() => {
    localStorage.removeItem("userData");
    localStorage.removeItem("submittedFormCount");
    dispatch(clearStoreData());
  }, []);

  return (
    <div className={`min-h-screen w-full absolute top-0 -z-10 flex flex-col overflow-hidden transition-all duration-500
      ${darkMode ? "bg-gray-950" : "bg-white"}`}>

      {/* Decorative blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-orange-400/10 blur-3xl animate-pulse" />
        <div className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full bg-sky-400/10 blur-3xl animate-pulse" style={{ animationDelay: "1.2s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-orange-200/10 blur-3xl" />
      </div>

      {/* Hero */}
      <section className="relative flex-1 flex items-center justify-center px-4 md:px-10 py-10">
        <div className="max-w-6xl w-full grid md:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* Left */}
          <div className="space-y-6 flex flex-col justify-center z-10 md:order-1 mt-6">

            {/* Eyebrow tag */}
            <span className="inline-flex items-center gap-2 self-start text-[10px] font-bold tracking-widest uppercase text-orange-600 bg-orange-50 border border-orange-200 px-3 py-1.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-400 inline-block animate-pulse" />
              Resume Builder
            </span>

            <h1 className={`text-4xl md:text-5xl font-extrabold leading-tight tracking-tight
              ${darkMode ? "text-white" : "text-gray-800"}`}
              style={{ fontFamily: "'Syne" }}>
              Pick Your{" "}
              <span className="relative inline-block">
                <span className="relative z-10 bg-clip-text text-transparent"
                  style={{ backgroundImage: "linear-gradient(135deg, #f97316, #38bdf8)" }}>
                  Perfect Template
                </span>
              </span>
            </h1>

            <p className={`text-base leading-relaxed max-w-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
              Choose a layout designed for your career stage and craft a resume that stands out.
            </p>

            {/* Orange-to-sky gradient divider */}
            <div className="h-[2px] w-16 rounded-full" style={{ background: "linear-gradient(to right, #f97316, #38bdf8)" }} />

            {/* Template grid */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              {templates.map((t) => (
                <div
                  key={t.id}
                  onClick={() => !t.locked && setSelectedTemplate(t)}
                  className={`group relative rounded-xl overflow-hidden border-[1.5px] transition-all duration-300
                    ${t.locked
                      ? "opacity-50 cursor-not-allowed border-gray-200"
                      : selectedTemplate?.id === t.id
                        ? "border-orange-400 shadow-[0_4px_20px_rgba(249,115,22,0.25)] -translate-y-0.5"
                        : darkMode
                          ? "border-gray-700 hover:border-sky-500 hover:-translate-y-0.5 cursor-pointer bg-gray-800"
                          : "border-gray-200 hover:border-sky-400 hover:-translate-y-0.5 cursor-pointer bg-white"
                    }`}
                >
                  {/* Top accent bar */}
                  <div className={`h-[2px] w-full transition-all duration-300
                    ${selectedTemplate?.id === t.id
                      ? "opacity-100"
                      : "opacity-0 group-hover:opacity-100"
                    }`}
                    style={{ background: "linear-gradient(to right, #f97316, #38bdf8)" }}
                  />

                  <div className="p-2.5 space-y-2">
                    <div className="relative w-full aspect-[3/4] rounded-lg overflow-hidden bg-gray-100">
                      <img src={t.src} alt={`Template ${t.id}`}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />

                      {t.locked && (
                        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex flex-col items-center justify-center">
                          <FaLock size={18} className="text-white" />
                          <span className="text-white text-[10px] font-bold mt-1.5 tracking-widest uppercase">Locked</span>
                        </div>
                      )}
                    </div>

                    <div className="text-center pb-1">
                      <h3 className={`text-xs font-bold ${darkMode ? "text-white" : "text-gray-800"}`}
                        style={{ fontFamily: "'Syne', sans-serif" }}>
                        Template {t.id}
                      </h3>
                      {!t.locked && (
                        <p className="text-[10px] text-sky-500 font-medium">Click to select</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right preview */}
          <div className="relative hidden md:flex items-center justify-center h-full min-h-[300px] md:order-2 mt-20">
            <div className={`absolute inset-0 rounded-2xl border
              ${darkMode
                ? "bg-gray-900/60 border-gray-800 backdrop-blur-xl"
                : "bg-white/60 border-orange-100/60 backdrop-blur-xl"
              }`} />

            <div className="relative z-10 w-full max-w-xs lg:max-w-sm">
              {/* Floating badge */}
              <div className="absolute -top-4 -right-4 z-20 flex items-center gap-1.5 bg-orange-500 text-white text-[10px] font-bold tracking-wider uppercase px-3 py-1.5 rounded-full shadow-[0_4px_14px_rgba(249,115,22,0.4)]">
                <span className="w-1.5 h-1.5 rounded-full bg-white inline-block" />
                Live Preview
              </div>

              <div className={`rounded-xl overflow-hidden shadow-2xl border
                ${darkMode ? "border-gray-700" : "border-orange-100"}`}>
                <div className="h-[2px]" style={{ background: "linear-gradient(to right, #f97316, #38bdf8)" }} />
                <img
                  src="/hero.png"
                  alt="Resume Preview"
                  className="w-full h-auto object-cover"
                  onError={(e) => { e.target.src = templates[0]?.src; }}
                />
              </div>

              {/* Blobs */}
              <div className="absolute -top-4 -left-4 w-14 h-14 bg-orange-400 rounded-full blur-xl opacity-30 animate-pulse" />
              <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-sky-400 rounded-full blur-xl opacity-25 animate-pulse" style={{ animationDelay: "1.5s" }} />
            </div>
          </div>
        </div>
      </section>

      {/* Modal */}
      {selectedTemplate && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setSelectedTemplate(null)}
        >
          <div
            className={`relative w-full max-w-md rounded-2xl shadow-2xl overflow-hidden transition-all
              ${darkMode ? "bg-gray-900 border border-gray-800" : "bg-white border border-gray-100"}`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal top bar */}
            <div className="h-[3px]" style={{ background: "linear-gradient(to right, #f97316, #38bdf8)" }} />

            {/* Close */}
            <button
              onClick={() => setSelectedTemplate(null)}
              className={`absolute top-4 mt-7 right-4 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all
                ${darkMode
                  ? "bg-gray-800 hover:bg-gray-700 text-gray-300"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-600"
                }`}
            >
              <FaTimes size={13} />
            </button>

            <div className="p-6 flex flex-col items-center gap-5">
              {/* Header text */}
              <div className="text-center">
                <span className="text-[10px] font-bold tracking-widest uppercase text-orange-500">Selected</span>
                <h3 className={`text-lg font-extrabold mt-0.5 ${darkMode ? "text-white" : "text-gray-900"}`}
                  style={{ fontFamily: "'Syne', sans-serif" }}>
                  Template {selectedTemplate.id}
                </h3>
              </div>

              {/* Preview image */}
              <div className="w-full max-w-xs rounded-xl overflow-hidden border-2 border-orange-300 shadow-[0_8px_32px_rgba(249,115,22,0.18)]">
                <img
                  src={selectedTemplate.src}
                  alt={`Template ${selectedTemplate.id}`}
                  className="w-full object-cover rounded-xl"
                />
              </div>

              {/* CTA */}
              <button
                onClick={handleProceed}
                className="w-full max-w-xs py-3.5 px-8 rounded-xl font-bold text-sm text-white tracking-wide transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(249,115,22,0.35)] active:translate-y-0"
                style={{
                  fontFamily: "'Syne', sans-serif",
                  background: "linear-gradient(135deg, #f97316, #38bdf8)",
                }}
              >
                Continue to Form →
              </button>

              <p className="text-[11px] text-gray-400">You can change sections later in the form.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;