const ip = require('ip');

const callNextForIPs = (ips) => (req, res, next) => {
  const address = ip.isEqual('::1', '::0:1') ? '127.0.0.1' : ip.address();
  ips.includes(address) ? next() : res.redirect('/');
};

module.exports = callNextForIPs;
