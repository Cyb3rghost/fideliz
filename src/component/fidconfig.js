var protocol = window.location.protocol;
var slashes = protocol.concat("//");
var host = slashes.concat(window.location.hostname);

var Configuration = {    
    hostnameServer: host,
    hostnameManuelServer: 'http://192.168.1.3/'
}

export default Configuration