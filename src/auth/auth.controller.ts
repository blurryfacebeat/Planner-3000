import { Body, Controller, HttpCode, Post, Req, Res, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { Response, Request } from 'express';
import { REFRESH_TOKEN_NOT_PASSED_ERROR } from './messages/auth.messages';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(200)
  async login(@Body() dto: AuthDto, @Res({ passthrough: true }) res: Response) {
    const { refreshToken, ...response } = await this.authService.login(dto);

    this.authService.addRefreshTokenToResponse(res, refreshToken);

    return response;
  }

  @Post('register')
  @HttpCode(201)
  async register(@Body() dto: AuthDto, @Res({ passthrough: true }) res: Response) {
    const { refreshToken, ...response } = await this.authService.register(dto);

    this.authService.addRefreshTokenToResponse(res, refreshToken);

    return response;
  }

  @Post('login/access-token')
  @HttpCode(200)
  async getNewTokens(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const refreshTokenFromCookies = req.cookies[this.authService.REFRESH_TOKEN_NAME];

    if (!refreshTokenFromCookies) {
      this.authService.removeRefreshTokenFromResponse(res);
      throw new UnauthorizedException(REFRESH_TOKEN_NOT_PASSED_ERROR);
    }

    const { refreshToken, ...response } =
      await this.authService.getNewTokens(refreshTokenFromCookies);

    this.authService.addRefreshTokenToResponse(res, refreshToken);

    return response;
  }

  @Post('logout')
  @HttpCode(200)
  async logout(@Res({ passthrough: true }) res: Response) {
    this.authService.removeRefreshTokenFromResponse(res);

    return true;
  }
}
