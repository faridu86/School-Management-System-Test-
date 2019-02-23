'use strict';
let TenantCtrl = (TenantService, $uibModal, Notification) => {
	class TenantCtrl {
		tenants;
		constructor() {
			this.list();
		}
		list() {
			TenantService.tenants().then( ( tenants)=> {
				this.tenants = tenants;
			})
		}
		tenant(tenant) {
			let self = this;

			class TenantModal {
				tenant;
				user;
				userEmail;
				constructor($uibModalInstance, tenant) {
					this.tenant = _.extend({}, tenant)
					if(this.tenant.id) {
						this.userEmail = this.tenant.user.v_email;
					}
					this.$uibModalInstance = $uibModalInstance;
				}
				save() {
					if(!tenant.id) {
						TenantService.add(this.tenant).then( (tenant) => {
							this.tenant.id = tenant.id;
							this.close();
							self.list();
							Notification.success('Added Tenant!');
						});
					}else{
						TenantService.update(this.tenant).then( (tenant) => {
							this.close();
							self.list();
							Notification.success('Updated Tenant!');
						});
					}
				}
				delete() {
					if (confirm("Are you sure? you want to delete the Tenant?") ) {
						TenantService.delete(this.tenant).then( (tenant) => {
							this.close();
							self.list();
							Notification.success('Deleted Tenant!');
						});
					}
				}
				close() {
					this.$uibModalInstance.dismiss('cancel');
				}
				findUser() {
					TenantService.findUser(this.userEmail).then( (user) => {
						if(user && user.id) {
							this.tenant.user = user;
							this.tenant.fk_user_id = user.id;
						}else{
							alert("Either User with Email does not exist, or is already registered as Tenant.")
						}
					})
				}
			}

			let tenantViewModal = $uibModal.open({
				controller: TenantModal,
				controllerAs: 'ctrl',
				bindToController: true,
				windowClass: 'modal-tenant-view',
				templateUrl: './routes/tenants/modal.html',
				resolve: {
					tenant: () => { return tenant; }
				}
			});
			
			tenantViewModal.result.finally(function(){});

		}
	}
	return new TenantCtrl;
}

export default TenantCtrl;