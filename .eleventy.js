const CleanCSS = require('clean-css');
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const pluginTOC = require('eleventy-plugin-nesting-toc');
const imageOptimizations = require('./_11ty/image-dimensions.js');

module.exports = function(config) {
	config.addPassthroughCopy('src/img');
	config.addPassthroughCopy('src/manifest.json');

	config.addPlugin(pluginTOC, {tags: ['h2']});
	config.addPlugin(syntaxHighlight);
	config.addPlugin(imageOptimizations);
	config.addPlugin(eleventyNavigationPlugin);
	config.addFilter('cssmin', function(code) {
		return new CleanCSS({}).minify(code).styles;
	});
	const { minify } = require("terser");
	config.addNunjucksAsyncFilter("jsmin", async function (
		code,
		callback
	  ) {
		try {
		  const minified = await minify(code);
		  callback(null, minified.code);
		} catch (err) {
		  console.error("Terser error: ", err);
		  // Fail gracefully.
		  callback(null, code);
		}
	  });

	let markdownIt = require("markdown-it");
	const markdownItAnchor = require('markdown-it-anchor');
	const markdownItAttrs = require('markdown-it-attrs');
	const markdownItDefList = require("markdown-it-deflist");
	const markdownItContainer = require("markdown-it-container");
	let options = {
	  html: true,
	  linkify: true,
	  breaks: true
	};
	let markdownLib = markdownIt(options)
		.use(markdownItAnchor)
		.use(markdownItAttrs, {
			leftDelimiter: '{:',
			rightDelimiter: '}',
		})
		.use(markdownItContainer,'', {
			validate: () => true,
			render: (tokens, idx) => {
				if (tokens[idx].nesting === 1) {
					const classList = tokens[idx].info.trim()
					return `<div ${classList && `class="${classList}"`}>`;
				} else {
					return `</div>`;
				}
			}
		});
	config.addNunjucksAsyncFilter('markdown', async function (
		code,
		callback
	) {
		try {
			console.log(code);
		  const converted = markdownLib.render(code);
		  
		  callback(null, converted);
		} catch (err) {
		  console.error("Terser error: ", err);
		  // Fail gracefully.
		  callback(null, code);
		}
	  });

	config.setLibrary("md", markdownLib);

	return {
		dir: { input: './src', output: 'dist', includes: '_includes', data: '_data' },
		passthroughFileCopy: true
	};
};