jQuery.sap.require("com.ecert.util.Formatter");
sap.ui.controller("com.ecert.View.Employees", {

	/**
	 * Called when a controller is instantiated and its View controls (if available) are already created.
	 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
	 * @memberOf View.Employees
	 */
	onInit: function() {
		this.router = sap.ui.core.UIComponent.getRouterFor(this);
		//		this.router.navTo("empDetails");
		//	this.getView().byId("traffic").setModel("model/control.json");
	},

	handleListSelect: function(evt) {
		var context = evt.getParameter("listItem").getBindingContext().sPath;
		sViewId = context.substring(context.lastIndexOf("/") + 1);
		this.router.navTo("empDetails", {
			data: sViewId
		});
	},
	handleListItemPress: function(evt) {
		var context = evt.getSource().getBindingContext().sPath;
		sViewId = context.substring(context.lastIndexOf("/") + 1);
		this.router.navTo("empDetails", {
			data: sViewId
		});
	},
	handleLiveChange: function(evt) {

		// create model filter
		var filters = [];
		var sQuery = evt.getParameters().newValue;
		if (sQuery && sQuery.length > 0) {
			var filter = new sap.ui.model.Filter("empName", sap.ui.model.FilterOperator.Contains, sQuery);
			filters.push(filter);
		}

		// update list binding
		var list = this.getView().byId("list");
		var binding = list.getBinding("items");
		binding.filter(filters);
	},

	/**
	 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
	 * (NOT before the first rendering! onInit() is used for that one!).
	 * @memberOf View.Employees
	 */
	//	onBeforeRendering: function() {
	//
	//	},

	/**
	 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
	 * This hook is the same one that SAPUI5 controls get after being rendered.
	 * @memberOf View.Employees
	 */
	//	onAfterRendering: function() {
	//
	//	},

	/**
	 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
	 * @memberOf View.Employees
	 */
	//	onExit: function() {
	//
	//	}

});