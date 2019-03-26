var protocol = window.location.protocol;
var slashes = protocol.concat("//");
var host = slashes.concat(window.location.hostname);

var Configuration = {    
    hostnameServer: host,
    hostnameManuelServer: 'http://127.0.0.1/'
}

export default Configuration