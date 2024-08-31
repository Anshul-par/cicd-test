export const handleGithubHook = async (req, res) => {
  try {
    const payload = req.body;

    // Check if the push is to the main branch
    if (payload.ref === "refs/heads/main") {
      console.log("Push to main branch detected.");

      // Handle the logic for changes in the main branch
      // e.g., deploy code, run tests, send notifications, etc.
    }

    console.log("payload", payload);

    res.sendStatus(200);
  } catch (error) {
    console.log("Error in handleGithubHook", error);
    res.status(500).json({
      message: "Internal server error.",
      success: false,
    });
  }
};
