export class UserModal{
    constructor(
        public id:string, public email:string, 
        private expirationDate:Date, private token :string
    ){}

    getToken(){
        if(!this.id || this.expirationDate<=new Date())
        {
            return null;
        }
        else{
            return this.token;
        }
    }
}