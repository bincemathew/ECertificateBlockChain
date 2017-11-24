jQuery.sap.require("com.ecert.controls.progress");
jQuery.sap.require("com.ecert.util.Formatter");
sap.ui.controller("com.ecert.View.EmpDetails", {

	/**
	 * Called when a controller is instantiated and its View controls (if available) are already created.
	 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
	 * @memberOf View.EmpDetails
	 */
	onInit: function() {
		this.router = sap.ui.core.UIComponent.getRouterFor(this);
		this.router.attachRoutePatternMatched(this._handleRouteMatched, this);

	},
	_handleRouteMatched: function(evt) {
		this.empIndex = evt.getParameter("arguments").data;

		var context = sap.ui.getCore().byId("splitApp").getModel().getContext('/certificates/' + this.empIndex);

		this.getView().setBindingContext(context);
	},
	openCompare: function() {
		this.router.navTo("Compare");
	},
		backToHome: function(){
		this.router.navTo("default");
	},
	onEditBtn: function() {
		var oRating = this.getView().byId("attendRating");
		var Status = oRating.getEnabled();
		if (Status == false) {
			oRating.setEnabled(true);
			$('#' + this.formId).slideDown('1000');
		} else {
			oRating.setEnabled(false);
			$('#' + this.formId).slideUp('1000');
		}

	},
	/**
	 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
	 * (NOT before the first rendering! onInit() is used for that one!).
	 * @memberOf View.EmpDetails
	 */
	//	onBeforeRendering: function() {
	//
	//	},

	/**
	 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
	 * This hook is the same one that SAPUI5 controls get after being rendered.
	 * @memberOf View.EmpDetails
	 */
	onAfterRendering: function() {
		circle = new com.ecert.controls.progress("myId", {
			value: 36,
			label: 'Status',
			valueChanged: function(erg) {},
			press: function(eArg) {}
		});
		var form = this.getView().byId("message");
		this.formId = form.sId;
		$('#' + this.formId).hide();
	},
	ratingChanged: function(evt) {
		var progress = this.getView().byId("progressControl");
		var rating = evt.getParameters().value;
		rating = (rating / 8) * 100;
		progress.setValue(rating);
	},
	/**
	 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
	 * @memberOf View.EmpDetails
	 */
	//	onExit: function() {
	//
	//	}

});