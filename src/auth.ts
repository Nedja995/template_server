import * as express from 'express'
import { getRepository } from "typeorm";
import { User } from "./persistance/entity/User";

import constants from './config/constants';
import { ApiError } from './config/ErrorHandler';
import * as jwt from "jsonwebtoken";
export type res = { status: number; message: string };

export async function expressAuthentication(request: express.Request, securityName: string, scopes?: string[]): Promise<res> {
  if (securityName) {
    const token = request.body.token || request.query.token || request.headers['auth'];
      if (!token) {
        console.log("No token provided");
        throw new ApiError(constants.errorTypes.auth);
      }
      let decoded = <any>jwt.verify(token, constants.jwtSecret);

      const userRepository = getRepository(User);
      let user = await userRepository.findOneOrFail(decoded.userId);
      
      if (securityName.toUpperCase() === user.role) {
          console.log('ok');
                
      }
      else {
        console.log('reject');
        throw new ApiError(constants.errorTypes.auth);
    
      }

      return decoded;
    }
  throw new ApiError(constants.errorTypes.auth);
}