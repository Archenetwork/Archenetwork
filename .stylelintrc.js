module.exports = {
  extends: [
    "stylelint-config-standard-scss",
    "stylelint-config-html",
    "stylelint-config-standard",
    "stylelint-config-recess-order",
  ],
  rules: {
    'selector-pseudo-class-no-unknown': null,
    'at-rule-no-unknown': null,
    'font-family-no-missing-generic-family-keyword': null,
    // 'at-rule-no-unknown': [
    //   true,
    //   {
    //     ignoreAtRules: [
    //       'content', 'each', 'error', 'extend', 'for', 'function', 'if', 'include', 'mixin', 'return', 'while',
    //     ],
    //   },
    // ],
    'number-leading-zero': 'never',
    'block-no-empty': null,
    'no-empty-source':null,
    'selector-pseudo-element-no-unknown': [
      true,
      {
        ignorePseudoElements: ['v-deep'],
      },
    ],
    'selector-pseudo-class-no-unknown': [
      true,
        { ignorePseudoClasses: ['global']
      }
    ],
    // 'rule-nested-empty-line-before': [ 'never', {
    //   'except': ['first-nested'],
    //   'ignore': ['after-comment']
    // }],
    'comment-empty-line-before': [ 'always', {
      'ignore': ['stylelint-commands']
    }],

    'no-descending-specificity': null,
    'selector-type-no-unknown': null,
    'no-duplicate-selectors': null,
  },
}
