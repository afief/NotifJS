var NotifJS = function(title) {

	this.title = title || "Notification";
	this.body = "Body";
	this.icon = "";

	this.show = function(txt, onclick) {
		if (!window.hasOwnProperty("Notification"))
			return;

		var title = this.title;
		var body = txt || this.body;
		var icon = this.icon;

		if (Notification.permission !== "granted") {
			Notification.requestPermission(function(perm) {
				if (perm === "granted") {
					return realShow();
				}
			});
		} else {
			return realShow();
		}

		function realShow() {
			var nots = new Notification(title, {body: body, icon: icon});
			nots.onclick = function() {
				nots.close();
				if (onclick) {
					onclick();
				}
			};
			return nots;
		}
	};

	this.request = function() {
		Notification.requestPermission();
	}
}