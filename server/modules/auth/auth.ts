import { Request, Response } from 'express';
import * as _ from 'lodash';
import User from '../User/service';
import authSuccess from '../../api/responses/authSucces';
import authFail from '../../api/responses/authFail';

const UserService = new User();

class TokenRoutes { 

    auth(req: Request, res: Response){
        const credentials = {
            email: req.body.email,
            password: req.body.email
        };

        if(credentials.hasOwnProperty('email') && credentials.hasOwnProperty('password')){
            UserService
            .getByEmail(credentials.email)
                .then(_.partial(authSuccess, res, credentials))
                    .catch(_.partial(authSuccess, res, credentials));
        }
    }
}

export default TokenRoutes;
