// =========================================================================================
//    T i r o  c o n  A r c o  |  By Juan Eguia
//  
//    https://juan1639.github.io/tiro-arco-vite
// 
// -----------------------------------------------------------------------------------------
import { Scene } from 'phaser';
import { FondoScroll } from '../components/fondoscroll.js';
import { BarraFuerza } from '../components/barra-fuerza.js';
import { Jugador, JugadorAnima } from '../components/jugador.js';
import { Arco, Flecha } from '../components/arco.js';
import { Diana } from '../components/diana.js';
import { Marcador } from '../components/marcador.js';
import { BotonFullScreen, BotonNuevaPartida } from '../components/boton-nuevapartida.js';
import { Textos } from '../components/textos.js';
import { play_sonidos } from '../functions/functions.js';
import { Settings } from './settings.js';
import { TileSuelo } from '../components/tile-suelo.js';

export class Game extends Scene
{
  constructor()
  {
    super({ key: 'game' });
  }

  init()
  {
    this.fondoscroll = new FondoScroll(this);
    this.tilesuelo = new TileSuelo(this);
    this.barrafuerza = new BarraFuerza(this);
    this.jugador = new Jugador(this);
    this.arco = new Arco(this);
    this.flecha = new Flecha(this);
    this.diana = new Diana(this);
    this.jugadoranima = new JugadorAnima(this);

    this.instancia_marcadores();
    this.botonrejugar = new BotonNuevaPartida(this);
    this.txt = new Textos(this);
  }

  preload() {}

  create()
  {
    this.sonidos_set();
    this.set_camerasMain();
    this.set_cameras_marcadores();

    this.fondoscroll.create();
    this.tilesuelo.create();
    this.barrafuerza.create();
    this.jugador.create();
    this.arco.create(this.jugador.get().x, this.jugador.get().y);
    this.flecha.create();
    this.diana.create();
    this.jugadoranima.create();

    this.marcadorPtos.create();
    this.marcadorIncPtos.create();
    this.marcadorHi.create();
    this.marcadorHi.update(' Record: ', Settings.getRecord());
    this.botonfullscreen.create();

    this.texto_preparado();

    this.mouse_showXY = {
      create: this.add.text(10, 50, ' ', { fill: '#111' }),
      show_mouseXY: true
    }

    this.cameras.main.startFollow(this.jugadoranima.get());
    // this.cameras.main.startFollow(this.flecha.get().getChildren()[Settings.flecha.lanzamientoNro]);

    this.crear_colliders();
  }
  
  update()
  {
    // this.pointer_showXY(this.mouse_showXY);
    if (Settings.isAnimaInicial()) this.jugadoranima.update();

    this.jugador.update();
    this.arco.update(this.jugador.get().x, this.jugador.get().y);
    this.flecha.update();
  }

  set_camerasMain()
  {
    const { numberWidths, numberHeights } = Settings.getScreen();

    this.cameras.main.setBounds(
      -this.sys.game.config.width, 0,
      Math.floor(this.sys.game.config.width * numberWidths), Math.floor(this.sys.game.config.height * numberHeights)
    );

    this.physics.world.setBounds(
      -this.sys.game.config.width, 0,
      Math.floor(this.sys.game.config.width * numberWidths), Math.floor(this.sys.game.config.height * numberHeights)
    );

    console.log(this.physics.world);
  }

  set_cameras_marcadores()
  {
    var { x, y, ancho, alto, scrollX, scrollY } = Settings.getCameraScores();
    
    this.mapa_scores = this.cameras.add(x, y, ancho, alto).setZoom(0.9).setName('view-scores').setAlpha(1).setOrigin(0, 0);
    this.mapa_scores.scrollX = scrollX;
    this.mapa_scores.scrollY = scrollY;
    this.mapa_scores.setBackgroundColor(0x00aabb);
    console.log(this.mapa_scores);
  }

  instancia_marcadores()
  {
    const ancho = this.sys.game.config.width;
    const alto = 55;

    this.marcadorPtos = new Marcador(this, {
      x: 0,
      y: -alto,
      txt: ' Score: 0',
      size: 35, color: '#ffa', style: 'bold',
      stroke: '#f91', sizeStroke: 10,
      shadowOsx: 2, shadowOsy: 2, shadowColor: '#111',
      bool1: false, bool2: true, origin: [0, 0],
      elastic: false, dura: 0
    });

    this.marcadorIncPtos = new Marcador(this, {
      x: Math.floor(ancho / 2.6),
      y: -alto - 3,
      txt: ' 0 ',
      size: 45, color: '#ffa', style: 'bold',
      stroke: '#4f2', sizeStroke: 14,
      shadowOsx: 2, shadowOsy: 2, shadowColor: '#111',
      bool1: false, bool2: true, origin: [0, 0],
      elastic: false, dura: 0
    });

    this.marcadorHi = new Marcador(this, {
      x: Math.floor(ancho / 1.7),
      y: -alto,
      txt: ' Record: ',
      size: 35, color: '#ffa', style: 'bold',
      stroke: '#f51', sizeStroke: 10,
      shadowOsx: 2, shadowOsy: 2, shadowColor: '#111',
      bool1: false, bool2: true, origin: [0, 0],
      elastic: false, dura: 0
    });

    this.botonfullscreen = new BotonFullScreen(this, {
      id: 'boton-fullscreen', x: Math.floor(this.sys.game.config.width / 1), y: -25,
      ang: 0, scX: 0.8, scY: 0.6 
    });
  }

