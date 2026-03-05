-- CreateTable
CREATE TABLE "DoneCardTickets" (
    "id" TEXT NOT NULL,
    "cardId" TEXT NOT NULL,
    "assignedToEmail" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "DoneCardTickets_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "DoneCardTickets" ADD CONSTRAINT "DoneCardTickets_assignedToEmail_fkey" FOREIGN KEY ("assignedToEmail") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
