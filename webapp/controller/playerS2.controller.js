sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/core/routing/History"
	//"asg/Assignment-1/Model/formatter"
], function (Controller, JSONModel, Filter, FilterOperator, History, formatter) {
	"use strict";

	return Controller.extend("asg.Assignment-1.controller.playerS2", {
		//fotrmatter: formatter,
		
		onInit: function () {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("Playrs2").attachPatternMatched(this._onObjectMatched, this);

		},
		_onObjectMatched: function (oEvent) {
			var oArg = oEvent.getParameters("arguments");
			//var oView = this.getView();
			//oView.setModel(this.getOwnerComponent().getModel("pladet"));
			this.team = oArg.arguments.invoicePath;
			var model = this.getView().getModel("iplData").getProperty("/Teams"),
				json = new JSONModel();
			this.getView().setModel(json, "alias");
			for (var i = 0; i < model.length; i++) {
				if (model[i].id === this.team) {
					//this.newModel = new sap.ui.model.json.JSONModel(model[i]);
					//this.getView().setModel(this.newModel,"alias");
					//var listItem = this.getView().byId("listItem");
					//this.getView().byId("list").bindItems("alias>/2018",listItem);
					//console.log(this.getView().getModel("alias").getProperty("/"));
					//break;
					this.getView().getModel("alias").setProperty("/Tweenty", model[i]);

				}
			}

		},

		onSearch: function (event) {
			var olist = this.getView().byId("list1"),
				arr = [],
				binding,
				filters;
			// filtersa;
			filters = new Filter({
				filters: [
					new Filter("playerName", FilterOperator.Contains, event.getSource().getValue()),
					new Filter("dest", FilterOperator.Contains, event.getSource().getValue())
				],
				and: false
			});
			// filtersa = new Filter("number", FilterOperator.Contains,event.getSource().getValue()); 
			binding = olist.getBinding("items");
			arr.push(filters);

			binding.filter(arr);

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
		},
		pdetails: function (oEvent) {

			var oView = this.getView();
			var oDialog = oView.byId("helloDialog");
			// create dialog lazily
			if (!oDialog) {
				// create dialog via fragment factory
				oDialog = sap.ui.xmlfragment(oView.getId(), "asg.Assignment-1.Fragments.pdetails", this);
				oView.addDependent(oDialog);
			}

			oDialog.open();

			var path = oEvent.getParameter("listItem").getBindingContextPath().substr(14);

			this.getView().byId("run1").bindProperty("text", "alias>/Tweenty/2018/" + path + "/runs");
			this.getView().byId("run2").bindProperty("text", "alias>/Tweenty/2017/" + path + "/runs");
			this.getView().byId("run3").bindProperty("text", "alias>/Tweenty/2016/" + path + "/runs");
			this.getView().byId("run4").bindProperty("text", "alias>/Tweenty/2015/" + path + "/runs");

			this.getView().byId("wick1").bindProperty("text", "alias>/Tweenty/2018/" + path + "/wickets");
			this.getView().byId("wick2").bindProperty("text", "alias>/Tweenty/2017/" + path + "/wickets");
			this.getView().byId("wick3").bindProperty("text", "alias>/Tweenty/2016/" + path + "/wickets");
			this.getView().byId("wick4").bindProperty("text", "alias>/Tweenty/2015/" + path + "/wickets");

			this.getView().byId("cen1").bindProperty("text", "alias>/Tweenty/2018/" + path + "/100s");
			this.getView().byId("cen2").bindProperty("text", "alias>/Tweenty/2017/" + path + "/100s");
			this.getView().byId("cen3").bindProperty("text", "alias>/Tweenty/2016/" + path + "/100s");
			this.getView().byId("cen4").bindProperty("text", "alias>/Tweenty/2015/" + path + "/100s");

			this.getView().byId("abc22").bindProperty("src", "alias>/Tweenty/2018/" + path + "/photo");

			this.getView().byId("names").bindProperty("text", "alias>/Tweenty/2018/" + path + "/playerName");

			this.getView().byId("helloDialog").bindProperty("title", "alias>/Tweenty/2018/" + path + "/tname");

			this.getView().byId("helloDialog").bindProperty("icon", "alias>/Tweenty/logo");

		},

		onCloseDialog: function () {
			this.getView().byId("helloDialog").close();
		},

		oSort: function (oevent) {

			var oView = this.getView();
			var oList = oView.byId("list1");
			var oBinding = oList.getBinding("items");
			var sortkey = oevent.getSource().getProperty("selectedKey");
			var Dec = true;
			var aSorter = [];

			aSorter.push(new sap.ui.model.Sorter(sortkey, Dec));
			oBinding.sort(aSorter);

		}

	});

});