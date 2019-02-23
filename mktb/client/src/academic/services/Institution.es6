let Institution = ($http) => {
  class Institution {
  	institutions;
  	institution;
  	list() {
    	let url = `dashboard/academic/institutions`;
    	return $http.get(url)
	      .then((response) => {
	      	this.institutions = response.data;
	      	return this.institutions;
	      })
	      .catch((error) => {
	      	console.error('error while listing institutions');
	      	throw error;
	      });
  	}
  	getInstitution(id) {
  		let url = `dashboard/academic/institutions/${id}`;
    	return $http.get(url)
	      .then((response) => {
	      	this.institution = response.data;
	      	return this.institution;
	      })
	      .catch((error) => {
	      	console.error('error while listing institutions');
	      	throw error;
	      });
  	}
  }
	return new Institution();
};

export default Institution;