const { createGlobPatternsForDependencies } = require("@nx/react/tailwind");
const { join } = require("path");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(
      __dirname,
      "{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}"
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      height: {
        "screen": "calc(100vh - 68px)"
      }
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [ "dark",  "dracula", "light"],
  },
};
