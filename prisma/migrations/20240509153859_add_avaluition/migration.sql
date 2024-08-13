-- CreateTable
CREATE TABLE "TypeAvaliation" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "TypeAvaliation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Avaliation" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "delivery_date_and_time" TEXT,
    "classId" INTEGER NOT NULL,
    "typeId" INTEGER NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Avaliation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuestionAvaliation" (
    "id" SERIAL NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "fileUrl" TEXT,
    "avaliationId" INTEGER NOT NULL,

    CONSTRAINT "QuestionAvaliation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Avaliation" ADD CONSTRAINT "Avaliation_classId_fkey" FOREIGN KEY ("classId") REFERENCES "class"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Avaliation" ADD CONSTRAINT "Avaliation_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "TypeAvaliation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionAvaliation" ADD CONSTRAINT "QuestionAvaliation_avaliationId_fkey" FOREIGN KEY ("avaliationId") REFERENCES "Avaliation"("id") ON DELETE CASCADE ON UPDATE CASCADE;
