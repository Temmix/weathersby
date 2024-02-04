import { Task } from "@prisma/client";
import { Context } from "../index";

interface TaskCreateArgs {
  title: string;
  description: string;
  completed: boolean;
}

interface TaskUpdateArgs {
  taskId: string;
  title?: string;
  description?: string;
  completed?: boolean;
}

interface TaskDeleteArgs {
  taskId: string;
}

interface TaskPayloadType {
  taskErrors: {
    message: string;
  }[];
  task: Task | null;
}

export const Mutation = {
  taskCreate: async (
    _parent: any,
    args: TaskCreateArgs,
    context: Context
  ): Promise<TaskPayloadType> => {
    const { title, description, completed } = args;

    if (!title || !description) {
      return {
        taskErrors: [
          {
            message: "You must provide a title and description to make a task",
          },
        ],
        task: null,
      };
    }

    const task = await context.prisma.task.create({
      data: {
        title,
        description,
        completed,
      },
    });
    return {
      taskErrors: [],
      task,
    };
  },
  taskUpdate: async (
    _parent: any,
    args: TaskUpdateArgs,
    context: Context
  ): Promise<TaskPayloadType> => {
    const { taskId, title, description, completed } = args;
    const { prisma } = context;
    if (!title && !description) {
      return {
        taskErrors: [
          {
            message:
              "You must provide a title or description or completed to update a task",
          },
        ],
        task: null,
      };
    }

    const existingTask = await prisma.task.findUnique({
      where: {
        id: Number(taskId),
      },
    });

    if (!existingTask) {
      return {
        taskErrors: [
          {
            message: "Task does not exist",
          },
        ],
        task: null,
      };
    }
    const task = await prisma.task.update({
      data: {
        title: !title ? existingTask.title : title,
        description: !description ? existingTask.description : description,
        completed: completed,
      },
      where: {
        id: Number(taskId),
      },
    });
    return {
      taskErrors: [],
      task,
    };
  },
  taskDelete: async (
    _parent: any,
    args: TaskDeleteArgs,
    context: Context
  ): Promise<TaskPayloadType> => {
    const { taskId } = args;
    const { prisma } = context;

    const existingTask = await prisma.task.findUnique({
      where: {
        id: Number(taskId),
      },
    });

    if (!existingTask) {
      return {
        taskErrors: [
          {
            message: "Task does not exist",
          },
        ],
        task: null,
      };
    }

    await prisma.task.delete({
      where: {
        id: Number(taskId),
      },
    });
    return {
      taskErrors: [],
      task: existingTask,
    };
  },
};
