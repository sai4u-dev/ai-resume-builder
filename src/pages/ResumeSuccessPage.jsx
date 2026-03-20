import React from "react";
import { FaArrowLeft, FaFileDownload, FaHome } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function ResumeSuccessPage() {
    const navigate = useNavigate();

    const handleDownload = () => {
        const input = document.getElementById("divToPrint");
        const previousBg = input.style.background;
        const previousBgImage = input.style.backgroundImage;
        input.style.background = "white";
        input.style.backgroundImage = "none";
        html2canvas(input, { scale: 3 }).then((canvas) => {
            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF("p", "mm", "a4");
            const imgProps = pdf.getImageProperties(imgData);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
            pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
            pdf.save("resume.pdf");
            input.style.background = previousBg;
            input.style.backgroundImage = previousBgImage;
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50/50 via-white to-sky-50/50 p-6">

            {/* Decorative background blobs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-0 w-72 h-72 bg-orange-300/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-sky-300/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />
            </div>

            <div className="relative z-10 bg-white w-full max-w-md rounded-2xl shadow-[0_8px_48px_rgba(0,0,0,0.10)] border border-gray-100 overflow-hidden">

                {/* Top gradient bar */}
                <div className="h-[3px]" style={{ background: "linear-gradient(to right, #f97316, #38bdf8)" }} />

                <div className="p-8 flex flex-col items-center gap-6">

                    {/* Success icon */}
                    <div className="relative">
                        <div className="w-20 h-20 rounded-2xl flex items-center justify-center shadow-[0_8px_28px_rgba(249,115,22,0.25)]"
                            style={{ background: "linear-gradient(135deg, #f97316, #38bdf8)" }}>
                            <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                                <path d="M8 18l7 7L28 11" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        {/* Pulse ring */}
                        <div className="absolute inset-0 rounded-2xl animate-ping opacity-20"
                            style={{ background: "linear-gradient(135deg, #f97316, #38bdf8)" }} />
                    </div>

                    {/* Heading */}
                    <div className="text-center space-y-2">
                        <span className="inline-block text-[10px] font-bold tracking-widest uppercase text-orange-500 bg-orange-50 border border-orange-200 px-3 py-1 rounded-full">
                            Success
                        </span>
                        <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight"
                            style={{ fontFamily: "'Syne', sans-serif" }}>
                            Resume Downloaded!
                        </h1>
                        <p className="text-sm text-gray-500 leading-relaxed">
                            Your resume is ready. What would you like to do next?
                        </p>
                    </div>

                    {/* Divider */}
                    <div className="w-full h-[1.5px] bg-gradient-to-r from-orange-200 via-sky-200 to-transparent rounded-full" />

                    {/* Actions */}
                    <div className="w-full flex flex-col gap-3">
                        {/* Download again */}
                        <button
                            onClick={handleDownload}
                            className="w-full flex items-center justify-center gap-2.5 py-3 px-6 rounded-xl font-bold text-sm text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(249,115,22,0.32)] active:translate-y-0"
                            style={{
                                fontFamily: "'Syne', sans-serif",
                                background: "linear-gradient(135deg, #f97316, #38bdf8)",
                            }}
                        >
                            <FaFileDownload size={15} />
                            Download Again
                        </button>

                        {/* Go back & edit */}
                        <button
                            onClick={() => navigate("/preview")}
                            className="w-full flex items-center justify-center gap-2.5 py-3 px-6 rounded-xl font-semibold text-sm text-sky-600 bg-sky-50 border-[1.5px] border-sky-200 hover:bg-sky-100 hover:border-sky-400 transition-all duration-200"
                        >
                            <FaArrowLeft size={14} />
                            Go Back &amp; Edit
                        </button>

                        {/* Home */}
                        <button
                            onClick={() => navigate("/")}
                            className="w-full flex items-center justify-center gap-2.5 py-3 px-6 rounded-xl font-semibold text-sm text-gray-600 bg-white border-[1.5px] border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200"
                        >
                            <FaHome size={14} />
                            Go to Homepage
                        </button>
                    </div>

                    {/* Footer note */}
                    <p className="text-[11px] text-gray-400 text-center">
                        Built with <span className="text-orange-400 font-semibold">AccioResume</span> · Powered by AI
                    </p>
                </div>
            </div>
        </div>
    );
}