import { gql } from "apollo-server";

export const typeDefs = gql`
  type Query {
    tasks: [Task!]!
    task(taskId: ID!): Task
  }

  type Mutation {
    taskCreate(
      title: String!
      description: String!
      completed: Boolean!
    ): TaskPayload!

    taskUpdate(
      taskId: ID!
      title: String
      description: String
      completed: Boolean
    ): TaskPayload!

    taskDelete(taskId: ID!): TaskPayload!
  }

  type Task {
    id: ID!
    title: String!
    description: String!
    completed: Boolean!
    createdAt: String!
  }

  type TaskPayload {
    taskErrors: [TaskError!]
    task: Task
  }

  type TaskInput {
    title: String!
    description: String!
    completed: Boolean!
  }

  type TaskError {
    message: String!
  }
`;
