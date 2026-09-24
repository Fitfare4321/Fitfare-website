import { 
  BarChart3, 
  LayoutDashboard, 
  UserPlus, 
  Handshake, 
  Scale,
  MapPin,
  Briefcase,
  Currency,
  Clock,
  CheckCircle2,
  Trophy,
  Rocket,
  Users,
  Target,
  Globe,
  Smartphone 
} from "lucide-react";

export interface Job {
  id: string;
  slug: string;
  title: string;
  role: string;
  overview: string;
  responsibilities: string[];
  mandatoryRequirements: string[];
  preferredRequirements: string[];
  salary: string;
  type: string;
  location: string;
  positions: number;
  icon: any;
  accent: string;
  whyJoin: string[];
  applyLink: string;
}

export const jobsData: Job[] = [
  {
    id: "android-developer",
    slug: "android-developer",
    title: "Android Developer",
    role: "Android Developer",
    overview: "We are looking for an Android Developer to join FitFare Pvt. Ltd. You will work closely with the founding team to build the core mobile application from scratch, transforming our WhatsApp-based MVP into a scalable Android product for gym users and owners.",
    responsibilities: [
      "Design, develop, and maintain the FitFare Android application using Java and XML.",
      "Build responsive Android screens and user flows using XML-based UI components.",
      "Integrate backend APIs and cloud services.",
      "Work with Firebase (Authentication, Database, Notifications, Storage).",
      "Integrate payment gateways like Razorpay or PayU.",
      "Collaborate with the founding team to scale the MVP into a full product.",
      "Develop dashboards for users and gym owners.",
      "Ensure app performance, stability, and responsiveness.",
      "Debug issues and optimize performance.",
      "Write clean, maintainable, and reusable code with Git workflows."
    ],
    mandatoryRequirements: [
      "2+ years of Android development experience using Java.",
      "Strong experience with XML-based UI development.",
      "Good understanding of REST APIs and JSON.",
      "Experience with Firebase services.",
      "Experience integrating payment gateways.",
      "Strong knowledge of Android UI/UX and Material Design.",
      "Experience in debugging and performance optimization.",
      "Proficiency with Git and version control."
    ],
    preferredRequirements: [
      "Experience working in startups or 0-to-1 product builds.",
      "Basic understanding of AI/ML (TensorFlow Lite preferred).",
      "Familiarity with AWS or GCP.",
      "Knowledge of analytics tools like Firebase Analytics.",
      "Experience with automation tools like Zapier or Google Sheets."
    ],
    salary: "7 LPA",
    type: "Full-Time",
    location: "Gurgaon",
    positions: 2,
    icon: Smartphone, // import from lucide-react
    accent: "#22c55e",
    whyJoin: [
      "Opportunity to build a product from scratch.",
      "Work directly with founders.",
      "High ownership and impact role.",
      "Startup exposure and fast learning.",
      "Be part of building a nationwide fitness platform."
    ],
    applyLink: "https://docs.google.com/forms/d/16ZZobEaz4PDXX-GZcqcPn9kTXOfejxJ1F92dKHiqpGc/edit"
  },
  {
    id: "data-analyst",
    slug: "data-analyst",
    title: "Data Analyst",
    role: "Data Analyst",
    overview: "We are looking for a detail-oriented and analytical Data Analyst to join FitFare Pvt. Ltd. In this role, you will work on collecting, processing, and analyzing data to support business decisions. You will be responsible for data scraping, cleaning, and preparing structured datasets to improve operational efficiency and strategic insights.",
    responsibilities: [
      "Perform data scraping from multiple sources (websites, APIs, databases).",
      "Clean, preprocess, and validate raw data for accuracy and consistency.",
      "Organize and maintain structured datasets for analysis.",
      "Identify patterns, trends, and actionable insights from data.",
      "Work closely with business and product teams to understand data requirements.",
      "Automate repetitive data tasks where possible.",
      "Ensure data integrity and maintain proper documentation."
    ],
    mandatoryRequirements: [
      "1+ years of hands-on experience in Data Analysis.",
      "Strong knowledge of Python and Libraries (Pandas, NumPy) or similar tools.",
      "Experience in data scraping (BeautifulSoup, Selenium, Scrapy, APIs, etc.).",
      "Strong understanding of data cleaning and preprocessing techniques.",
      "Problem-solving mindset and attention to detail.",
      "Ability to work in a fast-paced startup environment."
    ],
    preferredRequirements: [
      "Education: Any degree/diploma (Engineering, Statistics, Computer Science or related field).",
      "Passion for startups and the fitness industry.",
      "Basic understanding of databases (SQL)."
    ],
    salary: "5 LPA",
    type: "Work From Office",
    location: "Gurgaon",
    positions: 1,
    icon: BarChart3,
    accent: "#3b82f6",
    whyJoin: [
      "Hands-on startup experience with real data and business impact.",
      "Opportunity to build and optimize data systems from scratch.",
      "Work closely with founders and core team.",
      "Fast learning environment with growth opportunities.",
      "Be part of a mission to make fitness fair and accessible for society."
    ],
    applyLink: "https://docs.google.com/forms/d/e/1FAIpQLSclivI41zKAQ8wlym_ZPRUKkZgesZAMkyPNgplcZpEV0xtqsw/viewform?pli=1"
  },
  {
    id: "power-bi-specialist",
    slug: "power-bi-specialist",
    title: "Power BI Dashboard Specialist",
    role: "Power BI Specialist",
    overview: "We are looking for a creative and detail-oriented Power BI Dashboard Specialist to join FitFare Pvt. Ltd. In this role, you will work on designing, developing, and maintaining interactive dashboards to support business decisions. You will be responsible for data visualization, report building, and transforming raw data into meaningful insights for operational efficiency and strategic growth.",
    responsibilities: [
      "Design and develop interactive Power BI dashboards and reports for business teams.",
      "Connect and integrate data from multiple sources (Excel, SQL, APIs, Google Sheets, etc.).",
      "Clean and transform raw data using Power Query for accurate visual output.",
      "Build and maintain DAX formulas for calculated measures and KPIs.",
      "Work closely with business and product teams to understand reporting requirements.",
      "Automate recurring reports and schedule dashboard refresh cycles.",
      "Ensure data accuracy, visual consistency, and proper documentation of all reports.",
      "Optimize dashboard performance for faster loading and better user experience."
    ],
    mandatoryRequirements: [
      "1+ years of hands-on experience in Power BI dashboard development.",
      "Strong knowledge of Power BI Desktop, Power Query, and DAX.",
      "Experience connecting Power BI to multiple data sources (SQL, Excel, APIs, etc.).",
      "Strong understanding of data modelling and relationship building in Power BI.",
      "Eye for design — ability to build clean, readable, and business-friendly dashboards.",
      "Ability to work in a fast-paced startup environment."
    ],
    preferredRequirements: [
      "Education: Any degree/diploma (Engineering, Statistics, Computer Science, or related field).",
      "Passion for startups and the fitness industry.",
      "Basic understanding of SQL for data extraction and querying."
    ],
    salary: "5 LPA",
    type: "Work From Office",
    location: "Gurgaon",
    positions: 1,
    icon: LayoutDashboard,
    accent: "#8b5cf6",
    whyJoin: [
      "Hands-on startup experience with real business dashboards and live data.",
      "Opportunity to build and own the entire reporting ecosystem from scratch.",
      "Work closely with founders and core team.",
      "Fast learning environment with growth opportunities.",
      "Be part of a mission to make fitness fair and accessible for society."
    ],
    applyLink: "https://docs.google.com/forms/d/e/1FAIpQLSeW2ebQxfSRpFEug6QDiVzN77AOfQYMZFr9wQIArwdfhWTmSA/viewform"
  },
  {
    id: "talent-acquisition",
    slug: "talent-acquisition",
    title: "Talent Acquisition Executive",
    role: "Talent Acquisition",
    overview: "We are looking for a driven and people-oriented Talent Acquisition Executive to join FitFare Pvt. Ltd. In this role, you will manage the end-to-end recruitment process, help build a high-performing team, and play a key part in our people strategy as we scale.",
    responsibilities: [
      "Manage end-to-end recruitment cycle (sourcing to onboarding).",
      "Understand hiring needs from different departments (Sales, Tech, Operations, etc.).",
      "Source candidates via job portals, LinkedIn, referrals, and other channels.",
      "Screen resumes and conduct initial HR interviews.",
      "Manage offer negotiations within defined salary bands and ensure smooth onboarding handovers.",
      "Track and report on recruitment metrics — TAT, offer-to-join ratio, source effectiveness."
    ],
    mandatoryRequirements: [
      "1+ years of hands-on experience in talent acquisition or HR recruitment.",
      "Strong communication and interpersonal skills.",
      "Ability to work in a fast-paced startup environment.",
      "Good organizational and time-management skills.",
      "Understanding of HR processes, employment laws, and best practices."
    ],
    preferredRequirements: [
      "Education: Any degree/ diploma.",
      "Passion for startups and the fitness industry."
    ],
    salary: "2.5 LPA",
    type: "Work From Home",
    location: "Remote",
    positions: 1,
    icon: UserPlus,
    accent: "#ec4899",
    whyJoin: [
      "Hands-on startup experience in people strategy and team building.",
      "Work closely with founders to scale the organization.",
      "Fast learning environment with significant responsibility.",
      "Be part of a mission to make fitness fair and accessible for society."
    ],
    applyLink: "https://docs.google.com/forms/d/e/1FAIpQLSc9ys3gd7CBGEjFTBknYbvkAU7aDMlASEp-ug0fPLmfeySSNg/viewform"
  },
  {
    id: "business-development-executive",
    slug: "business-development-executive",
    title: "BDE for Business Development & Partnerships",
    role: "BDE",
    overview: "We are hiring BDE for Business Development & Partnerships. This is a field-first, offline role where you will represent FitFare at fitness centers, build partnerships, and onboard clients to the platform. You will receive a 1-week training program before independent field work.",
    responsibilities: [
      "Visit and engage fitness centers, gyms, yoga and dance studios in your assigned area.",
      "Present FitFare’s partnership model and onboard new partners.",
      "Manage partner documentation and coordinate integration steps.",
      "Build and maintain relationships with owners/managers.",
      "Collect on-ground market insights and submit structured reports.",
      "Meet onboarding targets and collaborate with internal teams for smooth partner support."
    ],
    mandatoryRequirements: [
      "Excellent verbal & written communication in English, Hindi, and the local native language.",
      "Strong presentation, negotiation, and relationship-building skills.",
      "Confident, professional demeanor; ability to interact with business owners.",
      "Willingness to travel frequently for field work (travel expenses reimbursed)."
    ],
    preferredRequirements: [
      "Experience: 1+ year.",
      "Education: Any degree/ diploma.",
      "Prior sales, client-facing, or field marketing experience is a plus.",
      "Passion for startups and the fitness industry."
    ],
    salary: "4 LPA",
    type: "Field-First / Offline",
    location: "Delhi NCR, Mumbai, Pune, Bengaluru, Hyderabad",
    positions: 5,
    icon: Handshake,
    accent: "#10b981",
    whyJoin: [
      "Hands-on startup experience in business development and partnerships.",
      "Real client exposure, skill development in pitching and negotiation.",
      "Certificate of completion and potential growth opportunities.",
      "Be part of a mission to make fitness fair and accessible for society.",
      "All on-field travel expenses will be reimbursed by FitFare."
    ],
    applyLink: "https://docs.google.com/forms/d/e/1FAIpQLSfh4pmzGIFyTNa3g-OWVmBbnZAr1-rjl6p1Vw1CBXAoCYNpwg/viewform"
  },
  {
    id: "legal-content-designer",
    slug: "legal-content-designer",
    title: "Legal Content Designer (Contracts & Agreements)",
    role: "Legal Designer",
    overview: "We are looking for a precise and legally-minded Legal Content Designer (Contracts & Agreements) to join FitFare Pvt. Ltd. In this role, you will work on drafting, reviewing, and structuring legal documents to support business operations. You will be responsible for creating airtight contracts, partnership agreements, and compliance documents to protect FitFare's interests as we scale.",
    responsibilities: [
      "Draft, review, and finalize contracts, agreements, and legal documents for partner gyms, studios, and instructors.",
      "Design and structure clear, professional, and legally sound partnership and vendor agreements.",
      "Ensure all contracts comply with applicable Indian laws, regulations, and company policies.",
      "Work closely with the business and operations teams to understand legal requirements for each partnership.",
      "Maintain and organize a centralized repository of all active contracts and agreements.",
      "Review and update existing templates to reflect business changes and legal updates.",
      "Identify potential legal risks in agreements and suggest appropriate clauses or modifications.",
      "Support onboarding teams with agreement execution and documentation for new partners."
    ],
    mandatoryRequirements: [
      "Hands-on experience in legal drafting, contract writing, or legal documentation.",
      "Strong knowledge of contract law, partnership agreements, and Indian legal frameworks.",
      "Excellent written communication with a sharp eye for detail and language precision.",
      "Ability to simplify complex legal language into clear, structured, and readable documents.",
      "Strong organizational skills to manage multiple contracts simultaneously.",
      "Ability to work in a fast-paced startup environment."
    ],
    preferredRequirements: [
      "Experience: Fresher or Having Experience of more than a 1 year.",
      "Education: LLB / LLM / BA LLB or any degree with relevant legal drafting experience.",
      "Passion for startups and the fitness industry.",
      "Familiarity with digital contract tools (DocSign, PandaDoc, or similar platforms)."
    ],
    salary: "4 LPA",
    type: "Work From Office",
    location: "Gurgaon",
    positions: 1,
    icon: Scale,
    accent: "#f59e0b",
    whyJoin: [
      "Hands-on startup experience with real business dashboards and live data.",
      "Opportunity to build and own the entire reporting ecosystem from scratch.",
      "Work closely with founders and core team.",
      "Fast learning environment with growth opportunities.",
      "Be part of a mission to make fitness fair and accessible for society."
    ],
    applyLink: "https://docs.google.com/forms/d/e/1FAIpQLSejsOFJuh8aNShDdN6qophb3ZsKLNfL0ARi4xmxZG1icBk6pg/viewform"
  }
];
