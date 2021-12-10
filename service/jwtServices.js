
import Jwt from 'jsonwebtoken';

import{AUTH_SECRET,REFRESH_SECRET} from '../config/index';

class JwtService{
 
    // sigin the auth  token 
    static signAuthToken(payload,secert=AUTH_SECRET,expiry='60s'){
        
        return Jwt.sign(payload,secert,{expiresIn:expiry});


    }

    // sigin the refresh token

    static signRefreshToken(payload,secert=REFRESH_SECRET,expiry='1y'){

        return Jwt.sign(payload,secert,{expiresIn:expiry});


    }
// vefrify the auth token 

static verifyAuthToken(token,secert=AUTH_SECRET){

return Jwt.verify(token,secert);

}

// verfigy the refresh token
static verifyRefreshToken(token,secert=REFRESH_SECRET){

return Jwt.verify(token,secert);


}


}


export default JwtService;
