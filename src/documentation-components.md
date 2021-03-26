---
title: 'Documentation Components'
---
# WebPageTest Documentation Components

To help make it easier to include different content features, callouts, asides and more, the WebPageTest documentation includes a number of different components.

Below we show example markup for each of our key content components.

## Asides
Asides can be used to provide short-form information (2-3 lines, typically) to provide additional context to our readers. 

We have a few different built-in asides.

### Notes
````markdown
::: note
This can provide supplementary information to the body of the document.
:::
````
::: note
This can provide supplementary information to the body of the document.
:::

### Caution
````markdown
::: caution
This can provide information about a common issue or complication so folks can avoid it.
:::
````
::: caution
This can provide information about a common issue or complication so folks can avoid it.
:::

### Warning
````markdown
::: warning
A warning aside tells folks explicitly not to do something.
:::
````
::: warning
A warning aside tells folks explicitly not to do something.
:::

### Key Term
````markdown
::: key-term
A key-term aside can be used to define a term that the reader may not know, but that is essential to understanding what they're reading.
:::
````
::: key-term
A key-term aside can be used to define a term that the reader may not know, but that is essential to understanding what they're reading.
:::

## Code
Code examples are a key part of our documentation, so we want to make it easy to include meanintful code examples.


### Inline code
Use single backticks to create inline code. 

````markdown
You can pass your API key along with tests requests by using the `k` parameter.
````

You can pass your API key along with tests requests by using the `k` parameter.

### Code blocks

Use tripple backticcks to create a code block. Include the language name after the triple backticks to generate syntax highlighting.

````markdown
```html
<img src="lazy-image.png" loading="lazy" alt="" width="300" height="300">
```
````

For code blocks that don't need syntax highlighting (HTTP headers, WPT scripting language examples, etc), set the language to "text".

````markdown
```text
// bring up the login screen
navigate	http://webmail.aol.com

logData	1

// log in
setValue	name=loginId	someuser@aol.com
setValue	name=password	somepassword
submitForm	name=AOLLoginForm
```
````

### Code highlighting
Highlight individual lines of code in a code block by adding a slash and the zero-indexed line number after the language name. For example, here's what `text/6-7` looks like.

```text/6-7
// bring up the login screen
navigate	http://webmail.aol.com

logData	1

// log in
setValue	name=loginId	someuser@aol.com
setValue	name=password	somepassword
submitForm	name=AOLLoginForm
```

Highlighting removed lines can be accomplished by using a double slash. For example, here's `text//3`.

```text//3
// bring up the login screen
navigate	http://webmail.aol.com

logData	1

// log in
setValue	name=loginId	someuser@aol.com
setValue	name=password	somepassword
submitForm	name=AOLLoginForm
```

To show lines that changed, we can use the `language/lineAdded/lineRemoved` pattern. Here's `text/3/4`.

```text/4/3
// bring up the login screen
navigate	http://webmail.aol.com

logData	1
logData 0

// log in
setValue	name=loginId	someuser@aol.com
setValue	name=password	somepassword
submitForm	name=AOLLoginForm
```

### Code Tabs
When we're providing code samples, sometimes we'll need to use multiple languages (for example, showing the JSON and XML responses for the API). For that, we want to provide a tabbed interface so folks can toggle between the examples.


````markdown
::: code-tabs
```json
{
	"statusCode": 200,
	"statusText": "Ok",
	"data": {
		"testId": "210226_DiFK_f46266890a46bb1bff7a59a20ddc339c",
		"jsonUrl": "https://www.webpagetest.org/jsonResult.php?test=210226_DiFK_f46266890a46bb1bff7a59a20ddc339c",
		"xmlUrl": "https://www.webpagetest.org/xmlResult/210226_DiFK_f46266890a46bb1bff7a59a20ddc339c/",
		"userUrl": "https://www.webpagetest.org/result/210226_DiFK_f46266890a46bb1bff7a59a20ddc339c/",
		"summaryCSV": "https://www.webpagetest.org/result/210226_DiFK_f46266890a46bb1bff7a59a20ddc339c/page_data.csv",
		"detailCSV": "https://www.webpagetest.org/result/210226_DiFK_f46266890a46bb1bff7a59a20ddc339c/requests.csv"
	}
}
```

```xml
<response>
	<statusCode>200</statusCode>
	<statusText>Ok</statusText>
	<data>
		<testId>210226_DiFK_f46266890a46bb1bff7a59a20ddc339c</testId>
		<xmlUrl>https://www.webpagetest.org/xmlResult/210226_DiFK_f46266890a46bb1bff7a59a20ddc339c/</xmlUrl>
		<userUrl>https://www.webpagetest.org/result/210226_DiFK_f46266890a46bb1bff7a59a20ddc339c/</userUrl>
		<summaryCSV>https://www.webpagetest.org/result/210226_DiFK_f46266890a46bb1bff7a59a20ddc339c/page_data.csv</summaryCSV>
		<detailCSV>https://www.webpagetest.org/result/210226_DiFK_f46266890a46bb1bff7a59a20ddc339c/requests.csv</detailCSV>
		<jsonUrl>https://www.webpagetest.org/jsonResult.php?test=210226_DiFK_f46266890a46bb1bff7a59a20ddc339c</jsonUrl>
	</data>
</response>
```
:::
````
::: code-tabs
```json
{
	"statusCode": 200,
	"statusText": "Ok",
	"data": {
		"testId": "210226_DiFK_f46266890a46bb1bff7a59a20ddc339c",
		"jsonUrl": "https://www.webpagetest.org/jsonResult.php?test=210226_DiFK_f46266890a46bb1bff7a59a20ddc339c",
		"xmlUrl": "https://www.webpagetest.org/xmlResult/210226_DiFK_f46266890a46bb1bff7a59a20ddc339c/",
		"userUrl": "https://www.webpagetest.org/result/210226_DiFK_f46266890a46bb1bff7a59a20ddc339c/",
		"summaryCSV": "https://www.webpagetest.org/result/210226_DiFK_f46266890a46bb1bff7a59a20ddc339c/page_data.csv",
		"detailCSV": "https://www.webpagetest.org/result/210226_DiFK_f46266890a46bb1bff7a59a20ddc339c/requests.csv"
	}
}
```

