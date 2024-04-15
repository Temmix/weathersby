module.exports = {
  testEnvironment: "node", // Node environment, good for back-end
  transform: {
    "^.+\\.tsx?$": "ts-jest", // If using TypeScript
    "^.+\\.jsx?$": "babel-jest", // If using JavaScript
  },
  setupFilesAfterEnv: ["<rootDir>/testSetup.js"], // Script runs after jest is setup
};
