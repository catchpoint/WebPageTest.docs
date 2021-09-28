!function(doc, nav, scope, sandbox, scripts, timeout) {
    function ready() {
        if (!sandbox) {
            (sandbox = doc.createElement("iframe")).dataset.partytown = "sandbox";
            sandbox.setAttribute("style", "display:block;width:0;height:0;border:0;visibility:hidden");
            sandbox.setAttribute("aria-hidden", "true");
            sandbox.src = scope + "partytown-sandbox.debug?" + Date.now();
            doc.body.appendChild(sandbox);
        }
    }
    function fallback(i, script) {
        console.warn("Partytown script fallback");
        sandbox = 1;
        for (i = 0; i < scripts.length; i++) {
            (script = doc.createElement("script")).innerHTML = scripts[i].innerHTML;
            doc.body.appendChild(script);
        }
    }
    scripts = doc.querySelectorAll('script[type="text/partytown"]');
    if (location !== parent.location) {
        parent.partyWin(window);
    } else if (scripts.length) {
        if ("serviceWorker" in nav) {
            nav.serviceWorker.register(scope + "partytown-sw.debug.js", {
                scope: scope
            }).then((function(swRegistration) {
                swRegistration.active ? ready() : swRegistration.installing ? swRegistration.installing.addEventListener("statechange", (function(ev) {
                    "activated" === ev.target.state && ready();
                })) : console.warn(swRegistration);
            }), (function(e) {
                console.error(e);
            }));
            timeout = setTimeout(fallback, 6e4);
            doc.addEventListener("ptinit", (function() {
                clearTimeout(timeout);
            }));
        } else {
            fallback();
        }
    }
}(document, navigator, "/~partytown/");