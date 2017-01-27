'use strict';
let InstitutionsCtrl = (InstitutionService) => {
	class Institutions {
		institutions;
		constructor() {
			this.list();
		}
		list(){
			InstitutionService.list().then( (institutions) => {
				this.institutions = institutions;
			})
		}
	}
	return new Institutions();
}

export default InstitutionsCtrl;