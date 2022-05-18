module.exports = {
  overrides: [
    {
      files       : ['**/*.less'],
      customSyntax: 'postcss-less',
    },
    {
      files       : ['**/*.vue'],
      customSyntax: 'postcss-html',
    },
  ],
  plugins: ['stylelint-order'],
  extends: [
    'stylelint-config-standard',
    'stylelint-config-recess-order',
  ],
  rules: {
    'color-function-notation': 'legacy',
    'function-no-unknown'    : null,
    'selector-class-pattern' : [
      '^[a-z-_0-9]+$', // BEM regex
      {
        message: 'Expected class selector to be kebab-case',
      },
    ],
  },
}
