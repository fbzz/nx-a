/* eslint-disable */
export default {
  displayName: "server",
  preset: "../jest.preset.js",
  globals: {},
  testEnvironment: "node",
  transform: {
    "^.+\\.[tj]s$": [
      "ts-jest",
      {
        tsconfig: "<rootDir>/tsconfig.spec.json",
      },
    ],
  },
  moduleFileExtensions: ["ts", "js", "html", "tsx"],
  coverageDirectory: "../../coverage/apps/server",
};
