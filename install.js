const { spawn } = require("child_process");

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

installDependencies("./backend");
installDependencies("./frontend");
