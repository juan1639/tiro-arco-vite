import { Scene } from 'phaser';
import { Textos } from '../components/textos.js';
import { FondoScroll } from '../components/fondoscroll.js';
import { play_sonidos } from '../functions/functions.js';
import { BotonNuevaPartida } from '../components/boton-nuevapartida.js';

export class MenuPrincipal extends Scene
{
    constructor()
    {
        super({key: 'menuprincipal'});
    }

    init()
    {
        this.fondoscroll = new FondoScroll(this);
        this.botoninicio = new BotonNuevaPartida(this);

        this.txt = new Textos(this, {
            x: Math.floor(this.sys.game.config.width / 2),
            y: 0,
            txt: ' Archery ',
            size: 110, color: '#ffa', style: 'bold',
            stroke: '#f91', sizeStroke: 16,
            shadowOsx: 2, shadowOsy: 2, shadowColor: '#111',
            bool1: false, bool2: true, origin: [0.5, 0.5],
            elastic: Math.floor(this.sys.game.config.height / 4), dura: 3000
        });
    }

    create()
    {
        this.sonidoMarioTuberias = this.sound.add('mario-tuberias');

        const aparecerBoton = 1800; // 1800

        this.fondoscroll.create();
        
        this.add.image(
            this.sys.game.config.width / 2, this.sys.game.config.height / 1.6, 'archery-img'
        );

        this.txt.create();

        this.add.timeline([
            {
                at: aparecerBoton,
                run: () => {
                    this.botoninicio.create('prenivel', false);
                }
            }
        ]).play();

        play_sonidos(this.sonidoMarioTuberias, false, 0.7);

        console.log(this.txt);
    }
}
