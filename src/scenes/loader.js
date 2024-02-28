
export function loader(scene) {

  scene.load.setPath('assets');

  scene.load.image('fondo-scroll', './img/fondo-cielo3200x600.png');

  scene.load.image('boton-nueva-partida', './img/boton-start.png');
  scene.load.spritesheet('boton-fullscreen', './img/boton-fullscreen.png', {frameWidth: 64, frameHeight: 64});
  scene.load.image('archery-img', './img/archeryImg.png');

  scene.load.image('tile-suelo', './img/tile-suelo.png');
  scene.load.image('barra-fuerza', './img/barra-energia.png');
  scene.load.image('diana', './img/diana-tiroArco.png');

  // scene.load.image('arco', './src/img/arco1.png');
  scene.load.image('arco', './img/arco-v2.png');
  // scene.load.image('flecha', './src/img/flecha.png');
  scene.load.image('flecha', './img/flecha-v2.png');
  scene.load.image('flecha-c', './img/flecha-c.png');
  
  scene.load.spritesheet('jugador', './img/Ssheet_enemigo.png', {frameWidth: 80, frameHeight: 110});

  // -------------------------------------------------------------------------
  //  Archivos de audio
  // -------------------------------------------------------------------------
  scene.load.audio('mario-tuberias', './audio/mario-tuberias.mp3');
  scene.load.audio('aplausos-birdie', './audio/aplausosbirdie.mp3');
  scene.load.audio('aplausos-eagle', './audio/aplausoseagle.mp3');
  scene.load.audio('arrow1', './audio/arrow1.mp3');
  scene.load.audio('arrow2', './audio/arrow2.mp3');
  scene.load.audio('abucheo', './audio/boooh.mp3');
}
