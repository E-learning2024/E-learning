-- CreateTable
CREATE TABLE "leads" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "message" TEXT,

    CONSTRAINT "leads_pkey" PRIMARY KEY ("id")
);
