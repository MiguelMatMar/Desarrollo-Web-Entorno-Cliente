class parImpar{
    constructor(num){
        this.numeroUsr = parseInt(num);
    }
    error(){
        console.log("Dato Erroneo");
    }
    resuelve(){
        this.numeroUsr % 2 === 0 ? alert("Par") : alert("Impar");
    }
    es(n){
        let esParImpar = (n) => (n % 2 === 0) ? 'par' : 'impar';
        esParImpar(this.numeroUsr)
    }
    muestraRandom(){
        let aleatorio;
        for(let i = 0; i< 10; i++){
            aleatorio = Math.random()*10000 +1;
            document.write(`El numero ${aleatorio} es ${this.es(aleatorio)}`);
        }
    }
}