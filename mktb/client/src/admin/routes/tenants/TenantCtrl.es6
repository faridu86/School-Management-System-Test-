'use strict';
let TenantCtrl = (TenantService) => {
	class TenantCtrl {
		tenants;
		constructor() {
			TenantService.tenants().then( ( tenants)=> {
				this.tenants = tenants;
			})
		}
		tenant(id) {
			console.log(id)
		}
		add() {
			console.log("add")
		}
		update(id) {
			console.log("update")
		}
		delete(id) {
			console.log("delete")
		}
	}
	return new TenantCtrl;
}

export default TenantCtrl;