import { Injectable } from '@nestjs/common';
import { auth } from '../lib/auth';
import { fromNodeHeaders } from 'better-auth/node';

@Injectable()
export class UserService {

    async listMyInvitations(req) {

        const session = await auth.api.getSession({
        headers: fromNodeHeaders(req.headers)
        });
        const response = await auth.api.listUserInvitations({
            query: {
                email: session?.user.email
            }
        });

        return response;
    }
}
