if( "querySelector" in document ) {
	var details = document.querySelector(".primaryNav > details");
	if( details ) {
		var forceOpen = window.getComputedStyle(details).getPropertyValue("--details-force-closed");
		function forceState(isOpen) {
			if( isOpen ) {
				details.setAttribute("open", "open");
			} else {
				details.removeAttribute("open");
			}
		}

		if(forceOpen && "matchMedia" in window) {
			var mm1 = window.matchMedia(forceOpen);
			forceState(mm1.matches);
			mm1.addEventListener('change', (e) => {
				forceState(e.matches);
			});
		}
	}
}