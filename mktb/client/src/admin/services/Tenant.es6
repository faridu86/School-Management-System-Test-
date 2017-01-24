let Tenant = ($q, $http) => {
  class _Tenant {
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

    add() {

    }

    update() {

    }

    delete() {

    }
  }
  return new _Tenant();
};

export default Tenant;