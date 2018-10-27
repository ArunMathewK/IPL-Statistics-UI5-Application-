sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/routing/History"
], function (Controller, JSONModel, History) {
	"use strict";

	return Controller.extend("asg.Assignment-1.controller.Team", {

		onInit: function () {},

		a1: function (oEvent) {
			var oRouter =
				sap.ui.core.UIComponent.getRouterFor(this);
			var imgId = oEvent.getSource().getId();
			var team;
			switch (imgId) {
			case "__image1":
				team = "CSK";
				break;
			case "__image2":
				team = "MI";
				break;
			case "__image3":
				team = "RCB";
				break;
			case "__image4":
				team = "RR";
				break;
			case "__image5":
				team = "KKR";
				break;
			case "__image6":
				team = "SH";
				break;
			case "__image7":
				team = "DD";
				break;
			case "__image8":
				team = "KXIP";
				break;
			}
			
			//console.log(imgId);
			oRouter.navTo("Playrs2", {
				invoicePath: team
			});

		},

		back: function () {
			var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("Index", {}, true);
			}
		}

	});

});