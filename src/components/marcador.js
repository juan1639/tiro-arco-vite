
export class Marcador
{
    constructor(scene, datos)
    {
        this.relatedScene = scene;
        this.datos = datos;
    }

    create()
    {
        const {
            x, y, txt,
            size, color, style,
            stroke, sizeStroke,
            shadowOsx, shadowOsy, shadowColor,
            bool1, bool2, origin,
            elastic, dura
        } = this.datos;

        this.marcador = this.relatedScene.add.text(x, y, txt, {
            fontSize: size + 'px',
            fill: color,
            fontFamily: 'verdana, arial, sans-serif',
            fontStyle: style
        });

        this.marcador.setOrigin(origin[0], origin[1]);
        this.marcador.setStroke(stroke, sizeStroke);
        this.marcador.setShadow(shadowOsx, shadowOsy, shadowColor, 2, bool1, bool2);
        //#de77ae

        // if (!excepcionesString.includes(txt)) this.texto.setX(centrar_txt(this.texto, args[12] * args[13]));

        this.elastic(txt, elastic, dura);

        console.log(this.marcador);
    }

    update(txt, valor)
    {
        this.marcador.setText(`${txt}${valor}`);
    }

    elastic(txt, elastic, dura)
    {
        if (dura > 0)
        {
            this.relatedScene.tweens.add(
            {
                targets: this.marcador,
                y: elastic,
                ease: 'Elastic',
                duration: dura
            });
        }
    }

    get()
    {
        return this.marcador;
    }
}
