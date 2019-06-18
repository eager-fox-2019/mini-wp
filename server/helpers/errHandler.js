module.exports = function(err){
	let errorDetail = {status: 400, message: "Invalid access token"}
	if(err.status) {
		errorDetail.status = err.status
		switch (err.status){
			case (401):
				errorDetail.message = 'Unauthorized access'
				break;
			case (403):
				errorDetail.message = 'Forbidden access'
				break;
			case (404):
				errorDetail.message = 'Page not found'
				break;
			case (500):
				errorDetail.message = 'Internal server error'
				break;
			default:
				errorDetail.message = err.message
		}
	}
	return errorDetail
}