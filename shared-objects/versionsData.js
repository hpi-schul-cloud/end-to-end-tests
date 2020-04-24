const { CLIENT, SERVER } = require("./servers");

module.exports ={
	nuxt: `${CLIENT.URL}/nuxtversion`,
	client: `${CLIENT.URL}/version`,
	server: `${SERVER.URL}/version`,
}
