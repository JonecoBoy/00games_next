import * as messageRepository from "./messageRepository";

export async function getLatestMessages({
  senderId,
  receiverId,
}: {
  senderId: string;
  receiverId: string;
}) {
  const messages = await messageRepository.findMany({
    where: {
      OR: [
        {
          senderId,
          receiverId,
        },
        {
          receiverId: senderId,
          senderId: receiverId,
        },
      ],
    },
    select: {
      id: true,
      createdAt: true,
      message: true,
      senderId: true,
      receiverId: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 30,
  });

  return messages.reverse();
}