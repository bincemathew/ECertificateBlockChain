jQuery.sap.declare("com.wfm.controls.liquidGuage");
jQuery.sap.require("sap.ui.core.Control");

sap.ui.core.Control.extend("com.wfm.controls.liquidGuage", {
	metadata: {
		properties: {
			guage:{
				type:"string"
			},
			fillPercent: {
				type: "string"
			}
		}

	},
	onAfterRendering: function() {
		 var config = liquidFillGaugeDefaultSettings();
		 var attendance = parseInt(this.getFillPercent());
		 if (attendance <= 5){
			 config.waveColor = "#EA1616";
		 }
		 else if (attendance >= 7){
			 config.waveColor = "#42B524";
		 }
		this._global = loadLiquidFillGauge(this.getId(),this.getFillPercent(),config);
	},
	renderer: {
		render: function(oRm, oControl) {
			oRm.write('<div style="margin-top:47px"><svg ');
			oRm.writeControlData(oControl);
			oRm.write("></svg></div>");
		}
	}
});