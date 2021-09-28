const response = (body, contentType, cacheControl) => new Response(body, {
    headers: {
        "content-type": 1 === contentType ? "application/json" : "text/html",
        "Cache-Control": 0 === cacheControl ? "max-age=31556952,immutable" : "no-store"
    }
});

const resolves = new Map;

const receiveMessageFromSandboxToServiceWorker = ev => {
    const accessRsp = ev.data;
    const r = resolves.get(accessRsp.$msgId$);
    if (r) {
        resolves.delete(accessRsp.$msgId$);
        clearTimeout(r[1]);
        r[0](accessRsp);
    }
};

const swMessageError = (accessReq, err) => ({
    $winId$: accessReq.$winId$,
    $msgId$: accessReq.$msgId$,
    $tasks$: [],
    $errors$: [ err ]
});

(self => {
    self.oninstall = () => self.skipWaiting();
    self.onactivate = () => self.clients.claim();
    self.onmessage = receiveMessageFromSandboxToServiceWorker;
    self.onfetch = ev => ((self, ev) => {
        const req = ev.request;
        const pathname = new URL(req.url).pathname;
        pathname.endsWith("partytown-sandbox.debug") ? ev.respondWith(response('<!DOCTYPE html><html><head><meta charset="utf-8"><script src="./partytown-sandbox.debug.js"><\/script></head></html>', 0, 1)) : pathname.endsWith("proxytown") && ev.respondWith(((self, req) => new Promise((async resolve => {
            const accessReq = await req.clone().json();
            const responseData = await ((self, accessReq) => new Promise((async resolve => {
                const client = [ ...await self.clients.matchAll() ].sort(((a, b) => a.url > b.url ? -1 : a.url < b.url ? 1 : 0))[0];
                if (client) {
                    const msgResolve = [ resolve, setTimeout((() => {
                        resolves.delete(accessReq.$msgId$);
                        resolve(swMessageError(accessReq, "Timeout"));
                    }), 12e4) ];
                    resolves.set(accessReq.$msgId$, msgResolve);
                    client.postMessage(accessReq);
                } else {
                    resolve(swMessageError(accessReq, "No Party"));
                }
            })))(self, accessReq);
            resolve(response(JSON.stringify(responseData), 1, 1));
        })))(self, req));
    })(self, ev);
})(self);