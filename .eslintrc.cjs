module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'off',
      { allowConstantExport: true },
    ],
    '@typescript-eslint/no-unused-vars': 'warn',
    'quotes': [
      'error',
      'double'
    ],
    'semi': [
      'error',
      'always'
    ]
  },
}

// module.exports = {
//     root: true,
//     env: { browser: true, es2020: true },
//     extends: [
//         'eslint:recommended',
//         'plugin:@typescript-eslint/recommended',
//         'plugin:react-hooks/recommended',
//         'plugin:prettier/recommended',
//     ],
//     ignorePatterns: ['dist', '.eslintrc.cjs'],
//     parser: '@typescript-eslint/parser',
//     plugins: [
//         'react-refresh',
//         '@typescript-eslint',
//         'eslint-plugin-react',
//         'eslint-plugin-jsx-a11y',
//     ],
//     rules: {
//         'react-refresh/only-export-components': [
//             'off',
//             { allowConstantExport: true },
//         ],
//         quotes: ['error', 'double'],
//         semi: ['error', 'always'],
//         'no-multi-spaces': 'error',
//         'no-unused-vars': 'error',
//         'no-console': 'warn',
//         'no-debugger': 'warn',
//         'react/jsx-pascal-case': [2 , { allowAllCaps: false, allowNamespace: true, allowLeadingUnderscore: false }],
//         'react/jsx-filename-extension': [1, { 'extensions': ['.tsx'] }],
//         'react/jsx-closing-bracket-location': [1 , 'tag-aligned'],
//         'react/jsx-boolean-value': [1, 'never'],
//         'react/no-array-index-key': 'warn',
//         'react/self-closing-comp': 'warn',
//         'react/jsx-wrap-multilines': [1, {
//             'declaration': 'parens-new-line',
//             'assignment': 'parens-new-line',
//             'return': 'parens-new-line',
//             'arrow': 'parens-new-line',
//             'condition': 'parens-new-line',
//             'logical': 'parens-new-line',
//             'prop': 'parens-new-line',
//         }],
//         'react/jsx-tag-spacing': [1, {
//             'closingSlash': 'never',
//             'beforeSelfClosing': 'always',
//             'afterOpening': 'never',
//             'beforeClosing': 'never',
//         }],
//         'jsx-a11y/alt-text': [2, {
//             'elements': [ 'img', 'object', 'area', 'input[type=\"image\"]' ],
//             'img': ['Image'],
//             'object': ['Object'],
//             'area': ['Area'],
//             'input[type=\"image\"]': ['InputImage']
//         }],
//         'jsx-a11y/img-redundant-alt': [2, {
//             'components': ['Image'],
//             'words': ['Image', 'Photo', 'Picture' ]
//         }],
//     },
// }
