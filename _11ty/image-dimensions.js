const { JSDOM } = require('jsdom');
const { promisify } = require('util');
const sizeOf = promisify(require('image-size'));

const processImages = async (img, outputPath) => {
    let src = img.getAttribute('src');

    // Don't apply to remote images
    if (/^(https?\:\/\/|\/\/)/i.test(src)) {
        return;
    }

    if (/^\.+\//.test(src)) {
        //Local image so resolve our relative path
        src =
            "/" +
            path.relative("./", path.resolve(path.dirname(outputPath), src));
        if (path.sep == "\\") {
            src = src.replace(/\\/g, "/");
        }
    }

    let dimensions;
    try {
        // Check for image size
        dimensions = await sizeOf("./" + src);
    } catch (e) {
        console.warn(e.message, src);
        return;
    }
    if (!img.getAttribute("width")) {
        // Image doesn't already have a width, so let's apply height and width 
        // to avoid CLS issues
        img.setAttribute("width", dimensions.width);
        img.setAttribute("height", dimensions.height);
    }
}

const imageDimensions = async (rawContent, outputPath) => {
    let content = rawContent;

    // Only apply this transformation to HTML outputs
    if (outputPath && outputPath.endsWith('.html')) {
        const dom = new JSDOM(content);
        // Grab all the images in the page
        const images = [...dom.window.document.querySelectorAll('img')];

        if (images.length > 0) {
            // send images to be processed and then generate new content
            await Promise.all(images.map((i) => processImages(i, outputPath)));
            content = dom.serialize();
        }
    }

    return content;
}

module.exports = {
    initArguments: {},
    configFunction: async (eleventyConfig, pluginOptions = {}) => {
        eleventyConfig.addTransform("imageDimensions", imageDimensions);
    }
}