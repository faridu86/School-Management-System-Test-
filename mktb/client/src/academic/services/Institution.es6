let Institution = ($q, $http) => {
  class Institution {
    list() {
    	let url = `dashboard/academic/institutions`;
    	return $http.get(url)
	      .then((response) => {
	      	return response.data;
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