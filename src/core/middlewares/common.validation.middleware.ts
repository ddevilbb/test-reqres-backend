import * as Joi from 'joi';
import { NextFunction, Request, Response } from 'express';
import { responseErrorWithObject } from '../responses';
import * as httpStatus from 'http-status';

export function onlyAcceptApplicationJson(req: Request, res: Response, next: NextFunction) {
  if (req.header('Accept') !== 'application/json') {
    return res.status(httpStatus.NOT_ACCEPTABLE).json({
      error: 'Unsupported "Accept" header'
    });
  } else {
    return next();
  }
}

export function commonQueryValidation(code: number, schema: Joi.Schema, req: Request, res: Response, next: NextFunction) {
  commonValidation(req.query, code, schema, res, next);
}

/* istanbul ignore next */
function commonValidation(requestData: any, code: number, schema: Joi.Schema, res: Response, next: NextFunction) {
  const result = Joi.validate(requestData, schema);

  if (result.error) {
    responseErrorWithObject(res,{
      message: result.error.details[0].message
    }, code);
  } else {
    return next();
  }
}