```xml
<response>
	<statusCode>200</statusCode>
	<statusText>Ok</statusText>
	<data>
		<testId>210226_DiFK_f46266890a46bb1bff7a59a20ddc339c</testId>
		<xmlUrl>https://www.webpagetest.org/xmlResult/210226_DiFK_f46266890a46bb1bff7a59a20ddc339c/</xmlUrl>
		<userUrl>https://www.webpagetest.org/result/210226_DiFK_f46266890a46bb1bff7a59a20ddc339c/</userUrl>
		<summaryCSV>https://www.webpagetest.org/result/210226_DiFK_f46266890a46bb1bff7a59a20ddc339c/page_data.csv</summaryCSV>
		<detailCSV>https://www.webpagetest.org/result/210226_DiFK_f46266890a46bb1bff7a59a20ddc339c/requests.csv</detailCSV>
		<jsonUrl>https://www.webpagetest.org/jsonResult.php?test=210226_DiFK_f46266890a46bb1bff7a59a20ddc339c</jsonUrl>
	</data>
</response>
```
:::

## Lists

### API List
To list out the parameters of an API response, or the properties of a response object, we can use the `api-list` component.

````markdown
::: api-list
- `statusCode` (int)  
The HTTP response status code for the submission. A 200 code indicates a succesful submission. Any errors will result in a status code of 400.
- `statusCode` (int)  
The HTTP response status code for the submission. A 200 code indicates a succesful submission. Any errors will result in a status code of 400.
- `statusCode` (int)  
The HTTP response status code for the submission. A 200 code indicates a succesful submission. Any errors will result in a status code of 400.
:::
````
::: api-list
- `statusCode` (int)  
The HTTP response status code for the submission. A 200 code indicates a succesful submission. Any errors will result in a status code of 400.
- `statusCode` (int)  
The HTTP response status code for the submission. A 200 code indicates a succesful submission. Any errors will result in a status code of 400.
- `statusCode` (int)  
The HTTP response status code for the submission. A 200 code indicates a succesful submission. Any errors will result in a status code of 400.
:::

## Tables
We use regular markdown syntax for tables.

````markdown
| Status Code | Description                    |
|-------------|--------------------------------|
| 100         | Test started                   |
| 101         | Test is in the queue           |
| 102         | The test server is unreachable |
| 200         | The test is complete           |
| 400         | A test with the `testId` passed was not found |
| 401         | The `testId` is valid, but no test was found in the work queue |
| 402         | The test with the `testId` passed was cancelled |
````
| Status Code | Description                    |
|-------------|--------------------------------|
| 100         | Test started                   |
| 101         | Test is in the queue           |
| 102         | The test server is unreachable |
| 200         | The test is complete           |
| 400         | A test with the `testId` passed was not found |
| 401         | The `testId` is valid, but no test was found in the work queue |
| 402         | The test with the `testId` passed was cancelled |

To left-align the values in a column, add a colon (`:`) to the start of the head divider for that column.

````markdown
| Status Code | Description                    |
|-------------|:--------------------------------|
| 100         | Test started                   |
| 101         | Test is in the queue           |
| 102         | The test server is unreachable |
| 200         | The test is complete           |
| 400         | A test with the `testId` passed was not found |
| 401         | The `testId` is valid, but no test was found in the work queue |
| 402         | The test with the `testId` passed was cancelled |
````
| Status Code | Description                    |
|-------------|--------------------------------|
| 100         | Test started                   |
| 101         | Test is in the queue           |
| 102         | The test server is unreachable |
| 200         | The test is complete           |
| 400         | A test with the `testId` passed was not found |
| 401         | The `testId` is valid, but no test was found in the work queue |
| 402         | The test with the `testId` passed was cancelled |

To right-align the values in a column, add a color (`:`) to the end of the head divider for that column.

````markdown
| Status Code | Description                    |
|-------------|-------------------------------:|
| 100         | Test started                   |
| 101         | Test is in the queue           |
| 102         | The test server is unreachable |
| 200         | The test is complete           |
| 400         | A test with the `testId` passed was not found |
| 401         | The `testId` is valid, but no test was found in the work queue |
| 402         | The test with the `testId` passed was cancelled |
````
| Status Code | Description                    |
|-------------|-------------------------------:|
| 100         | Test started                   |
| 101         | Test is in the queue           |
| 102         | The test server is unreachable |
| 200         | The test is complete           |
| 400         | A test with the `testId` passed was not found |
| 401         | The `testId` is valid, but no test was found in the work queue |
| 402         | The test with the `testId` passed was cancelled |