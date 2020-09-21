# Request-level metrics
Not currently exposed in the JSON but captured by the agent is the timestamp and duration of all JS execution (eval, function calls, etc) for each Javascript request.

## Request Details
* **method** - HTTP method (GET, POST, etc)
* **full_url** - Full URL for the request
* **host** - Hostname for the request
* **url** - Path of the request
* **is_secure** - 1 for https, 0 for http
* **responseCode** - Response code
* **ip_addr** - Server IP address
* **server_port** - TCP server port connected to for the connection
* **client_port** - TCP port on the client used for the connection (to aid in tcpdump inspection)
* **cdn_provider** - Detected CDN for the origin
* **documentURL** - URL of the Document context that originated the request (iFrames, service worker, etc)
* **frame_id** - Frame ID that the request belongs to
* **is_base_page** - true if this is in the chain of requests for the base page
* **final_base_page** - true if this is the final base page request
* **initiator** - Initiator URL for what triggered the request
* **initiator_line** - Line of code in the initiator file that triggered the request
* **initiator_column** - Column of the row in the initiator file 
* **initiator_type** - Initiator type
* **priority** - Networking stack priority associated with the request when it was first sent (does not include reprioritizations)
* **initial_priority** - Renderer priority associated with the request when it was first sent (does not include reprioritizations)
* **id** - Unique Request ID within this page data
* **index** - Ordered index of this request (0+)
* **number** - Ordered index of this request (1+)
* **raw_id** - Unprocessed request ID
* **request_id** - Processed Request ID
* **server_rtt** - Estimated RTT to the server for this request
* **socket** - Connection ID that was used for this request

## Request Timings
-1 (or missing) indicates a timing is N/A
* **created** - Timestamp when the browser first created the request
* **all_start** - Timestamp of the start of the request
* **all_end** - Timestamp of the end of the request
* **all_ms** - Full duration of the request
* **dns_start** - Timestamp of the start of the DNS lookup
* **dns_end** - Timestamp of the end of the DNS lookup
* **dns_ms** - Duration of the DNS lookup
* **connect_start** - Timestamp of the start of the socket connect
* **connect_end** - Timestamp of the end of the socket connect
* **connect_ms** - Duration of the socket connect
* **ssl_start** - Timestamp of the start of TLS negotiation
* **ssl_end** - Timestamp of the end of TLS negotiation
* **ssl_ms** - Duration of the TLS negotiation
* **ttfb_start** - Timestamp of when the request was sent
* **ttfb_end** - Timestamp of the first byte of the response
* **ttfb_ms** - Duration of the first byte
* **load_start** - Timestamp of the start of the request
* **load_start_float** - Timestamp of the start of the request (with microseconds - for sorting)
* **load_end** - Timestamp of the end of the request
* **load_ms** - Duration of the request/response
* **download_start** - Timestamp of the start of the response
* **download_end** - Timestamp of the end of the response
* **download_ms** - Duration to receive the response

## Request Stats
* **bytesIn** - Size of the response data
* **bytesOut** - Size of the request data
* **objectSize** - Wire size of the response object
* **objectSizeUncompressed** - Uncompressed size of the response object

# Headers
* **headers** - Raw request and response headers
* **cacheControl** - Response cache-control header value
* **cache_time** - Calculated cache time (if any)
* **contentEncoding** - Response content-encoding header value
* **contentType** - Response content-type header value
* **expires** - Response expires header value

## Protocol Information
* **protocol** - Protocol used
* **http2_stream_id** - HTTP/2 Stream ID
* **http2_stream_dependency** - HTTP/2 Stream Dependency
* **http2_stream_exclusive** - HTTP/2 stream exclusive flag
* **http2_stream_weight** - HTTP/2 stream weight
* **certificates** - Raw certificates received from server during TLS negotiation
* **http2_server_settings** - List of server-specified HTTP/2 options (concurrent stream count)
* **securityDetails** - Details about the TLS negotiation (TLS protocol, SAN list, Ciphers, certificate details)
* **tls_cipher_suite** - Negotiated TLS cipher suite
* **tls_next_proto** - Advertised next-protocol
* **tls_resumed** - If a TLS session was resumed
* **tls_version** - TLS version used

## Javascript/CPU details
* **cpu.\*** - Time spent on the main thread for each category of dev tools event
* **cpuTimes** - Time spent on the main thread for each category of dev tools event

## Optimization Checks
-1 designates N/A
* **score_cache** - Score for caching of static content (0-100)
* **score_cdn** - Score for using a CDN for static content (0-100)
* **score_compress** - Score for properly compressing a JPEG image (0-100)
* **image_save** - Bytes saved by properly compressing this lossy image
* **image_total** - Original image size
* **score_gzip** - Score for properly compressing this text resource (0-100)
* **gzip_save** - Bytes saved by properly compressing this text response
* **gzip_total** - Original wire-size of the response
* **score_keep-alive** - Score for properly using keep-alive on the connection that served this response
* **score_etags** - (deprecated)
* **score_cookies** - (deprecated)
* **score_combine** - (deprecated)
* **score_minify** - (deprecated)
* **minify_save** - (deprecated)
* **minify_total** - (deprecated)

## Misc
* **chunks** - Time and size of each data chunk received
* **font_details** - Decoded details of font files (details of all of the tables)
* **jpeg_scan_count** - Number of scans for JPEG images