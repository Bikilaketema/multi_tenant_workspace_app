import { Controller, Post, Body, Res, Inject, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { SignInDto, SignUpDto } from './auth.constants';
import { betterAuth } from 'better-auth'; 
import type { Response as ExpressResponse } from 'express'; 

export const BETTER_AUTH_INSTANCE = 'BETTER_AUTH_INSTANCE';
type AuthInstance = ReturnType<typeof betterAuth>;

@ApiTags('Authentication')
@Controller('auth') 
export class AuthController {
  
  constructor(@Inject(BETTER_AUTH_INSTANCE) private readonly auth: AuthInstance) {}

  @Post('sign-up')
  @ApiOperation({ summary: 'Register and sign in a new user' })
  @ApiBody({ type: SignUpDto })
  @ApiResponse({ status: 200, description: 'User created, signed in, and session cookie set.' })
  async signUp(@Body() body: SignUpDto, @Res({ passthrough: true }) res: ExpressResponse) {
    try {
      const { email, password, name } = body;
      
      const signUpBody = {
          email: email,
          password: password,
          name: name || '', 
      };
      
      const result = await this.auth.api.signUpEmail({
        body: signUpBody,
      });

      return { success: true, user: result.user };
      
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).send({ success: false, message: error.message || 'Registration failed.' });
    }
  }

  @Post('sign-in')
  @ApiOperation({ summary: 'Sign in an existing user' })
  @ApiBody({ type: SignInDto })
  @ApiResponse({ status: 200, description: 'User signed in and session cookie set.' })
  @ApiResponse({ status: 401, description: 'Invalid email or password.' })
  async signIn(@Body() body: SignInDto, @Res({ passthrough: true }) res: ExpressResponse) {
    try {
      const { email, password, rememberMe } = body;
      
      const result = await this.auth.api.signInEmail({
        body: { email, password, rememberMe },
      });

      return { success: true, user: result.user };

    } catch (error) {
      res.status(HttpStatus.UNAUTHORIZED).send({ success: false, message: 'Invalid credentials or login failed.' });
    }
  }
}