export default {
  'src/**/*.ts?(x)': () => 'tsc --noEmit',
  'src/**/*.{ts,tsx}': ['eslint --cache --fix', 'prettier --write'],
  'src/**/*.css': 'prettier --write',
}
