sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"sap/ui/model/json/JSONModel"
], function (Controller, History,JSONModel) {
	"use strict";

	return Controller.extend("asg.Assignment-1.controller.Points", {

		onInit: function () {
			// this._getModelData();
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("Points").attachPatternMatched(this._onObjectMatched, this);
		},

		_onObjectMatched: function () {
			var oModel = this.getView().getModel("iplData"),
				points = oModel.oData.Points[0].twetyeihteen;
			oModel.setProperty("/Eighteen", points);
		},

		sort: function (oEvent) {
			var olist1 = oEvent.getParameters().value;

			var oModel = this.getView().getModel("iplData");
			if (olist1 === "2018") {
				oModel.setProperty("/Eighteen", oModel.oData.Points[0].twetyeihteen);
			} else if (olist1 === "2017") {
				oModel.setProperty("/Eighteen", oModel.oData.Points[0].twetyseventeen);
			} else if (olist1 === "2016") {
				oModel.setProperty("/Eighteen", oModel.oData.Points[0].twetysixteen);
			} else if (olist1 === "2015") {
				oModel.setProperty("/Eighteen", oModel.oData.Points[0].twetyfive);
			}
			
		},
		onItemPress: function (oEvent) {

			var oView = this.getView();
			var oDialog = oView.byId("helloDialog");
			// create dialog lazily
			if (!oDialog) {
				// create dialog via fragment factory
				oDialog = sap.ui.xmlfragment(oView.getId(), "asg.Assignment-1.Fragments.graph", this);
				oView.addDependent(oDialog);
			}
			
			var id = oEvent.getParameter("listItem").getBindingContextPath().substr(10);
			//console.log(oEvent.getSource().getBindingContextPath());
			var grp = this.getView().getModel("iplData").getProperty("/Points/0").twetyeihteen[id].name;
			this.getView().byId("idGraph").bindData("iplData>/graph/0/"+ grp);
			

			oDialog.open();
		},
		graphItem:function(oEvent){
		var grp = oEvent.getParameters().value;
		this.getView().byId("idVizFrame").setVizType(grp);
			
		},
		ocClosefrg: function () {
			this.getView().byId("helloDialog").close();
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