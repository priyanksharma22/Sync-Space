import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  // 1. Get the token from the request header
  const authHeader = req.header("Authorization");

  // 2. Check if the token exists and is in the correct 'Bearer' format
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token, authorization denied." });
  }

  try {
    // 3. Get just the token string (remove "Bearer ")
    const token = authHeader.split(" ")[1];

    const decodedPayload = jwt.verify(token, process.env.JWT_SECRET); // If the signature is false or token is expired then the server will throw an error that's why this part is inside the try catch block

    // The JWT token made while registering contains only the user userRole and userId so after verifying the variable
    // decodedPayload holds the object and when we do req.user it gets the userId out of it 
    req.user = decodedPayload;

    next();
  } catch (err) {
    // If jwt.verify fails (e.g., token is fake or expired), it throws an error. We catch it here and send a "not valid" message.
    res.status(401).json({ message: "Token is not valid." });
  }
};

export default authMiddleware;