  nextFlecha_cambioCamera(flecha, puntuacion, clavarDiana)
  {
    if (flecha.getData('estado') === 'clavada' || Settings.isGameOver()) return;

    setTimeout(() =>
    {
      Settings.flecha.lanzamientoNro ++;
      console.log(Settings.flecha.lanzamientoNro);

      this.barrafuerza.get().setScale(0.1, 1);

      if (Settings.flecha.lanzamientoNro >= 10)
      {
        console.log('game over');
        Settings.setGameOver(true);
        this.suenan_aplausos(flecha);

      } else
      {
        this.flecha.get().getChildren()[Settings.flecha.lanzamientoNro].setData('estado', 'pre');
        this.cameras.main.startFollow(this.flecha.get().getChildren()[Settings.flecha.lanzamientoNro]);
        this.arco.get().setFrame(0);
      }
    }, Settings.pausas.flechaClavada);

    flecha.setData('estado', 'clavada');
    flecha.setVelocityX(0).setVelocityY(0);
    flecha.body.setAllowGravity(false);

    if (clavarDiana) this.impacto_diana_sumarPtos(flecha, puntuacion);

    this.jugador.get().setY(this.sys.game.config.height - Settings.jugador.offSetY);
    this.jugador.get().setData('fin-pulsacion', false);
  }

  impacto_diana_sumarPtos(flecha, puntuacion)
  {
    play_sonidos(this.sonidoArrow2, false, 0.9);

    flecha.setX(Math.floor(flecha.x) + flecha.getData('ajuste-clavar-diana'));

    const calculaIncPtos = (Settings.diana.nroElementos - puntuacion) * 5 + Phaser.Math.Between(0, 2);

    Settings.setIncPuntos(calculaIncPtos);
    this.marcadorIncPtos.update(' ', calculaIncPtos);
    Settings.setPuntos(Settings.getPuntos() + calculaIncPtos);
    this.marcadorPtos.update(' Score: ', Settings.getPuntos());

    console.log(puntuacion, calculaIncPtos);
  }

  suenan_aplausos(flecha)
  {
    if (Settings.getPuntos() >= Settings.getAplausos().aplausos)
    {
      play_sonidos(this.sonidoAplausosEagle, false, 0.9);
    
    } else if (Settings.getPuntos() >= Settings.getAplausos().abucheos)
    {
      play_sonidos(this.sonidoAplausosBirdie, false, 0.9);

    } else
    {
      play_sonidos(this.sonidoAbucheo, false, 0.9);
    }

    if (Settings.getPuntos() > Settings.getRecord())
    {
      Settings.setRecord(Settings.getPuntos());

      this.txtNewrecord = new Textos(this, {
        x: Math.floor(this.diana.get().getChildren()[0].x),
        y: 50,
        txt: ' Congratulations! \n New Record! ',
        size: 70, color: '#ffa', style: 'bold',
        stroke: '#f91', sizeStroke: 16,
        shadowOsx: 2, shadowOsy: 2, shadowColor: '#111',
        bool1: false, bool2: true, origin: [0.5, 0],
        elastic: this.sys.game.config.height / 2, dura: 3000
      });
  
      this.txtNewrecord.create();
    }

    setTimeout(() =>
    {
      this.botonrejugar.create('prenivel', true);
      // this.botonrejugar.get().setX(flecha.x);
      this.botonrejugar.get().setX(this.diana.get().getChildren()[0].x);
      this.cameras.main.startFollow(this.diana.get().getChildren()[0]);
    }, Settings.pausas.flechaClavada);
  }

  crear_colliders()
  {
    this.physics.add.collider(this.jugador.get(), this.tilesuelo.get());
    this.physics.add.collider(this.jugadoranima.get(), this.tilesuelo.get());

    this.physics.add.collider(
      this.flecha.get(), this.tilesuelo.get(), (flecha, suelo) => this.nextFlecha_cambioCamera(suelo, 0, false)
    );

    this.physics.add.collider(
      this.flecha.get(), this.diana.get(), (flecha, diana) => this.nextFlecha_cambioCamera(flecha, diana.getData('index'), true)
    );
  }

  texto_preparado()
  {
    this.txt = new Textos(this, {
      x: Math.floor(this.sys.game.config.width / 5),
      y: Math.floor(this.sys.game.config.height / 2),
      txt: ' Pulsa y deja pulsada la tecla space \n o si utilizas un dispositivo tactil \n toca y deja presionada \n para tirar una flecha.',
      size: 25, color: '#ffa', style: 'bold',
      stroke: '#2f2', sizeStroke: 16,
      shadowOsx: 2, shadowOsy: 2, shadowColor: '#111',
      bool1: false, bool2: true, origin: [0.5, 0.5],
      elastic: false, dura: 0
    });

    this.txt.create();
    this.txt.get().setVisible(false);

    setTimeout(() => this.txt.get().destroy(), Settings.pausas.showTxtInicial);
  }

  sonidos_set()
  {
    this.sonidoAplausosBirdie = this.sound.add('aplausos-birdie');
    this.sonidoAplausosEagle = this.sound.add('aplausos-eagle');
    this.sonidoAbucheo = this.sound.add('abucheo');
    this.sonidoArrow1 = this.sound.add('arrow1');
    this.sonidoArrow2 = this.sound.add('arrow2');
  }

  pointer_showXY({create, show_mouseXY})
  {
    if (!show_mouseXY) return;
    
    const pointer = this.input.activePointer;
    // console.log(pointer.worldX, pointer.worldY);
    
    create.setText([
      `x: ${pointer.worldX}`,
      `y: ${pointer.worldY}`
    ]).setX(this.jugador.get().x).setY(this.jugador.get().y - 170);
  }
}
