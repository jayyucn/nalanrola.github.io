(function () {
    'use strict';

    class App {
        constructor() {
            this.startUp();
        }
        startUp() {
            fgui.GRoot.inst.on(fgui.Events.SIZE_CHANGED, this, this.OnSizeChanged);
            fgui.UIPackage.loadPackage(`res/UI/HomeModule`, Laya.Handler.create(this, this.onUILoaded));
        }
        onUILoaded() {
            this._view = fgui.UIPackage.createObject("HomeModule", "HomeView").asCom;
            this.makeFullScreen();
            fgui.GRoot.inst.addChild(this._view);
        }
        OnSizeChanged() {
            this.makeFullScreen();
        }
        makeFullScreen() {
            this._view.makeFullScreen();
        }
    }

    class GameConfig {
        constructor() { }
        static init() {
        }
    }
    GameConfig.width = 1136;
    GameConfig.height = 640;
    GameConfig.scaleMode = "full";
    GameConfig.screenMode = "none";
    GameConfig.alignV = "top";
    GameConfig.alignH = "left";
    GameConfig.startScene = "test/TestScene.scene";
    GameConfig.sceneRoot = "";
    GameConfig.debug = false;
    GameConfig.stat = false;
    GameConfig.physicsDebug = false;
    GameConfig.exportSceneToJson = true;
    GameConfig.init();

    class Main {
        constructor() {
            Laya.init(GameConfig.width, GameConfig.height, Laya["WebGL"]);
            Laya.stage.scaleMode = GameConfig.scaleMode;
            Laya.stage.screenMode = GameConfig.screenMode;
            Laya.stage.alignV = GameConfig.alignV;
            Laya.stage.alignH = GameConfig.alignH;
            Laya.stage.bgColor = "#CCCCCC";
            Laya.URL.exportSceneToJson = GameConfig.exportSceneToJson;
            if (GameConfig.debug || Laya.Utils.getQueryString("debug") == "true")
                Laya.enableDebugPanel();
            if (GameConfig.physicsDebug && Laya["PhysicsDebugDraw"])
                Laya["PhysicsDebugDraw"].enable();
            if (GameConfig.stat)
                Laya.Stat.show();
            Laya.ResourceVersion.enable("version.json", Laya.Handler.create(this, this.onVersionLoaded), Laya.ResourceVersion.FILENAME_VERSION);
        }
        onVersionLoaded() {
            Laya.AtlasInfoManager.enable("fileconfig.json", Laya.Handler.create(this, this.onConfigLoaded));
        }
        onConfigLoaded() {
            Laya.stage.addChild(fgui.GRoot.inst.displayObject);
            new App();
        }
    }
    new Main();

}());
