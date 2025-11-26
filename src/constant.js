import { nanoid } from "@reduxjs/toolkit";
const FORM_SECTIONS = {
  INTRO: "intro",
  OBJECTIVE: "objective",
  SKILLS: "skills",
  PROJECT: "project",
  EDUCATION: "education",
  EXPERIENCE: "experience",
  CERTIFICATIONS: "certifications",
  INTERNSHIP: "internship",
};

// Projects state structur
const project = [
  {
    displayQuestion: "Project Name",
    id: nanoid(),
    type: "text",
    answer: "",
    isFilled: false,
  },
  {
    displayQuestion: "Project Description",
    id: nanoid(),
    type: "textarea",
    answer: "",
    isEditorEnabled: true,
    aiEnabled: true,
  },
  {
    displayQuestion: "Tech Stack",
    id: nanoid(),
    type: "text",
    answer: "",
  },
  { displayQuestion: "Live Link", id: nanoid(), type: "url", answer: "" },
];

const experience = [
  {
    displayQuestion: "Company Name",
    id: nanoid(),
    type: "text",
    answer: "",
    isFilled: false,
  },
  {
    displayQuestion: "Role / Position",
    id: nanoid(),
    type: "text",
    answer: "",
  },
  {
    displayQuestion: "Start Date",
    id: nanoid(),
    type: "date",
    answer: "",
  },
  { displayQuestion: "End Date", id: nanoid(), type: "date", answer: "" },
  {
    displayQuestion: "description",
    id: nanoid(),
    type: "textarea",
    answer: "",
    isEditorEnabled: true,
    aiEnabled: true,
  },
];

const intro = [
  {
    displayQuestion: "First Name",
    id: nanoid(),
    type: "text",
    answer: "",
  },
  {
    displayQuestion: "Last Name",
    id: nanoid(),
    type: "text",
    answer: "",
  },
  { displayQuestion: "Git Link", id: nanoid(), type: "url", answer: "" },
  {
    displayQuestion: "LinkedIn Link",
    id: nanoid(),
    type: "url",
    answer: "",
  },
  { displayQuestion: "email", id: nanoid(), type: "mail", answer: "" },
  {
    displayQuestion: "Phone Number",
    id: "mobile",
    type: "number",
    answer: "",
  },
];

const objective = [
  {
    displayQuestion: "Objecive",
    id: nanoid(),
    type: "textarea",
    answer: "",
    isEditorEnabled: true,
    aiEnabled: true,
  },
];

const skills = {
  languages: [
    {
      displayQuestion: "Languages",
      id: nanoid(),
      type: "text",
      answer: "",
      isFilled: false,
    },
  ],
  frameworks: [
    {
      displayQuestion: "Frameworks",
      id: nanoid(),
      type: "text",
      answer: "",
      isFilled: false,
    },
  ],
  database: [
    {
      displayQuestion: "Databases ",
      id: nanoid(),
      type: "text",
      answer: "",
      isFilled: false,
      canSkip: true,
    },
  ],
  others: [
    {
      displayQuestion: "Other tools ",
      id: nanoid(),
      type: "text",
      answer: "",
      isFilled: false,
      canSkip: true,
    },
  ],
};

const education = {
  school: [
    {
      displayQuestion: "10th CGPA/Percentage",
      id: nanoid(),
      type: "text",
      answer: "",
    },
    {
      displayQuestion: "School Name",
      id: nanoid(),
      type: "text",
      answer: "",
    },
    {
      displayQuestion: "Start Date",
      id: nanoid(),
      type: "date",
      answer: "",
    },
    {
      displayQuestion: "End Date",
      id: nanoid(),
      type: "date",
      answer: "",
    },
  ],

  higherSchool: [
    {
      displayQuestion: "12th CGPA/Percentage",
      id: nanoid(),
      type: "text",
      answer: "",
    },
    {
      displayQuestion: "Junior College Name",
      id: nanoid(),
      type: "text",
      answer: "",
    },
    {
      displayQuestion: "Start Date",
      id: nanoid(),
      type: "date",
      answer: "",
    },
    {
      displayQuestion: "End Date",
      id: nanoid(),
      type: "date",
      answer: "",
    },
  ],

  Degree: [
    {
      displayQuestion: "College Name",
      id: nanoid(),
      type: "text",
      answer: "",
    },
    {
      displayQuestion: "Degree CGPA/Percentage",
      id: nanoid(),
      type: "text",
      answer: "",
    },
    //   If key element is present then display the given element or else input or text editory
    {
      displayQuestion: "Degree Type",
      id: nanoid(),
      element: "select",
      type: "text",
      answer: "",
    },
    {
      displayQuestion: "Branch",
      id: nanoid(),
      type: "text",
      answer: "",
    },
    {
      displayQuestion: "Start Date",
      id: nanoid(),
      type: "date",
      answer: "",
    },
    {
      displayQuestion: "End Date",
      id: nanoid(),
      type: "date",
      answer: "",
    },
  ],
};

