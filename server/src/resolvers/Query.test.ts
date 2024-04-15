import { Query } from "./index";

// Mock Prisma task data
const mockTasks = [
  { id: 1, title: "Task 1", createdAt: new Date("2022-01-01") },
  { id: 2, title: "Task 2", createdAt: new Date("2022-01-02") },
  { id: 3, title: "Task 3", createdAt: new Date("2022-01-03") },
];

// Mock context with Prisma
const mockContext = {
  prisma: {
    task: {
      findMany: jest.fn().mockResolvedValue(mockTasks),
      findUnique: jest.fn().mockImplementation((args) => {
        const taskId = Number(args.where.id);
        return mockTasks.find((task) => task.id === taskId);
      }),
    },
  },
};

const MockQuery = jest.fn().mockImplementation(() => ({
  tasks: (_parent: any, _args: any, context: any) =>
    Query.tasks(_parent, _args, context),
  task: (_parent: any, _args: any, context: any) =>
    Query.task(_parent, _args, context),
}));

describe("Query", () => {
  describe("tasks", () => {
    it("returns a list of tasks ordered by createdAt descending", async () => {
      const result = await MockQuery().tasks(null, null, mockContext);
      expect(result).toEqual(mockTasks);
    });
  });

  describe("task", () => {
    it("returns the task with the specified taskId", async () => {
      const taskId = "2"; // Task ID to retrieve
      const expectedResult = mockTasks.find(
        (task) => task.id === Number(taskId)
      );
      const result = await MockQuery().task(null, { taskId }, mockContext);
      expect(result).toEqual(expectedResult);
    });

    it("returns null if the taskId does not exist", async () => {
      const taskId = "999"; // Non-existent Task ID
      const result = await MockQuery().task(null, { taskId }, mockContext);
      expect(result).toBeUndefined();
    });
  });
});
