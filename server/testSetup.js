jest.mock("./prisma/schema.prisma", () => {
  const actual = jest.requireActual("./prisma/schema.prisma"); //./path/to/PrismaClient
  return {
    __esModule: true,
    default: actual,
  };
});
