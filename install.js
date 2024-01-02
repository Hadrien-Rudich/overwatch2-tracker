const { spawn } = require("child_process");
const fs = require("fs");
const path = require("path");

const copyEnvFile = (directory) => {
  const envExamplePath = path.join(directory, ".env.example");
  const envPath = path.join(directory, ".env");

  if (!fs.existsSync(envPath) && fs.existsSync(envExamplePath)) {
    fs.copyFileSync(envExamplePath, envPath);
    console.log(`Created .env file in ${directory}`);
  }
};

const installDependencies = (directory) => {
  console.log(`Installing dependencies in ${directory}...`);
  const installer = spawn("npm", ["install"], {
    cwd: directory,
    stdio: "inherit",
    shell: true,
  });

  installer.on("error", (error) => {
    console.error(`Error: ${error.message}`);
  });

  installer.on("close", (code) => {
    if (code === 0) {
      console.log(`Dependencies installed for ${directory}`);
    } else {
      console.error(`Failed to install dependencies for ${directory}`);
    }
  });
};

copyEnvFile("./backend");
installDependencies("./backend");
installDependencies("./frontend");
