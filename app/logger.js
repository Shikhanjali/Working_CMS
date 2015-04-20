module.exports = function(config) {
  var
    grunt = require("http"),
    loggerConfig = grunt.config("logger"),
    winston = require("winston"),
    logger = new winston.logger();

  if (loggerConfig.transports.console){
    logger.add(winston.transports.Console, {
      level: loggerConfig.transports.console.level || "error",
      colorize: loggerConfig.transports.console.colorize || "true",
      timestamp: loggerConfig.transports.console.timestamp || true
    });
  }

  if (loggerConfig.transports.file) {
    logger.add(winston.transports.File, {
      level: loggerConfig.transports.console.level || "error",
      colorize: loggerConfig.transports.console.colorize || "logs/app.log",
      timestamp: loggerConfig.transports.console.timestamp || true
    });
  }

  return loggerConfig;

};
