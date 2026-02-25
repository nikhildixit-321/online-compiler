const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

const outputDir = path.join(__dirname, "outputs");

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

  const executeCpp = (filepath) => {
  return new Promise((resolve, reject) => {
    const jobId = path.basename(filepath).split(".")[0];
    const outputExe = path.join(outputDir, `${jobId}.exe`);

    const command = `g++ "${filepath}" -o "${outputExe}" && "${outputExe}"`;

    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(error.message);
        return;
      }
      if (stderr) {
        reject(stderr);
        return;
      }
      resolve(stdout);
    });
  });
};

module.exports = {
  executeCpp,
};
