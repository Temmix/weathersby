import { Mutation } from "./index";

const MockPrismaClient = jest.fn().mockImplementation(() => ({
  task: {
    create: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
}));

// Create a mock instance of PrismaClient
const prismaMock = new MockPrismaClient();

// Mocking Prisma context
const mockPrismaContext = {
  prisma: prismaMock,
};

const mockArgsCreate = {
  title: "Test Task",
  description: "Test Description",
  completed: false,
};

const mockArgsUpdate = {
  taskId: "1",
  title: "Updated Task Title",
  description: "Updated Task Description",
  completed: true,
};

const mockArgsDelete = {
  taskId: "1",
};

describe("Mutation", () => {
  describe("taskCreate", () => {
    it("creates a new task", async () => {
      mockPrismaContext.prisma.task.create.mockResolvedValue({
        id: "1",
        title: "Test Task",
        description: "Test Description",
        completed: false,
      });

      const result = await Mutation.taskCreate(
        null,
        mockArgsCreate,
        mockPrismaContext
      );
      expect(result.taskErrors).toHaveLength(0);
      expect(result.task).toHaveProperty("id");
      expect(result.task.title).toBe("Test Task");
    });

    it("returns errors when title or description are missing", async () => {
      const result = await Mutation.taskCreate(
        null,
        { ...mockArgsCreate, title: "" },
        mockPrismaContext
      );
      expect(result.taskErrors).toHaveLength(1);
      expect(result.task).toBeNull();
    });
  });

  describe("taskUpdate", () => {
    it("updates an existing task", async () => {
      mockPrismaContext.prisma.task.update.mockResolvedValue({
        taskId: "1",
        title: "Updated Task Title",
        description: "Updated Task Description",
        completed: true,
      });

      mockPrismaContext.prisma.task.findUnique.mockResolvedValue({
        taskId: "1",
        title: "Task Title",
        description: "Task Description",
        completed: false,
      });

      const result = await Mutation.taskUpdate(
        null,
        mockArgsUpdate,
        mockPrismaContext
      );
      expect(result.taskErrors).toHaveLength(0);
      expect(result.task).toHaveProperty("taskId");
      expect(result.task.title).toBe("Updated Task Title");
    });

    it("should not be able update a non existing task", async () => {
      mockPrismaContext.prisma.task.update.mockResolvedValue({
        taskId: "1",
        title: "Updated Task Title",
        description: "Updated Task Description",
        completed: true,
      });

      mockPrismaContext.prisma.task.findUnique.mockResolvedValue(null);

      const result = await Mutation.taskUpdate(
        null,
        mockArgsUpdate,
        mockPrismaContext
      );
      expect(result.task).toBeNull();
      expect(result.taskErrors).toHaveLength(1);
      expect(result.taskErrors[0].message).toBe("Task does not exist");
    });
  });

  describe("taskDelete", () => {
    it("deletes an existing task", async () => {
      mockPrismaContext.prisma.task.delete.mockResolvedValue({
        taskId: "1",
      });

      mockPrismaContext.prisma.task.findUnique.mockResolvedValue({
        taskId: "1",
        title: "Task Title",
        description: "Task Description",
        completed: false,
      });

      const result = await Mutation.taskDelete(
        null,
        mockArgsDelete,
        mockPrismaContext
      );
      expect(result.taskErrors).toHaveLength(0);
      expect(result.task).toHaveProperty("taskId");
      expect(result.task.title).toBe("Task Title");
    });

    it("should not be able to delets a non existing task", async () => {
      mockPrismaContext.prisma.task.delete.mockResolvedValue({
        taskId: "1",
      });

      mockPrismaContext.prisma.task.findUnique.mockResolvedValue(null);

      const result = await Mutation.taskDelete(
        null,
        mockArgsDelete,
        mockPrismaContext
      );
      expect(result.task).toBeNull();
      expect(result.taskErrors).toHaveLength(1);
      expect(result.taskErrors[0].message).toBe("Task does not exist");
    });
  });
});
