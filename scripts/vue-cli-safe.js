const os = require("os");

const originalNetworkInterfaces = os.networkInterfaces.bind(os);

os.networkInterfaces = (...args) => {
  try {
    return originalNetworkInterfaces(...args) || {};
  } catch (error) {
    return {};
  }
};

require("@vue/cli-service/bin/vue-cli-service");
