import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(private configService: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const apiKey = this.extractApiKeyFromHeader(request);

    if (!apiKey) {
      throw new UnauthorizedException('API key is missing');
    }

    const validApiKeys = this.getValidApiKeys();
    
    if (!validApiKeys.includes(apiKey)) {
      throw new UnauthorizedException('Invalid API key');
    }

    return true;
  }

  private extractApiKeyFromHeader(request: Request): string | null {
    // Check X-API-Key header first (most common)
    const headerKey = request.headers['x-api-key'] as string;
    if (headerKey) {
      return headerKey;
    }

    // Fallback to Authorization header: Bearer <key>
    const authHeader = request.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      return authHeader.substring(7);
    }

    return null;
  }

  private getValidApiKeys(): string[] {
    // Get API keys from environment variable (comma-separated)
    const apiKeysEnv = this.configService.get<string>('API_KEYS', '');
    
    if (!apiKeysEnv) {
      return [];
    }

    // Split by comma and trim whitespace
    return apiKeysEnv.split(',').map(key => key.trim()).filter(key => key.length > 0);
  }
}

