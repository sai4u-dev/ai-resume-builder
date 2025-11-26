// import html2canvas from 'html2canvas';
// import jsPDF from 'jspdf';
// import PreviewWraper from '../components/PreviewWraper';
// import { useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';


// function Preview() {

//   const store = useSelector((state)=>state.formData)
//   const navigate = useNavigate()


//   const handleDownload = () => {
//     const input = document.getElementById("divToPrint");

//     // BACKUP old styles
//     const previousBg = input.style.background;
//     const previousBgImage = input.style.backgroundImage;

//     // TEMPORARY SAFE STYLES 
//     input.style.background = "white";
//     input.style.backgroundImage = "none";


//     html2canvas(input, { scale: 3 }).then((canvas) => {
//       const imgData = canvas.toDataURL("image/png");
//       const pdf = new jsPDF("p", "mm", "a4");

//       const imgProps = pdf.getImageProperties(imgData);
//       const pdfWidth = pdf.internal.pageSize.getWidth();
//       const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

//       pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
//       pdf.save("resume.pdf");

//       // RESTORE old styles
//       input.style.background = previousBg;
//       input.style.backgroundImage = previousBgImage;
//     });


//   };


//   console.log(store,'state data in preview effect')
//   useEffect(()=>{
//     if(!store && !localStorage.getItem("userData")){
//       navigate("/")
//     }
//   },[])


//   return (
//     <div className="min-h-screen flex  from-gray-50 to-green-50 p-8">


//       <PreviewWraper/>


//       {/* Right Side Empty Area (Optional) */}
//       <div className="hide w-2/5 flex justify-center items-center text-gray-500 italic">
//         <p>Preview your resume on the left.</p>
//       </div>

//       {/* Download Button */}
//       <button
//         className=" hide fixed bottom-8 right-10 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full shadow-lg font-medium transition-all hover:scale-105 cursor-pointer"
//         onClick={handleDownload}
//       >
//         📄 Download as PDF
//       </button>
//     </div>
//   )
// }

// export default Preview




import React from 'react'
import { Provider, } from 'react-redux'
// import ResumeTemplate1 from '../components/Templates/ResumeTemplate1'
// import ResumePDF1 from '../components/ResumePDF1';
import Form from './Form';
// import Resume from '../components/Resume';
// import ResumePreview from '../components/ResumePreview';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import ResumeComponentLogic from '../components/ResumeComponentLogic';


function Preview() {
  // const storeData = useSelector((state)=> state.userData)

  // const objectiveData = storeData.objective  

  // console.log(objectiveData,"OBJECTIVE DATA IN RESUME PREVIEW")
  // console.log(objectiveData,"TEXT CONTENT")
  // console.log(typeof objectiveData,"TYPE OF OBJECTIVE DATA IN RESUME PREVIEW")

  // const navigate = useNavigate()


  const handleDownload = () => {
    const input = document.getElementById("divToPrint");

    // BACKUP old styles
    const previousBg = "white";
    const previousBgImage = input.style.backgroundImage;

    // TEMPORARY SAFE STYLES (html2canvas friendly)
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

      // RESTORE old styles
      input.style.background = previousBg;
      input.style.backgroundImage = previousBgImage;
    });


  };




  return (
    <div className="min-h-screen flex  from-gray-50 to-green-50 p-8">

      {/* Resume Preview Section */}
      {/* <ResumeTemplate1 /> */}

      <ResumeComponentLogic />
      {/* <div className="w-3/5 bg-white shadow-xl rounded-2xl p-8 overflow-y-auto border border-gray-200">
      </div> */}

      {/* Right Side Empty Area (Optional) */}
      <div className="hide w-2/5 flex justify-center items-center text-gray-500 italic">
        <p>Preview your resume on the left.</p>
      </div>

      {/* Download Button */}
      <button
        className=" hide fixed bottom-8 right-10 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full shadow-lg font-medium transition-all hover:scale-105 cursor-pointer"
        onClick={handleDownload}
      >
        📄 Download as PDF
      </button>
    </div>
  )
}

export default Preview