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
  return new Promise((resolve, reject) => {
    console.log(`Installing dependencies in ${directory}...`);
    const installer = spawn("npm", ["install"], {
      cwd: directory,
      stdio: "inherit",
      shell: true,
    });

    installer.on("error", (error) => {
      console.error(`Error: ${error.message}`);
      reject(error);
    });

    installer.on("close", (code) => {
      if (code === 0) {
        console.log(`Dependencies installed for ${directory}`);
        resolve();
      } else {
        console.error(`Failed to install dependencies for ${directory}`);
        reject(new Error(`Installation failed with code ${code}`));
      }
    });
  });
};

const compileTypeScript = (directory) => {
  return new Promise((resolve, reject) => {
    console.log(`Compiling TypeScript in ${directory}...`);
    const compiler = spawn("tsc", [], {
      cwd: directory,
      stdio: "inherit",
      shell: true,
    });

    compiler.on("error", (error) => {
      console.error(`Error: ${error.message}`);
      reject(error);
    });

    compiler.on("close", (code) => {
      if (code === 0) {
        console.log(`TypeScript compiled successfully in ${directory}`);
        resolve();
      } else {
        console.error(`Failed to compile TypeScript in ${directory}`);
        reject(new Error(`TypeScript compilation failed with code ${code}`));
      }
    });
  });
};

const setupProject = async () => {
  await installDependencies(".");
  copyEnvFile("./_backend");
  await installDependencies("./backend");
  await compileTypeScript("./backend");
  await installDependencies("./frontend");
};

setupProject().catch((error) => {
  console.error("Failed to set up project:", error.message);
});
