# my-build-system
My Gulp Build System

[![built with gulp](https://img.shields.io/badge/-gulp-eb4a4b.svg?logo=data%3Aimage%2Fpng%3Bbase64%2CiVBORw0KGgoAAAANSUhEUgAAAAYAAAAOCAMAAAA7QZ0XAAAABlBMVEUAAAD%2F%2F%2F%2Bl2Z%2FdAAAAAXRSTlMAQObYZgAAABdJREFUeAFjAAFGRjSSEQzwUgwQkjAFAAtaAD0Ls2nMAAAAAElFTkSuQmCC)](http://gulpjs.com/)

## Getting Started

### Development build

```
gulp
```

### Production build
```
gulp production
```

### Development vs Production
Development build creates sourcemap files in *public/maps*

Production build compresses sass files and uglifies js files


## Features
Live reloading with browser-sync and watchify

Linting with eslint (airbnb-base)

Autoprefixing css

Concatenating and compressing sass

Bundling all js files into main.js with browserify

Transforms es5 code using [babel-preset-env](https://babeljs.io/docs/plugins/preset-env/)

Uglifies js


## Todo
- [ ] Implement react components
- [ ] Better logging
- [ ] Testing
- [ ] Webpack?


## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details