jQuery.sap.declare("com.wfm.controls.progress");
jQuery.sap.require("sap.ui.core.Control");
sap.ui.core.Control.extend("com.wfm.controls.progress", {
	metadata: {
		properties: {
			label: {
				type: "string"
			},
			value: {
				type: "int"
			}
		},
		events: {
			valueChanged: {
				enablePreventDefault: true
			},
			press: {
				enablePreventDefault: true
			}
		}

	},
	onAfterRendering: function() {
		this._global = radialProgress(document.getElementById(this.getId()));
		___this___ = this;
		this._global
			.label(this._label)
			.diameter(200)
			.minValue(0)
			.value(this._value)
			.onClick(function() {
				___this___.firePress({
					value: ___this___.getControlProxy().value()
				});
			})
			.maxValue(100).render();
	},
	getControlProxy: function() {
		return this._global;

	},
	getValue: function() {
		return this._value;
	},

	setLabel: function(val) {
		this._label = val;
		if (this._global) {
			this.getControlProxy().label(val);
			this.getControlProxy().apply();
		}

	},
	setValue: function(val) {
		this._value = val;
		this.fireValueChanged({
			newValue: val
		});
		if (this._global) {
			this.getControlProxy().value(val);
			this.getControlProxy().apply();
		}

	},

	renderer: {
		render: function(oRm, oControl) {
			oRm.write('<div style="margin-top:40px"');
			oRm.writeControlData(oControl);
			oRm.write("></div>");
		}
	}

});