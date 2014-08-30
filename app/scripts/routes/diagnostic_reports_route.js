function parseDiagnosticReport(record) {
	if ('id' in record) {
		console.log(record.id);
		var idArray = record.id.split('/');
		return Fhir.DiagnosticReport.create({
			id: idArray[idArray.length - 1],
			authorName: record.author.name,
			summary: record.summary
		});
	}

	return undefined;
}

Fhir.DiagnosticReportsRoute = Ember.Route.extend({
	model: function(params) {
		var patient_id = this.modelFor('patient').id
		var diagnosticReports = [];

		var newDiagnosticReport;
		var url = 'http://' + Fhir.fhirServer + '/DiagnosticReport/?subject=' + patient_id + '&_format=application/json+fhir';
		console.log("DiagnosticReportsRoute url is " + url);
		Ember.$.getJSON(url).then(function(response) {
			response.entry.forEach(function(anEntry) {
				var newRecord = parseDiagnosticReport(anEntry);
				if (newRecord !== undefined) {
					diagnosticReports.pushObject(newRecord);
				}
			});
			console.log("Returning " + diagnosticReports.length + " diagnostic reports");
			
		});

		return diagnosticReports;
	}
});
