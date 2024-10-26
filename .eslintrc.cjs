import globals from 'globals'
import tseslint from 'typescript-eslint'
import pluginPrettier from 'eslint-plugin-prettier'
import prettierConfig from 'eslint-config-prettier'

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [
       ...tseslint.configs.recommended,
       // 避免和eslint的规则冲突
       prettierConfig
      ],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      prettier: pluginPrettier,
    },
    rules: {
        // 添加后才会在代码中报错提示
      'prettier/prettier': 'error',
      semi: ['error', 'never']
    },
  },
)
