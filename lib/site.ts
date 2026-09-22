function resolveSiteUrl() {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (configured) return configured.replace(/\/$/, "");

  const vercelHost = (
    process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL
  )?.trim();
  if (vercelHost) {
    return `https://${vercelHost.replace(/^https?:\/\//, "").replace(/\/$/, "")}`;
  }

  return "http://localhost:3000";
}

export const site = {
  name: "Omorewa Yomi Godwin",
  studio: "Pacesetter Tutorial",
  tutor: "Omorewa Yomi Godwin",
  credentialsLine:
    "B.Sc. Chemical Engineering, ND Petroleum Processing, PGDE, TRCN-certified",
  tagline:
    "Demystifying Science & Mathematics; Building Academic Excellence with Practical Clarity.",
  headline: "Demystifying Science & Mathematics.",
  headlineRest: "Building Academic Excellence with Practical Clarity.",
  description:
    "Omorewa Yomi Godwin is a TRCN-certified chemical engineer and the founder of Pacesetter Tutorial. He teaches Mathematics, Further Mathematics, Physics, Chemistry, and Chemical Engineering fundamentals to secondary students, WAEC, NECO, and UTME candidates, and undergraduate scientists in Ekpan, Warri and online.",
  url: resolveSiteUrl(),
  phoneDisplay: "+234 703 377 5766",
  phoneTel: "+2347033775766",
  whatsappNumber: "2347033775766",
  location: "Pacesetter Tutorial, Ekpan, Warri, Delta State, Nigeria",
  locationShort: "Ekpan, Warri",
  linkedin: "https://www.linkedin.com/in/yomi-omorewa-120bb5158",
  youtube:
    "https://www.youtube.com/results?search_query=Pacesetter+Tutorial+Omorewa+Godwin+Yomi",
  mapEmbed:
    "https://www.openstreetmap.org/export/embed.html?bbox=5.74%2C5.53%2C5.82%2C5.58&layer=mapnik&marker=5.554%2C5.784",
  mapLink:
    "https://www.google.com/maps/search/?api=1&query=Ekpan%2C+Warri%2C+Delta+State%2C+Nigeria",
  cheatSheetTitle: "Essential STEM & Mathematics Formula Cheat Sheet",
} as const;

export function whatsappLink(message: string) {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const whatsappMessages = {
  consultation:
    "Hello Engr. Omorewa, I would like to book a free consultation with Pacesetter Tutorial.",
  enroll:
    "Hello Engr. Omorewa, I want to enrol a student with Pacesetter Tutorial. Please tell me the next step.",
  sampleLecture:
    "Hello Engr. Omorewa, please send the free YouTube sample lecture that matches my subject.",
  cheatSheet:
    "Hello Engr. Omorewa, I have just downloaded the Essential STEM & Mathematics Formula Cheat Sheet and I would like help using it.",
} as const;

export const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Programmes" },
  { href: "/resources", label: "Insights" },
  { href: "/contact", label: "Contact" },
] as const;

export const stats = [
  { value: 1000, suffix: "+", label: "Students Taught & Mentored" },
  { value: 10, suffix: "+", label: "Years of Teaching Experience" },
  { value: 95, suffix: "%+", label: "WAEC/UTME Exam Pass Rate" },
] as const;

export const subjects = [
  {
    name: "Mathematics",
    audience:
      "For SS1–SS3 students building a reliable core, and for undergraduates whose algebra, trigonometry, or calculus has started to slip.",
  },
  {
    name: "Further Mathematics",
    audience:
      "For candidates treating Further Mathematics as a route into engineering, and for anyone who needs WAEC or UTME Further Maths to become a strength.",
  },
  {
    name: "Physics",
    audience:
      "For secondary students from mechanics through waves and electricity, and for 100- and 200-level science students meeting the same laws in a faster course.",
  },
  {
    name: "Chemistry",
    audience:
      "For learners who want physical, organic, and inorganic chemistry as patterns they can reuse in school tests, WAEC, NECO, and UTME.",
  },
  {
    name: "Chemical Engineering Fundamentals",
    audience:
      "For new engineering undergraduates who need mass balance, fluid flow, and the first-year habits that make later courses readable.",
  },
] as const;

export const audiences = [
  {
    title: "Secondary school students",
    detail:
      "SS1 to SS3. The work is to make each topic sturdy before the next one arrives, so the exam year is revision rather than rescue.",
  },
  {
    title: "WAEC, NECO, and UTME candidates",
    detail:
      "Exam technique sits beside the science: which question to bank first, how to show working, and how to stop a familiar topic from costing time.",
  },
  {
    title: "Undergraduate engineering and science students",
    detail:
      "100- and 200-level courses, taught the way a lecturer who has sat those papers expects you to write them. Private coaching is available before resumption and during the semester.",
  },
] as const;

export const bio = {
  full: "Omorewa Yomi Godwin holds a B.Sc. in Chemical Engineering from the University of Benin, an ND from the Petroleum Training Institute, and a PGDE certified by the Teachers Registration Council of Nigeria (TRCN). With extensive lecturing experience at Western Pinnacle University, secondary schools, and online platforms, he specializes in translating abstract STEM subjects into clear, structured learning outcomes. He is currently pursuing his M.Sc. in Chemical Engineering at the Federal University of Petroleum Resources, Effurun.",
  short:
    "Engr. Omorewa Yomi Godwin is a TRCN-certified chemical engineer who has lectured at Western Pinnacle University, in secondary schools, and online. He turns abstract STEM into structured outcomes students can reproduce under exam conditions.",
};

