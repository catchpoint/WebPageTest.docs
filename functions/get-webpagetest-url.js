const { ACCESS_TOKEN, SITE_ID } = process.env;
const NetlifyAPI = require('netlify');

exports.handler = async function(event, context) {
    // get latest testId
    const client = new NetlifyAPI(ACCESS_TOKEN);
    //fetch forms
    const forms = await client.listFormSubmissions({
        formId: '60380a33f2d23100079de7ef'
    })
    console.log('FORMS: ' + forms);
    console.log('Latest test: ' + forms[0].data.testURL);

    return {
        statusCode: 302,
        headers: {
            Location: forms[0].data.testURL
        }
    }

}