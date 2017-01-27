'use strict';
let InstitutionCtrl = (TenantInstitutionService, $uibModal, Notification) => {
	class InstitutionCtrl {
		institutions;
		constructor() {
			this.list();
		}
		list() {
			TenantInstitutionService.list().then( (institutions)=>{
				this.institutions = institutions;
			});
		}
		institution(institution) {
			let self = this;

			class InstitutionModal {
				institution;
				constructor($uibModalInstance, institution) {
					this.institution = _.extend({}, institution)
					this.$uibModalInstance = $uibModalInstance;
				}
				save() {
					if(!institution.id) {
						TenantInstitutionService.add(this.institution).then( (institution) => {
							this.institution.id = institution.id;
							this.close();
							self.list();
							Notification.success('Added Institution!');
						});
					}else{
						TenantInstitutionService.update(this.institution).then( (institution) => {
							this.close();
							self.list();
							Notification.success('Updated Institution!');
						});
					}
				}
				delete() {
					if (confirm("Are you sure? you want to delete the Institution?") ) {
						TenantInstitutionService.delete(this.institution).then( (institution) => {
							this.close();
							self.list();
							Notification.success('Deleted Institution!');
						});
					}
				}
				close() {
					this.$uibModalInstance.dismiss('cancel');
				}
			}

			let institutionViewModal = $uibModal.open({
				controller: InstitutionModal,
				controllerAs: 'ctrl',
				bindToController: true,
				windowClass: 'modal-institution-view',
				templateUrl: './routes/institutions/modal.html',
				resolve: {
					institution: () => { return institution; }
				}
			});

			institutionViewModal.result.finally(function(){});
		}
	}
	return new InstitutionCtrl();
}

export default InstitutionCtrl;