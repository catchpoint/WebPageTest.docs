if( "querySelector" in document ) {
    let codeTabs = document.querySelectorAll('.code-tabs');
    if (codeTabs) {
        let count = 1;
        let tabNav = document.createElement('ul');
        tabNav.className = 'code-tabs-nav';

        // each tab will be a pre
        codeTabs.forEach(tab => {
            // grab all pre's
            let panels = tab.querySelectorAll('pre');

            //parse out the language
            let first = true;
            panels.forEach(panel => { 
                let language = panel.className.substring(9);
                panel.setAttribute('id', 'code-tab-panel-' + language + '-' + count);

                let li = document.createElement('li');
                let link = document.createElement('a');
                link.setAttribute('href', '#code-tab-panel-' + language + '-' + count);
                link.innerText = language;
                if (first) {
                    panel.classList.add('is-active');
                    li.classList.add('is-active');
                    first = false;
                }
                li.appendChild(link);
                tabNav.appendChild(li);
            });
            tab.parentNode.insertBefore(tabNav, tab);
            tab.classList.add('code-tabs-ready');
            count++;


        });
        //now let's handle the toggling
        let codeTabNavs = document.querySelectorAll('.code-tabs-nav');
        codeTabNavs.forEach(nav => {
            nav.addEventListener('click', (e) => {
                let target = e.target;
                if (target.nodeName == 'A' && !target.closest('li.is-active')) {
                    
                    // toggle our list item
                    target.closest('.code-tabs-nav').querySelector('li.is-active').classList.remove('is-active');
                    target.closest('li').classList.add('is-active');
                    //toggle our pre
                    let newPanel = document.querySelector(target.getAttribute('href'));
                    let panelGroup = newPanel.parentNode;
                    panelGroup.querySelector('pre.is-active').classList.remove('is-active');
                    newPanel.classList.add('is-active');
                    e.preventDefault();
                }
            });
        })
        
    }
}