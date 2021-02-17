const CleanCSS = require('clean-css');
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const pluginTOC = require('eleventy-plugin-nesting-toc');
const imageOptimizations = require('./_11ty/image-dimensions.js');

module.exports = function(config) {
	config.addPassthroughCopy('img');
	config.addPassthroughCopy('fonts');
	config.addPassthroughCopy('sw.js');
	config.addPassthroughCopy('manifest.json');

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
	let options = {
	  html: true,
	  linkify: true,
	  breaks: true
	};
	let markdownLib = markdownIt(options).use(
		markdownItAnchor, 
		markdownItAttrs, {
			leftDelimiter: '{:',
			rightDelimiter: '}',
		}
	);
	
	config.setLibrary("md", markdownLib);

	return {
		dir: { input: './src', output: 'dist', includes: '_includes', data: '_data' },
		passthroughFileCopy: true
	};
};