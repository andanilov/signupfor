module.exports = (req) => req.headers['x-forwarded-for'] || req.socket.remoteAddress;
