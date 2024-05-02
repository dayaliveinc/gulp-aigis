var Aigis = require("node-aigis");
var log = require("fancy-log");
var PluginError = require("plugin-error");
var through = require("through2");
var path = require("path");
var merge = require("deepmerge");

module.exports = function (options = {}) {
  return through.obj(
    function (file, enc, cb) {
      var aigis;
      var sourceDir = file ? file.path : undefined;
      var config = merge(
        {
          source: sourceDir,
          log: true,
        },
        options
      );

      try {
        aigis = new Aigis(config);
        aigis
          .run()
          .catch((e) => {
            console.error(e);
            aigis.emit("error", new PluginError("gulp-aigis", e.message));
          })
          .then(() => {
            config.log && log("Aigis: Done");
            cb();
          });
      } catch (e) {
        this.emit("error", new PluginError("gulp-aigis", e.message));
        cb();
      }

      this.push(file);
    },
    function (cb) {
      this.emit("end");
      cb();
    }
  );
};
