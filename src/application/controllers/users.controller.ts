import { controller, httpGet, interfaces } from 'inversify-express-utils';
import { Request, Response } from 'express';
import { UserServiceInterface, UserServiceType } from '../../domains/user/services/user.service';
import { inject } from 'inversify';
import { UserTransformerInterface, UserTransformerType } from '../../domains/user/transformers/user.transformer';

@controller(
  '/users',
  'OnlyAcceptApplicationJson'
)
export class UsersController implements interfaces.Controller {
  constructor(
    @inject(UserServiceType) private userService: UserServiceInterface,
    @inject(UserTransformerType) private userTransformer: UserTransformerInterface
  ) {}

  @httpGet('')
  async users(req: Request, res: Response): Promise<void> {
    const users = await this.userService.findAll();

    res.json(this.userTransformer.list(users));
  }

  @httpGet('/:id')
  async user(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const user = await this.userService.find(id);

    res.json(this.userTransformer.item(user));
  }

  @httpGet(
    '/search',
    'UserSearchValidation'
  )
  async search(req: Request, res: Response): Promise<void> {
    const users = await this.userService.search(req.body.search);

    res.json(this.userTransformer.list(users));
  }

}
