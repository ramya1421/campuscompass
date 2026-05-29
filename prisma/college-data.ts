export type CollegeType = "GOVERNMENT" | "PRIVATE" | "DEEMED";
export type CourseType =
  | "ENGINEERING"
  | "MEDICAL"
  | "MANAGEMENT"
  | "ARTS"
  | "SCIENCE"
  | "LAW";

export type SeedCollege = {
  name: string;
  city: string;
  state: string;
  type: CollegeType;
  feesMin: number;
  feesMax: number;
  placementPercent: number;
  rating: number;
  establishedYear: number;
  courseTypes: CourseType[];
};

export const INDIAN_COLLEGES: SeedCollege[] = [
  { name: "Indian Institute of Technology Bombay", city: "Mumbai", state: "Maharashtra", type: "GOVERNMENT", feesMin: 220000, feesMax: 260000, placementPercent: 92, rating: 4.9, establishedYear: 1958, courseTypes: ["ENGINEERING", "SCIENCE"] },
  { name: "Indian Institute of Technology Delhi", city: "New Delhi", state: "Delhi", type: "GOVERNMENT", feesMin: 220000, feesMax: 255000, placementPercent: 91, rating: 4.9, establishedYear: 1961, courseTypes: ["ENGINEERING", "MANAGEMENT"] },
  { name: "Indian Institute of Technology Madras", city: "Chennai", state: "Tamil Nadu", type: "GOVERNMENT", feesMin: 215000, feesMax: 250000, placementPercent: 90, rating: 4.8, establishedYear: 1959, courseTypes: ["ENGINEERING", "SCIENCE"] },
  { name: "Indian Institute of Technology Kanpur", city: "Kanpur", state: "Uttar Pradesh", type: "GOVERNMENT", feesMin: 210000, feesMax: 245000, placementPercent: 89, rating: 4.8, establishedYear: 1959, courseTypes: ["ENGINEERING"] },
  { name: "Indian Institute of Technology Kharagpur", city: "Kharagpur", state: "West Bengal", type: "GOVERNMENT", feesMin: 210000, feesMax: 248000, placementPercent: 88, rating: 4.8, establishedYear: 1951, courseTypes: ["ENGINEERING", "LAW"] },
  { name: "Indian Institute of Technology Roorkee", city: "Roorkee", state: "Uttarakhand", type: "GOVERNMENT", feesMin: 205000, feesMax: 240000, placementPercent: 87, rating: 4.7, establishedYear: 1847, courseTypes: ["ENGINEERING", "MANAGEMENT"] },
  { name: "Indian Institute of Technology Guwahati", city: "Guwahati", state: "Assam", type: "GOVERNMENT", feesMin: 200000, feesMax: 235000, placementPercent: 86, rating: 4.7, establishedYear: 1994, courseTypes: ["ENGINEERING"] },
  { name: "Indian Institute of Technology Hyderabad", city: "Hyderabad", state: "Telangana", type: "GOVERNMENT", feesMin: 205000, feesMax: 242000, placementPercent: 88, rating: 4.7, establishedYear: 2008, courseTypes: ["ENGINEERING", "SCIENCE"] },
  { name: "Indian Institute of Technology BHU", city: "Varanasi", state: "Uttar Pradesh", type: "GOVERNMENT", feesMin: 198000, feesMax: 230000, placementPercent: 85, rating: 4.6, establishedYear: 1919, courseTypes: ["ENGINEERING", "MEDICAL"] },
  { name: "Indian Institute of Technology Indore", city: "Indore", state: "Madhya Pradesh", type: "GOVERNMENT", feesMin: 200000, feesMax: 238000, placementPercent: 86, rating: 4.6, establishedYear: 2009, courseTypes: ["ENGINEERING"] },
  { name: "National Institute of Technology Trichy", city: "Tiruchirappalli", state: "Tamil Nadu", type: "GOVERNMENT", feesMin: 145000, feesMax: 185000, placementPercent: 84, rating: 4.6, establishedYear: 1964, courseTypes: ["ENGINEERING", "MANAGEMENT"] },
  { name: "National Institute of Technology Surathkal", city: "Mangalore", state: "Karnataka", type: "GOVERNMENT", feesMin: 140000, feesMax: 180000, placementPercent: 83, rating: 4.5, establishedYear: 1960, courseTypes: ["ENGINEERING"] },
  { name: "National Institute of Technology Warangal", city: "Warangal", state: "Telangana", type: "GOVERNMENT", feesMin: 135000, feesMax: 175000, placementPercent: 82, rating: 4.5, establishedYear: 1959, courseTypes: ["ENGINEERING"] },
  { name: "National Institute of Technology Calicut", city: "Kozhikode", state: "Kerala", type: "GOVERNMENT", feesMin: 138000, feesMax: 178000, placementPercent: 81, rating: 4.5, establishedYear: 1961, courseTypes: ["ENGINEERING", "MANAGEMENT"] },
  { name: "Birla Institute of Technology and Science Pilani", city: "Pilani", state: "Rajasthan", type: "PRIVATE", feesMin: 420000, feesMax: 520000, placementPercent: 88, rating: 4.7, establishedYear: 1964, courseTypes: ["ENGINEERING", "MANAGEMENT", "SCIENCE"] },
  { name: "Vellore Institute of Technology", city: "Vellore", state: "Tamil Nadu", type: "PRIVATE", feesMin: 350000, feesMax: 480000, placementPercent: 78, rating: 4.3, establishedYear: 1984, courseTypes: ["ENGINEERING", "MANAGEMENT", "LAW"] },
  { name: "Manipal Institute of Technology", city: "Manipal", state: "Karnataka", type: "PRIVATE", feesMin: 380000, feesMax: 500000, placementPercent: 80, rating: 4.4, establishedYear: 1957, courseTypes: ["ENGINEERING", "MEDICAL", "MANAGEMENT"] },
  { name: "SRM Institute of Science and Technology", city: "Chennai", state: "Tamil Nadu", type: "PRIVATE", feesMin: 320000, feesMax: 450000, placementPercent: 76, rating: 4.2, establishedYear: 1985, courseTypes: ["ENGINEERING", "MEDICAL"] },
  { name: "Thapar Institute of Engineering and Technology", city: "Patiala", state: "Punjab", type: "PRIVATE", feesMin: 340000, feesMax: 420000, placementPercent: 82, rating: 4.4, establishedYear: 1956, courseTypes: ["ENGINEERING"] },
  { name: "Delhi Technological University", city: "New Delhi", state: "Delhi", type: "GOVERNMENT", feesMin: 120000, feesMax: 160000, placementPercent: 79, rating: 4.3, establishedYear: 1941, courseTypes: ["ENGINEERING"] },
  { name: "Netaji Subhas University of Technology", city: "New Delhi", state: "Delhi", type: "GOVERNMENT", feesMin: 125000, feesMax: 165000, placementPercent: 78, rating: 4.3, establishedYear: 1983, courseTypes: ["ENGINEERING"] },
  { name: "Anna University CEG Campus", city: "Chennai", state: "Tamil Nadu", type: "GOVERNMENT", feesMin: 90000, feesMax: 140000, placementPercent: 77, rating: 4.4, establishedYear: 1794, courseTypes: ["ENGINEERING", "MANAGEMENT"] },
  { name: "Jadavpur University", city: "Kolkata", state: "West Bengal", type: "GOVERNMENT", feesMin: 50000, feesMax: 90000, placementPercent: 80, rating: 4.5, establishedYear: 1955, courseTypes: ["ENGINEERING", "ARTS"] },
  { name: "College of Engineering Pune", city: "Pune", state: "Maharashtra", type: "GOVERNMENT", feesMin: 85000, feesMax: 130000, placementPercent: 81, rating: 4.4, establishedYear: 1854, courseTypes: ["ENGINEERING"] },
  { name: "Veermata Jijabai Technological Institute", city: "Mumbai", state: "Maharashtra", type: "GOVERNMENT", feesMin: 95000, feesMax: 140000, placementPercent: 79, rating: 4.3, establishedYear: 1887, courseTypes: ["ENGINEERING"] },
  { name: "PSG College of Technology", city: "Coimbatore", state: "Tamil Nadu", type: "PRIVATE", feesMin: 180000, feesMax: 240000, placementPercent: 83, rating: 4.5, establishedYear: 1951, courseTypes: ["ENGINEERING", "MANAGEMENT"] },
  { name: "RV College of Engineering", city: "Bengaluru", state: "Karnataka", type: "PRIVATE", feesMin: 280000, feesMax: 360000, placementPercent: 85, rating: 4.5, establishedYear: 1963, courseTypes: ["ENGINEERING"] },
  { name: "BMS College of Engineering", city: "Bengaluru", state: "Karnataka", type: "PRIVATE", feesMin: 250000, feesMax: 330000, placementPercent: 82, rating: 4.3, establishedYear: 1946, courseTypes: ["ENGINEERING"] },
  { name: "PES University", city: "Bengaluru", state: "Karnataka", type: "PRIVATE", feesMin: 360000, feesMax: 460000, placementPercent: 84, rating: 4.4, establishedYear: 1972, courseTypes: ["ENGINEERING", "MANAGEMENT"] },
  { name: "Symbiosis Institute of Technology", city: "Pune", state: "Maharashtra", type: "PRIVATE", feesMin: 340000, feesMax: 420000, placementPercent: 77, rating: 4.2, establishedYear: 2008, courseTypes: ["ENGINEERING", "MANAGEMENT"] },
  { name: "Chandigarh University", city: "Mohali", state: "Punjab", type: "PRIVATE", feesMin: 260000, feesMax: 380000, placementPercent: 74, rating: 4.0, establishedYear: 2012, courseTypes: ["ENGINEERING", "LAW", "MANAGEMENT"] },
  { name: "Lovely Professional University", city: "Phagwara", state: "Punjab", type: "PRIVATE", feesMin: 220000, feesMax: 340000, placementPercent: 72, rating: 3.9, establishedYear: 2005, courseTypes: ["ENGINEERING", "MANAGEMENT", "ARTS"] },
  { name: "Amity University Noida", city: "Noida", state: "Uttar Pradesh", type: "PRIVATE", feesMin: 300000, feesMax: 450000, placementPercent: 73, rating: 4.0, establishedYear: 2005, courseTypes: ["ENGINEERING", "LAW", "MANAGEMENT"] },
  { name: "Bennett University", city: "Greater Noida", state: "Uttar Pradesh", type: "PRIVATE", feesMin: 380000, feesMax: 500000, placementPercent: 75, rating: 4.1, establishedYear: 2016, courseTypes: ["ENGINEERING", "MANAGEMENT"] },
  { name: "Shiv Nadar University", city: "Greater Noida", state: "Uttar Pradesh", type: "PRIVATE", feesMin: 420000, feesMax: 550000, placementPercent: 78, rating: 4.3, establishedYear: 2011, courseTypes: ["ENGINEERING", "SCIENCE", "MANAGEMENT"] },
  { name: "Ashoka University", city: "Sonipat", state: "Haryana", type: "PRIVATE", feesMin: 450000, feesMax: 600000, placementPercent: 70, rating: 4.4, establishedYear: 2014, courseTypes: ["ARTS", "SCIENCE", "MANAGEMENT"] },
  { name: "All India Institute of Medical Sciences Delhi", city: "New Delhi", state: "Delhi", type: "GOVERNMENT", feesMin: 30000, feesMax: 80000, placementPercent: 95, rating: 4.9, establishedYear: 1956, courseTypes: ["MEDICAL"] },
  { name: "Christian Medical College Vellore", city: "Vellore", state: "Tamil Nadu", type: "PRIVATE", feesMin: 180000, feesMax: 350000, placementPercent: 93, rating: 4.8, establishedYear: 1900, courseTypes: ["MEDICAL"] },
  { name: "Armed Forces Medical College", city: "Pune", state: "Maharashtra", type: "GOVERNMENT", feesMin: 50000, feesMax: 120000, placementPercent: 94, rating: 4.8, establishedYear: 1945, courseTypes: ["MEDICAL"] },
  { name: "Maulana Azad Medical College", city: "New Delhi", state: "Delhi", type: "GOVERNMENT", feesMin: 40000, feesMax: 100000, placementPercent: 92, rating: 4.7, establishedYear: 1958, courseTypes: ["MEDICAL"] },
  { name: "King George Medical University", city: "Lucknow", state: "Uttar Pradesh", type: "GOVERNMENT", feesMin: 45000, feesMax: 110000, placementPercent: 90, rating: 4.6, establishedYear: 1911, courseTypes: ["MEDICAL"] },
  { name: "Indian Institute of Management Ahmedabad", city: "Ahmedabad", state: "Gujarat", type: "GOVERNMENT", feesMin: 2300000, feesMax: 2500000, placementPercent: 98, rating: 4.9, establishedYear: 1961, courseTypes: ["MANAGEMENT"] },
  { name: "Indian Institute of Management Bangalore", city: "Bengaluru", state: "Karnataka", type: "GOVERNMENT", feesMin: 2400000, feesMax: 2600000, placementPercent: 97, rating: 4.9, establishedYear: 1973, courseTypes: ["MANAGEMENT"] },
  { name: "Indian Institute of Management Calcutta", city: "Kolkata", state: "West Bengal", type: "GOVERNMENT", feesMin: 2350000, feesMax: 2550000, placementPercent: 97, rating: 4.8, establishedYear: 1961, courseTypes: ["MANAGEMENT"] },
  { name: "Faculty of Management Studies Delhi", city: "New Delhi", state: "Delhi", type: "GOVERNMENT", feesMin: 120000, feesMax: 200000, placementPercent: 92, rating: 4.6, establishedYear: 1954, courseTypes: ["MANAGEMENT"] },
  { name: "XLRI Jamshedpur", city: "Jamshedpur", state: "Jharkhand", type: "PRIVATE", feesMin: 2500000, feesMax: 2800000, placementPercent: 96, rating: 4.8, establishedYear: 1949, courseTypes: ["MANAGEMENT"] },
  { name: "SP Jain Institute of Management", city: "Mumbai", state: "Maharashtra", type: "PRIVATE", feesMin: 1800000, feesMax: 2200000, placementPercent: 94, rating: 4.7, establishedYear: 1981, courseTypes: ["MANAGEMENT"] },
  { name: "National Law School of India University", city: "Bengaluru", state: "Karnataka", type: "GOVERNMENT", feesMin: 200000, feesMax: 280000, placementPercent: 90, rating: 4.8, establishedYear: 1987, courseTypes: ["LAW"] },
  { name: "NALSAR University of Law", city: "Hyderabad", state: "Telangana", type: "GOVERNMENT", feesMin: 190000, feesMax: 260000, placementPercent: 88, rating: 4.7, establishedYear: 1998, courseTypes: ["LAW"] },
  { name: "National Law University Delhi", city: "New Delhi", state: "Delhi", type: "GOVERNMENT", feesMin: 210000, feesMax: 290000, placementPercent: 91, rating: 4.8, establishedYear: 2008, courseTypes: ["LAW"] },
  { name: "St. Stephen's College", city: "New Delhi", state: "Delhi", type: "GOVERNMENT", feesMin: 60000, feesMax: 120000, placementPercent: 85, rating: 4.6, establishedYear: 1881, courseTypes: ["ARTS", "SCIENCE"] },
  { name: "Loyola College Chennai", city: "Chennai", state: "Tamil Nadu", type: "PRIVATE", feesMin: 80000, feesMax: 150000, placementPercent: 80, rating: 4.5, establishedYear: 1925, courseTypes: ["ARTS", "SCIENCE", "MANAGEMENT"] },
  { name: "Hindu College Delhi", city: "New Delhi", state: "Delhi", type: "GOVERNMENT", feesMin: 50000, feesMax: 100000, placementPercent: 82, rating: 4.5, establishedYear: 1899, courseTypes: ["ARTS", "SCIENCE"] },
  { name: "Presidency University Kolkata", city: "Kolkata", state: "West Bengal", type: "GOVERNMENT", feesMin: 40000, feesMax: 90000, placementPercent: 78, rating: 4.4, establishedYear: 1817, courseTypes: ["SCIENCE", "ARTS"] },
  { name: "Indian Statistical Institute Kolkata", city: "Kolkata", state: "West Bengal", type: "GOVERNMENT", feesMin: 70000, feesMax: 130000, placementPercent: 86, rating: 4.7, establishedYear: 1931, courseTypes: ["SCIENCE"] },
  { name: "Indian Institute of Science Bengaluru", city: "Bengaluru", state: "Karnataka", type: "DEEMED", feesMin: 150000, feesMax: 220000, placementPercent: 89, rating: 4.8, establishedYear: 1909, courseTypes: ["SCIENCE", "ENGINEERING"] },
  { name: "International Institute of Information Technology Hyderabad", city: "Hyderabad", state: "Telangana", type: "DEEMED", feesMin: 380000, feesMax: 450000, placementPercent: 87, rating: 4.6, establishedYear: 1998, courseTypes: ["ENGINEERING", "SCIENCE"] },
  { name: "DA-IICT Gandhinagar", city: "Gandhinagar", state: "Gujarat", type: "PRIVATE", feesMin: 320000, feesMax: 400000, placementPercent: 80, rating: 4.2, establishedYear: 2001, courseTypes: ["ENGINEERING"] },
  { name: "MIT World Peace University", city: "Pune", state: "Maharashtra", type: "PRIVATE", feesMin: 280000, feesMax: 380000, placementPercent: 74, rating: 4.0, establishedYear: 1983, courseTypes: ["ENGINEERING", "MANAGEMENT"] },
  { name: "Graphic Era University", city: "Dehradun", state: "Uttarakhand", type: "PRIVATE", feesMin: 200000, feesMax: 300000, placementPercent: 71, rating: 3.9, establishedYear: 1996, courseTypes: ["ENGINEERING", "MANAGEMENT"] },
  { name: "UPES Dehradun", city: "Dehradun", state: "Uttarakhand", type: "PRIVATE", feesMin: 350000, feesMax: 480000, placementPercent: 76, rating: 4.1, establishedYear: 2003, courseTypes: ["ENGINEERING", "LAW", "MANAGEMENT"] },
  { name: "NMIMS Mumbai", city: "Mumbai", state: "Maharashtra", type: "PRIVATE", feesMin: 400000, feesMax: 550000, placementPercent: 85, rating: 4.4, establishedYear: 1981, courseTypes: ["MANAGEMENT", "ENGINEERING", "LAW"] },
  { name: "ICFAI Business School Hyderabad", city: "Hyderabad", state: "Telangana", type: "PRIVATE", feesMin: 900000, feesMax: 1200000, placementPercent: 82, rating: 4.2, establishedYear: 1995, courseTypes: ["MANAGEMENT"] },
  { name: "Christ University Bengaluru", city: "Bengaluru", state: "Karnataka", type: "DEEMED", feesMin: 180000, feesMax: 320000, placementPercent: 75, rating: 4.2, establishedYear: 1969, courseTypes: ["ARTS", "SCIENCE", "MANAGEMENT", "LAW"] },
];

export const BRANCHES = [
  "Computer Science",
  "Electronics",
  "Mechanical",
  "Civil",
  "Electrical",
  "Biotechnology",
  "Data Science",
  "MBA",
  "Medicine",
  "Law",
];

export const FACILITIES = [
  "Library",
  "Hostel",
  "Sports Complex",
  "Innovation Lab",
  "Medical Center",
  "Wi-Fi Campus",
  "Placement Cell",
  "Research Center",
];
