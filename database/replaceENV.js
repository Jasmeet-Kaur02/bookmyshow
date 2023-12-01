const fs = require("fs");

const replaceENV = (config) => {
  const regex = /\${(\w+)}/g;
  let shouldUpdate = false;

  Object.keys(config).forEach((key) => {
    if (typeof config[key] === "object") {
      const updatedConfig = replaceENV(config[key]);
      if (updatedConfig) {
        shouldUpdate = true;
      }
    } else {
      if (regex.test(config[key])) {
        shouldUpdate = true;
        config[key] = config[key].replace(
          regex,
          (match, envVar) => process.env[envVar] || ""
        );
      }
    }
  });

  if (shouldUpdate) {
    return config;
  }
  return null;
};

module.exports = () => {
  const config = fs.readFileSync(`${__dirname}/config.json`);
  const parsedConfig = JSON.parse(config);
  const updatedConfig = replaceENV(parsedConfig);
  if (updatedConfig) {
    fs.writeFileSync(`${__dirname}/config.json`, JSON.stringify(updatedConfig));
  }
};
