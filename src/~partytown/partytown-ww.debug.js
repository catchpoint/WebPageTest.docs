(self => {
    const taskQueue = {};
    const WinIdKey = Symbol();
    const InstanceIdKey = Symbol();
    const InterfaceTypeKey = Symbol();
    const NodeNameKey = Symbol();
    const ProxyKey = Symbol();
    const ImmediateSettersKey = Symbol();
    const webWorkerRefsByRefId = {};
    const webWorkerRefIdsByRef = new WeakMap;
    const webWorkerState = {};
    const webWorkerCtx = {};
    const toLower = str => str.toLowerCase();
    const toUpper = str => str.toUpperCase();
    const logWorker = msg => {
        try {
            if (webWorkerCtx.$config$.logStackTraces) {
                const frames = (new Error).stack.split("\n");
                const i = frames.findIndex((f => f.includes("logWorker")));
                msg += "\n" + frames.slice(i + 1).join("\n");
            }
            console.debug.apply(console, [ `%c${self.name}`, "background: #3498db; color: white; padding: 2px 3px; border-radius: 2px; font-size: 0.8em;", msg ]);
        } catch (e) {}
    };
    const logWorkerGetter = (target, memberPath, rtn, isCached) => {
        if (webWorkerCtx.$config$.logGetters) {
            try {
                if (target && target[WinIdKey] !== webWorkerCtx.$winId$) {
                    return;
                }
                logWorker(`Get ${logTargetProp(target, memberPath)}, returned: ${logValue(memberPath, rtn)}${isCached ? " (cached)" : ""}`);
            } catch (e) {}
        }
    };
    const logWorkerSetter = (target, memberPath, value) => {
        if (webWorkerCtx.$config$.logSetters) {
            try {
                if (target && target[WinIdKey] !== webWorkerCtx.$winId$) {
                    return;
                }
                logWorker(`Set ${logTargetProp(target, memberPath)}, value: ${logValue(memberPath, value)}`);
            } catch (e) {}
        }
    };
    const logTargetProp = (target, memberPath) => {
        let n = "";
        if (target) {
            const instanceId = target[InstanceIdKey];
            n = 0 === instanceId ? "window." : 4 === instanceId ? "document." : 5 === instanceId ? "document.documentElement." : 6 === instanceId ? "document.head." : 7 === instanceId ? "document.body." : 1 === instanceId ? "history." : 2 === instanceId ? "localStorage." : 3 === instanceId ? "sessionStorage." : 1 === target.nodeType ? toLower(target.nodeName) + "." : 3 === target[InterfaceTypeKey] ? "node." : 1 === target[InterfaceTypeKey] && target[NodeNameKey] ? `<${toLower(target[NodeNameKey])}>` : "¯\\_(ツ)_/¯";
        }
        return n + memberPath.join(".");
    };
    const logValue = (memberPath, v) => {
        const type = typeof v;
        if ("boolean" === type || "number" === type || null == v) {
            return JSON.stringify(v);
        }
        if ("string" === type) {
            return memberPath.includes("cookie") ? JSON.stringify(v.substr(0, 10) + "...") : JSON.stringify(v);
        }
        if (Array.isArray(v)) {
            return `[${v.map(logValue).join(", ")}]`;
        }
        if ("object" === type) {
            const instanceId = v[InstanceIdKey];
            return "number" == typeof instanceId ? 7 === instanceId ? "<body>" : 4 === instanceId ? "#document" : 5 === instanceId ? "<html>" : 6 === instanceId ? "<head>" : 2 === instanceId ? "[localStorage]" : 3 === instanceId ? "[sessionStorage]" : 0 === instanceId ? "[window]" : 3 === v[InterfaceTypeKey] ? "#text" : 1 === v[InterfaceTypeKey] && v[NodeNameKey] ? `<${toLower(v[NodeNameKey])}>` : "unknown instance obj" : v[Symbol.iterator] ? `[${Array.from(v).map((i => logValue(memberPath, i))).join(", ")}]` : "value" in v ? JSON.stringify(v.value) : JSON.stringify(v);
        }
        return (v => "object" == typeof v && v && v.then)(v) ? "Promise" : "function" === type ? `ƒ() ${v.name || ""}`.trim() : `¯\\_(ツ)_/¯ ${String(v)}`.trim();
    };
    const len = obj => obj.length;
    const nextTick = (cb, ms) => setTimeout(cb, ms);
    const EMPTY_ARRAY = [];
    const PT_SCRIPT = '<script src="/~partytown/partytown.debug.js" async defer><\/script>';
    const randomId = () => Math.round(9999999999 * Math.random() + 7);
    const getInstanceStateValue = (instance, stateKey) => getStateValue(instance[InstanceIdKey], stateKey);
    const getStateValue = (instanceId, stateKey, stateRecord) => (stateRecord = webWorkerState[instanceId]) ? stateRecord[stateKey] : void 0;
    const setInstanceStateValue = (instance, stateKey, stateValue) => setStateValue(instance[InstanceIdKey], stateKey, stateValue);
    const setStateValue = (instanceId, stateKey, stateValue, stateRecord) => {
        (stateRecord = webWorkerState[instanceId] || {})[stateKey] = stateValue;
        webWorkerState[instanceId] = stateRecord;
    };
    const setWorkerRef = (ref, refId) => {
        if (!(refId = webWorkerRefIdsByRef.get(ref))) {
            webWorkerRefIdsByRef.set(ref, refId = randomId());
            webWorkerRefsByRefId[refId] = ref;
        }
        return refId;
    };
    const runStateHandlers = (instanceId, handlerType, handlers) => {
        (handlers = getStateValue(instanceId, handlerType)) && nextTick((() => handlers.map((cb => cb({
            type: "error" === handlerType ? "error" : "load"
        })))));
        return !!handlers;
    };
    const setCurrentScript = (instanceId, src) => {
        webWorkerCtx.$currentScriptId$ = instanceId;
        webWorkerCtx.$currentScriptUrl$ = src;
    };
    const resolveUrl = url => new URL(url || "", webWorkerCtx.$location$ + "");
    const getUrl = elm => resolveUrl(getInstanceStateValue(elm, "href"));
    const sendBeacon = (url, data) => {
        if (webWorkerCtx.$config$.logSendBeaconRequests) {
            try {
                logWorker(`sendBeacon: ${resolveUrl(url)}${data ? ", data: " + JSON.stringify(data) : ""}`);
            } catch (e) {
                console.error(e);
            }
        }
        try {
            fetch(url, {
                method: "POST",
                mode: "no-cors",
                keepalive: !0
            });
            return !0;
        } catch (e) {
            console.error(e);
            return !1;
        }
    };
    class WorkerInstance {
        constructor(interfaceType, instanceId, winId, nodeName) {
            this[WinIdKey] = winId || webWorkerCtx.$winId$;
            this[InstanceIdKey] = instanceId;
            this[NodeNameKey] = nodeName;
            this[ImmediateSettersKey] = void 0;
            return proxy(this[InterfaceTypeKey] = interfaceType, this, []);
        }
    }
    class WorkerNode extends WorkerInstance {
        appendChild(node) {
            return this.insertBefore(node, null);
        }
        get ownerDocument() {
            return document;
        }
        get href() {}
        set href(_) {}
        insertBefore(newNode, referenceNode) {
            applyBeforeSyncSetters(this[WinIdKey], newNode);
            "IFRAME" === (newNode = callMethod(this, [ "insertBefore" ], [ newNode, referenceNode ], EMPTY_ARRAY))[NodeNameKey] ? (iframe => {
                let handlersType = getInstanceStateValue(iframe, 1) ? "load" : "error";
                let handlers = getInstanceStateValue(iframe, handlersType);
                handlers && handlers.forEach((handler => handler({
                    type: "load"
                })));
            })(newNode) : "SCRIPT" === newNode[NodeNameKey] && webWorkerCtx.$postMessage$([ 3 ]);
            return newNode;
        }
        get nodeName() {
            return this[NodeNameKey];
        }
        get nodeType() {
            return this[InterfaceTypeKey];
        }
    }
    class WorkerNodeList {
        constructor(workerNodes) {
            (this._ = workerNodes).forEach(((node, index) => this[index] = node));
        }
        entries() {
            return this._.entries();
        }
        forEach(cb, thisArg) {
            this._.forEach(cb, thisArg);
        }
        item(index) {
            return this[index];
        }
        keys() {
            return this._.keys();
        }
        get length() {
            return len(this._);
        }
        values() {
            return this._.values();
        }
        [Symbol.iterator]() {
            return this._[Symbol.iterator]();
        }
    }
    class WorkerElement extends WorkerNode {
        get localName() {
            return toLower(this.nodeName);
        }
        get tagName() {
            return this.nodeName;
        }
    }
    class WorkerSrcElement extends WorkerElement {
        addEventListener(...args) {
            let eventName = args[0];
            let callbacks = getInstanceStateValue(this, eventName) || [];
            callbacks.push(args[1]);
            setInstanceStateValue(this, eventName, callbacks);
        }
        get async() {
            return !0;
        }
        set async(_) {}
        get defer() {
            return !0;
        }
        set defer(_) {}
        get onload() {
            let callbacks = getInstanceStateValue(this, "load");
            return callbacks && callbacks[0] || null;
        }
        set onload(cb) {
            setInstanceStateValue(this, "load", cb ? [ cb ] : null);
        }
        get onerror() {
            let callbacks = getInstanceStateValue(this, "error");
            return callbacks && callbacks[0] || null;
        }
        set onerror(cb) {
            setInstanceStateValue(this, "error", cb ? [ cb ] : null);
        }
    }
    class WorkerAnchorElement extends WorkerElement {
        get hash() {
            return getUrl(this).hash;
        }
        get host() {
            return getUrl(this).host;
        }
        get hostname() {
            return getUrl(this).hostname;
        }
        get href() {
            return getUrl(this) + "";
        }
        set href(href) {
            setInstanceStateValue(this, "href", href);
            setter(this, [ "href" ], href);
        }
        get origin() {
            return getUrl(this).origin;
        }
        get pathname() {
            return getUrl(this).pathname;
        }
        get port() {
            return getUrl(this).port;
        }
        get protocol() {
            return getUrl(this).protocol;
        }
        get search() {
            return getUrl(this).search;
        }
    }
    class WorkerLocation extends URL {
        assign() {}
        reload() {}
        replace() {}
    }
    class WorkerIFrameElement extends WorkerSrcElement {
        get contentDocument() {
            return this.contentWindow.document;
        }
        get contentWindow() {
            let win;
            let winId = getInstanceStateValue(this, 2);
            if (!winId) {
                winId = getter(this, [ "partyWinId" ]);
                setInstanceStateValue(this, 2, winId);
            }
            win = new WorkerContentWindow(0, 0, winId);
            win.location = this.src;
            return win;
        }
        get src() {
            return getInstanceStateValue(this, 3) || "";
        }
        set src(url) {
            let xhr = new XMLHttpRequest;
            let iframeContent;
            let isSuccessfulLoad;
            url = resolveUrl(url) + "";
            if (this.src !== url) {
                setInstanceStateValue(this, 3, url);
                xhr.open("GET", url, !1);
                xhr.send();
                isSuccessfulLoad = xhr.status > 199 && xhr.status < 300;
                setInstanceStateValue(this, 1, isSuccessfulLoad);
                if (isSuccessfulLoad) {
                    iframeContent = ((url, html) => `<base href="${url}">` + html.replace(/<script>/g, '<script type="text/partytown">').replace(/<script /g, '<script type="text/partytown" ').replace(/text\/javascript/g, "text/partytown") + PT_SCRIPT)(url, xhr.responseText);
                    this[ImmediateSettersKey] ? this[ImmediateSettersKey].push([ [ "srcdoc" ], serializeForMain(iframeContent) ]) : setter(this, [ "srcdoc" ], iframeContent);
                }
            }
        }
    }
    class WorkerContentWindow extends WorkerInstance {
        get document() {
            return constructInstance(9, 4, this[WinIdKey]);
        }
        get location() {
            let location = getInstanceStateValue(this, 3);
            location || setInstanceStateValue(this, 3, location = new WorkerLocation("about:blank"));
            return location;
        }
        set location(url) {
            this.location.href = url && "" !== url ? url : "about:blank";
        }
        get parent() {
            return constructInstance(0, 0, webWorkerCtx.$parentWinId$);
        }
        get self() {
            return this;
        }
        get top() {
            return top;
        }
        get window() {
            return this;
        }
    }
    class WorkerDocument extends WorkerElement {
        get body() {
            return constructInstance(1, 7, this[WinIdKey], "BODY");
        }
        get compatMode() {
            return webWorkerCtx.$documentCompatMode$;
        }
        get cookie() {
            logWorkerGetter(this, [ "cookie" ], webWorkerCtx.$documentCookie$, !0);
            return webWorkerCtx.$documentCookie$;
        }
        set cookie(cookie) {
            setter(this, [ "cookie" ], webWorkerCtx.$documentCookie$ = cookie);
        }
        createElement(tagName) {
            tagName = toUpper(tagName);
            const winId = this[WinIdKey];
            const instanceId = randomId();
            const elm = new (getElementConstructor(tagName))(1, instanceId, winId, tagName);
            elm[ImmediateSettersKey] = "SCRIPT" === tagName ? [ [ [ "type" ], serializeForMain("text/partytown") ] ] : "IFRAME" === tagName ? [ [ [ "srcdoc" ], serializeForMain(PT_SCRIPT) ] ] : [];
            return elm;
        }
        get createEventObject() {}
        get currentScript() {
            return webWorkerCtx.$currentScriptId$ ? constructInstance(1, webWorkerCtx.$currentScriptId$, this[WinIdKey], "SCRIPT") : null;
        }
        get defaultView() {
            return self;
        }
        get documentElement() {
            return constructInstance(1, 5, this[WinIdKey], "HTML");
        }
        getElementsByTagName(tagName) {
            return "BODY" === (tagName = toUpper(tagName)) ? [ this.body ] : "HEAD" === tagName ? [ this.head ] : "SCRIPT" === tagName ? [ constructInstance(1, webWorkerCtx.$firstScriptId$, this[WinIdKey], "SCRIPT") ] : callMethod(this, [ "getElementsByTagName" ], [ tagName ]);
        }
        get head() {
            return constructInstance(1, 6, this[WinIdKey], "HEAD");
        }
        get implementation() {
            return {
                hasFeature: () => !0
            };
        }
        get location() {
            logWorkerGetter(this, [ "location" ], webWorkerCtx.$location$, !0);
            return webWorkerCtx.$location$;
        }
        set location(url) {
            logWorkerSetter(this, [ "location" ], url);
            webWorkerCtx.$location$.href = url + "";
        }
        get parentNode() {
            return null;
        }
        get parentElement() {
            return null;
        }
        get readyState() {
            "complete" !== webWorkerCtx.$documentReadyState$ ? webWorkerCtx.$documentReadyState$ = getter(this, [ "readyState" ]) : logWorkerGetter(this, [ "readyState" ], webWorkerCtx.$documentReadyState$, !0);
            return webWorkerCtx.$documentReadyState$;
        }
        get referrer() {
            logWorkerGetter(this, [ "referrer" ], webWorkerCtx.$documentReferrer$, !0);
            return webWorkerCtx.$documentReferrer$;
        }
        get title() {
            logWorkerGetter(this, [ "title" ], webWorkerCtx.$documentTitle$, !0);
            return webWorkerCtx.$documentTitle$;
        }
        set title(value) {
            setter(this, [ "title" ], webWorkerCtx.$documentTitle$ = value);
        }
    }
    class WorkerDocumentElementChild extends WorkerElement {
        get parentElement() {
            return document.documentElement;
        }
        get parentNode() {
            return document.documentElement;
        }
    }
    class WorkerScriptElement extends WorkerSrcElement {
        get src() {
            return this[WinIdKey] === webWorkerCtx.$winId$ ? getInstanceStateValue(this, 3) || "" : getter(this, [ "src" ]);
        }
        set src(url) {
            if (this[WinIdKey] === webWorkerCtx.$winId$) {
                url = resolveUrl(url) + "";
                setInstanceStateValue(this, 3, url);
                this[ImmediateSettersKey] && this[ImmediateSettersKey].push([ [ "src" ], serializeForMain(url) ]);
            } else {
                setter(this, [ "src" ], url);
            }
        }
        get type() {
            return getter(this, [ "type" ]);
        }
        set type(type) {
            "text/javascript" !== type && setter(this, [ "type" ], type);
        }
    }
    const constructInstance = (interfaceType, instanceId, winId, nodeName) => new (getConstructor(interfaceType, nodeName = 9 === interfaceType ? "#document" : 3 === interfaceType ? "#text" : nodeName))(interfaceType, instanceId, winId, nodeName);
    const getConstructor = (interfaceType, nodeName) => 1 === interfaceType ? getElementConstructor(nodeName) : 9 === interfaceType ? WorkerDocument : 0 === interfaceType ? WorkerContentWindow : 3 === interfaceType ? WorkerNode : WorkerInstance;
    const getElementConstructor = nodeName => ({
        A: WorkerAnchorElement,
        BODY: WorkerDocumentElementChild,
        HEAD: WorkerDocumentElementChild,
        IFRAME: WorkerIFrameElement,
        SCRIPT: WorkerScriptElement
    }[nodeName] || WorkerElement);
    const queueTask = (instance, $accessType$, $memberPath$, $data$, $immediateSetters$, $newInstanceId$) => {
        const winId = instance[WinIdKey];
        const winQueue = taskQueue[winId] = taskQueue[winId] || [];
        const $forwardToWin$ = webWorkerCtx.$winId$ !== winId;
        const accessReqTask = {
            $instanceId$: instance[InstanceIdKey],
            $interfaceType$: instance[InterfaceTypeKey],
            $nodeName$: instance[NodeNameKey],
            $accessType$: $accessType$,
            $memberPath$: $memberPath$,
            $data$: $data$,
            $immediateSetters$: $immediateSetters$,
            $newInstanceId$: $newInstanceId$
        };
        winQueue.push(accessReqTask);
        return drainQueue(winId, instance, $memberPath$, $forwardToWin$, winQueue);
    };
    const drainQueue = ($winId$, instance, $memberPath$, $forwardToWin$, queue) => {
        if (len(queue)) {
            const accessReq = {
                $msgId$: randomId(),
                $winId$: $winId$,
                $forwardToWin$: $forwardToWin$,
                $tasks$: [ ...queue ]
            };
            queue.length = 0;
            const xhr = new XMLHttpRequest;
            const accessReqStr = JSON.stringify(accessReq);
            xhr.open("POST", webWorkerCtx.$scopePath$ + "proxytown", !1);
            xhr.send(JSON.stringify(accessReq));
            const accessRsp = JSON.parse(xhr.responseText);
            const errors = accessRsp.$errors$.join();
            const isPromise = accessRsp.$isPromise$;
            const rtn = deserializeFromMain(instance, $memberPath$, accessRsp.$rtnValue$);
            if (errors) {
                console.error(self.name, accessReqStr);
                if (isPromise) {
                    return Promise.reject(errors);
                }
                throw new Error(errors);
            }
            return isPromise ? Promise.resolve(rtn) : rtn;
        }
    };
    const getter = (instance, memberPath) => {
        applyBeforeSyncSetters(instance[WinIdKey], instance);
        const rtn = queueTask(instance, 0, memberPath);
        logWorkerGetter(instance, memberPath, rtn);
        return rtn;
    };
    const setter = (instance, memberPath, value) => {
        logWorkerSetter(instance, memberPath, value);
        if (instance[ImmediateSettersKey]) {
            instance[ImmediateSettersKey].push([ memberPath, serializeForMain(value) ]);
        } else {
            const serializedValue = serializeForMain(value);
            "function" == typeof value && setInstanceStateValue(instance, memberPath.join("."), value);
            queueTask(instance, 1, memberPath, serializedValue);
        }
    };
    const callMethod = (instance, memberPath, args, immediateSetters, newInstanceId) => {
        applyBeforeSyncSetters(instance[WinIdKey], instance);
        const rtn = queueTask(instance, 2, memberPath, serializeForMain(args), immediateSetters, newInstanceId);
        ((target, memberPath, args, rtn) => {
            if (webWorkerCtx.$config$.logCalls) {
                try {
                    if (target && target[WinIdKey] !== webWorkerCtx.$winId$) {
                        return;
                    }
                    logWorker(`Call ${logTargetProp(target, memberPath)}(${args.map((v => logValue(memberPath, v))).join(", ")}), returned: ${logValue(memberPath, rtn)}`);
                } catch (e) {}
            }
        })(instance, memberPath, args, rtn);
        return rtn;
    };
    const applyBeforeSyncSetters = (winId, instance) => {
        const beforeSyncValues = instance[ImmediateSettersKey];
        if (beforeSyncValues) {
            instance[ImmediateSettersKey] = void 0;
            const winDoc = constructInstance(9, 4, winId, "#document");
            const syncedTarget = callMethod(winDoc, [ "createElement" ], [ instance[NodeNameKey] ], beforeSyncValues, instance[InstanceIdKey]);
            instance[InstanceIdKey] !== syncedTarget[InstanceIdKey] && console.error("Main and web worker instance ids do not match", instance, syncedTarget);
        }
    };
    const proxy = (interfaceType, target, initMemberPath) => !target || "object" != typeof target && "function" != typeof target || target[ProxyKey] || String(target).includes("[native") ? target : new Proxy(target, {
        get(target, propKey) {
            if (propKey === ProxyKey) {
                return !0;
            }
            if (Reflect.has(target, propKey)) {
                return Reflect.get(target, propKey);
            }
            const memberPath = [ ...initMemberPath, String(propKey) ];
            return ((interfaceType, instance, memberPath) => {
                const interfaceInfo = webWorkerCtx.$interfaces$.find((i => i[0] === interfaceType));
                if (interfaceInfo) {
                    const memberInfo = interfaceInfo[1][memberPath[len(memberPath) - 1]];
                    if (2 === memberInfo) {
                        return (...args) => callMethod(instance, memberPath, args);
                    }
                    if (memberInfo > 0) {
                        return proxy(memberInfo, instance, [ ...memberPath ]);
                    }
                }
                const stateValue = getInstanceStateValue(instance, memberPath.join("."));
                return "function" == typeof stateValue ? (...args) => stateValue.apply(instance, args) : null;
            })(interfaceType, target, memberPath) || getter(target, memberPath);
        },
        set(target, propKey, value, receiver) {
            Reflect.has(target, propKey) ? Reflect.set(target, propKey, value, receiver) : setter(target, [ ...initMemberPath, String(propKey) ], value);
            return !0;
        }
    });
    const serializeForMain = (value, added) => {
        if (void 0 !== value) {
            added = added || new Set;
            const type = typeof value;
            if ("string" === type || "boolean" === type || "number" === type || null == value) {
                return [ 4, value ];
            }
            if ("function" === type) {
                return [ 5, setWorkerRef(value) ];
            }
            if (Array.isArray(value)) {
                return added.has(value) ? [ 0, [] ] : [ 0, value.map((v => serializeForMain(v, added))) ];
            }
            if ("object" === type) {
                if ("number" == typeof value[InstanceIdKey]) {
                    return [ 1, {
                        $winId$: value[WinIdKey],
                        $interfaceType$: value[InterfaceTypeKey],
                        $instanceId$: value[InstanceIdKey],
                        $nodeName$: value[NodeNameKey]
                    } ];
                }
                const serializedObj = {};
                if (!added.has(value)) {
                    added.add(value);
                    for (const k in value) {
                        serializedObj[k] = serializeForMain(value[k], added);
                    }
                }
                return [ 3, serializedObj ];
            }
        }
    };
    const deserializeFromMain = (instance, memberPath, serializedValueTransfer, serializedType, serializedValue, obj, key) => {
        if (serializedValueTransfer) {
            serializedType = serializedValueTransfer[0];
            serializedValue = serializedValueTransfer[1];
            if (4 === serializedType) {
                return serializedValue;
            }
            if (5 === serializedType) {
                return deserializeRefFromMain(instance, memberPath, serializedValue);
            }
            if (2 === serializedType && instance) {
                return (...args) => callMethod(instance, memberPath, args);
            }
            if (1 === serializedType) {
                return constructSerializedInstance(serializedValue);
            }
            if (0 === serializedType) {
                return serializedValue.map((v => deserializeFromMain(instance, memberPath, v)));
            }
            if (3 === serializedType) {
                obj = {};
                for (key in serializedValue) {
                    obj[key] = deserializeFromMain(instance, [ ...memberPath, key ], serializedValue[key]);
                }
                return obj;
            }
        }
    };
    const constructSerializedInstance = ({$interfaceType$: $interfaceType$, $instanceId$: $instanceId$, $winId$: $winId$, $nodeName$: $nodeName$, $items$: $items$}) => 1 === $instanceId$ ? history : 2 === $instanceId$ ? localStorage : 3 === $instanceId$ ? sessionStorage : 0 === $instanceId$ ? self : 7 === $interfaceType$ ? new WorkerNodeList($items$.map(constructSerializedInstance)) : constructInstance($interfaceType$, $instanceId$, $winId$, $nodeName$);
    const deserializeRefFromMain = (instance, memberPath, refId) => {
        let workerRefHandler;
        let workerRefMap = getInstanceStateValue(instance, 0);
        workerRefMap || setInstanceStateValue(instance, 0, workerRefMap = {});
        workerRefHandler = workerRefMap[refId];
        workerRefHandler || (workerRefMap[refId] = workerRefHandler = createWorkerRefHandler());
        return workerRefHandler;
    };
    const createWorkerRefHandler = refId => function(...args) {};
    class Image {
        constructor() {
            this.s = "";
            this.l = [];
            this.e = [];
        }
        get src() {
            return this.s;
        }
        set src(src) {
            webWorkerCtx.$config$.logImageRequests && logWorker(`Image() src request: ${resolveUrl(src)}`);
            fetch(resolveUrl(src) + "", {
                mode: "no-cors",
                keepalive: !0
            }).then((rsp => {
                rsp.ok ? this.l.forEach((cb => cb({
                    type: "load"
                }))) : this.e.forEach((cb => cb({
                    type: "error"
                })));
            }), (() => this.e.forEach((cb => cb({
                type: "error"
            })))));
        }
        addEventListener(eventName, cb) {
            "load" === eventName && this.l.push(cb);
            "error" === eventName && this.e.push(cb);
        }
        get onload() {
            return this.l[0];
        }
        set onload(cb) {
            this.l = [ cb ];
        }
        get onerror() {
            return this.e[0];
        }
        set onerror(cb) {
            this.e = [ cb ];
        }
    }
    const queuedEvents = [];
    const receiveMessageFromSandboxToWorker = ev => {
        const msg = ev.data;
        const msgType = msg[0];
        const msgData1 = msg[1];
        const msgData2 = msg[2];
        if (webWorkerCtx.$isInitialized$) {
            3 === msgType ? (initScript => {
                let winId = initScript.$winId$;
                let instanceId = initScript.$instanceId$;
                let content = initScript.$content$;
                let url = initScript.$url$;
                let errorMsg = "";
                let handlersType = "load";
                if (url) {
                    try {
                        url = resolveUrl(url) + "";
                        setStateValue(instanceId, 3, url);
                        setCurrentScript(instanceId, url);
                        winId !== webWorkerCtx.$winId$ && console.error(`Incorrect window context, winId: ${winId}, instanceId: ${instanceId}, url: ${url}`);
                        webWorkerCtx.$config$.logScriptExecution && logWorker(`Execute script[data-pt-id="${winId}.${instanceId}"], src: ${url}`);
                        webWorkerCtx.$importScripts$(url);
                    } catch (urlError) {
                        console.error(name, urlError, "\n" + url);
                        handlersType = "error";
                        errorMsg = String(urlError.stack || urlError) + "";
                    }
                    runStateHandlers(instanceId, handlersType) || webWorkerCtx.$postMessage$([ 8, instanceId, handlersType ]);
                } else if (content) {
                    try {
                        webWorkerCtx.$config$.logScriptExecution && logWorker(`Execute script[data-pt-id="${winId}.${instanceId}"]`);
                        setCurrentScript(instanceId, "");
                        new Function(content)();
                    } catch (contentError) {
                        console.error(name, contentError, "\n" + content);
                        handlersType = "error";
                        errorMsg = String(contentError.stack || contentError) + "";
                    }
                }
                setCurrentScript(-1, "");
                webWorkerCtx.$postMessage$([ 2, instanceId, errorMsg ]);
            })(msgData1) : 4 === msgType ? ((workerRefId, serializedTarget, serializedArgs, workerRef) => {
                if (workerRef = (refId => webWorkerRefsByRefId[refId])(workerRefId)) {
                    try {
                        const target = deserializeFromMain(null, [], serializedTarget);
                        const args = deserializeFromMain(target, [], serializedArgs);
                        workerRef.apply(target, args);
                    } catch (e) {
                        console.error(e);
                    }
                }
            })(msgData1, msgData2, msg[3]) : 5 === msgType ? (accessReq => {
                const accessRsp = {
                    $msgId$: accessReq.$msgId$,
                    $winId$: accessReq.$winId$,
                    $errors$: []
                };
                for (const accessReqTask of accessReq.$tasks$) {
                    let accessType = accessReqTask.$accessType$;
                    let memberPath = accessReqTask.$memberPath$;
                    let memberPathLength = len(memberPath);
                    let lastMemberName = memberPath[memberPathLength - 1];
                    let instance;
                    let rtnValue;
                    let data;
                    let i;
                    try {
                        instance = constructSerializedInstance({
                            ...accessReqTask,
                            $winId$: accessReq.$winId$
                        });
                        for (i = 0; i < memberPathLength - 1; i++) {
                            instance = instance[memberPath[i]];
                        }
                        data = deserializeFromMain(instance, memberPath, accessReqTask.$data$);
                        0 === accessType ? rtnValue = instance[lastMemberName] : 1 === accessType ? instance[lastMemberName] = data : 2 === accessType && (rtnValue = 4 === accessReqTask.$instanceId$ && "createElement" === lastMemberName ? callMethod(instance, memberPath, data, accessReqTask.$immediateSetters$, accessReqTask.$newInstanceId$) : instance[lastMemberName].apply(instance, data));
                        accessRsp.$rtnValue$ = serializeForMain(rtnValue);
                    } catch (e) {
                        accessRsp.$errors$.push(String(e.stack || e));
                    }
                }
                webWorkerCtx.$postMessage$([ 6, accessRsp ]);
            })(msgData1) : 7 === msgType ? ((forwardConfig, forwardArgs) => {
                let args = deserializeFromMain({}, [], forwardArgs);
                let target = self;
                let fn;
                forwardConfig.split(".").forEach(((forwardProp, index, arr) => {
                    if (target) {
                        fn = target[forwardProp];
                        index === arr.length - 1 && "function" == typeof fn ? fn.apply(target, args) : target = target[forwardProp];
                    }
                }));
            })(msgData1, msgData2) : 8 === msgType && runStateHandlers(msgData1, msgData2);
        } else if (1 === msgType) {
            ((self, initWebWorkerData) => {
                Object.assign(webWorkerCtx, initWebWorkerData);
                logWorker(`Loaded web worker, winId: ${webWorkerCtx.$winId$}${webWorkerCtx.$winId$ > 1 ? ", parentId: " + webWorkerCtx.$parentWinId$ : ""}`);
                webWorkerCtx.$importScripts$ = importScripts.bind(self);
                self.importScripts = void 0;
                webWorkerCtx.$postMessage$ = postMessage.bind(self);
                self.postMessage = (msg, targetOrigin) => logWorker(`postMessage(${JSON.stringify(msg)}, "${targetOrigin}"})`);
                webWorkerCtx.$location$ = new WorkerLocation(initWebWorkerData.$url$);
                ((self, windowMemberTypeInfo) => {
                    self[WinIdKey] = webWorkerCtx.$winId$;
                    self[InstanceIdKey] = 0;
                    Object.keys(windowMemberTypeInfo).forEach((memberName => {
                        self[memberName] || 2 !== windowMemberTypeInfo[memberName] || (self[memberName] = (...args) => callMethod(self, [ memberName ], args));
                    }));
                    self.requestAnimationFrame = cb => nextTick((() => cb(Date.now())), 9);
                    self.cancelAnimationFrame = clearTimeout;
                    Object.defineProperty(self, "location", {
                        get: () => webWorkerCtx.$location$,
                        set: href => webWorkerCtx.$location$.href = href + ""
                    });
                    self.document = constructInstance(9, 4);
                    self.history = constructInstance(8, 1);
                    self.localStorage = constructInstance(10, 2);
                    self.sessionStorage = constructInstance(10, 3);
                    self.Image = Image;
                    navigator.sendBeacon = sendBeacon;
                    self.self = self.window = self;
                    if (1 === webWorkerCtx.$winId$) {
                        self.parent = self.top = self;
                    } else {
                        self.parent = constructInstance(0, 0, webWorkerCtx.$parentWinId$);
                        self.top = constructInstance(0, 0, 1);
                    }
                })(self, initWebWorkerData.$interfaces$[0][1]);
                webWorkerCtx.$isInitialized$ = !0;
            })(self, msgData1);
            webWorkerCtx.$postMessage$([ 3 ]);
            nextTick((() => {
                queuedEvents.length && logWorker(`Queued ready messages: ${queuedEvents.length}`);
                queuedEvents.slice().forEach(receiveMessageFromSandboxToWorker);
                queuedEvents.length = 0;
            }));
        } else {
            queuedEvents.push(ev);
        }
    };
    self.onmessage = receiveMessageFromSandboxToWorker;
    postMessage([ 0 ]);
})(self);