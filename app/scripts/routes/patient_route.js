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

function parseSinglePatientRecord(record) {
	if ('id' in record) {
		var idArray = record.id.split('/');
		var givenName = '';
		var familyName = '';
		var patientSex = '';
		var patientBirthDate = '';
		if ('content' in record) {
			if ('name' in record.content && record.content.name instanceof Array) {
				givenName = record.content.name[0].given;
				familyName = record.content.name[0].family;
			} else {
				givenName = 'SIN DATOS';
				familyName = 'SIN DATOS';
			}
			if ('gender' in record.content && 'coding' in record.content.gender && record.content.gender.coding instanceof Array) {
				patientSex = record.content.gender.coding[0].code;
			} else {
				patientSex = 'SIN DATOS';
			}
			if ('birthDate' in record.content) {
				patientBirthDate = record.content.birthDate;
			} else {
				patientBirthDate = 'SIN DATOS';
			}
			return Fhir.Patient.create({
				id: idArray[idArray.length - 1],
				given: givenName,
				family: familyName,
				sex: patientSex,
				birthDate: patientBirthDate
			});
		}
	}

	return undefined;
}

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
