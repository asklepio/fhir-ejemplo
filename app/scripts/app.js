var Fhir = window.Fhir = Ember.Application.create({
	LOG_TRANSITIONS: true,
	LOG_ACTIVE_GENERATION: true
});
Fhir.applicationName = "Hospital de Zombies";
Fhir.fhirServer = "fhir.healthintersections.com.au/open";

/* Order and include as you please. */
require('scripts/controllers/*');
require('scripts/store');
require('scripts/models/*');
require('scripts/routes/*');
require('scripts/components/*');
require('scripts/views/*');
require('scripts/router');
