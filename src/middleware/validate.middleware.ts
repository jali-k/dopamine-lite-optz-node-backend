import { Request, Response, NextFunction } from 'express';
import { ApiError } from './error.midleware';

export const validateRequestBody = <T>(schema: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const { error } = schema.validate(req.body);
      if (error) {
        throw new ApiError(400, error.details[0].message);
      }
      next();
    } catch (err) {
      next(err);
    }
  };
};