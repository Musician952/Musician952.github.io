//====================================================================
// PHLiM2_ShutDownAddition.js
//====================================================================
/*:
 * @plugindesc Adds the Shutdown command into the Title screen and Game End screen, like previous RPG Makers.
 * @author PHLiM2
 * @param Shutdown Term
 * @desc The term used instead of 'Shutdown' [Default: Shutdown]
 * @default Shutdown
*/
//-----------------------------------------------------------------------------
// Window_TitleCommand
//
// The window for selecting New Game/Continue on the title screen.
(function() {
  var parameters = PluginManager.parameters('PHLiM2_ShutDownAddition');
  var shutdownTerm = String(parameters['Shutdown Term'] || 'Shutdown');

Window_TitleCommand.prototype.makeCommandList = function() {
    this.addCommand(TextManager.newGame, 'newGame');
    this.addCommand(TextManager.continue_, 'continue', this.isContinueEnabled());
    this.addCommand(TextManager.options,   'options');
    this.addCommand(shutdownTerm, 'shutDown');
  };
  Window_GameEnd.prototype.makeCommandList = function() {
      this.addCommand(TextManager.toTitle, 'toTitle');
      this.addCommand(shutdownTerm, 'shutDown');
      this.addCommand(TextManager.cancel,  'cancel');
  };
  Scene_Title.prototype.createCommandWindow = function() {
    this._commandWindow = new Window_TitleCommand();
    this._commandWindow.setHandler('newGame',  this.commandNewGame.bind(this));
    this._commandWindow.setHandler('continue', this.commandContinue.bind(this));
    this._commandWindow.setHandler('options',  this.commandOptions.bind(this));
    this._commandWindow.setHandler('shutDown',  this.commandshutDown.bind(this));
    this.addWindow(this._commandWindow);
  };
  Scene_GameEnd.prototype.createCommandWindow = function() {
      this._commandWindow = new Window_GameEnd();
      this._commandWindow.setHandler('toTitle',  this.commandToTitle.bind(this));
      this._commandWindow.setHandler('shutDown',  this.commandshutDown.bind(this));
      this._commandWindow.setHandler('cancel',   this.popScene.bind(this));
      this.addWindow(this._commandWindow);
  };
  Scene_Base.prototype.commandshutDown = function() {
    this._commandWindow.close();
    this.fadeOutAll();
    SceneManager.exit();
  };
})();
