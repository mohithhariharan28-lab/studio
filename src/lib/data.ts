import type { Project } from '@/ai/flows/prioritize-projects-based-on-relevance';

export const skills = [
  "Data Analysis",
  "Business Analysis",
  "Problem Solving",
  "SQL",
  "Python",
  "Tableau",
  "Power BI",
  "Excel",
  "Communication",
  "Teamwork",
];

export const projects: Project[] = [
  {
    title: "Sales Dashboard",
    description: "Developed an interactive sales dashboard using Tableau to track KPIs and sales performance, providing actionable insights for the sales team.",
    githubLink: "https://github.com",
  },
  {
    title: "Customer Churn Prediction",
    description: "Built a machine learning model in Python to predict customer churn, helping the business to proactively retain customers.",
    githubLink: "https://github.com",
  },
  {
    title: "Market Basket Analysis",
    description: "Conducted market basket analysis using SQL and Python to identify product associations and inform cross-selling strategies.",
    githubLink: "https://github.com",
  },
  {
    title: "E-commerce Website A/B Testing",
    description: "Analyzed A/B test results for a new website feature, providing a statistical summary and recommendation to leadership.",
    githubLink: "https://github.com",
  },
  {
    title: "Business Process Optimization",
    description: "Mapped and analyzed existing business processes, identifying bottlenecks and recommending improvements that led to a 15% increase in efficiency.",
    githubLink: "https://github.com",
  },
];

export const certifications: ({
  name: string;
  description: string;
  issuer: string;
  imageUrl?: string;
})[] = [
  {
    name: "Wadhwani Foundation",
    description: "Entrepreneurship Program",
    issuer: "Wadhwani",
    imageUrl: "/wadhwani-certificate.png"
  },
  {
    name: "IBM Data Analyst",
    description: "Professional Certificate",
    issuer: "IBM",
  },
  {
    name: "Python for Data Science",
    description: "Certified course on Python programming for data science applications.",
    issuer: "GUVI",
  },
];
