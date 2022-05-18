module.exports = {
  '*.{.ts,.tsx,.vue}': [
    'eslint --fix',
    'git add',
  ],
  '*.{.css,.less,.vue}': [
    'stylelint --fix',
    'git add',
  ],
}
