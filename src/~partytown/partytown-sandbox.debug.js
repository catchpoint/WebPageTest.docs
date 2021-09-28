(window => {
    const isPromise = v => "object" == typeof v && v && v.then;
    const len = obj => obj.length;
    const getConstructorName = obj => obj && obj.constructor && obj.constructor.name || "";
    const noop = () => {};
    const startsWith = (str, val) => str.startsWith(val);
    const isValidMemberName = memberName => !(startsWith(memberName, "webkit") || startsWith(memberName, "toJSON") || startsWith(memberName, "on") && (str => str.toLowerCase())(memberName) === memberName);
    const EMPTY_ARRAY = [];
    const forwardMsgResolves = new Map;
    const mainInstanceIdByInstance = new WeakMap;
    const mainInstances = [];
    const mainInstanceRefs = new WeakMap;
    const winCtxs = new Map;
    const windows = new WeakSet;
    const getAndSetInstanceId = (winCtx, instance, instanceId) => {
        if (instance) {
            "number" != typeof (instanceId = (instance => {
                if (instance) {
                    const nodeName = instance.nodeName;
                    return "#document" === nodeName ? 4 : "HTML" === nodeName ? 5 : "HEAD" === nodeName ? 6 : "BODY" === nodeName ? 7 : mainInstanceIdByInstance.get(instance);
                }
                return -1;
            })(instance)) && setInstanceId(winCtx, instance, instanceId = (() => Math.round(9999999999 * Math.random() + 7))());
            return instanceId;
        }
        return -1;
    };
    const getInstance = (winCtx, instanceId, instanceItem) => {
        const doc = winCtx.$window$.document;
        return 4 === instanceId ? doc : 5 === instanceId ? doc.documentElement : 6 === instanceId ? doc.head : 7 === instanceId ? doc.body : (instanceItem = mainInstances.find((i => i[0] === instanceId))) ? instanceItem[1] : null;
    };
    const setInstanceId = (winCtx, instance, instanceId) => {
        if (instance) {
            mainInstances.push([ instanceId, instance ]);
            mainInstanceIdByInstance.set(instance, instanceId);
            winCtx.$cleanupInc$++;
            if (winCtx.$cleanupInc$ > 99) {
                winCtx.$cleanupInc$ = 0;
                while (1) {
                    let disconnectedNodes = mainInstances.filter((i => i[1].nodeType && !i[1].isConnected));
                    let i;
                    let l;
                    if (!(len(disconnectedNodes) > 99)) {
                        break;
                    }
                    for (i = 0, l = len(mainInstances); i < l; i++) {
                        if (!mainInstances[i][1].isConnected) {
                            mainInstances.slice(i, 1);
                            break;
                        }
                    }
                }
            }
        }
    };
    const serializeForWorker = (winCtx, value, added, type, obj, key) => {
        if (void 0 !== value) {
            added = added || new Set;
            if ("string" == (type = typeof value) || "number" === type || "boolean" === type || null == value) {
                return [ 4, value ];
            }
            if ("function" === type) {
                return [ 2 ];
            }
            if (Array.isArray(value)) {
                if (!added.has(value)) {
                    added.add(value);
                    return [ 0, value.map((v => serializeForWorker(winCtx, v, added))) ];
                }
                return [ 0, [] ];
            }
            if ("object" === type) {
                if (value.nodeType) {
                    return [ 1, {
                        $winId$: winCtx.$winId$,
                        $interfaceType$: value.nodeType,
                        $instanceId$: getAndSetInstanceId(winCtx, value),
                        $nodeName$: value.nodeName
                    } ];
                }
                if (value === value.window) {
                    return [ 1, {
                        $winId$: winCtx.$winId$,
                        $interfaceType$: 0,
                        $instanceId$: 0
                    } ];
                }
                if (isNodeList(getConstructorName(value))) {
                    return [ 1, {
                        $winId$: winCtx.$winId$,
                        $interfaceType$: 7,
                        $items$: Array.from(value).map((v => serializeForWorker(winCtx, v, added)[1]))
                    } ];
                }
                obj = {};
                if (!added.has(value)) {
                    added.add(value);
                    for (key in value) {
                        isValidMemberName(key) && (obj[key] = serializeForWorker(winCtx, value[key], added));
                    }
                }
                return [ 3, obj ];
            }
        }
    };
    const deserializeFromWorker = (winCtx, instanceId, serializedTransfer, serializedType, serializedValue, obj, key) => {
        if (serializedTransfer) {
            serializedType = serializedTransfer[0];
            serializedValue = serializedTransfer[1];
            if (4 === serializedType) {
                return serializedValue;
            }
            if (5 === serializedType) {
                return deserializeRefFromWorker(winCtx, instanceId, serializedValue);
            }
            if (0 === serializedType) {
                return serializedValue.map((v => deserializeFromWorker(winCtx, instanceId, v)));
            }
            if (1 === serializedType) {
                return getInstance(winCtx, serializedValue.$instanceId$);
            }
            if (3 === serializedType) {
                obj = {};
                for (key in serializedValue) {
                    obj[key] = deserializeFromWorker(winCtx, instanceId, serializedValue[key]);
                }
                return obj;
            }
        }
    };
    const isNodeList = cstrName => "HTMLCollection" === cstrName || "NodeList" === cstrName;
    const deserializeRefFromWorker = (winCtx, instanceId, refId) => {
        let instance = getInstance(winCtx, instanceId);
        let mainRefHandlerMap;
        let mainRefHandler;
        if (instance) {
            mainRefHandlerMap = mainInstanceRefs.get(instance);
            mainRefHandlerMap || mainInstanceRefs.set(instance, mainRefHandlerMap = {});
            mainRefHandler = mainRefHandlerMap[refId];
            if (!mainRefHandler) {
                mainRefHandler = createMainRefHandler(winCtx, refId);
                mainRefHandlerMap[refId] = mainRefHandler;
            }
            return mainRefHandler;
        }
        return noop;
    };
    const createMainRefHandler = (winCtx, refId) => function(...args) {
        const serializedTarget = serializeForWorker(winCtx, this);
        const serializedArgs = serializeForWorker(winCtx, args);
        winCtx.$worker$.postMessage([ 4, refId, serializedTarget, serializedArgs ]);
    };
    const readNextScript = winCtx => {
        const $winId$ = winCtx.$winId$;
        const win = winCtx.$window$;
        const doc = win.document;
        const scriptElm = doc.querySelector('script[type="text/partytown"]:not([data-pt-id]):not([data-pt-error])');
        if (scriptElm) {
            const $instanceId$ = getAndSetInstanceId(winCtx, scriptElm, $winId$);
            const scriptData = {
                $winId$: $winId$,
                $instanceId$: $instanceId$
            };
            scriptElm.dataset.ptId = createSelectorId(winCtx, $instanceId$);
            scriptElm.src ? scriptData.$url$ = scriptElm.src : scriptData.$content$ = scriptElm.innerHTML;
            winCtx.$worker$.postMessage([ 3, scriptData ]);
        } else if (!winCtx.$isInitialized$) {
            winCtx.$isInitialized$ = !0;
            win.frameElement && (win.frameElement.partyWinId = $winId$);
            ((winCtx, win) => {
                let forwardedEvents = win._ptf;
                let i = 0;
                if (forwardedEvents) {
                    win._ptf.push = (forwardConfig, forwardArgs) => winCtx.$worker$.postMessage([ 7, forwardConfig, serializeForWorker(winCtx, Array.from(forwardArgs)) ]);
                    for (;i < len(forwardedEvents); i += 2) {
                        win._ptf.push(forwardedEvents[i], forwardedEvents[i + 1]);
                    }
                    forwardedEvents.length = 0;
                }
            })(winCtx, win);
            doc.dispatchEvent(new CustomEvent("ptinit"));
            ((winCtx, msg) => {
                {
                    let prefix;
                    prefix = 1 === winCtx.$winId$ ? `Main (${winCtx.$winId$}) 🌎` : `Iframe (${winCtx.$winId$}) 👾`;
                    console.debug.apply(console, [ `%c${prefix}`, "background: #717171; color: white; padding: 2px 3px; border-radius: 2px; font-size: 0.8em;", msg ]);
                }
            })(winCtx, `Startup ${(performance.now() - winCtx.$startTime$).toFixed(1)}ms`);
        }
    };
    const createSelectorId = (winCtx, instanceId) => winCtx.$winId$ + "." + instanceId;
    const readImplementationMembers = (impl, members) => {
        let memberName;
        let interfaceType;
        let value;
        let type;
        for (memberName in impl) {
            if (isValidMemberName(memberName)) {
                value = impl[memberName];
                type = typeof value;
                if ("function" === type) {
                    members[memberName] = 2;
                } else if ("object" === type) {
                    interfaceType = InterfaceWhitelist[getConstructorName(value)];
                    interfaceType && (members[memberName] = interfaceType);
                }
            }
        }
        return members;
    };
    const InterfaceWhitelist = {
        CSSStyleDeclaration: 11,
        DOMStringMap: 5,
        DOMTokenList: 6,
        NamedNodeMap: 4,
        NodeList: 7
    };
    const isMemberInInstance = (instance, memberPath) => memberPath[0] in instance;
    (async (sandboxWindow, winIds) => {
        const mainWindow = sandboxWindow.parent;
        const swContainer = sandboxWindow.navigator.serviceWorker;
        const swRegistration = await swContainer.getRegistration();
        const onMessageFromServiceWorkerToSandbox = ev => {
            const accessReq = ev.data;
            const accessWinId = accessReq.$winId$;
            const winCtx = winCtxs.get(accessWinId);
            winCtx && (async (winCtx, accessReq) => {
                if (accessReq.$forwardToWin$) {
                    return ((worker, accessReq) => new Promise((resolve => {
                        forwardMsgResolves.set(accessReq.$msgId$, resolve);
                        worker.postMessage([ 5, accessReq ]);
                    })))(winCtx.$worker$, accessReq);
                }
                const accessRsp = {
                    $msgId$: accessReq.$msgId$,
                    $winId$: accessReq.$winId$,
                    $errors$: []
                };
                for (const accessReqTask of accessReq.$tasks$) {
                    let instanceId = accessReqTask.$instanceId$;
                    let accessType = accessReqTask.$accessType$;
                    let memberPath = accessReqTask.$memberPath$;
                    let memberPathLength = len(memberPath);
                    let lastMemberName = memberPath[memberPathLength - 1];
                    let immediateSetters = accessReqTask.$immediateSetters$ || EMPTY_ARRAY;
                    let instance;
                    let rtnValue;
                    let data;
                    let i;
                    let count;
                    let tmr;
                    let immediateSetterName;
                    try {
                        instance = getInstance(winCtx, instanceId);
                        if (instance) {
                            for (i = 0; i < memberPathLength - 1; i++) {
                                instance = instance[memberPath[i]];
                            }
                            data = deserializeFromWorker(winCtx, instanceId, accessReqTask.$data$);
                            if (0 === accessType) {
                                "partyWinId" === lastMemberName && await new Promise((resolve => {
                                    count = 0;
                                    tmr = setInterval((() => {
                                        if (isMemberInInstance(instance, memberPath) || count > 99) {
                                            clearInterval(tmr);
                                            resolve();
                                        }
                                        count++;
                                    }), 40);
                                }));
                                rtnValue = instance[lastMemberName];
                            } else if (1 === accessType) {
                                instance[lastMemberName] = data;
                            } else if (2 === accessType) {
                                rtnValue = instance[lastMemberName].apply(instance, data);
                                immediateSetters.map((immediateSetter => {
                                    immediateSetterName = immediateSetter[0][0];
                                    rtnValue[immediateSetterName] = deserializeFromWorker(winCtx, instanceId, immediateSetter[1]);
                                }));
                                accessReqTask.$newInstanceId$ && setInstanceId(winCtx, rtnValue, accessReqTask.$newInstanceId$);
                            }
                            if (isPromise(rtnValue)) {
                                rtnValue = await rtnValue;
                                accessRsp.$isPromise$ = !0;
                            }
                            accessRsp.$rtnValue$ = serializeForWorker(winCtx, rtnValue);
                        } else {
                            accessRsp.$errors$.push(`Instance ${instanceId} not found`);
                        }
                    } catch (e) {
                        accessRsp.$errors$.push(String(e.stack || e));
                    }
                }
                return accessRsp;
            })(winCtx, accessReq).then((accessRsp => {
                swRegistration && swRegistration.active && swRegistration.active.postMessage(accessRsp);
            }));
        };
        const registerWindow = win => {
            if (!windows.has(win)) {
                windows.add(win);
                const parentWin = win.parent;
                const winCtx = {
                    $winId$: win.partyWinId = winIds++,
                    $parentWinId$: parentWin.partyWinId,
                    $config$: mainWindow.partytown,
                    $cleanupInc$: 0,
                    $scopePath$: swRegistration.scope,
                    $url$: win.document.baseURI,
                    $window$: win
                };
                winCtxs.set(winCtx.$winId$, winCtx);
                winCtx.$startTime$ = performance.now();
                setInstanceId(winCtx, win, 0);
                setInstanceId(winCtx, win.history, 1);
                setInstanceId(winCtx, win.localStorage, 2);
                setInstanceId(winCtx, win.sessionStorage, 3);
                swContainer.addEventListener("message", onMessageFromServiceWorkerToSandbox);
                (winCtx => {
                    winCtx.$worker$ = new Worker("./partytown-ww.debug.js", {
                        name: `Partytown (${winCtx.$winId$}) 🎉`
                    });
                    winCtx.$worker$.onmessage = ev => ((winCtx, msg) => {
                        const msgType = msg[0];
                        const doc = winCtx.$window$.document;
                        if (0 === msgType) {
                            const firstScriptId = getAndSetInstanceId(winCtx, doc.querySelector("script"));
                            const mainInterfaces = ((win, doc) => {
                                const docImpl = doc.implementation.createHTMLDocument();
                                const docElement = docImpl.documentElement;
                                return [ [ 0, win ], [ 9, docImpl ], [ 6, docElement.classList ], [ 1, docElement ], [ 8, win.history ], [ 7, docElement.childNodes ], [ 10, win.sessionStorage ], [ 3, docImpl.createTextNode("") ] ].map((([interfaceType, impl]) => [ interfaceType, readImplementationMembers(impl, {}) ]));
                            })(winCtx.$window$, doc);
                            const initWebWorkerData = {
                                $winId$: winCtx.$winId$,
                                $parentWinId$: winCtx.$parentWinId$,
                                $config$: winCtx.$config$ || {},
                                $documentCompatMode$: doc.compatMode,
                                $documentCookie$: doc.cookie,
                                $documentReadyState$: doc.readyState,
                                $documentReferrer$: doc.referrer,
                                $documentTitle$: doc.title,
                                $firstScriptId$: firstScriptId,
                                $interfaces$: mainInterfaces,
                                $scopePath$: winCtx.$scopePath$,
                                $url$: winCtx.$url$
                            };
                            winCtx.$worker$.postMessage([ 1, initWebWorkerData ]);
                        } else if (3 === msgType) {
                            readNextScript(winCtx);
                        } else if (2 === msgType) {
                            ((winCtx, doc, instanceId, errorMsg, script) => {
                                (script = doc.querySelector(`[data-pt-id="${createSelectorId(winCtx, instanceId)}"]`)) && (errorMsg ? script.dataset.ptError = errorMsg : script.type += "-init");
                                readNextScript(winCtx);
                            })(winCtx, doc, msg[1], msg[2]);
                        } else if (6 === msgType) {
                            const accessRsp = msg[1];
                            const forwardMsgResolve = forwardMsgResolves.get(accessRsp.$msgId$);
                            if (forwardMsgResolve) {
                                forwardMsgResolves.delete(accessRsp.$msgId$);
                                forwardMsgResolve(accessRsp);
                                readNextScript(winCtx);
                            }
                        } else {
                            8 === msgType && winCtxs.forEach((winCtx => winCtx.$worker$.postMessage(msg)));
                        }
                    })(winCtx, ev.data);
                })(winCtx);
                win.addEventListener("load", (() => readNextScript(winCtx)));
            }
        };
        mainWindow.partyWin = registerWindow;
        swRegistration && registerWindow(mainWindow);
    })(window, 1);
})(window);