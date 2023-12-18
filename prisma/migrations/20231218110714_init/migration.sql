-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "age" INTEGER NOT NULL,
    "address" TEXT,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);
