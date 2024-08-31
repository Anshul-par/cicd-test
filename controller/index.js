import { exec } from "child_process";

export const handleGithubHook = async (req, res) => {
  try {
    const payload = req.body;
    let url = payload.url;

    if (payload.ref === "refs/heads/main") {
      console.log("Push to main branch detected.");
    }

    const scriptPath = "../repo.sh";

    const chmodCommand = `chmod +x ${scriptPath}`;

    exec(chmodCommand, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error making script executable: ${error.message}`);
        return;
      }

      if (stderr) {
        console.error(`Standard error: ${stderr}`);
        return;
      }

      console.log(`Script made executable:\n${stdout}`);

      exec(`./pull_repo.sh "${url}"`, (error, stdout, stderr) => {
        if (error) {
          console.error(`Error executing script: ${error.message}`);
          return;
        }

        if (stderr) {
          console.error(`Error in script execution: ${stderr}`);
          return;
        }

        console.log(`Script output:\n${stdout}`);
      });
    });

    res.sendStatus(200);
  } catch (error) {
    console.log("Error in handleGithubHook", error);
    res.status(500).json({
      message: "Internal server error.",
      success: false,
    });
  }
};
