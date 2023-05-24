class Player{
    constructor(){
        this.index = 0;
        this.positionX = 0;
        this.positionY = 0;
        this.name = '';
        this.score = 0;
        this.fuel = 160;
        this.rank = 0;
    }
    addPlayer(){
        //checa se é o carro 1
        if(this.index == 1){
            //CARRO 1: à esquerda
            this.positionX = width/2 - 100;
        }
        else{
            //CARRO 2: à direita
            this.positionX = width/2 + 100;
        }
        //escreve no banco de dados as informações
        //do player.
        database.ref("players/player"+this.index).set({
            name:this.name, 
            posX:this.positionX, 
            posY:this.positionY,
            score:this.score,
            fuel:this.fuel,
            rank:this.rank
        })

    }
    //o comando static cria métodos estáticos
    //os métodos estáticos são chamados pelo
    //name da classe e não pelo name do objeto
    static getInfo(){
        //lê do banco de dados info de todos os players
        database.ref("players").on("value", data => {
            //copia os valores e guarda na variável
            //allPlayers
            allPlayers = data.val();
        })
    }
    

    
    getDistance(){
        database.ref("players/player" + this.index).on("value", data=>{
            var data = data.val();
            this.positionX = data.posX;
            this.positionY = data.posY;
        })
    }


    //atualiza o campo no banco de dados
    updateCount(numero) {
        database.ref("/").update({
            playerCount:numero
        })
    }

    //lê do banco de dados e copia
    getCount(){
        database.ref("playerCount").on("value", function(data){
            //toda vez que tiver uma alteração, isso será lido
            playerCount = data.val();
        })
    }
    
    update(){
        database.ref("players/player"+this.index).update({
            posX:this.positionX, 
            posY:this.positionY, 
            score:this.score, 
            fuel:this.fuel,
            rank:this.rank
        })
    }
}