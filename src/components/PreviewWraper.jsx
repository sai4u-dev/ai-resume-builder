import { useEffect, useRef, useState } from 'react'
import PreviewResume from './PreviewResume';
import { useDispatch, useSelector } from 'react-redux';
import { FORM_SECTIONS } from '../constant';
import { updateStoreData } from '../features/formDataSlice';
import useDragAndDrop from '../utils/dragAndDrop/dragAndDrop';
import useResumeSection from '../utils/renderResume/renderResume.jsx';

function PreviewWraper() {
    const data = useSelector((state) => state.formdata)
    const [userData, setUserData] = useState(data)

    const dispatch = useDispatch()

    function hasSection(section) {
        if (!section) return false;

        if (Array.isArray(section)) {
            return section.some((question) => question?.answer?.trim());
        }

        if (typeof section === "object") {
            return Object.values(section)
                .some((subArray) =>
                    Array.isArray(subArray) &&
                    subArray.some(q => q?.answer?.trim())
                );
        }

        return false;
    }

    function getAns(sectionArray, questionLabel) {
        return sectionArray?.find(q => q.displayQuestion === questionLabel)?.answer || "";
    }

    const initialSections = [FORM_SECTIONS.SKILLS, FORM_SECTIONS.PROJECT, FORM_SECTIONS.EDUCATION, FORM_SECTIONS.CERTIFICATIONS];

    // ----------------- Drag & Drop logic -----------------
    const { sectionsOrder, onDragStart, onDragOver, onDrop, onDragEnd, getSectionContainerStyle } = useDragAndDrop(initialSections);

    const { renderSkills, renderEducation, renderProjects, renderCertifications } = useResumeSection({
        userData,
        hasSection,
        getAns,
        onDragStart,
        onDragOver,
        onDrop,
        onDragEnd,
        getSectionContainerStyle
    });


    // ----- Render functions for each section -----

    const sectionRenderMap = {
        skills: renderSkills,
        projects: renderProjects,
        education: renderEducation,
        certifications: renderCertifications,
    };



    useEffect(() => {
        if (localStorage.getItem("userData") && !userData) {
            const localStorageData = JSON.parse(localStorage.getItem("userData"))
            setUserData(localStorageData)
            dispatch(updateStoreData(localStorageData))
        }
    }, [])

    return (
        <div>
            {userData && <PreviewResume userData={userData} hasSection={hasSection} sectionRenderMap={sectionRenderMap} getAns={getAns} sectionsOrder={sectionsOrder} />}

        </div>
    )
}

export default PreviewWraper