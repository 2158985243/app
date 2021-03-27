import url from '../api/configuration.js'

function imgFn(v) {
	return url.domain + v
}

module.exports = {
	imgFn
}
