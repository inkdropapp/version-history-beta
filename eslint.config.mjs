import globals from 'globals'
import eslintJs from '@eslint/js'
import prettier from 'eslint-config-prettier'

export default [
  eslintJs.configs.recommended,
  prettier,
  {
    languageOptions: {
      globals: {
        ...globals.node
      }
    },
    rules: {
      'no-useless-escape': 0,
      'prefer-const': 2,
      'no-unused-vars': 0
    }
  }
]
