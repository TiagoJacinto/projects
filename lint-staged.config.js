module.exports = {
  '{projects,shared}/**/*.{ts,tsx}': (files) => {
    return `nx affected --target=lint --files=${files.join(',')}`;
  },
  '{projects,shared}/**/*.{js,ts,jsx,tsx,json}': [
    (files) => `nx affected --target=lint:fix --files=${files.join(',')}`,
    (files) => `nx format:write --files=${files.join(',')}`,
  ],
};
