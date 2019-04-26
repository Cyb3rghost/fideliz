var protocol = window.location.protocol;
var slashes = protocol.concat("//");
var host = slashes.concat(window.location.hostname);

var Configuration = {    
    hostnameServer: host,
    hostnameManuelServer: 'https://app.fidliz.com/'
}

export default Configuration