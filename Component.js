jQuery.sap.declare("com.wfm.Component");

sap.ui.core.UIComponent.extend("com.wfm.Component", {

	metadata: {
		"abstract": true,
		version: "1.0",
		includes: [
			"styles/style.css",
			"js/d3.js",
			"js/liquidFillGuage.js",
			"js/radialProgress.js",
			"controls/progress.js",
			"controls/liquidGuage.js"
		],
		routing: {

			config: {
				viewType: "XML",
				viewPath: "com.wfm.View",
				clearTarget: false,
				transition: "slide"
			},
			routes: [{
					pattern: "",
					name: "default",
					view: "Employees",
					targetControl: "splitApp",
					targetAggregation: "masterPages",
					subroutes: [{
						pattern: "employees/{data}",
						name: "empDetails",
						view: "EmpDetails",
						targetAggregation: "detailPages"
					}, {
						pattern: "Compare",
						name: "Compare",
						view: "Compare",
						targetAggregation: "detailPages"
					}]
				},

			]

		}

	},

	init: function() {
		//		jQuery.sap.require("com.wfm.js.d3");                // you can call js library files like this also, but now we can do the same in the Metadata structure
		//		jQuery.sap.require("com.wfm.js.liquidFillGuage");  
		//		jQuery.sap.require("com.wfm.js.radialProgress");
		//		jQuery.sap.require("com.wfm.controls.progress");
		//		jQuery.sap.require("com.wfm.controls.liquidGuage")

		jQuery.sap.require("sap.m.routing.RouteMatchedHandler");
		jQuery.sap.require("sap.ui.core.routing.HashChanger");

		//call createContent
		sap.ui.core.UIComponent.prototype.init.apply(this, arguments);

		this._router = this.getRouter();

		//initlialize the router
		this._routeHandler = new sap.m.routing.RouteMatchedHandler(this._router);
		this._router.initialize();

	},

	createContent: function() {

		var oView = sap.ui.view({
			id: "splitApp",
			viewName: "com.wfm.View.App",
			type: "XML",
			viewData: {
				component: this
			}
		});

		var oModel = new sap.ui.model.json.JSONModel('model/Employees.json');
		oView.setModel(oModel);

		// set i18n model
		var i18nModel = new sap.ui.model.resource.ResourceModel({
			bundleUrl: "i18n/i18n.properties"
		});
		oView.setModel(i18nModel, "i18n");

		// set device model
		var deviceModel = new sap.ui.model.json.JSONModel({
			classmode: (sap.ui.Device.system.phone) ? csmod = "center" : csmod = "center1",
			isPhone: sap.ui.Device.system.phone,
			listMode: (sap.ui.Device.system.phone) ? "None" : "SingleSelectMaster",
			listItemType: (sap.ui.Device.system.phone) ? "Active" : "Inactive"
		});
		deviceModel.setDefaultBindingMode("OneWay");
		oView.setModel(deviceModel, "device");
		return oView;

	}

})