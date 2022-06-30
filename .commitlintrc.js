/**
 * 具体配置参考文档
 * https://commitlint.js.org/#/reference-rules
 */

module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // 指定commit-message的开头只能是这些
    // 2表示报错， 1表示警告，0表示不限制
    'type-enum': [
      2,
      'always',
      [
        'feature',
        'update',
        'fixbug',
        'refactor',
        'optimize',
        'style',
        'docs',
        'chore',
      ],
    ],
    // 同理
    'type-case': [0],
    'scope-empty': [0],
    'scope-case': [0],
    'subject-full-stop': [0, 'never'],
    'subject-case': [0, 'never'],
    'header-max-length': [0, 'always', 72],
  },
}
