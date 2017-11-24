jQuery.sap.declare("com.wfm.util.Formatter");

jQuery.sap.require("sap.ui.core.format.DateFormat");

com.wfm.util.Formatter = {

	_statusStateMap: {
		"P": "Success",
		"N": "Warning"
	},

	statusText: function(value) {
		//		debugger;
		var bundle = this.getModel("i18n").getResourceBundle();
		return bundle.getText("StatusText" + value, "?");
	},
	statusType: function(value) {

		if (value == "") {
			value = " ";
		}
		return value;
	},
	BillType: function(value) {

		if (value == "Y") {
			value = "Billable";
		} else {
			value = "Non Billable";
		}
		return value;
	},
	BillState: function(value) {
		var map = com.wfm.util.Formatter._statusStateMap;
		return (value && map[value]) ? map[value] : "None";
	},

	statusState: function(value) {
		var map = com.wfm.util.Formatter._statusStateMap;
		return (value && map[value]) ? map[value] : "None";
	},
attendanceState: function(value) {
	if (value >= "60")
		{
		var status = "Success";
		}
	else{
		var status ="Warning";
	}
	return (status);
},
	date: function(value) {
		if (value) {
			var oDateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({
				pattern: "yyyy-MM-dd"
			});
			return oDateFormat.format(new Date(value));
		} else {
			return value;
		}
	},
	float: function(value) {
//		console.log(value);
		return parseFloat(value);
		
	},
int: function(value) {
	return parseInt(value);
},
	quantity: function(value) {
		try {
			return (value) ? parseFloat(value).toFixed(0) : value;
		} catch (err) {
			return "Not-A-Number";
		}
	}
};