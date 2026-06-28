import profileImg from "../assets/profile.jpg";
import project1 from "../assets/project-1.jpg";
import project2 from "../assets/project-2.jpg";
import project3 from "../assets/project-3.jpg";
import project4 from "../assets/project-4.jpg";
import resume from "../assets/resume.jpg";
import myprofile from "../assets/myprofile.jpg";

/**
 * Edit this file to update every section of the portfolio.
 * The site is fully driven by the values exported below.
 */

export const profile = {
  name: "Suba Harini B",
  shortName: "Harini B",
  designation: "Software Engineer · Full Stack developer",
  location: "Coimbatore, India",
  email: "kannanharini2005@gmail.com",
  phone: "+91 9894612560",
  linkedin: "https://www.linkedin.com/in/suba-harini-b-a990712a5?utm_source=share_via&utm_content=profile&utm_medium=member_android",
  github: "https://github.com/SubaHariniB-dev",
  resumeUrl: resume,
  image: myprofile,
  roles: [
    "Software Engineer...",
    "Full stack developer...",
    "UI/UX developer...",
  ],
  shortBio:
    "Passionate Computer Science Engineering student specializing in Java, Full Stack Development, and Artificial Intelligence. Building innovative solutions through code and continuous learning.",
  longBio:
    "Hello! I'm Suba Harini, a Computer Science Engineering student with a strong passion for software development, Full Stack Web Development. I enjoy transforming ideas into practical, user-friendly applications that solve real-world problems. My technical expertise includes Java, Spring Boot, React, MySQL, HTML, CSS, JavaScript, and Machine Learning..",
  objective:
    "To leverage my skills in Java, Full Stack Development, and Artificial Intelligence to build innovative software solutions while continuously learning and contributing to impactful projects as a Software Engineer..",
};

export const stats = [
  { value: "4", label: "Projects Completed" },
  { value: "50+", label: "DSA Problems Solved" },
  { value: "8+", label: "Certifications" },

];

export const skillGroups = [
  {
    title: "Backend And DataBase",
    dot: "bg-brand-primary",
    items: [
      { name: "Java · Spring Boot", meta: "", level: 92 },
      { name: "MYSQL", meta: "", level: 88 },
      { name: "MOGODB", meta: "", level: 90 },
      
    ],
  },
  {
    title: "Front-End Technology ",
    dot: "bg-brand-secondary",
    items: [
      { name: "React", meta: "", level: 85 },
      { name: "Java Script", meta: "", level: 80 },
      { name: "HTML", meta: "", level: 90 },
      { name: "CSS", meta: "", level: 80 },
    ],
  },
  {
    title: "UI & UX",
    dot: "bg-brand-accent",
    items: [
      { name: "Figma", meta: "Intermediate", level: 84 },
      { name: "Adobe XD", meta: "", level: 75},
      
    ],
  },
];

export const projects = [
  {
    title: "Career Compass-Smart Career Guidence Platform",
    description:
      "A web application that help the students and career switchers to identify their career paths based on the interest skill and preference.",
    image: project1,
    tech: ["HTML", "CSS", "Java Script", "MYSQL"],
    github: "https://github.com/SubaHariniB-dev/Career-Compass-Mini-Project-",
    
    
  },
  {
    title: "AI-HEALTH CHATBOT FOR DISEASE  PREDICTION",
    description:
      "Developed an AI-powered chatbot for disease prediction based on the symptoms from the user.It also has a vaccination Module and Heath camp Module ",
    image: project2,
    tech: ["Python-Flask", "HTML", "CSS","Java Script","Machine Learning"," Decision tree"],
    github: "https://github.com/SubaHariniB-dev/AI-driven-public-health-chatbot-project",
    
    
  },
  
  
];

export const experience = [
  
  
  {
    company: "Refinement Solutions",
    role: "Full stack-Intern",
    duration: "1-month",
    bullets: [
      "Developed a E-commerece website",
      "Worked on Frontend Backend ",
      "Understand API and API intergation .",
    ],
    tech: ["HTML ", "CSS", "Java Script","React","Spring Boot","MYSQL"],
  },
  
];

export const education = [
  {
    degree: "B.E, Computer Science & Engineering",
    institution: "Hindusthan College Of Engineering And Technology",
    cgpa: "9.02 / 10",
    year: "2023 — 2027",
    
  },
  {
    degree: "Higher Secondary, HSC",
    institution: "Arokia Matha Matriculation Higher Secondary School",
    cgpa: "89%",
    year: "2022 — 2023",
    description: "School topper in Biology",
  },
];

export const certifications = [
  { name: "Cloud Computing-Elite", org: "NPTEL", date: "2024", description: "Learned about the fundamentals of cloud computing and the Architecture." ,id:"123@hicet"},
  { name: "Cyber Security-Elite", org: "NPTEL", date: "2025", id: "cyber123" },
  { name: "Data Structures", org: "Great Learning", date: "2024", id: "data452" },
  { name: "Software Design & Modeling", org: "LinkedIn Learning", date: "2024", id: "softwaredesign" },
  
];

export const achievements = [
  { title: "Selected for Internal Hackathon 2025", date: "Aug 2025", description: "Built an tourist safety management system for the travellers that sends alerts when you are in a red zone area" },
  { title: "Published · CAREER COMPASS", date: "Mar 2024", description: "Publish a Journal paper on IJIRSET(International Journal Of Reaserch in Science Engineering and Technology)." },
  { title: "Published · AI-DRIVEN PUBLIC HEALTH CHATBOT FOR DISEASE AWARENESS ", date: "MAR 2026", description: "Publish a Journal paper on IJIRSET(International Journal Of Reaserch in Science Engineering and Technology)." },
  
];

export const codingProfiles = [
  { name: "GitHub", username: "Suba Harini", url: "https://github.com/SubaHariniB-dev", accent: "text-brand-primary" },
  { name: "LeetCode", username: "Suba Harini", url: "https://leetcode.com/u/harini1112/", accent: "text-brand-secondary" },

  { name: "LinkedIn", username: "Suba Harini", url: "https://www.linkedin.com/in/suba-harini-b-a990712a5?utm_source=share_via&utm_content=profile&utm_medium=member_android", accent: "text-brand-accent" },
];

