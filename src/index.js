import { Iniciar } from './scenes/iniciar.js';
import { Preload } from './scenes/preload.js';
import { MenuPrincipal } from './scenes/menuprincipal.js';
import { Prenivel } from './scenes/prenivel.js';
import { Game } from './scenes/Game.js';

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: 'game-container',
  scene: [Iniciar, Preload, MenuPrincipal, Prenivel, Game],
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {y: 700},
      debug: false
    }
  },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  }
}

export default new Phaser.Game(config);
