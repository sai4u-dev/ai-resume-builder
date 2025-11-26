import { BsPhoneFill } from "react-icons/bs";
import { FaGithub, FaGithubAlt, FaLinkedin } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";

export const dummyData = {
  currentForm: "intro",

  intro: [
    {
      displayQuestion: "First Name",
      id: "intro-1",
      type: "text",
      answer: "John",
    },
    {
      displayQuestion: "Last Name",
      id: "intro-2",
      type: "text",
      answer: "Doe",
    },
    {
      displayQuestion: "GitHub Link",
      id: "intro-3",
      type: "url",
      answer: "https://github.com/johndoe",
      icon: FaGithub,
    },
    {
      displayQuestion: "LinkedIn Link",
      id: "intro-4",
      type: "url",
      answer: "https://linkedin.com/in/johndoe",
      icon: FaLinkedin,
    },
    {
      displayQuestion: "email",
      id: "intro-5",
      type: "mail",
      answer: "john@example.com",
      icon: HiOutlineMail,
    },
    {
      displayQuestion: "Phone Number",
      id: "intro-6",
      type: "number",
      answer: "9876543210",
      icon: BsPhoneFill,
    },
  ],

  objective: [
    {
      displayQuestion: "Objecive",
      id: "objective",
      type: "textarea",
      answer:
        "A full-stack MERN developer is a professional who specializes in building complete web applications using the MERN stack, which consists of MongoDB, Express.js, React, and Node.js. This stack provides a unified JavaScript environment for both frontend and backend development, enabling code reuse, faster development cycles, and simplified debugging. The developer is responsible for the entire application lifecycle, including designing, implementing, testing, deploying, and maintaining web applications.",
      isEditorEnabled: true,
      aiEnabled: true,
    },
  ],

  skills: {
    languages: [
      {
        displayQuestion: "Languages",
        id: "skill-lang-1",
        type: "text",
        answer: "JavaScript",
        isFilled: true,
      },
    ],
    frameworks: [
      {
        displayQuestion: "Frameworks",
        id: "skill-fw-1",
        type: "text",
        answer: "React.js",
        isFilled: true,
      },
    ],
    database: [
      {
        displayQuestion: "Databases ",
        id: "skill-db-1",
        type: "text",
        answer: "MongoDB",
        isFilled: true,
        canSkip: true,
      },
    ],
    others: [
      {
        displayQuestion: "Other tools ",
        id: "skill-other-1",
        type: "text",
        answer: "Git, Docker",
        isFilled: true,
        canSkip: true,
      },
    ],
  },

  projects: {
    project1: [
      {
        displayQuestion: "Project Name",
        id: "p1-1",
        type: "text",
        answer: "Portfolio Website",
        isFilled: true,
      },
      {
        displayQuestion: "Project Description",
        id: "p1-2",
        type: "textarea",
        answer:
          "A personal portfolio showcasing projects, skills, and experience.",
        isEditorEnabled: true,
        aiEnabled: true,
      },
      {
        displayQuestion: "Tech Stack",
        id: "p1-3",
        type: "text",
        answer: "React, TailwindCSS",
      },
      {
        displayQuestion: "Live Link",
        id: "p1-4",
        type: "url",
        answer: "https://portfolio-demo.com",
      },
    ],

    project2: [
      {
        displayQuestion: "Project Name",
        id: "p2-1",
        type: "text",
        answer: "Task Manager App",
        isFilled: true,
      },
      {
        displayQuestion: "Project Description",
        id: "p2-2",
        type: "textarea",
        answer:
          "A task management application with drag-and-drop UI and cloud sync.",
        isEditorEnabled: true,
        aiEnabled: true,
      },
      {
        displayQuestion: "Tech Stack",
        id: "p2-3",
        type: "text",
        answer: "React, Node.js, MongoDB",
      },
      {
        displayQuestion: "Live Link",
        id: "p2-4",
        type: "url",
        answer: "https://tasks-demo.com",
      },
    ],

    project3: [
      {
        displayQuestion: "Project Name",
        id: "p3-1",
        type: "text",
        answer: "Chat Application",
        isFilled: true,
      },
      {
        displayQuestion: "Project Description",
        id: "p3-2",
        type: "textarea",
        answer: "Real-time chat with groups and typing indicators.",
        isEditorEnabled: true,
        aiEnabled: true,
      },
      {
        displayQuestion: "Tech Stack",
        id: "p3-3",
        type: "text",
        answer: "Socket.io, Express.js",
      },
      {
        displayQuestion: "Live Link",
        id: "p3-4",
        type: "url",
        answer: "https://chat-demo.com",
      },
    ],
  },

  education: {
    school: [
      {
        displayQuestion: "10th CGPA/Percentage",
        id: "edu-sch-1",
        type: "text",
        answer: "9.5 CGPA",
      },
      {
        displayQuestion: "School Name",
        id: "edu-sch-2",
        type: "text",
        answer: "Delhi Public School",
      },
      {
        displayQuestion: "Start Date",
        id: "edu-sch-3",
        type: "date",
        answer: "2016-06-01",
      },
      {
        displayQuestion: "End Date",
        id: "edu-sch-4",
        type: "date",
        answer: "2018-04-15",
      },
    ],

    higherSchool: [
      {
        displayQuestion: "12th CGPA/Percentage",
        id: "edu-hs-1",
        type: "text",
        answer: "88%",
      },
      {
        displayQuestion: "Junior College Name",
        id: "edu-hs-2",
        type: "text",
        answer: "Sri Chaitanya Jr. College",
      },
      {
        displayQuestion: "Start Date",
        id: "edu-hs-3",
        type: "date",
        answer: "2018-06-01",
      },
      {
        displayQuestion: "End Date",
        id: "edu-hs-4",
        type: "date",
        answer: "2020-04-15",
      },
    ],

    Degree: [
      {
        displayQuestion: "College Name",
        id: "edu-deg-1",
        type: "text",
        answer: "VNR VJIET",
      },
      {
        displayQuestion: "Degree CGPA/Percentage",
        id: "edu-deg-2",
        type: "text",
        answer: "8.7 CGPA",
      },
      {
        displayQuestion: "Degree Type",
        id: "edu-deg-3",
        element: "select",
        type: "text",
        answer: "B.Tech",
      },
      {
        displayQuestion: "Branch",
        id: "edu-deg-4",
        type: "text",
        answer: "Computer Science",
      },
      {
        displayQuestion: "Start Date",
        id: "edu-deg-5",
        type: "date",
        answer: "2020-08-01",
      },
      {
        displayQuestion: "End Date",
        id: "edu-deg-6",
        type: "date",
        answer: "2024-05-30",
      },
    ],
  },

  certifications: [
    {
      displayQuestion: "Certification Name",
      id: "cert-1",
      type: "text",
      answer: "React Developer Certification",
    },
    {
      displayQuestion: "Verify Link",
      id: "cert-2",
      type: "url",
      answer: "https://verify-react.com/123",
    },
    {
      displayQuestion: "Description",
      id: "cert-3",
      type: "text",
      answer: "Completed an advanced React developer training.",
      isEditorEnabled: true,
      aiEnabled: true,
    },
  ],

  intership: [
    {
      displayQuestion: "Certification Name",
      id: "int-1",
      type: "text",
      answer: "Frontend Developer Intern - TechCorp",
    },
    {
      displayQuestion: "Start Date",
      id: "int-2",
      type: "date",
      answer: "2023-05-01",
    },
    {
      displayQuestion: "End Date",
      id: "int-3",
      type: "date",
      answer: "2023-08-30",
    },
    {
      displayQuestion: "Description",
      id: "int-4",
      type: "text",
      answer:
        "Built UI components, implemented API integration, and optimized performance.",
      isEditorEnabled: true,
      aiEnabled: true,
    },
  ],

  renderingQuestions: [
    {
      displayQuestion: "First Name",
      id: "intro-1",
      type: "text",
      answer: "John",
    },
  ],
};
