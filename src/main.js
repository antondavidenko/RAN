main = () =>
{
    var pageURL = window.location.href;
    var ranView;
    this.gameModel = new GameModel();
    //var pokerAnimation = new PokerAnimation(pokerView);

    var app = new PIXI.Application(950, 654, {backgroundColor: 0xf1da0e});
    document.body.appendChild(app.view);

    PIXI.loader
        .add('img/cards1.json')
        .add('img/cards2.json')
        .add('img/cards3.json')
        .add('img/animation.json')
        .add('img/ui.json')
        .load(onAssetsLoaded);

    window.onload = function () {
        resize();
    };

    function resize() {
        var w = window.innerWidth;
        var h = window.innerHeight;

        var multiplayer = ((w / 950) < (h / 654)) ? (w / 950) : (h / 654);

        app.renderer.view.style.height = 654 * multiplayer + "px";
        app.renderer.view.style.width = 950 * multiplayer + "px";
        app.renderer.view.style.position = 'absolute';
        app.renderer.view.style.left = ((window.innerWidth - 950 * multiplayer) / 2) + 'px';
        app.renderer.view.style.top = ((window.innerHeight - 654 * multiplayer) / 2) + 'px';
    }

    window.addEventListener('resize', resize);

    function onAssetsLoaded() {
        $.getJSON("cards_map.json", onTilesInfoLoaded);
    }

    function onTilesInfoLoaded(tilesInfoJSON) {
        gameModel.tilesInfo = tilesInfoJSON;
        gameModel.setupGame();
        $.getJSON("./mvcs/view/ranScene.json", onSceneLoaded);
    }

    function onSceneLoaded(sceneJSON) {
        ranView = new sceneBuilder(new RanView(), sceneJSON);
        ranViewCallbacks = new RanViewCallbacksVO(pocketCallback, changeCallback, rotateCallback);
        ranView.init(app.stage, ranViewCallbacks);
        ranView.renderTable(gameModel.getViewData());

        app.ticker.add(function (delta) {
            //pokerAnimation.animationTicker(delta, pokerView);
        });
    }

    function pocketCallback(data) {
        new doInsertCard(gameModel, data);
        ranView.renderTable(gameModel.getViewData());
    }

    function changeCallback(data) {
        new doChangePocket(gameModel, data, true);
        ranView.renderTable(gameModel.getViewData());
    }

    function rotateCallback(data) {
        new doRotatePocket(gameModel, data);
        ranView.renderTable(gameModel.getViewData());
    }
}