import { getJestProjects } from "@nx/jest";

export default {
  projects: [...getJestProjects(), "<rootDir>/client"],
};