export const qualifications = [
  "B.Sc. Chemical Engineering, University of Benin",
  "PGDE, Teachers Registration Council of Nigeria",
  "ND Petroleum Processing, Petroleum Training Institute",
  "M.Sc. Candidate, Chemical Engineering, Federal University of Petroleum Resources, Effurun",
] as const;

export const certifications = [
  "TRCN Certified Teacher",
  "Executive Diploma in AI",
  "Digital Classroom Management",
  "Strategic Leadership",
] as const;

export const achievements = [
  {
    title: "Most Selfless Student Award",
    detail: "Nigerian Society of Chemical Engineers (NSChE).",
  },
  {
    title: "University Research Scholar",
    detail: "",
  },
  {
    title: "300+ undergraduates, online, 2020",
    detail: "Taught 300+ university undergraduates online in 2020.",
  },
] as const;

export const services = [
  {
    title: "1-on-1 Personalized Tutoring",
    detail:
      "Online or physical. The lesson follows the student’s actual script: the topic that failed, the line where the working broke, and the next question they should be able to start alone.",
    mode: "Online or at the Ekpan centre",
  },
  {
    title: "Group Revision Classes",
    detail:
      "WAEC, NECO, UTME, IGCSE, and SAT bootcamps. Timed practice, worked past questions, and a room where the method is said out loud until it belongs to the class.",
    mode: "Exam bootcamps",
  },
  {
    title: "Physical Learning Centre",
    detail:
      "Pacesetter Tutorial, Ekpan, Warri. A set classroom for students who concentrate better with a desk, a board, and a teacher in the room.",
    mode: "Ekpan, Warri",
  },
  {
    title: "University and College Coaching",
    detail:
      "100- and 200-level engineering and science courses. Calculus before resumption, then the balances, laws, and problem sets the semester will actually examine.",
    mode: "Pre-resumption and in-semester",
  },
] as const;

export const included = [
  {
    title: "Topic breakdowns with step-by-step solutions",
    detail:
      "Each idea is unpacked in the order a careful script should appear: knowns, relationship, substitution, unit, answer.",
  },
  {
    title: "Downloadable formula cheat sheets",
    detail:
      "The relationships you are expected to recall, written so they can sit beside your practice set. The free sheet is the public sample.",
  },
  {
    title: "Past questions and practice sets",
    detail:
      "WAEC, NECO, UTME, and course problem sets, used as teaching material rather than as a pile to admire.",
  },
  {
    title: "Recorded sessions for virtual classes",
    detail:
      "Online students can replay the lesson. The recording is for revision, not a substitute for attempting the question yourself first.",
  },
  {
    title: "Direct question-and-answer support",
    detail:
      "When a step will not yield, you ask. The reply is a correction of the method, not a pasted final answer with no path.",
  },
] as const;

export const pricingTiers = [
  {
    name: "WAEC & NECO Group Class",
    price: "from ₦X/month",
    detail:
      "Monthly group revision in Mathematics, Further Mathematics, Physics, and Chemistry, paced to the school term and the external paper.",
  },
  {
    name: "UTME Intensive",
    price: "from ₦X/month",
    detail:
      "A tighter monthly subscription for candidates who need score movement in Mathematics, Physics, Chemistry, or a combination of the three.",
  },
  {
    name: "IGCSE & SAT Bootcamp",
    price: "from ₦X/month",
    detail:
      "Small-group preparation for students sitting IGCSE or SAT, with the same insistence on working that can be followed.",
  },
] as const;

export const subjectOptions = [
  "Mathematics",
  "Further Mathematics",
  "Physics",
  "Chemistry",
  "Chemical Engineering Fundamentals",
] as const;

export const levels = [
  { value: "secondary", label: "Secondary school (SS1–SS3, WAEC, NECO, UTME)" },
  { value: "university", label: "University or college (100 / 200 level)" },
] as const;

export const modes = [
  { value: "online", label: "Online" },
  { value: "physical", label: "Physical — Ekpan, Warri" },
  { value: "either", label: "Either" },
] as const;

export const bookingTimes = [
  { value: "09:00", label: "9:00am" },
  { value: "11:00", label: "11:00am" },
  { value: "13:00", label: "1:00pm" },
  { value: "15:00", label: "3:00pm" },
  { value: "17:00", label: "5:00pm" },
] as const;

export const blogCategories = [
  "Exam Tips",
  "Study Guides",
  "Solved Past Questions",
  "STEM Career Guidance",
] as const;

export const testimonial = {
  quote:
    "You are one of the best chemistry and physics teacher I have ever seen, you are very smart and teach well and to wrap it all up you are very kind and nice.",
  attribution: "Grade 11 Learner",
} as const;

export const photos = [
  {
    title: "Professional portrait",
    caption:
      "High-resolution portrait of Omorewa Yomi Godwin — replace this frame with the studio photograph.",
    kind: "portrait" as const,
  },
  {
    title: "Classroom instruction",
    caption:
      "Live teaching at the Pacesetter Tutorial centre in Ekpan — replace this frame with a classroom photograph.",
    kind: "classroom" as const,
  },
  {
    title: "Digital instruction",
    caption:
      "An online lesson in progress — replace this frame with a photograph from a virtual class.",
    kind: "digital" as const,
  },
] as const;
