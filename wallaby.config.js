module.exports = () => {
  return {
    autoDetect: true,
    files: ['package.json', 'src/**/*.ts', '!src/**/*.test.ts'],
    tests: ['src/**/*.test.ts'],
    env: {
      params: {
        env: 'TZ=UTC',
      },
    },
  };
};
