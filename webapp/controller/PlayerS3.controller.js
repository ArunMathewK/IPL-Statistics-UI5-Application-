sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"sap/viz/ui5/data/FlattenedDataset",
	"sap/viz/ui5/controls/common/feeds/FeedItem"
], function (Controller, History, FlattenedDataset, FeedItem) {
	"use strict";

	return Controller.extend("asg.Assignment-1.controller.PlayerS3", {
		onInit: function (oEvent) {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("Playrs3").attachPatternMatched(this._onObjectMatched, this);

			//this.getView().byId("idtGraph").bindData("iplData>/player");

		},
		_onObjectMatched: function (oEvent) {
			var oArg = oEvent.getParameters("arguments");
			var oView = this.getView();
			oView.setModel(this.getOwnerComponent().getModel("iplData"));
			oView.bindElement("/player/" + oArg.arguments.obj);

			var id = oEvent.getParameter("arguments").obj;
			var grp = this.getView().getModel("iplData").getProperty("/player/")[id].playerName;
			this.getView().byId("idtGraph").bindData("iplData>/playerGraph/0/" + grp);
		},
		graphItem:function(oEvent){
		var grp = oEvent.getParameters().value;
		this.getView().byId("idVizFrame").setVizType(grp);
			
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