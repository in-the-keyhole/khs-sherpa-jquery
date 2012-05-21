function RealTypeOf(v) {
	if (typeof (v) == "object") {
		if (v === null)
			return "null";
		if (v.constructor == (new Array).constructor)
			return "array";
		if (v.constructor == (new Date).constructor)
			return "date";
		if (v.constructor == (new RegExp).constructor)
			return "regex";
		return "object";
	}
	return typeof (v);
}

function FormatJSON(oData, sIndent) {
	if (arguments.length < 2) {
		var sIndent = "";
	}
	var sIndentStyle = "    ";
	var sDataType = RealTypeOf(oData);
	if (sDataType == "array") {
		if (oData.length == 0) {
			return "[]";
		}
		var sHTML = "[";
	} else {
		var iCount = 0;
		$.each(oData, function() {
			iCount++;
			return;
		});
		if (iCount == 0) {
			return "{}";
		}
		var sHTML = "{";
	}
	var iCount = 0;
	$.each(oData,
			function(sKey, vValue) {
				if (iCount > 0) {
					sHTML += ",";
				}
				if (sDataType == "array") {
					sHTML += ("\n" + sIndent + sIndentStyle);
				} else {
					sHTML += ("\n" + sIndent + sIndentStyle + "\"" + sKey
							+ "\"" + ": ");
				}

				switch (RealTypeOf(vValue)) {
				case "array":
				case "object":
					sHTML += FormatJSON(vValue, (sIndent + sIndentStyle));
					break;
				case "boolean":
				case "number":
					sHTML += vValue.toString();
					break;
				case "null":
					sHTML += "null";
					break;
				case "string":
					sHTML += ("\"" + vValue + "\"");
					break;
				default:
					sHTML += ("TYPEOF: " + typeof (vValue));
				}
				iCount++;
			});
	if (sDataType == "array") {
		sHTML += ("\n" + sIndent + "]");
	} else {
		sHTML += ("\n" + sIndent + "}");
	}
	return sHTML;
}