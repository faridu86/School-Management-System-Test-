let Institution = ($q, $http) => {
  class Institution {
  	list() {
  		let url = `/dashboard/tenant/institutions`;
  		return $http.get(url)
	      .then((response) => {
	      	return response.data;
	      })
	      .catch((error) => {
	      	console.error('error while listing Institution');
	      	throw error;
	      });
  	}
  	add(institution) {
  		let url = `/dashboard/tenant/institutions`;
  		return $http.post(url, {institution:institution})
        .then((response)=>{
          return response.data;
        })
        .catch((error) => {
          console.error('error while adding institution');
          throw error;
        });
  	}
  	update(institution) {
  		let url = `/dashboard/tenant/institutions/${institution.id}`;
  		return $http.put(url, {institution:institution})
        .then((response)=>{
          return response.data;
        })
        .catch((error) => {
          console.error('error while editing institution');
          throw error;
        });
  	}
  	delete(institution) {
  		let url = `/dashboard/tenant/institutions/${institution.id}`;
  		return $http.delete(url)
        .then((response)=>{
          return response.data;
        })
        .catch((error) => {
          console.error('error while deleting institution');
          throw error;
        });
  	}
  }
  return new Institution();
}

export default Institution;