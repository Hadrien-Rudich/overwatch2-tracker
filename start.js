const { spawn } = require("child_process");

const runCommand = (command, args, directory) => {
  const executedCommand = spawn(command, args, {
    cwd: directory,
    stdio: "inherit",
    shell: true,
  });

  executedCommand.on("error", (error) => {
    console.error(`Error: ${error.message}`);
  });

  executedCommand.on("close", (code) => {
    console.log(`Command ${command} exited with code ${code}`);
  });

  return executedCommand;
};

console.log("Starting Backend...");
const backend = runCommand("npm", ["run", "demo"], "./backend");

console.log("Starting Frontend...");
const frontend = runCommand("npm", ["run", "dev"], "./frontend");
