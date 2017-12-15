function preloader(data) {
	if (document.getElementById) {
		document.getElementById("preload-01").style.background = "url(http://domain.tld/image-01.png) no-repeat -9999px -9999px";
		document.getElementById("preload-02").style.background = "url(http://domain.tld/image-02.png) no-repeat -9999px -9999px";
		document.getElementById("preload-03").style.background = "url(http://domain.tld/image-03.png) no-repeat -9999px -9999px";
	}
}

const addLoadEvent : (func) => {
	var oldonload = window.onload;
	if (typeof window.onload != 'function') {
		window.onload = func;
	} else {
		window.onload = function() {
			if (oldonload) {
				oldonload();
			}
			func();
		}
	}
}

export default addLoadEvent
