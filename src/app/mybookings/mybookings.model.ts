export class MyBookings{
    constructor(public id:string,public userId:string,public placeId:string,
        public placeTitle:string, public guest:number, 
        public firstName:string, public lastName:string, public startDate:Date,
        public endDate:Date
        ){}
}