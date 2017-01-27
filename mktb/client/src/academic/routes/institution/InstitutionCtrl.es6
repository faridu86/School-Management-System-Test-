'use strict';
let InstitutionCtrl = (InstitutionService, $state) => {
	class Institution {
		institution;
		constructor() {
			let id = $state.params.institution_id;
			this.institution = InstitutionService.institution;
			InstitutionService.getInstitution(id).then( (institution)=> {
				this.institution = institution;
			})
		}
	}
	
	return new Institution();
}

export default InstitutionCtrl;