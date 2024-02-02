import { Context } from "..";

export const Query = {
  tasks: (_parent: any, _args: any, context: Context) => {
    const { prisma } = context;
    return prisma.task.findMany({
      orderBy: [
        {
          createdAt: "desc",
        },
        // {  title: 'asc' }
      ],
    });
  },
};
