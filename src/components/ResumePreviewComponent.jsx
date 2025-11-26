import React from "react";

function ResumePreviewComponent({
    userData,
    hasSection,
    sectionRenderMap,
    sectionsOrder,
}) {

    const intro = userData.intro;
    let fullName = "";
    intro.forEach((item) => {
        const q = item.displayQuestion.toLowerCase();
        if (q.includes("name")) {
            fullName += item.answer + " ";
        }
    });
    fullName = fullName.trim();
    // console.log(fullName);
    console.log(Object.values(userData))


    //Extrating the details rather than names for links, and phone and mail.
    const details = intro.filter(items => !items.displayQuestion.toLowerCase().includes("name"))
    // console.log(details, "deatils for intro setionn")


    // console.log(userData.objective)


    return (
        <div
            id="divToPrint"
            className="ml-auto mr-auto bg-white text-black p-10 border text-xs w-3xl font-[Calibri] flex flex-col gap-2.5 text-left" >
            {/* INTRO */}
            <header>
                <div className="flex justify-center">
                    <h1 className="text-3xl mb-1">{fullName}</h1>
                </div>

                <div className="flex justify-center items-center gap-x-2">
                    {details.map((item, index) => (
                        <div
                            key={item.id}
                            className="flex justify-center items-center gap-1.5"
                        >
                            {item.icon && <item.icon size={15} />}

                            {item.type === "url" ? (
                                <a href={item.answer}>
                                    {item.answer.replace("https://", "")}
                                </a>
                            ) : (
                                <span>{item.answer}</span>
                            )}

                            {/* Render "|" only if NOT last item */}
                            {index !== details.length - 1 && <span>|</span>}
                        </div>
                    ))}
                </div>
            </header>


            {/* OBJECTIVE */}
            {hasSection(userData.objective) && (
                userData.objective.map(obj => (
                    <section className="pt-1.5" key={obj.id}>
                        <h2 className="text-lg font-bold uppercase pb-1 mb-0.5 inline-block" >
                            {obj.displayQuestion}
                        </h2>
                        <hr />
                        <p className="mt-1 text-sm leading-5"
                            dangerouslySetInnerHTML={{ __html: obj.answer }}
                        ></p>
                    </section>
                ))
            )}

            {/* Dynamic placement of the draggable sections based on sectionsOrder */}
            <div style={{ marginTop: "1px" }}>
                {sectionsOrder.map((sectionId) => {
                    const renderer = sectionRenderMap[sectionId];
                    if (!renderer) return null;
                    return renderer();
                })}
            </div>
        </div>
    );
}

export default ResumePreviewComponent;