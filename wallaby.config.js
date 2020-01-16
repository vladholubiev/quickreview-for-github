module.exports = wallaby => {
  process.env.NODE_ENV = 'test';

  return {
    testFramework: 'jest',
    files: ['package.json', 'src/**/*.ts', '!src/**/*.test.ts'],
    tests: ['src/**/*.test.ts'],
    env: {
      type: 'node',
      runner: 'node'
    },
    compilers: {
      'src/**/*.js': wallaby.compilers.babel(),
      '**/*.ts?(x)': wallaby.compilers.typeScript()
    },
    setup(wallaby) {
      wallaby.testFramework.configure(require('./package.json').jest);

      process.env.TZ = 'UTC';
    },
    preprocessors: {
      '**/*.js': file =>
        require('@babel/core').transform(file.content, {
          sourceMap: true,
          compact: false,
          filename: file.path
        })
    }
  };
};
