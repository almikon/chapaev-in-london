module.exports = {
	settings: {
		'react': {
			'version': 'detect'
		}
	},
	env: {
		browser: true,
		es2020: true,
		node: true
	},
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:@typescript-eslint/eslint-recommended',
		'prettier'
	],
	ignorePatterns: ['node_modules/**/*.*',  'dist', '*.test.ts', '*.config.js', '*.config.ts',],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 11,
		sourceType: 'module'
	},
	plugins: [
		'@typescript-eslint',
		'import',
		'prefer-arrow',
	],
	rules: {
		'@typescript-eslint/ban-ts-comment': 1,
		'@typescript-eslint/ban-types': 'off',
		'@typescript-eslint/naming-convention': [
			'error',
			{
				'selector': 'typeLike',
				'format': ['PascalCase']
			},
			{
				'selector': 'interface',
				'format': ['PascalCase'],
				'custom': {
					'regex': '^I[A-Z]',
					'match': false
				}
			}
		],
		'@typescript-eslint/explicit-module-boundary-types': 'off',
		'@typescript-eslint/no-use-before-define': 'off',
		'@typescript-eslint/no-non-null-assertion': 'off',
		'react/prop-types': 'off',
		'object-curly-spacing': ['error', 'always'],
		'func-style': ['error', 'expression'],
		'@typescript-eslint/member-delimiter-style': [
			'error',
			{
				'multiline': {
					'delimiter': 'semi',
					'requireLast': true
				},
				'singleline': {
					'delimiter': 'comma',
					'requireLast': false
				}
			}
		],
		'@typescript-eslint/quotes': [
			'error',
			'single'
		],
		'@typescript-eslint/semi': [
			'error',
			'always'
		],
		'@typescript-eslint/no-explicit-any': 'off',
		'@typescript-eslint/explicit-function-return-type': 'off',
		'curly': 'error',
		'eqeqeq': [
			'error',
			'always'
		],
		'indent': [
			'error',
			'tab',
			{
				'SwitchCase': 1
			}
		],
		'import/no-default-export': 'error',
		'import/order': ['error', {
			'groups': [
				['external', 'builtin'],
				['internal', 'index', 'sibling', 'parent']
			],
			'alphabetize': {
				'order': 'asc', /* sort in ascending order. Options: ["ignore", "asc", "desc"] */
				'caseInsensitive': true /* ignore case. Options: [true, false] */
			}
		}],
		'sort-imports': ['error', { 'ignoreDeclarationSort': true }],
		'linebreak-style': [
			1,
			'windows'
		],
		'no-multiple-empty-lines': ['error', { 'max': 1, 'maxBOF': 1 }],
		'no-bitwise': ['off'],
		'no-debugger': 'error',
		'no-redeclare': 'error',
		'no-trailing-spaces': 'error',
		'no-unused-expressions': 'error',
		'no-var': 'error',
		'prefer-arrow/prefer-arrow-functions': [
			'warn',
			{
				'disallowPrototype': true,
				'singleReturnOnly': false,
				'classPropertiesAllowed': true
			}
		],
		'prefer-const': 'error'
	}
};
