var doRestart = function ()
{
    var pageURL = window.location.href;
    window.location.href = pageURL.substr(0, pageURL.indexOf("?")) + "?reset";
};

module.exports = doRestart;