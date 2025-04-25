import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import nextPlugin from '@next/eslint-plugin-next';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import a11yPlugin from 'eslint-plugin-jsx-a11y';
import importPlugin from 'eslint-plugin-import';

export default tseslint.config(
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
    {
        languageOptions: {
            globals: {
                module: 'readonly',
                require: 'readonly',
                process: 'readonly',
                __dirname: 'readonly',
                __filename: 'readonly',
                exports: 'writable',
                // Add other Node.js globals as needed
            },
        },
        plugins: {
            '@next/next': nextPlugin,
            'react': reactPlugin,
            'react-hooks': reactHooksPlugin,
            'jsx-a11y': a11yPlugin,
            'import': importPlugin,
        },
        rules: {
            // Next.js rules
            '@next/next/no-html-link-for-pages': 'error',
            '@next/next/no-img-element': 'warn',
            '@next/next/no-unwanted-polyfillio': 'warn',

            // React rules
            'react/prop-types': 'off',
            'react/react-in-jsx-scope': 'off',
            'react/jsx-uses-react': 'off',
            'react/jsx-filename-extension': [1, {'extensions': ['.tsx', '.jsx']}],
            'react/function-component-definition': [
                'warn',
                {
                    namedComponents: 'function-declaration',
                    unnamedComponents: 'arrow-function',
                },
            ],
            'react/self-closing-comp': 'warn',
            'react/jsx-sort-props': [
                'warn',
                {
                    callbacksLast: true,
                    shorthandFirst: true,
                    ignoreCase: true,
                    reservedFirst: true,
                },
            ],

            // React Hooks rules
            'react-hooks/rules-of-hooks': 'error',
            'react-hooks/exhaustive-deps': 'warn',

            // Accessibility rules
            'jsx-a11y/alt-text': 'warn',
            'jsx-a11y/aria-role': 'warn',
            'jsx-a11y/anchor-is-valid': [
                'error',
                {
                    components: ['Link'],
                    specialLink: ['hrefLeft', 'hrefRight'],
                    aspects: ['invalidHref', 'preferButton'],
                },
            ],

            // Import rules
            'import/order': [
                'warn',
                {
                    groups: [
                        'builtin',
                        'external',
                        'internal',
                        'parent',
                        'sibling',
                        'index',
                        'object',
                        'type',
                    ],
                    pathGroups: [
                        {
                            pattern: 'react',
                            group: 'builtin',
                            position: 'before',
                        },
                        {
                            pattern: 'next/**',
                            group: 'builtin',
                            position: 'before',
                        },
                        {
                            pattern: '@/**',
                            group: 'internal',
                            position: 'after',
                        },
                    ],
                    pathGroupsExcludedImportTypes: ['react', 'next'],
                    'newlines-between': 'always',
                    alphabetize: {
                        order: 'asc',
                        caseInsensitive: true,
                    },
                },
            ],
            'import/no-duplicates': 'error',

            // TypeScript rules
            '@typescript-eslint/no-unused-vars': ['warn', {
                argsIgnorePattern: '^_',
                varsIgnorePattern: '^_',
            }],
            '@typescript-eslint/explicit-function-return-type': 'off',
            '@typescript-eslint/explicit-module-boundary-types': 'off',
            '@typescript-eslint/ban-ts-comment': 'warn',
            '@typescript-eslint/no-explicit-any': 'warn',
            '@typescript-eslint/no-empty-interface': 'warn',
            '@typescript-eslint/consistent-type-imports': 'warn',

            // General rules
            'no-console': ['warn', {allow: ['warn', 'error', 'info']}],
            'eqeqeq': 'error',
            'prefer-const': 'warn',
            'no-var': 'error',
            'arrow-body-style': ['warn', 'as-needed'],
        },
        settings: {
            'react': {
                'version': 'detect',
            },
            'import/resolver': {
                'typescript': {},
            },
        },
        ignores: [
            'node_modules/',
            '.next/',
            'out/',
            'public/',
            'next.config.js',
            '**/*.config.js',
            '**/*.config.mjs',
        ],
    },
    {
        // Apply overrides for specific files
        files: ['**/*.ts', '**/*.tsx'],
        languageOptions: {
            parserOptions: {
                project: './tsconfig.json',
                ecmaFeatures: {
                    jsx: true,
                },
            },
        },
        rules: {
            // TypeScript-specific rules for .ts/.tsx files
        },
    },
);