
class CustomErrorHandler extends Error {

    constructor(status,message){
        super();
        this.status=status;
        this.message=message;
    }

    static routeNotFound(message,status=408){

        return new CustomErrorHandler(status,message);

    }

    static emailAlreadyExists(message,status=405){

        return new CustomErrorHandler(status,message);

    }
    static invalidCredentails(message,status=404){

        return new CustomErrorHandler(status,message);

    }

    static unAuthorized(message,status=403){

        return new CustomErrorHandler(status,message);

    }

    static pagenotFound(message,status=404){

        return new CustomErrorHandler(status,message);
        
    }


}






export default CustomErrorHandler;