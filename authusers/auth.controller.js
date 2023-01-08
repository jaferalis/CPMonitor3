const jwt = require('jsonwebtoken');

function verifyJWT(req, res, next) {
  // Get the JWT from the request headers
  const token = req.headers['x-access-token'];

  // If there is no token, return an error
  if (!token) {
    return res.status(401).send({
      auth: false,
      message: 'No token provided.'
    });
  }

  // Otherwise, verify the token
  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    // If there is an error, return an error
    if (err) {
      return res.status(500).send({
        auth: false,
        message: 'Failed to authenticate token.'
      });
    }

    // If the token is valid, save the decoded token to the request object
    // and call the next middleware function
    req.userId = decoded.id;
    next();
  });
}
