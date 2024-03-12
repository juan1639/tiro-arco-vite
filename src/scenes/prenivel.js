import { Scene } from 'phaser';
import { Textos } from '../components/textos.js';
import { FondoScroll } from '../components/fondoscroll.js';
import { centrar_txt, play_sonidos } from '../functions/functions.js';
import { Jugador } from '../components/jugador.js';
import { BotonNuevaPartida } from '../components/boton-nuevapartida.js';
import { Settings } from './settings.js';

export class Prenivel extends Scene
{
    constructor() {
        super({ key: 'prenivel' });
    }

    init()
    {
        Settings.setPuntos(0);
        Settings.setIncPuntos(0);
        Settings.setAnimaInicial(true);
        Settings.setGameOver(false);
        Settings.setFlechaNro(0);

        this.fondoscroll = new FondoScroll(this);
        // this.jugador = new Jugador(this);
        this.txt = new Textos(this);
        this.botoninicio = new BotonNuevaPartida(this);
    }

    create()
    {
        this.fondoscroll.create();
        // this.jugador.create(this.scene.key);

        // -----------------------------------------------------------
        const left = Math.floor(this.sys.game.config.width / 5.2);
        const top = Math.floor(this.sys.game.config.height / 4);

        this.txt.create(
        {
            x: left, y: top, texto: ' Pulsa y deja pulsada la tecla\n Space o si utilizas un dispositivo\n tactil toca y deja presionada\n para tirar una flecha.',
            size: 30, style: 'bold', oofx: 1, offy: 1, col: '#fff', blr: 15,
            fillShadow: true, fll: '#3a1', family: 'verdana, arial, sans-serif',
            screenWidth: this.sys.game.config.width, multip: 1
        });

        this.botoninicio.create('game', false);

        console.log(this.txt);
    }
}