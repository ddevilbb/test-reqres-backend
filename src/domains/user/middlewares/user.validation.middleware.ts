import * as Joi from 'joi';
import { NextFunction, Request, Response } from 'express';
import { commonQueryValidation } from '../../../core/middlewares/common.validation.middleware';
import * as httpStatus from 'http-status';

export function searchUsers(req: Request, res: Response, next: NextFunction) {
  const schema = Joi.object().keys({
    search: Joi.string().alphanum().min(2).required()
  });

  commonQueryValidation(httpStatus.UNPROCESSABLE_ENTITY, schema, req, res, next);
}
