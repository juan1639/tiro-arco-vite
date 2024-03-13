import { Scene } from 'phaser';
import { Textos } from '../components/textos.js';

export class Preload extends Scene
{
    constructor()
    {
        super({ key: 'preload' });
    }

    init()
    {
        const widthScreen = this.sys.game.config.width;
        const heightScreen = this.sys.game.config.height;

        this.txt = new Textos(this, {
            x: Math.floor(widthScreen / 2),
            y: Math.floor(heightScreen / 3.5),
            txt: ' Loading...',
            size: 55, color: '#ffa', style: 'bold',
            stroke: '#f91', sizeStroke: 16,
            shadowOsx: 2, shadowOsy: 2, shadowColor: '#111',
            bool1: false, bool2: true, origin: [0.5, 0.5],
            elastic: false, dura: 0
        });

        this.txt.create();

        this.add.rectangle(
            Math.floor(widthScreen / 2), Math.floor(heightScreen / 2),
            Math.floor(widthScreen / 1.5), Math.floor(heightScreen / 12)
        ).setStrokeStyle(1, 0xffee88);

        const bar = this.add.rectangle(
            Math.floor(widthScreen / 2) - Math.floor(widthScreen / 3) + 4,
            Math.floor(heightScreen / 2),
            4,
            Math.floor(heightScreen / 14),
            0xff9911
        );

        this.load.on('progress', (progress) => {
            bar.width = (Math.floor(widthScreen / 1.52) * progress);
        });
    } 
    
    preload()
    {
        this.load.setPath('assets');

        this.load.image('fondo-scroll', './img/fondo-cielo3200x600.png');

        this.load.image('boton-nueva-partida', './img/boton-start.png');
        this.load.spritesheet('boton-fullscreen', './img/boton-fullscreen.png', {frameWidth: 64, frameHeight: 64});
        this.load.spritesheet('radio-buttons', './img/radio-buttons-ssheet.png', {frameWidth: 50, frameHeight: 50});
        this.load.image('archery-img', './img/archeryImg.png');

        this.load.image('tile-suelo', './img/tile-suelo.png');
        this.load.image('barra-fuerza', './img/barra-energia.png');
        this.load.image('diana', './img/diana-tiroArco.png');

        // this.load.image('arco', './img/arco-v2.png');
        this.load.spritesheet('arco', './img/arco-v3-ssheet.png', {frameWidth: 75, frameHeight: 100});
        // scene.load.image('flecha', './src/img/flecha.png');
        this.load.image('flecha', './img/flecha-v2.png');
        this.load.image('flecha-c', './img/flecha-c.png');
        
        this.load.spritesheet('jugador', './img/Ssheet_enemigo.png', {frameWidth: 80, frameHeight: 110});

        //  Archivos de audio
        this.load.audio('mario-tuberias', './audio/mario-tuberias.mp3');
        this.load.audio('aplausos-birdie', './audio/aplausosbirdie.mp3');
        this.load.audio('aplausos-eagle', './audio/aplausoseagle.mp3');
        this.load.audio('arrow1', './audio/arrow1.mp3');
        this.load.audio('arrow2', './audio/arrow2.mp3');
        this.load.audio('abucheo', './audio/boooh.mp3');
    }

    create()
    {
        this.scene.start('menuprincipal');
    }
}
