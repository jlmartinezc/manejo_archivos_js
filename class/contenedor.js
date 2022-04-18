const fs = require('fs');

class Contenedor{
    constructor(fileName){
        this.fileName = fileName;
    }

    async save(data){
        try{        
            if(typeof data === 'object' && data !== null){
                let id = 1;
                let file = '';
                let fileContent = (this.#validateFile()) ? fs.readFileSync(this.fileName, 'utf8') : '';

                if(fileContent.trim().length > 0){
                    file = JSON.parse(fileContent);
                    id = Math.max(...file.map(el => el.id)) + 1;
                    file.push({'id': id , ...data});              
                }
                else{
                    file = [{'id': 1 , ...data}];
                }

                await fs.promises.writeFile(this.fileName, JSON.stringify(file, null, 2));
                console.log(`Se guardado un nuevo registro con id: ${id}`);
                return;
            }
            else{
                console.log('Ingrese un objeto valido');
                return;
            }
        }
        catch(err){
            console.log('Error: '+err);
            return;
        }
    }

    async getById(id){
        try{        
            if(!isNaN(id) && id !== undefined){
                let fileContent = (this.#validateFile()) ? fs.readFileSync(this.fileName, 'utf8') : '';
                let obj = '';
                
                if(fileContent.trim().length > 0){
                    let file = JSON.parse(fileContent);
                    obj = file.find(function(el){
                        if(el.id === id){
                            return true;
                        }
                    });

                    obj = (obj) ? obj : `No se ha encontrado el elemento con id: ${id}`;
                }
                else{
                    obj = 'El archivo no existe o no tiene contenido'    ;
                }

                console.log(obj);
                return;
            }
            else{
                console.log('Ingrese un numero valido');
                return;
            }
        }
        catch(err){
            console.log('Error: '+err);
            return;
        }
    }

    async getAll(){
        try{           
            if(this.#validateFile()){
                await fs.readFile(this.fileName, 'utf8', (err, data) => {
                    let result = (err) ? `Error: ${err}` : data;
                    console.log(result);
                    return;
                });
            }
        }
        catch(err){
            console.log('Error: '+err);
        }
    }

    async deleteById(id){
        try{        
            if(!isNaN(id) && id !== undefined){
                let message = '';
                let elemetExist = false;
                let fileContent = (this.#validateFile()) ? fs.readFileSync(this.fileName, 'utf8') : '';
                
                if(fileContent.trim().length > 0){
                    let file = JSON.parse(fileContent);

                    file = file.filter(function (el){ 
                        if(el.id == id){
                            elemetExist = true;
                        }
                        return el.id != id
                    }); 

                    if(elemetExist){
                        await fs.promises.writeFile(this.fileName, JSON.stringify(file, null, 2));
                        message = `Se elimino el registro con id: ${id}`; 
                    }
                    else{
                        message = `El registro con id: ${id} no fue encontrado o ya fue eliminado anteriormente`; 
                    }

                }
                else{
                    message = 'El archivo no existe o no tiene contenido'    ;
                }

                console.log(message);
                return;
            }
            else{
                console.log('Ingrese un numero valido');
                return;
            }
        }
        catch(err){
            console.log('Error: '+err);
            return;
        }
    }

    async deleteALL(){
        try {
            if(this.#validateFile()){
                await fs.truncate(this.fileName, 0, function(){
                    console.log('Los elementos del archivo fueron eliminados');
                    return
                })
            }
            else{
                console.log('El archivo no existe');
            }
        }
        catch(err){
            console.log('Error: '+err);
            return;
        }
    }

    #validateFile(){
        try{
            return fs.existsSync(this.fileName);
        }
        catch(err){
            console.log('Error: '+err);
            return;
        }
    }
}

module.exports = Contenedor;
