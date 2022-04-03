const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    // Get token from header
    const token = req.header("Authorization");
    // If no token
    if (!token) {
      res.status(401);
      throw new Error("Authorization denied, no token");
    }

    // Verify token
    /* If a callback is supplied, function acts asynchronously. 
    The callback is called with the decoded payload if the signature is valid.
    If not, it will be called with the error. */
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      // If error
      if (err) {
        res.status(401);
        throw new Error("Invalid token");
      } else {
        // Store decoded payload in req.user
        req.user = decoded;
        next();
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { auth };
