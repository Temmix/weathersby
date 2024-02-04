import { Context } from "..";

interface TaskgetArgs {
  taskId: string;
}

export const Query = {
  tasks: (_parent: any, _args: any, context: Context) => {
    const { prisma } = context;
    return prisma.task.findMany({
      orderBy: [
        {
          createdAt: "asc",
        },
        // {  title: 'asc' }
      ],
    });
  },
  task: (_parent: any, args: TaskgetArgs, context: Context) => {
    const { prisma } = context;
    return prisma.task.findUnique({
      where: {
        id: Number(args.taskId),
      },
    });
  },
};
