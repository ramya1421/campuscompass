import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";
import { Pool } from "pg";
import { PrismaClient } from "../src/generated/prisma/client";
import {
  BRANCHES,
  FACILITIES,
  INDIAN_COLLEGES,
} from "./college-data";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function pick<T>(items: T[], index: number) {
  return items[index % items.length];
}

async function main() {
  await prisma.comment.deleteMany();
  await prisma.discussionLike.deleteMany();
  await prisma.discussion.deleteMany();
  await prisma.review.deleteMany();
  await prisma.savedCollege.deleteMany();
  await prisma.comparison.deleteMany();
  await prisma.predictorHistory.deleteMany();
  await prisma.course.deleteMany();
  await prisma.college.deleteMany();
  await prisma.session.deleteMany();
  await prisma.account.deleteMany();
  await prisma.user.deleteMany();

  const passwordHash = await bcrypt.hash("Password@123", 12);

  const demoUsers = await Promise.all(
    [
      { name: "Aarav Sharma", email: "aarav@campuscompass.dev" },
      { name: "Isha Patel", email: "isha@campuscompass.dev" },
      { name: "Rohan Mehta", email: "rohan@campuscompass.dev" },
      { name: "Neha Reddy", email: "neha@campuscompass.dev" },
      { name: "Kavya Singh", email: "kavya@campuscompass.dev" },
    ].map((user) =>
      prisma.user.create({
        data: {
          ...user,
          passwordHash,
          bio: "CampusCompass community member helping students make better decisions.",
        },
      }),
    ),
  );

  const colleges = [];

  for (const [index, college] of INDIAN_COLLEGES.entries()) {
    const slug = slugify(college.name);
    const avgPackage = 6 + (college.placementPercent / 20);
    const highestPackage = avgPackage * 2.4;
    const placementTrend = [
      { year: 2021, percent: college.placementPercent - 6 },
      { year: 2022, percent: college.placementPercent - 4 },
      { year: 2023, percent: college.placementPercent - 2 },
      { year: 2024, percent: college.placementPercent },
      { year: 2025, percent: college.placementPercent + 1 },
    ];

    const created = await prisma.college.create({
      data: {
        slug,
        name: college.name,
        description: `${college.name} is a leading institution in ${college.city}, ${college.state}, known for academic rigor, industry partnerships, and strong alumni outcomes.`,
        imageUrl: `https://picsum.photos/seed/${slug}/1200/800`,
        city: college.city,
        state: college.state,
        type: college.type,
        establishedYear: college.establishedYear,
        website: `https://www.${slug}.edu.in`,
        rating: college.rating,
        reviewCount: 12 + (index % 20),
        feesMin: college.feesMin,
        feesMax: college.feesMax,
        placementPercent: college.placementPercent,
        avgPackage,
        highestPackage,
        facilities: FACILITIES.slice(0, 5 + (index % 4)),
        placementTrend,
        overview: `${college.name} offers multidisciplinary programs with modern infrastructure, research-driven faculty, and a vibrant campus culture focused on innovation and employability.`,
        hostelInfo:
          "Separate hostels for boys and girls with mess, study rooms, high-speed internet, and 24x7 security.",
        admissionInfo:
          "Admissions are based on national/state entrance exams, academic merit, and counseling rounds.",
        courses: {
          create: college.courseTypes.flatMap((courseType, courseIndex) => {
            const branch = pick(BRANCHES, index + courseIndex);
            return [
              {
                name: `${branch} Program`,
                branch,
                degree:
                  courseType === "MANAGEMENT"
                    ? "MBA"
                    : courseType === "MEDICAL"
                      ? "MBBS"
                      : courseType === "LAW"
                        ? "BA LLB"
                        : "B.Tech",
                courseType,
                duration:
                  courseType === "MANAGEMENT"
                    ? "2 years"
                    : courseType === "MEDICAL"
                      ? "5.5 years"
                      : "4 years",
                fees: Math.round(
                  college.feesMin + (college.feesMax - college.feesMin) * 0.35,
                ),
                seats: 60 + courseIndex * 20,
                cutoffRank: 500 + index * 120 + courseIndex * 90,
                eligibility: "Valid entrance exam rank and counseling participation.",
              },
            ];
          }),
        },
      },
      include: { courses: true },
    });

    colleges.push(created);
  }

  for (const [index, college] of colleges.entries()) {
    const author = pick(demoUsers, index);
    await prisma.review.create({
      data: {
        collegeId: college.id,
        userId: author.id,
        rating: Math.min(5, Math.max(3, Math.round(college.rating))),
        title: "Strong academics with practical exposure",
        content:
          "Faculty quality is excellent, internships are well supported, and the placement cell is proactive throughout the year.",
      },
    });
  }

  const categories = [
    "PLACEMENTS",
    "HOSTEL",
    "ACADEMICS",
    "CAMPUS_LIFE",
    "ADMISSIONS",
  ] as const;

  const discussionSeeds = [
    "What is the realistic placement scenario for CSE?",
    "How is hostel life and food quality?",
    "Is faculty approachable for research projects?",
    "Best clubs and cultural fests on campus?",
    "Expected cutoff trends for this admission cycle?",
    "Internship opportunities in second year?",
    "Should I choose this over a nearby NIT?",
    "How tough is the coursework in first year?",
  ];

  for (let i = 0; i < 30; i++) {
    const college = pick(colleges, i);
    const user = pick(demoUsers, i + 1);
    const discussion = await prisma.discussion.create({
      data: {
        title: `${pick(discussionSeeds, i)} - ${college.name.split(" ")[0]}`,
        content:
          "I am shortlisting colleges and would love to hear from seniors about real experiences, hidden costs, and career outcomes.",
        category: pick([...categories], i),
        userId: user.id,
        collegeId: college.id,
        likesCount: 3 + (i % 12),
      },
    });

    const parent = await prisma.comment.create({
      data: {
        discussionId: discussion.id,
        userId: pick(demoUsers, i + 2).id,
        content:
          "From my experience, focus on branch-wise placement reports and verify internships by department.",
      },
    });

    await prisma.comment.create({
      data: {
        discussionId: discussion.id,
        userId: pick(demoUsers, i + 3).id,
        parentId: parent.id,
        content:
          "Agreed. Also visit the campus once before locking your preference list in counseling.",
      },
    });
  }

  await prisma.comparison.create({
    data: {
      userId: demoUsers[0].id,
      collegeIds: colleges.slice(0, 3).map((college) => college.id),
      name: "Top IIT Shortlist",
    },
  });

  await prisma.predictorHistory.create({
    data: {
      userId: demoUsers[0].id,
      exam: "JEE_MAIN",
      rank: 5400,
      preferredState: "Maharashtra",
      branch: "Computer Science",
      results: colleges.slice(0, 5).map((college) => ({
        id: college.id,
        name: college.name,
        probability: "High",
      })),
    },
  });

  await prisma.savedCollege.createMany({
    data: [
      { userId: demoUsers[0].id, collegeId: colleges[0].id },
      { userId: demoUsers[0].id, collegeId: colleges[1].id },
      { userId: demoUsers[1].id, collegeId: colleges[4].id },
    ],
  });

  console.log(`Seeded ${colleges.length} colleges and demo community data.`);
  console.log("Demo login: aarav@campuscompass.dev / Password@123");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
