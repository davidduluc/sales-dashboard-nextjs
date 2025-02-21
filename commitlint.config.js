module.exports = {
	extends: ['@commitlint/config-conventional'],
	rules: {
		'type-enum': [2, 'always', ['feat', 'fix', 'docs', 'style', 'refactor', 'test', 'chore']],
		'type-case': [2, 'always', 'lower-case'],
		'subject-case': [2, 'always', 'sentence-case'],
		'subject-empty': [2, 'never'],
		'subject-full-stop': [2, 'never', '.'],
		'body-leading-blank': [2, 'always'],
		'body-max-line-length': [2, 'always', 100],
	},
};
