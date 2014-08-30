Fhir.Router.map(function () {
	this.resource('patients');
	this.resource("patient", { path: "/patient/:patient_id" }, function() {
		this.resource("diagnostic_reports");		
	});
});
