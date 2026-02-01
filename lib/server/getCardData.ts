import { prisma } from "../prisma";

export async function getCardDetailsData({
  cardDetailsId,
}: {
  cardDetailsId: string;
}) {
  const cardResponse = await prisma.cardDetails.findFirst({
    where: {
      id: cardDetailsId,
    },
    include: {
      card: true,
    },
  });

  return cardResponse;
}
