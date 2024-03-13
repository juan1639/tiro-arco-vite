import { Scene } from 'phaser';
import { Textos } from '../components/textos.js';
import { FondoScroll } from '../components/fondoscroll.js';
import { BotonNuevaPartida, ElegirControles } from '../components/boton-nuevapartida.js';
import { Settings } from './settings.js';

export class Prenivel extends Scene
{
    constructor() 
    {
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
        this.botoninicio = new BotonNuevaPartida(this);

        this.radiobuttons = [];

        this.radiobuttons.push(new ElegirControles(this, {
            left: Math.floor(this.sys.game.config.width / 18),
            top: Math.floor(this.sys.game.config.height / 1.9),
            frame: 1, scale: 1, texto: ' Touch / mouse ', id: 'mobile'
        }));

        this.radiobuttons.push(new ElegirControles(this, {
            left: Math.floor(this.sys.game.config.width / 18),
            top: Math.floor(this.sys.game.config.height / 1.55),
            frame: 0, scale: 1, texto: ' Keyboard / spacebar ', id: 'teclado'
        }));

        this.txt = new Textos(this, {
            x: Math.floor(this.sys.game.config.width / 20),
            y: Math.floor(this.sys.game.config.height / 25),
            txt: ' Press and keep press space bar\n or if you use a touch device,\n touch and keep touch\n to shoot an arrow.',
            size: 38, color: '#ffa', style: 'bold',
            stroke: '#2f2', sizeStroke: 16,
            shadowOsx: 2, shadowOsy: 2, shadowColor: '#111',
            bool1: false, bool2: true, origin: [0, 0],
            elastic: false, dura: 0
        });
    }

    create()
    {
        this.fondoscroll.create();
        this.txt.create();
        this.radiobuttons.forEach(radiobutton => radiobutton.create());

        this.botoninicio.create('game', false);

        console.log(this.txt);
    }
}
