// ResumePreviewComponent.jsx
import React, { useEffect, useState, useRef } from "react";

function ResumePreviewComponent({
  userData,
  hasSection,
  sectionRenderMap,
  sectionsOrder: initialSectionsOrder = [],
  onSectionsOrderChange = null, // optional callback to inform parent of reordering
}) {
  // Safe guard
  if (!userData) return null;

  // Extract full name in single pass (handles first/last/middle names)
  const intro = userData.intro || [];
  let fullName = intro
    .reduce((acc, item) => {
      const q = item.displayQuestion?.toLowerCase() || "";
      if (q.includes("name")) {
        acc.push(item.answer || "");
      }
      return acc;
    }, [])
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();

  // Extract remaining details (email, phone, links, icons)
  const details = intro.filter(
    (it) => !it.displayQuestion?.toLowerCase().includes("name")
  );

  // Local drag state (visual reordering)
  const [sectionsOrder, setSectionsOrder] = useState(
    initialSectionsOrder || []
  );
  const draggingIdRef = useRef(null);
  const [dragOverId, setDragOverId] = useState(null);

  // keep local order in sync if parent changes initialSectionsOrder
  useEffect(() => {
    setSectionsOrder(initialSectionsOrder || []);
  }, [initialSectionsOrder]);

  // DnD handlers
  const onDragStart = (e, id) => {
    draggingIdRef.current = id;
    e.dataTransfer.effectAllowed = "move";
    try {
      e.dataTransfer.setData("text/plain", id);
    } catch (err) {
      // ignore
    }
    // add a small hint for keyboard screen readers
    e.currentTarget.classList.add("opacity-60");
  };

  const onDragEnd = (e) => {
    draggingIdRef.current = null;
    setDragOverId(null);
    e.currentTarget.classList.remove("opacity-60");
  };

  const onDragOver = (e, id) => {
    e.preventDefault();
    if (draggingIdRef.current && draggingIdRef.current !== id) {
      setDragOverId(id);
    }
  };

  const onDrop = (e, targetId) => {
    e.preventDefault();
    const sourceId =
      (e.dataTransfer &&
        e.dataTransfer.getData &&
        e.dataTransfer.getData("text/plain")) ||
      draggingIdRef.current;
    if (!sourceId || sourceId === targetId) {
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
      // insert before target index
      newOrder.splice(tgtIndex, 0, sourceId);

      // notify parent if callback provided
      if (typeof onSectionsOrderChange === "function") {
        onSectionsOrderChange(newOrder);
      }

      return newOrder;
    });

    draggingIdRef.current = null;
    setDragOverId(null);
  };

  const sectionContainerClass = (id) =>
    `p-2 rounded-md ${
      dragOverId === id ? "border-2 border-dashed border-gray-400" : ""
    } transition-colors`;

  return (
    <div
      id="divToPrint"
      className="mx-auto bg-white text-black p-10 text-xs font-sans flex flex-col gap-2.5 w-full max-w-3xl"
    >
      {/* INTRO */}
      <header className="mb-2">
        <div className="flex justify-center">
          <h1 className="text-3xl mb-1 font-semibold">{fullName}</h1>
        </div>

        <div className="flex justify-center items-center gap-x-2 text-sm text-gray-700">
          {details.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={item.id || idx} className="flex items-center gap-1.5">
                {Icon && typeof Icon === "function" ? <Icon size={15} /> : null}
                <span>{item.answer}</span>
                <span className="text-gray-300">|</span>
              </div>
            );
          })}
        </div>
      </header>

      {/* OBJECTIVE */}
      {hasSection(userData.objective) &&
        (userData.objective || []).map((obj) => (
          <section className="pt-1.5" key={obj.id}>
            <h2 className="text-lg font-bold uppercase pb-1 mb-0.5 inline-block">
              {obj.displayQuestion}
            </h2>
            <hr />
            <p
              className="mt-1 text-sm leading-5"
              dangerouslySetInnerHTML={{ __html: obj.answer }}
            ></p>
          </section>
        ))}

      {/* Draggable sections */}
      <div className="mt-2 space-y-2">
        {sectionsOrder.map((sectionId) => {
          const renderer = sectionRenderMap[sectionId];
          if (!renderer) return null;

          // Renderer may return a full <section> block — we wrap it to control drag events.
          return (
            <div
              key={sectionId}
              draggable
              onDragStart={(e) => onDragStart(e, sectionId)}
              onDragEnd={onDragEnd}
              onDragOver={(e) => onDragOver(e, sectionId)}
              onDrop={(e) => onDrop(e, sectionId)}
              className={sectionContainerClass(sectionId)}
              aria-grabbed={draggingIdRef.current === sectionId}
            >
              {/*
                Call renderer to produce section content. If your renderer function
                expects arguments (like userData), make sure the function closes over them,
                or change this call accordingly.
              */}
              {renderer && typeof renderer === "function" ? renderer() : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ResumePreviewComponent;
