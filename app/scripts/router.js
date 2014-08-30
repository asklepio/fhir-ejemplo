Fhir.Router.map(function () {
	this.resource('patients');
	this.route("patient", { path: "/patient/:patient_id" });
});
