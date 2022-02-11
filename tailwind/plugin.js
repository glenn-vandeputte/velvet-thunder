'use strict';

const tailwindPlugin = require('tailwindcss/plugin');

const COMPONENTS = {
  button: require('./components/button'),
};

const DEFAULT_OPTIONS = {
  colors: ['indigo'],
  components: {},
};

module.exports = tailwindPlugin.withOptions(
  (providedOptions) => {
    const options = {
      ...DEFAULT_OPTIONS,
      ...providedOptions,
    };

    const components = Object.keys(COMPONENTS).filter((component) => {
      return options.components[component] !== false;
    });

    return ({ addComponents, config, theme }) => {
      addComponents(
        components.map((component) =>
          COMPONENTS[component]({
            colors: options.colors,
            config,
            options: options.components[component],
            theme,
          })
        )
      );
    };
  },
  () => ({
    safelist: [
      {
        pattern: /^velvet-/,
      },
    ],
  })
);
