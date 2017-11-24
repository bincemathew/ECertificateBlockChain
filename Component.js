jQuery.sap.declare("com.ecert.Component");

sap.ui.core.UIComponent.extend("com.ecert.Component", {

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
				viewPath: "com.ecert.View",
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
						pattern: "Employees/{data}",
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
		//		jQuery.sap.require("com.ecert.js.d3");                // you can call js library files like this also, but now we can do the same in the Metadata structure
		//		jQuery.sap.require("com.ecert.js.liquidFillGuage");  
		//		jQuery.sap.require("com.ecert.js.radialProgress");
		//		jQuery.sap.require("com.ecert.controls.progress");
		//		jQuery.sap.require("com.ecert.controls.liquidGuage")

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
			viewName: "com.ecert.View.App",
			type: "XML",
			viewData: {
				component: this
			}
		});

		var oModel = new sap.ui.model.json.JSONModel();// 'model/certificates.json'
		fetch('http://localhost:3000/api/Certificate').then(function(response) {
		response.json().then(function(data) {
			console.log(data);
			oModel.setData({certificates: data});
		 });

		  
		});

		
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
