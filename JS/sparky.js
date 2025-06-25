class Sparky {
    constructor(context, teclado,imagem) {
        this.context = context;
        this.teclado = teclado;
        this.x = 0;
        this.y = 300;

        this.sheet = new SpriteSheet(context, imagem, 2, 8);
        this.sheet.intervalo = 100;

        this.width = this.sheet.imagem.width / this.sheet.numColunas;
        this.height = this.sheet.imagem.height / this.sheet.numLinhas;

        this.velocidade = 3;
        this.velocidadeY = 0;
        this.gravidade = 0.4;
        this.pulando = false;
        this.forcaPulo = -12;

        this.andando = false;
        this.direcao = SPARKY_DIREITA;
    }

    atualizar() {
        this.andando = false;

        if (this.teclado.pressionada("ArrowRight")) {
            if (this.direcao !== SPARKY_DIREITA) {
                this.sheet.linha = 0;
                this.sheet.coluna = 0;
            }
            this.direcao = SPARKY_DIREITA;
            this.andando = true;
            this.x += this.velocidade;
        } else if (this.teclado.pressionada("ArrowLeft")) {
            if (this.direcao !== SPARKY_ESQUERDA) {
                this.sheet.linha = 1;
                this.sheet.coluna = 0;
            }
            this.direcao = SPARKY_ESQUERDA;
            this.andando = true;
            this.x -= this.velocidade;
        }

        if (this.andando) {
            this.sheet.proximoQuadro();
        }

        if (this.teclado.pressionada("ArrowUp") && !this.pulando) {
            this.velocidadeY = this.forcaPulo;
            this.pulando = true;
        }

        this.velocidadeY += this.gravidade;
        this.y += this.velocidadeY;

        if (this.y + this.height > this.context.canvas.height) {
            this.y = this.context.canvas.height - this.height;
            this.velocidadeY = 0;
            this.pulando = false;
        }

        if (this.y < 0) {
            this.y = 0;
            this.velocidadeY = 0;
        }
    }

    desenhar() {
        this.sheet.desenhar(this.x, this.y);
    }
}
