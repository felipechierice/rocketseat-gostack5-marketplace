const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth');
const {promisify} = require('util');

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({error: 'Token not provided.'});
  }

  try {
    const [authType, token] = authHeader.split(' ');

    if (authType === 'bearer' || authType === 'Bearer') {
      const decoded = await promisify(jwt.verify)(token, authConfig.secret);
      req.userId = decoded.id;
      return next();
    } else {
      return res
          .status(401)
          .json({error: 'Authorization type not supported.'});
    }
  } catch (err) {
    return res.status(401).json({error: 'Invalid token.'});
  }
};
