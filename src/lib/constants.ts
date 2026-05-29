export const APP_NAME = "CampusCompass";

export const INDIAN_STATES = [
  "Andhra Pradesh",
  "Assam",
  "Bihar",
  "Delhi",
  "Gujarat",
  "Haryana",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Punjab",
  "Rajasthan",
  "Tamil Nadu",
  "Telangana",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];

export const COURSE_TYPES = [
  "ENGINEERING",
  "MEDICAL",
  "MANAGEMENT",
  "ARTS",
  "SCIENCE",
  "LAW",
] as const;

export const DISCUSSION_CATEGORIES = [
  { value: "PLACEMENTS", label: "Placements" },
  { value: "HOSTEL", label: "Hostel" },
  { value: "ACADEMICS", label: "Academics" },
  { value: "CAMPUS_LIFE", label: "Campus Life" },
  { value: "ADMISSIONS", label: "Admissions" },
] as const;

export const EXAM_OPTIONS = [
  { value: "JEE_MAIN", label: "JEE Main" },
  { value: "JEE_ADVANCED", label: "JEE Advanced" },
  { value: "NEET", label: "NEET" },
  { value: "CAT", label: "CAT" },
  { value: "CUET", label: "CUET" },
  { value: "STATE_CET", label: "State CET" },
] as const;

export const SORT_OPTIONS = [
  { value: "rating", label: "Highest Rating" },
  { value: "fees", label: "Lowest Fees" },
  { value: "placement", label: "Best Placements" },
] as const;

export const COMPARE_STORAGE_KEY = "campuscompass:compare";

export const RECENT_SEARCH_KEY = "campuscompass:recent-searches";
