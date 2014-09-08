/*
Copyright (C) 2014  Safehis
author : Adolfo Carpio
e-mail : adolfo.carpio@safehis.com

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>
*/

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
		var patient_id = this.modelFor('patient').id;
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
