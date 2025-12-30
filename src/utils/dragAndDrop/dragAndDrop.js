// import { useRef, useState } from "react";

// import { FORM_SECTIONS } from "../../constant";

// const initialSections = [FORM_SECTIONS.SKILLS, FORM_SECTIONS.PROJECT, FORM_SECTIONS.EDUCATION, FORM_SECTIONS.CERTIFICATIONS];

//     // ----------------- Drag & Drop logic -----------------
//     // Sections we want draggable (initial order)
//     // Use state to maintain order
//     const [sectionsOrder, setSectionsOrder] = useState(initialSections);

//     // currently dragging id
//     const draggingIdRef = useRef(null);
//     const [dragOverId, setDragOverId] = useState(null);

//     // DRAG AND DROP FUNCTIONALITY
//     const onDragStart = (e, sectionId) => {
//         draggingIdRef.current = sectionId;
//         e.dataTransfer.effectAllowed = "move";
//         try {
//             e.dataTransfer.setData("text/plain", sectionId);
//         } catch (err) {
//             // some browsers require try/catch
//         }
//         // small timeout to add dragging class via state if needed
//         e.currentTarget.style.opacity = "0.6";
//     };

//     const onDragEnd = (e) => {
//         draggingIdRef.current = null;
//         setDragOverId(null);
//         // clear any inline opacity set
//         e.currentTarget.style.opacity = "1";
//     };

//     const onDragOver = (e, sectionId) => {
//         e.preventDefault(); // allow drop
//         if (draggingIdRef.current && draggingIdRef.current !== sectionId) {
//             setDragOverId(sectionId);
//         }
//     };

//     const onDrop = (e, targetId) => {
//         e.preventDefault();
//         const sourceId = (e.dataTransfer && e.dataTransfer.getData && e.dataTransfer.getData("text/plain")) || draggingIdRef.current;
//         if (!sourceId) return;
//         if (sourceId === targetId) {
//             setDragOverId(null);
//             return;
//         }

//         setSectionsOrder((prev) => {
//             const newOrder = [...prev];
//             const srcIndex = newOrder.indexOf(sourceId);
//             const tgtIndex = newOrder.indexOf(targetId);
//             if (srcIndex === -1 || tgtIndex === -1) return prev;

//             // remove source
//             newOrder.splice(srcIndex, 1);
//             // insert source at target index (we'll insert before target)
//             newOrder.splice(tgtIndex, 0, sourceId);

//             return newOrder;
//         });

//         draggingIdRef.current = null;
//         setDragOverId(null);
//     };

//     function getSectionContainerStyle(id) {
//         const isDragging = draggingIdRef.current === id;
//         const isDragOver = dragOverId === id;
//         return {
//             border: isDragOver ? "2px dashed #9CA3AF" : "none",
//             padding: "0px",
//             marginBottom: "1px",
//             borderRadius: "6px",
//             backgroundColor: isDragging ? "#fafafa" : "transparent",
//             cursor: "grab",
//         };
//     }

//     export{ onDragStart, onDragEnd, onDragOver, onDrop, getSectionContainerStyle, sectionsOrder};

// src/hooks/useDragAndDrop.js
import { useRef, useState } from "react";

export default function useDragAndDrop(initialSections) {
  const [sectionsOrder, setSectionsOrder] = useState(initialSections);
  const draggingIdRef = useRef(null);
  const [dragOverId, setDragOverId] = useState(null);

  const onDragStart = (e, sectionId) => {
    draggingIdRef.current = sectionId;
    e.dataTransfer.effectAllowed = "move";
    try {
      e.dataTransfer.setData("text/plain", sectionId);
    } catch {}
    e.currentTarget.style.opacity = "0.6";
  };

  const onDragEnd = (e) => {
    draggingIdRef.current = null;
    setDragOverId(null);
    e.currentTarget.style.opacity = "1";
  };

  const onDragOver = (e, sectionId) => {
    e.preventDefault();
    if (draggingIdRef.current && draggingIdRef.current !== sectionId) {
      setDragOverId(sectionId);
    }
  };

  const onDrop = (e, targetId) => {
    e.preventDefault();
    const sourceId =
      e.dataTransfer?.getData("text/plain") || draggingIdRef.current;

    if (!sourceId || sourceId === targetId) {
      setDragOverId(null);
      return;
    }

    setSectionsOrder((prev) => {
      const newOrder = [...prev];
      const srcIndex = newOrder.indexOf(sourceId);
      const tgtIndex = newOrder.indexOf(targetId);

      if (srcIndex === -1 || tgtIndex === -1) return prev;

      newOrder.splice(srcIndex, 1);
      newOrder.splice(tgtIndex, 0, sourceId);
      return newOrder;
    });

    draggingIdRef.current = null;
    setDragOverId(null);
  };

  const getSectionContainerStyle = (id) => ({
    border: dragOverId === id ? "2px dashed #9CA3AF" : "none",
    padding: "0px",
    marginBottom: "1px",
    borderRadius: "6px",
    backgroundColor: draggingIdRef.current === id ? "#fafafa" : "transparent",
    cursor: "grab",
  });

  return {
    sectionsOrder,
    onDragStart,
    onDragOver,
    onDrop,
    onDragEnd,
    getSectionContainerStyle,
  };
}
