-- CreateEnum
CREATE TYPE "SectionType" AS ENUM ('Table of Contents', 'Executive Summary', 'Technical Approach', 'Design', 'Capabilities', 'Focus Document', 'Narrative');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('Pending', 'In-Progress', 'Completed');

-- CreateEnum
CREATE TYPE "Reviewer" AS ENUM ('Assim', 'Bini', 'Mami');

-- CreateTable
CREATE TABLE "outlines" (
    "id" SERIAL NOT NULL,
    "header" TEXT NOT NULL,
    "sectionType" "SectionType" NOT NULL,
    "status" "Status" NOT NULL,
    "target" INTEGER NOT NULL,
    "limit" INTEGER NOT NULL,
    "reviewer" "Reviewer" NOT NULL,
    "organizationId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "outlines_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "team_members" (
    "id" SERIAL NOT NULL,
    "betterAuthUserId" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "team_members_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "team_members_betterAuthUserId_key" ON "team_members"("betterAuthUserId");

-- CreateIndex
CREATE UNIQUE INDEX "team_members_betterAuthUserId_organizationId_key" ON "team_members"("betterAuthUserId", "organizationId");
