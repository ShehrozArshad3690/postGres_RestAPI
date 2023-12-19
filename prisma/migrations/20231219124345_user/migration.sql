-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('Male', 'Female', 'Unknown');

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "age" INTEGER NOT NULL,
    "address" TEXT,
    "gender" "Gender" DEFAULT 'Unknown',

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);
