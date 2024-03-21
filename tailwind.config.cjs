module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
	  extend: {
		colors: {
		  WGUblue: '#022a4d',
		},
	  },
	},
	plugins: [
		require('@tailwindcss/forms'),
	],
  };
  