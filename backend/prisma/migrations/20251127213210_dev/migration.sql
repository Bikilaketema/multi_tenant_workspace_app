-- CreateEnum
CREATE TYPE "SectionType" AS ENUM ('TableOfContents', 'ExecutiveSummary', 'TechnicalApproach', 'Design', 'Capabilities', 'FocusDocument', 'Narrative');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('Pending', 'InProgress', 'Completed');

-- CreateEnum
CREATE TYPE "Reviewer" AS ENUM ('Assim', 'Bini', 'Mami');

-- CreateTable
CREATE TABLE "Outline" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "header" TEXT NOT NULL,
    "sectionType" "SectionType" NOT NULL,
    "status" "Status" NOT NULL,
    "target" INTEGER NOT NULL,
    "limit" INTEGER NOT NULL,
    "reviewer" "Reviewer" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Outline_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Outline" ADD CONSTRAINT "Outline_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