const certifications = [
  {
    displayQuestion: "Certification Name",
    id: nanoid(),
    type: "text",
    answer: "",
  },
  {
    displayQuestion: "Verify Link",
    id: nanoid(),
    type: "url",
    answer: "",
  },

  {
    displayQuestion: "Description",
    id: nanoid(),
    type: "text",
    answer: "",
    isEditorEnabled: true,
    aiEnabled: true,
  },
  {
    isLastFrom: true,
  },
];

export const internship = [
  {
    displayQuestion: "Certification Name",
    id: nanoid(),
    type: "text",
    answer: "",
  },
  {
    displayQuestion: "Start Date",
    id: nanoid(),
    type: "date",
    answer: "",
  },
  {
    displayQuestion: "End Date",
    id: nanoid(),
    type: "date",
    answer: "",
  },
  {
    displayQuestion: "Description",
    id: nanoid(),
    type: "text",
    answer: "",
    isEditorEnabled: true,
    aiEnabled: true,
  },
];

const SKIPPABLE_FORMS = {
  CERTIFICATIONS: FORM_SECTIONS.CERTIFICATIONS,
  INTERNSHIP: FORM_SECTIONS.INTERNSHIP,
};

const initialState = {
  intro,

  objective,

  skills,

  projects: {
    project1: [...project],
    project2: [...project],
    project3: [...project],
  },

  education,

  certifications,

  // Lets add internship for one more template
  // intership,

  renderingQuestions: intro,
  currentForm: FORM_SECTIONS.INTRO,
};

// Templates
const TEMPLATES_ID = {
  TEMPLATE_1: "template_1",
  TEMPLATE_2: "template_2",
};

const templates = [
  {
    id: TEMPLATES_ID.TEMPLATE_1,
    src: "https://njvawavweamzvvakmsgn.supabase.co/storage/v1/object/public/accioresume/resume.png",
  },
  {
    id: TEMPLATES_ID.TEMPLATE_2,
    src: "https://njvawavweamzvvakmsgn.supabase.co/storage/v1/object/public/accioresume/templateShumit.png",
  },
];

const SECTION_TITLES = {
  [FORM_SECTIONS.INTRO]: "Personal Information",
  [FORM_SECTIONS.OBJECTIVE]: "Career Objective",
  [FORM_SECTIONS.SKILLS]: "Technical Skills",
  [FORM_SECTIONS.EXPERIENCE]: "Work Experience",
  [FORM_SECTIONS.PROJECT]: "Projects",
  [FORM_SECTIONS.EDUCATION]: "Education",
  [FORM_SECTIONS.CERTIFICATIONS]: "Certifications",
  [FORM_SECTIONS.INTERNSHIP]: "Internship",
};

// Label formatters
const LABEL_FORMATTERS = {
  [FORM_SECTIONS.PROJECT]: (key) => key.replace("project", "Project "),
  [FORM_SECTIONS.EXPERIENCE]: (key) =>
    key.replace("experience_", "Experience "),
  [FORM_SECTIONS.SKILLS]: (key) =>
    ({
      languages: "Languages",
      frameworks: "Frameworks",
      database: "Databases",
      others: "Other Tools",
    }[key] || key),
  [FORM_SECTIONS.EDUCATION]: (key) =>
    ({
      school: "10th Standard",
      higherSchool: "12th / Intermediate",
      Degree: "Degree / Graduation",
    }[key] || key),
  [FORM_SECTIONS.INTERNSHIP]: (key) =>
    ({
      company: "Company",
      role: "Role",
      duration: "Duration",
      description: "Description",
    }[key] || key),
};

