const WebPageTest = require('webpagetest');
const { WPT_API_KEY, COMMIT_REF, URL } = process.env;

exports.handler = function(event, context) {
    const wpt = new WebPageTest('https://www.webpagetest.org', WPT_API_KEY);

    let opts = {
        "firstViewOnly": true,
        "runs": 3,
        "location": "Dulles:Chrome",
        "label": 'Netlify Deploy ' + COMMIT_REF
    }

    console.log('Running WPT....');

    wpt.runTest(URL, opts, (err, result) => {
        if (result && result.data) {
            //looking good, let's get our test URL
            let testURL = result.data.userUrl;
            console.log('Test URL: ' + testURL);
            
            let payload = {
                "form-name": "webpagetest-test",
                "testURL": testURL
            };
            console.log("Payload....");
            console.log(payload);

            fetch(URL, {method: "POST", body: JSON.stringify(payload)})
                .then((response) => console.log("submission succeeded"))
                .catch(err => {
                    msg = "Submission failed: " + err;
                    console.log(msg);
                });

            return console.log('Complete');
        } else {
            
        }
    });
}