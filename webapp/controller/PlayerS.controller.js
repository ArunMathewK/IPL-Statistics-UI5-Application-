sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/core/util/MockServer",
	"sap/ui/export/Spreadsheet",
	"sap/ui/core/util/Export",
	"sap/ui/core/util/ExportTypeCSV",
	"sap/m/MessageBox",
	"sap/ui/core/util/ExportType"
	

], function (Controller, History, Filter, FilterOperator, MockServer, Spreadsheet, Export, ExportTypeCSV, MessageBox, ExportType) {
	"use strict";

	return Controller.extend("asg.Assignment-1.controller.PlayerS", {

		onInit: function () {
			var oModel = new sap.ui.model.json.JSONModel("model/Data.json");
			sap.ui.getCore().setModel(oModel, "oModel");
			// $("#_xmlView1--table-listUI").fadeOut().fadeIn(5000);
		},
	

		onItemPress: function (oEvent) {

			//var ob = oEvent.getParameters().listItem.getBindingContext("iplData").getObject();

			var routing = sap.ui.core.UIComponent.getRouterFor(this);
			routing.navTo("Playrs3", {
				obj: oEvent.getParameter("listItem").getBindingContextPath().substr(8)
			});

			// var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			// 	oRouter.navTo("Playrs3");
		},
		sortData: function (oevent) {

			var oView = this.getView();
			var oList = oView.byId("table");
			var oBinding = oList.getBinding("items");
			var sortkey = oevent.getSource().getProperty("selectedKey");
			var Dec = true;
			var aSorter = [];
			aSorter.push(new sap.ui.model.Sorter(sortkey, Dec));
			oBinding.sort(aSorter);

			// oView = this.getView();
			// var oDialog = oView.byId("helloDialog");
			// // create dialog lazily
			// if (!oDialog) {
			// 	// create dialog via fragment factory
			// 	oDialog = sap.ui.xmlfragment(oView.getId(), "asg.Assignment-1.Fragments.sort", this);
			// 	oView.addDependent(oDialog);
			// }
			// oDialog.open();

		},

		// ascending: function (oEvent) {
			
		// // var aSorter = [];
		// // 	aSorter.push(new sap.ui.model.Sorter(sortkey, Dec));

		// 	this.getView().byId("helloDialog").close();
		// },
		// descending: function (oevent) {

		// 	this.getView().byId("helloDialog").close();
		// },

		sortTeam: function (oEvent) {
			var otble = this.getView().byId("table"),
				arr = [],
				binding,
				filters;
			filters = new Filter("tname", FilterOperator.Contains, oEvent.getSource().getValue());
			// filters = new filters({
			// 	filter:[
			// 		new Filter("tname", FilterOperator.Contains, oEvent.getSource().getValue()),
			// 		new Filter("year", FilterOperator.Contains, oEvent.getSource().getValue())
			// 		],
			// 		or :false
			// }) ;
			// filtersa = new Filter("number", FilterOperator.Contains,event.getSource().getValue()); 
			binding = otble.getBinding("items");
			arr.push(filters);

			binding.filter(arr);
		},
		sortYear: function (oEvent) {
			var otble = this.getView().byId("table"),
				arr = [],
				binding,
				filters;
			filters = new Filter("year", FilterOperator.EQ, oEvent.getSource().getValue());
			// filtersa = new Filter("number", FilterOperator.Contains,event.getSource().getValue()); 
			binding = otble.getBinding("items");
			arr.push(filters);

			binding.filter(arr);
		},
		// sortTeam: function (oevent) {

		// 	var oView = this.getView();
		// 	var oList = oView.byId("table");
		// 	var oBinding = oList.getBinding("items");
		// 	var sortkey = oevent.getSource().getProperty("selectedKey");
		// 	var Dec = true;
		// 	var aSorter = [];

		// 	aSorter.push(new sap.ui.model.Sorter(sortkey, Dec));
		// 	oBinding.sort(aSorter);

		// },
		back: function () {
			var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("RouteView", {}, true);
			}
		},

		onExit: function () {
			this._oMockServer.stop();
		},
		onExport: sap.m.Table.prototype.exportData || function () {

			var oModel = sap.ui.getCore().getModel("iplData");
			var oExport = new Export({

				exportType: new ExportTypeCSV({
					fileExtension: "xls",
					separatorChar: "\t",
					charset: "utf - 8",
					mimeType: "application/vnd.ms-excel",

				}),

				models: this.getView().getModel("iplData"),

				rows: {
					path: "/player"
				},
				columns: [{
					name: "Name",
					template: {
						content: "{playerName}"
					}
				}, {
					name: "Teams",
					template: {
						content: "{tname}"
					}
				}, {
					name: "Mathches",
					template: {
						content: "{matches}"
					}
				}, {
					name: "Avg",
					template: {
						content: "{avg}"
					}
				}, {
					name: "Wickets",
					template: {
						content: "{wickets}"
					}
				}, {
					name: "100s",
					template: {
						content: "{100s}"
					}
				}, {
					name: "Runs",
					template: {
						content: "{runs}"
					}
				}, {
					name: "Year",
					template: {
						content: "{year}"
					}
				}]
			});
			//console.log(oExport);
			oExport.saveFile().catch(function (oError) {
				//MessageBox.error("Error when downloading data. Browser might not be supported!\n\n" + oError);
			}).then(function () {
				oExport.destroy();
			});
			// exportType : ExportType({
			// 		fileExtension : "xls"
			// 	});

			// var	aCols = this.createColumnConfig();

			// var oModel = oRowBinding.getModel();
			// var oModelInterface = oModel.getInterface();

			// oSettings = {
			// 	workbook: {
			// 		columns: aCols,
			// 		hierarchyLevel: 'Level'
			// 	}
			// }

		}

	});

});