Fhir.PatientRoute = Ember.Route.extend({
	model: function(patient) {
		var newPatient;
		var url = 'http://' + Fhir.fhirServer + '/Patient/' + patient.patient_id + '?_format=application/json+fhir';
		return Ember.$.getJSON(url).then(function(response) {
			return Fhir.Patient.create({
				id: patient.patient_id,
				given: response.name[0].given,
				family: response.name[0].family,
				sex: response.gender.coding[0].code,
				identifierLabel: response.identifier[0].label,
				identifierValue: response.identifier[0].value,
				phone: response.hasOwnProperty('telecom') ? response.telecom[0].value : "",
				address: response.hasOwnProperty('address') ? response.address[0].line : "",
			});
		});
	}
});
