// @ts-check
const portfinder = require('portfinder');

/**
 * @param {number} port
 */
module.exports.getAutoPort = async (port) => {
  return await portfinder.getPortPromise({ port });
};
