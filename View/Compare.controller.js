jQuery.sap.require("com.ecert.util.Formatter");
sap.ui.define("sap.ui.core.routing.History");
sap.ui.controller("com.ecert.View.Compare", {

	/**
	 * Called when a controller is instantiated and its View controls (if available) are already created.
	 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
	 * @memberOf View.Home
	 */
	onInit: function(oEvent) {
		this.router = sap.ui.core.UIComponent.getRouterFor(this);
		this.router.attachRoutePatternMatched(this._handleRouteMatched, this);
		this.loadChart(oEvent);

		//        var oPersId = {container: "com.ecert.View.Compare", item: "Table"};
		//        var oProvider = sap.ushell.Container.getService("Personalization").getPersonalizer(oPersId);
		//        this.oTablePerso                = new sap.m.TablePersoController({
		//                                                table: sap.ui.getCore().byId("Table"),
		//                                                persoService: oProvider
		//                                            }).activate();
	},
	_handleRouteMatched: function(evt) {
		this.empIndex = evt.getParameter("arguments").data;

		var context = sap.ui.getCore().byId("splitApp").getModel().getContext('/employees/' + this.empIndex);

		this.getView().setBindingContext(context);
	},
	backToEmpDetails: function() {
		var oHistory = sap.ui.core.routing.History.getInstance();
		var sPreviousHash = oHistory.getPreviousHash();
		if (sPreviousHash !== undefined) {
			history.go(-1);
		} else {
			var bReplace = true;
			this.router.navTo("empDetails", {}, bReplace);
		}
	},
	loadChart: function(oEvent) {
		var oVizFrame = this.getView().byId("idVizFrameColumn");
		var oPopOver = this.getView().byId("idPopOver");
		//        var oModel = new sap.ui.model.json.JSONModel("model/Employees.json");
		var oDataset = new sap.viz.ui5.data.FlattenedDataset({
			dimensions: [{
				name: "Employees",
				value: "{empName}"
			}, {
				name: "Attendance",
				value: "{attendance} % Attendance"
			}],
			measures: [{
				name: 'Total Hours Clocked',
				value: '{total}'
			}],
			data: {
				path: "/employees"
			}

		});

		oVizFrame.setDataset(oDataset);
		//        oVizFrame.setModel(oModel);

		var feedValueAxis = new sap.viz.ui5.controls.common.feeds.FeedItem({
				'uid': "valueAxis",
				'type': "Measure",
				'values': ["Total Hours Clocked"]
			}),
			feedCategoryAxis = new sap.viz.ui5.controls.common.feeds.FeedItem({
				'uid': "categoryAxis",
				'type': "Dimension",
				'values': ["Employees"]
			}),
			feedColor = new sap.viz.ui5.controls.common.feeds.FeedItem({
				'uid': "color",
				'type': "Dimension",
				'values': ["Attendance"]
			});

		oVizFrame.setVizProperties({
			plotArea: {
				dataLabel: {
					visible: true,
					formatString: "#,##0"
				}
			},
			legend: {
				title: {
					visible: false
				}
			},

			title: {
				visible: true,
				text: 'Employee Attendance Chart'
			}
		});

		oVizFrame.addFeed(feedValueAxis);
		oVizFrame.addFeed(feedCategoryAxis);
		oVizFrame.addFeed(feedColor);
		oPopOver.connect(oVizFrame.getVizUid());

	}

	/**
	 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
	 * (NOT before the first rendering! onInit() is used for that one!).
	 * @memberOf View.Home
	 */
	//	onBeforeRendering: function() {
	//
	//	},

	/**
	 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
	 * This hook is the same one that SAPUI5 controls get after being rendered.
	 * @memberOf View.Home
	 */
	//	onAfterRendering: function() {
	//
	//	},

	/**
	 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
	 * @memberOf View.Home
	 */
	//	onExit: function() {
	//
	//	}

});