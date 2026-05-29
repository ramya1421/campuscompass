import type { Prisma } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import type { CollegeQueryInput } from "@/lib/validations/college";

export function buildCollegeWhere(
  query: CollegeQueryInput,
): Prisma.CollegeWhereInput {
  const where: Prisma.CollegeWhereInput = {};

  if (query.q) {
    where.OR = [
      { name: { contains: query.q, mode: "insensitive" } },
      { city: { contains: query.q, mode: "insensitive" } },
      { state: { contains: query.q, mode: "insensitive" } },
    ];
  }

  if (query.state) {
    where.state = query.state;
  }

  if (query.minFees || query.maxFees) {
    where.feesMin = {
      ...(query.minFees ? { gte: query.minFees } : {}),
      ...(query.maxFees ? { lte: query.maxFees } : {}),
    };
  }

  if (query.minRating) {
    where.rating = { gte: query.minRating };
  }

  if (query.courseType) {
    where.courses = {
      some: {
        courseType: query.courseType as Prisma.EnumCourseTypeFilter["equals"],
      },
    };
  }

  return where;
}

export function buildCollegeOrderBy(
  sort: CollegeQueryInput["sort"],
): Prisma.CollegeOrderByWithRelationInput {
  switch (sort) {
    case "fees":
      return { feesMin: "asc" };
    case "placement":
      return { placementPercent: "desc" };
    default:
      return { rating: "desc" };
  }
}

export async function listColleges(query: CollegeQueryInput) {
  const where = buildCollegeWhere(query);
  const orderBy = buildCollegeOrderBy(query.sort);
  const skip = (query.page - 1) * query.limit;

  const [items, total] = await Promise.all([
    prisma.college.findMany({
      where,
      orderBy,
      skip,
      take: query.limit,
      select: {
        id: true,
        slug: true,
        name: true,
        city: true,
        state: true,
        imageUrl: true,
        rating: true,
        feesMin: true,
        feesMax: true,
        placementPercent: true,
        type: true,
      },
    }),
    prisma.college.count({ where }),
  ]);

  return {
    items,
    page: query.page,
    limit: query.limit,
    total,
    totalPages: Math.ceil(total / query.limit),
  };
}

export async function getCollegeById(id: string) {
  return prisma.college.findFirst({
    where: {
      OR: [{ id }, { slug: id }],
    },
    include: {
      courses: { orderBy: { fees: "asc" } },
      reviews: {
        take: 8,
        orderBy: { createdAt: "desc" },
        include: {
          user: { select: { id: true, name: true, image: true } },
        },
      },
      _count: {
        select: { discussions: true, reviews: true },
      },
    },
  });
}

export async function getCollegesByIds(ids: string[]) {
  return prisma.college.findMany({
    where: { id: { in: ids } },
    include: {
      courses: true,
    },
  });
}
