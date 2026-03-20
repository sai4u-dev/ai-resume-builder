import { useEffect, useState } from 'react'
import PreviewResume from './PreviewResume';
import { useDispatch, useSelector } from 'react-redux';
import { FORM_SECTIONS } from '../constant';
import { updateStoreData } from '../features/formDataSlice';
import useDragAndDrop from '../utils/dragAndDrop/dragAndDrop';
import useResumeSection from '../utils/renderResume/renderResume.jsx';

function PreviewWrapper() {
    const data = useSelector((state) => state.formdata);
    const [userData, setUserData] = useState(data);
    const dispatch = useDispatch();

    function hasSection(section) {
        if (!section) return false;
        if (Array.isArray(section)) return section.some((q) => q?.answer?.trim());
        if (typeof section === "object") {
            return Object.values(section).some(
                (sub) => Array.isArray(sub) && sub.some((q) => q?.answer?.trim())
            );
        }
        return false;
    }

    function getAns(sectionArray, questionLabel) {
        return sectionArray?.find((q) => q.displayQuestion === questionLabel)?.answer || "";
    }

    const initialSections = [
        FORM_SECTIONS.SKILLS,
        FORM_SECTIONS.PROJECT,
        FORM_SECTIONS.EDUCATION,
        FORM_SECTIONS.CERTIFICATIONS,
    ];

    const { sectionsOrder, onDragStart, onDragOver, onDrop, onDragEnd, getSectionContainerStyle } =
        useDragAndDrop(initialSections);

    const { renderSkills, renderEducation, renderProjects, renderCertifications } =
        useResumeSection({ userData, hasSection, getAns, onDragStart, onDragOver, onDrop, onDragEnd, getSectionContainerStyle });

    const sectionRenderMap = {
        skills: renderSkills,
        projects: renderProjects,
        education: renderEducation,
        certifications: renderCertifications,
    };

    useEffect(() => {
        if (localStorage.getItem("userData") && !userData) {
            const localStorageData = JSON.parse(localStorage.getItem("userData"));
            setUserData(localStorageData);
            dispatch(updateStoreData(localStorageData));
        }
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-orange-50 py-10 px-4">
            {/* Page header */}
            <div className="max-w-[840px] mx-auto mb-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        {/* Orange accent dot */}
                        <span className="inline-block w-2.5 h-2.5 rounded-full bg-orange-400 shadow-[0_0_0_4px_rgba(249,115,22,0.15)]" />
                        <h1 className="text-2xl font-extrabold tracking-tight text-gray-900"
                            style={{ fontFamily: "'Syne', sans-serif" }}>
                            Resume Preview
                        </h1>
                    </div>

                    {/* Drag hint badge */}
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-600 bg-sky-50 border border-sky-200 px-3 py-1.5 rounded-full">
                        <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none">
                            <path d="M4 3v6M8 3v6M2 5l2-2 2 2M6 7l2 2 2-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        Drag sections to reorder
                    </span>
                </div>

                {/* Gradient rule */}
                <div className="mt-3 h-[2px] w-full rounded-full bg-gradient-to-r from-orange-300 via-sky-300 to-transparent" />
            </div>

            {/* Resume card shell */}
            {userData ? (
                <div className="max-w-[840px] mx-auto rounded-2xl overflow-hidden border border-gray-200 shadow-[0_8px_40px_rgba(0,0,0,0.08)]">
                    {/* Top bar */}
                    <div className="h-[3px] w-full bg-gradient-to-r from-orange-400 to-sky-400" />

                    <PreviewResume
                        userData={userData}
                        hasSection={hasSection}
                        sectionRenderMap={sectionRenderMap}
                        getAns={getAns}
                        sectionsOrder={sectionsOrder}
                    />
                </div>
            ) : (
                /* Empty state */
                <div className="max-w-[840px] mx-auto flex flex-col items-center justify-center py-24 gap-4">
                    <div className="w-14 h-14 rounded-2xl border-2 border-dashed border-orange-300 flex items-center justify-center">
                        <svg className="w-6 h-6 text-orange-400" viewBox="0 0 24 24" fill="none">
                            <path d="M9 12h6M12 9v6M4 6h16M4 18h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                        </svg>
                    </div>
                    <p className="text-sm font-semibold text-gray-400">No resume data found.</p>
                    <p className="text-xs text-gray-300">Complete the form to see your preview here.</p>
                </div>
            )}
        </div>
    );
}

export default PreviewWrapper;