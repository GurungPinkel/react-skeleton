module.exports = {
  globals: {
    JSX: true
  },
  env: {
    browser: true,
    es2021: true,
    jest: true
  },
  extends: ['plugin:react/recommended', 'airbnb', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  settings: {
    react: { version: 'detect' },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.d.ts']
      }
    }
  },
  plugins: ['react', '@typescript-eslint', 'react-hooks'],
  rules: {
    // always require curly
    curly: ['error', 'all'],
    /* 
      Allow import fromd devDependencies for webpack configs and unit tests
      https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-extraneous-dependencies.md
    */
    'import/no-extraneous-dependencies': [
      'error',
      { devDependencies: ['webpack/**/*.js', '**/*.test.tsx', '**/*.test.ts'] }
    ],

    // we dont want to necessarily always have default export.
    'import/prefer-default-export': 'off',
    // https://reactjs.org/docs/hooks-rules.html#eslint-plugin
    'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
    'react-hooks/exhaustive-deps': 'warn', // Checks effect dependencies
    // note you must disable the base rule as it can report incorrect errors. (https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-use-before-define.md#how-to-use)
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],
    // allow jsx in tsx. (https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-filename-extension.md)
    'react/jsx-filename-extension': ['warn', { extensions: ['.tsx'] }],
    // Overriding this rule because airbnb eslint rules does not support extension for typescript. (https://github.com/airbnb/javascript/blob/366bfa66380c08304101c6add46355696e90b348/packages/eslint-config-airbnb-base/rules/imports.js#L14)
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never'
      }
    ],
    // https://github.com/microsoft/TypeScript/issues/41882#issuecomment-849849503
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    // use @typescript-eslint/no-unused-vars instead of no-unused-vars
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error'],
    // https://stackoverflow.com/questions/63961803/eslint-says-all-enums-in-typescript-app-are-already-declared-in-the-upper-scope
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error'],
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/function-component-definition.md
    'react/function-component-definition': [
      'error',
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function'
      }
    ],
    'react/prop-types': 'off', // Since we do not use prop-types
    'react/require-default-props': 'off', // Since we do not use prop-types
    'react/jsx-props-no-spreading': 'off', // Allow jsx props spread
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: 'block-like', next: 'block-like' },
      { blankLine: 'always', prev: '*', next: 'return' },
      { blankLine: 'always', prev: '*', next: ['const', 'let', 'var'] },
      { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
      { blankLine: 'any', prev: ['const', 'let', 'var'], next: ['const', 'let', 'var'] }
    ]
  }
};
