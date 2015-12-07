var _ = require('underscore');
var UserAgent = require('useragent');

module.exports.isMobile = function(req, res, next) {

        var agent = UserAgent.parse(req.headers['user-agent']);
        var agent_device = agent.device.toString();

        req.isMobile = agent_device != "Other 0.0.0";

        next();
};
