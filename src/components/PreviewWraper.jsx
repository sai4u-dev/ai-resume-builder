import { useEffect, useRef, useState } from 'react'
import PreviewResume from './PreviewResume';
import { useDispatch, useSelector } from 'react-redux';
import { FORM_SECTIONS } from '../constant';
import { updateStoreData } from '../features/formDataSlice';

function PreviewWraper() {
    const data = useSelector((state)=>state.formdata)
    const [userData,setUserData] = useState(data)
    console.log(data,'data from store in wrapper')

    const dispatch = useDispatch()


    // This function checks whether a section has at least one answered field
    function hasSection(section) {
        // If section is null/undefined, return false
        if (!section) return false;

        // If the section is an array (ex: list of questions)
        if (Array.isArray(section)) {
            // Check if ANY question has a non-empty answer
            return section.some((question) => question?.answer?.trim());
        }

        // If the section is an object (ex: education: { school: [], college: [] })
        if (typeof section === "object") {
            return Object.values(section)
                // Only look inside values that are arrays
                .some((subArray) =>
                    Array.isArray(subArray) &&
                    // Check if ANY item in that array has a non-empty answer
                    subArray.some(q => q?.answer?.trim())
                );
        }

        // If it's neither array nor object
        return false;
    }

    // Get answer from a specific index inside a sub-array
    function getAns(sectionArray, questionLabel) {
        return sectionArray?.find(q => q.displayQuestion === questionLabel)?.answer || "";
    }

    const initialSections = [FORM_SECTIONS.SKILLS, FORM_SECTIONS.PROJECT, FORM_SECTIONS.EDUCATION, FORM_SECTIONS.CERTIFICATIONS];

    // ----------------- Drag & Drop logic -----------------
    // Sections we want draggable (initial order)
    // Use state to maintain order
    const [sectionsOrder, setSectionsOrder] = useState(initialSections);

    // currently dragging id
    const draggingIdRef = useRef(null);
    const [dragOverId, setDragOverId] = useState(null);

    // If userData presence changes and some sections become unavailable, we keep them in order but
    // rendering will check hasSection and skip if not present. Optionally you could filter them out.
    // useEffect(() => {
    //   // no-operation for now — keeping initial order stable
    // }, [userData]);


    // DRAG AND DROP FUNCTIONALITY
    const onDragStart = (e, sectionId) => {
        draggingIdRef.current = sectionId;
        e.dataTransfer.effectAllowed = "move";
        try {
            e.dataTransfer.setData("text/plain", sectionId);
        } catch (err) {
            // some browsers require try/catch
        }
        // small timeout to add dragging class via state if needed
        e.currentTarget.style.opacity = "0.6";
    };

    const onDragEnd = (e) => {
        draggingIdRef.current = null;
        setDragOverId(null);
        // clear any inline opacity set
        e.currentTarget.style.opacity = "1";
    };

    const onDragOver = (e, sectionId) => {
        e.preventDefault(); // allow drop
        if (draggingIdRef.current && draggingIdRef.current !== sectionId) {
            setDragOverId(sectionId);
        }
    };

    const onDrop = (e, targetId) => {
        e.preventDefault();
        const sourceId = (e.dataTransfer && e.dataTransfer.getData && e.dataTransfer.getData("text/plain")) || draggingIdRef.current;
        if (!sourceId) return;
        if (sourceId === targetId) {
            setDragOverId(null);
            return;
        }

        setSectionsOrder((prev) => {
            const newOrder = [...prev];
            const srcIndex = newOrder.indexOf(sourceId);
            const tgtIndex = newOrder.indexOf(targetId);
            if (srcIndex === -1 || tgtIndex === -1) return prev;

            // remove source
            newOrder.splice(srcIndex, 1);
            // insert source at target index (we'll insert before target)
            newOrder.splice(tgtIndex, 0, sourceId);

            return newOrder;
        });

        draggingIdRef.current = null;
        setDragOverId(null);
    };

    function getSectionContainerStyle(id) {
        const isDragging = draggingIdRef.current === id;
        const isDragOver = dragOverId === id;
        return {
            border: isDragOver ? "2px dashed #9CA3AF" : "none",
            padding: "0px",
            marginBottom: "1px",
            borderRadius: "6px",
            backgroundColor: isDragging ? "#fafafa" : "transparent",
            cursor: "grab",
        };
    }


    // ----- Render functions for each section -----
    const renderSkills = () => {
        if (!hasSection(userData.skills)) return null;

        const ORDER = ["languages", "frameworks", "database", "others"];

        return (
            <section
                key={FORM_SECTIONS.SKILLS}
                draggable
                onDragStart={(e) => onDragStart(e, FORM_SECTIONS.SKILLS)}
                onDragOver={(e) => onDragOver(e, FORM_SECTIONS.SKILLS)}
                onDrop={(e) => onDrop(e, FORM_SECTIONS.SKILLS)}
                onDragEnd={onDragEnd}
                style={{ ...getSectionContainerStyle(FORM_SECTIONS.SKILLS), marginTop: "1px" }}
            >
                <h2
                    style={{ fontSize: "18px", fontWeight: "bold", textTransform: "uppercase", paddingBottom: "4px", marginBottom: "0px", lineHeight: "1.2", display: "inline-block" }}
                >
                    Skills
                </h2>

                <div style={{
                    height: "1px",
                    width: "100%",
                    backgroundColor: "black",
                    marginTop: "6px"
                }}>

                </div>

                {ORDER.map((key) => {
                    const arr = userData.skills[key];
                    if (!hasSection(arr)) return null;

                    return (
                        <div key={key} style={{ marginTop: "-2px" }}>
                            <p style={{ margin: 0, fontSize: "14px" }}>
                                <span style={{ fontWeight: "bold" }}>
                                    {arr[0].displayQuestion}:
                                </span>{" "}
                                {arr.map((q) => q.answer).filter(Boolean).join(", ")}
                            </p>
                        </div>
                    );
                })}
            </section>
        );
    };

    const renderEducation = () => {
        if (!hasSection(userData.education)) return null;

        const eduKeys = ["Degree", "higherSchool", "school"];

        const renderEduBlock = (key) => {
            const data = userData.education[key];
            if (!hasSection(data)) return null;

            // COMMON FIELDS
            const cgpa =
                getAns(data, "Degree CGPA/Percentage") ||
                getAns(data, "12th CGPA/Percentage") ||
                getAns(data, "10th CGPA/Percentage");

            const institute =
                getAns(data, "College Name") ||
                getAns(data, "Junior College Name") ||
                getAns(data, "School Name");

            const degreeType = getAns(data, "Degree Type");
            const branch = getAns(data, "Branch");

            const start = getAns(data, "Start Date");
            const end = getAns(data, "End Date");

            return (
                <div
                    key={key}
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginTop: "0px",
                    }}
                >
                    {/* LEFT SIDE */}
                    <div style={{ maxWidth: "75%" }}>
                        <p style={{ fontWeight: "bold", margin: 0, fontSize: "13px" }}>
                            {institute}
                        </p>

                        <p style={{ margin: "2px 0 0 0", fontSize: "12px" }}>
                            {degreeType}
                            {branch ? ` — ${branch}` : ""}
                            {" — "}
                            <span style={{ fontWeight: "bold" }}>{cgpa}</span>
                        </p>
                    </div>

                    {/* RIGHT SIDE */}
                    <div style={{ textAlign: "right" }}>
                        <p style={{ margin: 0 }}>
                            {start} – {end}
                        </p>
                    </div>
                </div>
            );
        };

        return (
            <section
                key={FORM_SECTIONS.EDUCATION}
                draggable
                onDragStart={(e) => onDragStart(e, FORM_SECTIONS.EDUCATION)}
                onDragOver={(e) => onDragOver(e, FORM_SECTIONS.EDUCATION)}
                onDrop={(e) => onDrop(e, FORM_SECTIONS.EDUCATION)}
                onDragEnd={onDragEnd}
                style={getSectionContainerStyle(FORM_SECTIONS.EDUCATION)}
            >
                <h2
                    style={{ fontSize: "18px", fontWeight: "bold", textTransform: "uppercase", paddingBottom: "4px", marginBottom: "0px", lineHeight: "1.2", display: "inline-block" }}

                >
                    Education
                </h2>
                <div style={{
                    height: "1px",
                    width: "100%",
                    backgroundColor: "black",
                    marginTop: "6px"
                }}>

                </div>

                {eduKeys.map(renderEduBlock)}
            </section>
        );
    };


    const renderProjects = () => {
        if (!hasSection(userData.projects)) return null;

        const projectKeys = ["project1", "project2", "project3"];

        return (
            <section
                key={FORM_SECTIONS.PROJECT}
                draggable
                onDragStart={(e) => onDragStart(e, FORM_SECTIONS.PROJECT)}
                onDragOver={(e) => onDragOver(e, FORM_SECTIONS.PROJECT)}
                onDrop={(e) => onDrop(e, FORM_SECTIONS.PROJECT)}
                onDragEnd={onDragEnd}
                style={{
                    ...getSectionContainerStyle(FORM_SECTIONS.PROJECT),
                    marginTop: "9px",
                }}
            >
                <h2
                    style={{ fontSize: "18px", fontWeight: "bold", textTransform: "uppercase", paddingBottom: "4px", marginBottom: "0px", lineHeight: "1.2", display: "inline-block" }}

                >
                    Projects
                </h2>
                <div style={{
                    height: "1px",
                    width: "100%",
                    backgroundColor: "black",
                    marginTop: "6px"
                }}>

                </div>



                {projectKeys.map((key, index) => {
                    const projectData = userData.projects[key];
                    if (!hasSection(projectData)) return null;

                    const name = getAns(projectData, "Project Name");
                    const description = getAns(projectData, "Project Description");
                    const techStack = getAns(projectData, "Tech Stack");
                    const liveLink = getAns(projectData, "Live Link");

                    return (
                        <div
                            key={key}
                            style={{
                                marginTop: index === 0 ? "0px" : "0px",
                            }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    marginBottom: "2px",
                                }}
                            >
                                <span
                                    style={{
                                        fontSize: "15px",
                                        fontWeight: 600,
                                    }}
                                >
                                    {name}
                                </span>

                                {liveLink && (
                                    <a
                                        href={liveLink}
                                        style={{
                                            fontSize: "12px",
                                            textDecoration: "none",
                                            color: "rgb(29,78,216)",
                                        }}
                                    >
                                        Link to Demo
                                    </a>
                                )}
                            </div>

                            <p style={{ margin: "0", fontSize: "14px", lineHeight: "19px" }}
                                dangerouslySetInnerHTML={{ __html: description }}
                            >
                            </p>

                            <p style={{ margin: "2px 0 0 0", fontSize: "15px", fontWeight: "bold" }}>
                                <span style={{ fontWeight: "bold" }}>Tech Stack: </span>
                                {techStack}
                            </p>
                        </div>
                    );
                })}
            </section>
        );
    };

    const renderCertifications = () => {
        if (!hasSection(userData.certifications)) return null;

        const normalizeCertifications = (raw) => {
            let result = [];

            if (Array.isArray(raw)) {
                if (raw.length && (raw[0].title || raw[0].platform || raw[0].link || raw[0].desc)) {
                    return raw.map((c) => ({
                        title: c.title || "",
                        desc: (c.platform ? `${c.platform} | ` : "") + (c.desc || ""),
                        link: c.link || "",
                    }));
                }

                const nameItem = raw.find((i) =>
                    i.displayQuestion?.toLowerCase().includes("name")
                );
                const linkItem = raw.find((i) =>
                    i.displayQuestion?.toLowerCase().includes("verify")
                );
                const descItem = raw.find((i) =>
                    i.displayQuestion?.toLowerCase().includes("description")
                );

                if (nameItem?.answer?.trim()) {
                    result.push({
                        title: nameItem.answer,
                        desc: descItem?.answer || "",
                        link: linkItem?.answer || "",
                    });
                }

                return result;
            }

            if (raw && typeof raw === "object") {
                Object.values(raw).forEach((child) => {
                    result = result.concat(normalizeCertifications(child));
                });
            }

            return result;
        };

        const certs = normalizeCertifications(userData.certifications);
        if (!certs.length) return null;

        return (
            <section
                key={FORM_SECTIONS.CERTIFICATIONS}
                draggable
                onDragStart={(e) => onDragStart(e, FORM_SECTIONS.CERTIFICATIONS)}
                onDragOver={(e) => onDragOver(e, FORM_SECTIONS.CERTIFICATIONS)}
                onDrop={(e) => onDrop(e, FORM_SECTIONS.CERTIFICATIONS)}
                onDragEnd={onDragEnd}
                style={{
                    ...getSectionContainerStyle(FORM_SECTIONS.CERTIFICATIONS),
                    marginTop: "9px",
                }}
            >
                <h2
                    style={{ fontSize: "18px", fontWeight: "bold", textTransform: "uppercase", paddingBottom: "4px", marginBottom: "0px", lineHeight: "1.2", display: "inline-block" }}

                >
                    Certifications
                </h2>
                <div style={{
                    height: "1px",
                    width: "100%",
                    backgroundColor: "black",
                    marginTop: "6px"
                }}>

                </div>

                {certs.map((cert, index) => (
                    <div key={index} style={{ marginTop: index === 0 ? "0px" : "0px" }}>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                        >
                            <span style={{ fontWeight: 600, fontSize: "13px" }}>
                                {cert.title}
                            </span>

                            {cert.link && (
                                <a
                                    href={cert.link}
                                    style={{
                                        fontSize: "12px",
                                        textDecoration: "underline",
                                        color: "rgb(29,78,216)",
                                        whiteSpace: "nowrap",
                                    }}
                                >
                                    verify link
                                </a>
                            )}
                        </div>

                        {cert.desc && (
                            <p style={{ marginTop: "2px", fontSize: "14px" }}>{cert.desc}</p>
                        )}
                    </div>
                ))}
            </section>
        );
    };

    const sectionRenderMap = {
        skills: renderSkills,
        projects: renderProjects,
        education: renderEducation,
        certifications: renderCertifications,
    };



    useEffect(()=>{
        if(localStorage.getItem("userData") && !userData){
            const localStorageData = JSON.parse(localStorage.getItem("userData"))
            setUserData(localStorageData)
            dispatch(updateStoreData(localStorageData))
        }
    },[])
    console.log(userData,'user data in wrapper')

    return (
        <div>
            {userData && <PreviewResume userData={userData} hasSection={hasSection} sectionRenderMap={sectionRenderMap} getAns={getAns} sectionsOrder={sectionsOrder} />}
            
        </div>
    )
}

export default PreviewWraper