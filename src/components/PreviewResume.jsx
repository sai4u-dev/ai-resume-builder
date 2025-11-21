import React from "react";
import { BsPhoneFill } from "react-icons/bs";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";

function PreviewResume({
  userData,
  hasSection,
  sectionRenderMap,
  sectionsOrder,
}) {
  // put these near the top of your file, inside the component file

  // ICON + FORMAT SETTINGS
  const CONTACT_MAP = {
    "Git Link": {
      icon: <FaGithub size={15} />,
      format: (v) => v,
    },
    "LinkedIn Link": {
      icon: <FaLinkedin size={15} />,
      format: (v) => v,
    },
    email: {
      icon: <HiOutlineMail size={15} />,
      format: (v) => v,
    },
    "Phone Number": {
      icon: <BsPhoneFill size={15} />,
      format: (v) => `+91 ${v}`,
    },
  };
  const intro = userData?.intro || [];
  const fullName = `${intro[0]?.answer || ""} ${intro[1]?.answer || ""}`;

  console.log(userData,'resume data ')

  return (
    <div
      id="divToPrint"
      style={{
        marginLeft: "auto",
        marginRight: "auto",
        // marginTop: "32px",
        // marginBottom: "32px",
        backgroundColor: "#ffffff",
        color: "#000000",
        padding: "40px",
        border: "1px solid rgb(156,163,175)",
        fontSize: "11px",
        lineHeight: "1.55",
        width: "794px",
        fontFamily: "Calibri",
        display: "flex",
        flexDirection: "column",
        gap: "9px",
        textAlign: "left",

        // "Times New Roman, Times, serif,",
      }}
    >
      {/* INTRO */}
      <header>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <h1 style={{ fontSize: "30px", marginBottom: "4px" }}>{fullName}</h1>
        </div>

        {/* CONTACT ROW */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "10px",
            flexWrap: "wrap",
          }}
        >
          {intro.slice(2).map((item) => {
            const conf = CONTACT_MAP[item.displayQuestion] || {};

            return (
              <div
                key={item.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                {/* icon if exists */}
                {conf.icon || null}

                {/* clickable link for URLs */}
                {item.type === "url" ? (
                  <a
                    href={item.answer}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: "rgb(29,78,216)",
                      textDecoration: "underline",
                    }}
                  >
                    {item.answer}
                  </a>
                ) : (
                  <span>
                    {conf.format ? conf.format(item.answer) : item.answer}
                  </span>
                )}

                <span>|</span>
              </div>
            );
          })}
        </div>
      </header>

      {/* OBJECTIVE */}
      {hasSection(userData.objective) && (
        <section style={{ marginTop: "6px" }}>
          <h2
            style={{
              fontSize: "18px",
              fontWeight: "bold",
              textTransform: "uppercase",
            //   borderBottom: "1px solid #000",
              paddingBottom: "4px", // space between text and line
              marginBottom: "2px", // small gap to the paragraph
              lineHeight: "1.2", // stable text height
              display: "inline-block", // avoids weird border behavior
            }}
          >
            Objective
          </h2>
          <div style={{
            height:"1px",
            width:"100%",
            backgroundColor:"black",
            marginTop:"6px"
          }}>

          </div>
          <p
            style={{ marginTop: "3px", fontSize: "14px", lineHeight:"19px"}}
            dangerouslySetInnerHTML={{ __html: userData.objective[0].answer }}
          ></p>
        </section>
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

export default PreviewResume;
