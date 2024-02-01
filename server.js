const express = require("express");
const { exec } = require("child_process");

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  let command;

  // Check the operating system and set the appropriate command
  if (process.platform === "darwin") {
    command = "open ."; // Mac
  } else if (process.platform === "win32") {
    command = "start ."; // Windows
  } else {
    command = "nautilus ."; // Ubuntu
  }

  // Execute the command
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing command: ${error.message}`);
      res.status(500).send("Error opening file explorer");
    } else {
      console.log(`File explorer opened successfully: ${stdout}`);
      res.send("File explorer opened successfully");
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
