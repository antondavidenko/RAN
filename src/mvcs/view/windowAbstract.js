var WindowAbstract = function() {
    var container;

    this.setupContainer = function(setContainer) {
        container = setContainer;
    };

    this.setVisible = function(setVisible) {
        container.visible = setVisible;
    }
};

module.exports = WindowAbstract;