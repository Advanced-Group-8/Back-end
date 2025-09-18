// fix-imports.cjs
const { replaceInFile } = require("replace-in-file");

const options = {
  files: "dist/**/*.js",
  from: /from "(.*)"/g,
  to: (match, p1) => {
    // Only add .js to relative paths
    if (p1.startsWith("./") || p1.startsWith("../")) {
      return `from "${p1}.js"`;
    }
    return match;
  },
};

replaceInFile(options);