// Skills options data
const skillsOptions = {
  languages: [
    { value: "javascript", label: "JavaScript" },
    { value: "typescript", label: "TypeScript" },
    { value: "python", label: "Python" },
    { value: "java", label: "Java" },
    { value: "cpp", label: "C++" },
    { value: "c", label: "C" },
    { value: "csharp", label: "C#" },
    { value: "go", label: "Go" },
    { value: "rust", label: "Rust" },
    { value: "ruby", label: "Ruby" },
    { value: "php", label: "PHP" },
    { value: "swift", label: "Swift" },
    { value: "kotlin", label: "Kotlin" },
    { value: "dart", label: "Dart" },
    { value: "r", label: "R" },
    { value: "matlab", label: "MATLAB" },
    { value: "perl", label: "Perl" },
    { value: "scala", label: "Scala" },
    { value: "bash", label: "Bash" },
    { value: "sql", label: "SQL" },
  ],

  frameworks: [
    // Frontend
    { value: "react", label: "React" },
    { value: "nextjs", label: "Next.js" },
    { value: "angular", label: "Angular" },
    { value: "vue", label: "Vue.js" },
    { value: "svelte", label: "Svelte" },
    { value: "gatsby", label: "Gatsby.js" },

    // Backend
    { value: "nodejs", label: "Node.js" },
    { value: "express", label: "Express.js" },
    { value: "nestjs", label: "NestJS" },
    { value: "django", label: "Django" },
    { value: "flask", label: "Flask" },
    { value: "fastapi", label: "FastAPI" },
    { value: "springboot", label: "Spring Boot" },
    { value: "laravel", label: "Laravel" },
    { value: "dotnet", label: ".NET" },
    { value: "rubyrails", label: "Ruby on Rails" },

    // Mobile
    { value: "reactnative", label: "React Native" },
    { value: "flutter", label: "Flutter" },

    // Desktop
    { value: "electron", label: "Electron.js" },
  ],

  database: [
    { value: "mysql", label: "MySQL" },
    { value: "postgresql", label: "PostgreSQL" },
    { value: "mongodb", label: "MongoDB" },
    { value: "redis", label: "Redis" },
    { value: "sqlite", label: "SQLite" },
    { value: "oracle", label: "Oracle" },
    { value: "mariadb", label: "MariaDB" },
    { value: "firebase", label: "Firebase" },
    { value: "dynamodb", label: "DynamoDB" },
    { value: "cassandra", label: "Cassandra" },
    { value: "neodb", label: "Neo4j" },
    { value: "couchdb", label: "CouchDB" },
    { value: "elasticsearch", label: "Elasticsearch" },
  ],

  others: [
    // DevOps
    { value: "git", label: "Git" },
    { value: "github", label: "GitHub" },
    { value: "gitlab", label: "GitLab" },
    { value: "docker", label: "Docker" },
    { value: "kubernetes", label: "Kubernetes" },
    { value: "jenkins", label: "Jenkins" },
    { value: "ansible", label: "Ansible" },
    { value: "terraform", label: "Terraform" },
    { value: "nginx", label: "Nginx" },
    { value: "apache", label: "Apache" },

    // Cloud
    { value: "aws", label: "AWS" },
    { value: "azure", label: "Azure" },
    { value: "gcp", label: "GCP" },
    { value: "vercel", label: "Vercel" },
    { value: "netlify", label: "Netlify" },
    { value: "cloudflare", label: "Cloudflare" },

    // Tools
    { value: "webpack", label: "Webpack" },
    { value: "vite", label: "Vite" },
    { value: "babel", label: "Babel" },
    { value: "postman", label: "Postman" },
    { value: "swagger", label: "Swagger" },
    { value: "jira", label: "Jira" },
    { value: "notion", label: "Notion" },
    { value: "figma", label: "Figma" },
    { value: "canva", label: "Canva" },
    { value: "sass", label: "SASS" },
    { value: "tailwind", label: "Tailwind CSS" },
    { value: "bootstrap", label: "Bootstrap" },
    { value: "materialui", label: "Material UI" },
    { value: "chakraui", label: "Chakra UI" },

    // Testing
    { value: "jest", label: "Jest" },
    { value: "cypress", label: "Cypress" },
    { value: "selenium", label: "Selenium" },
    { value: "pytest", label: "PyTest" },
    { value: "junit", label: "JUnit" },

    // ML/AI
    { value: "tensorflow", label: "TensorFlow" },
    { value: "pytorch", label: "PyTorch" },
    { value: "pandas", label: "Pandas" },
    { value: "numpy", label: "NumPy" },
    { value: "opencv", label: "OpenCV" },

    // Cybersecurity
    { value: "nmap", label: "Nmap" },
    { value: "burpsuite", label: "Burp Suite" },
    { value: "owasp", label: "OWASP" },
  ],
};

// Custom syles for react-select component

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    borderRadius: "0.5rem",
    borderColor: state.isFocused ? "#22c55e" : "#d1d5db",
    borderWidth: "1px",
    boxShadow: state.isFocused ? "0 0 0 3px rgba(34, 197, 94, 0.1)" : "none",
    "&:hover": {
      borderColor: "#22c55e",
    },
    minHeight: "42px",
    padding: "2px",
  }),
  multiValue: (provided) => ({
    ...provided,
    backgroundColor: "#dcfce7",
    borderRadius: "0.375rem",
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    color: "#166534",
    fontWeight: "500",
  }),
  multiValueRemove: (provided) => ({
    ...provided,
    color: "#166534",
    ":hover": {
      backgroundColor: "#22c55e",
      color: "white",
    },
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "#9ca3af",
  }),
};

export {
  SECTION_TITLES,
  LABEL_FORMATTERS,
  templates,
  TEMPLATES_ID,
  initialState,
  SKIPPABLE_FORMS,
  experience,
  FORM_SECTIONS,
  skillsOptions,
  customStyles,
};
