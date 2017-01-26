let Tenant = ($q, $http) => {
  class Tenant {
    tenants() {
    	let url = `/dashboard/admin/tenants`;
    	return $http.get(url)
	      .then((response) => {
	      	return response.data;
	      })
	      .catch((error) => {
	      	console.error('error while listing tenants');
	      	throw error;
	      });
    }

    findUser(email){
      let url = `/dashboard/admin/tenants/find-user?email=${email}`;
      return $http.get(url)
        .then((response)=>{
          return response.data;
        })
        .catch((error) => {
          console.error('error while finding user');
          throw error;
        });
    }

    add(tenant) {
      let url = `/dashboard/admin/tenants`;
      return $http.post(url, {tenant:tenant})
        .then((response)=>{
          return response.data;
        })
        .catch((error) => {
          console.error('error while adding tenant');
          throw error;
        });
    }

    update(tenant) {
      let url = `/dashboard/admin/tenants/${tenant.id}`;
      return $http.put(url, {tenant:tenant})
        .then((response)=>{
          return response.data;
        })
        .catch((error) => {
          console.error('error while updating tenant');
          throw error;
        });
    }

    delete(tenant) {
      let url = `/dashboard/admin/tenants/${tenant.id}`;
      return $http.delete(url)
        .then((response)=>{
          return response.data;
        })
        .catch((error) => {
          console.error('error while deleting tenant');
          throw error;
        });
    }
  }
  return new Tenant();
};

export default Tenant;