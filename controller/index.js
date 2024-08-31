export const handleGithubHook = async (req, res) => {
  try {
    console.log("payload", req);

    res.sendStatus(200);
  } catch (error) {
    console.log("Error in handleGithubHook", error);
    res.status(500).json({
      message: "Internal server error.",
      success: false,
    });
  }
};
