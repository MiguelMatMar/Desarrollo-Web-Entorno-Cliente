class parImpar{
    constructor(num){
        this.numeroUsr = parseInt(num);
    }
    error(numero){
        if(typeof(numero) !== "number"){
            return console.log("Dato Erroneo");
        }
    }
    resuelve(){
        this.numeroUsr % 2 === 0 ? alert("Par") : alert("Impar");
    }
    es(numero){
        return numero % 2 === 0 ? 'par' : 'impar';
        
    }
    muestraRandom(){
        let aleatorio;
        for(let i = 0; i< 10; i++){
            aleatorio = parseInt(Math.random()*10000 +1);
            document.write(`<br> El numero ${aleatorio} es ${this.es(aleatorio)} <br>`);
            console.log(this.es(aleatorio));
        }
    }
}