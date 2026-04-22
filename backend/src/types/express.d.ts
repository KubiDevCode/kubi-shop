import { JwtUser } from '../auth/types/jwt-user.type';

declare global {
    namespace Express {
        interface User extends JwtUser { }

        interface Request {
            user: JwtUser;
        }
    }
}

export { };