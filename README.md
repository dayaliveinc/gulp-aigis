# gulp-aigis

gulp plugin for [aigis](https://github.com/pxgrid/aigis)

## Usage

The path to your aigis config file as source.

```js
var gulp = require("gulp");
var aigis = require("gulp-aigis");

gulp.task("aigis", function () {
  gulp.src("./src/").pipe(
    aigis({
      template_engine: ejs,
    })
  );
});
```

## Documents

See [aigis repo](https://github.com/pxgrid/aigis)
