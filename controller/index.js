export const handleGithubHook = async (req, res) => {
  try {
    const payload = req.body;

    if (payload.ref === "refs/heads/main") {
      console.log("Push to main branch detected.");
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
