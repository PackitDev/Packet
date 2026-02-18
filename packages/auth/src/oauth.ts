import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as GitHubStrategy } from 'passport-github2';
import type { AuthConfig } from './types.js';

export interface OAuthUser {
  id: string;
  email: string;
  name: string;
  provider: 'google' | 'github';
  profileUrl?: string;
  avatarUrl?: string;
}

export function setupOAuth(config: AuthConfig): void {
  if (!config.oauth) {
    return;
  }

  // Google OAuth
  if (config.oauth.google) {
    passport.use(
      new GoogleStrategy(
        {
          clientID: config.oauth.google.clientId,
          clientSecret: config.oauth.google.clientSecret,
          callbackURL: config.oauth.google.callbackURL,
        },
        async (_accessToken, _refreshToken, profile, done) => {
          try {
            const user: OAuthUser = {
              id: profile.id,
              email: profile.emails?.[0]?.value || '',
              name: profile.displayName,
              provider: 'google',
              profileUrl: profile.profileUrl,
              avatarUrl: profile.photos?.[0]?.value,
            };
            done(null, user);
          } catch (error) {
            done(error as Error);
          }
        }
      )
    );
  }

  // GitHub OAuth
  if (config.oauth.github) {
    passport.use(
      new GitHubStrategy(
        {
          clientID: config.oauth.github.clientId,
          clientSecret: config.oauth.github.clientSecret,
          callbackURL: config.oauth.github.callbackURL,
        },
        async (_accessToken: string, _refreshToken: string, profile: any, done: any) => {
          try {
            const user: OAuthUser = {
              id: profile.id,
              email: profile.emails?.[0]?.value || '',
              name: profile.displayName || profile.username,
              provider: 'github',
              profileUrl: profile.profileUrl,
              avatarUrl: profile.photos?.[0]?.value,
            };
            done(null, user);
          } catch (error) {
            done(error as Error);
          }
        }
      )
    );
  }

  // Serialize/deserialize user
  passport.serializeUser((user: any, done) => {
    done(null, user);
  });

  passport.deserializeUser((user: any, done) => {
    done(null, user);
  });
}

export function getOAuthMiddleware(): { initialize: ReturnType<typeof passport.initialize>; session: ReturnType<typeof passport.session> } {
  return {
    initialize: passport.initialize(),
    session: passport.session(),
  };
}

export function authenticateGoogle() {
  return passport.authenticate('google', {
    scope: ['profile', 'email'],
  });
}

export function authenticateGoogleCallback() {
  return passport.authenticate('google', {
    failureRedirect: '/login',
    successRedirect: '/',
  });
}

export function authenticateGitHub() {
  return passport.authenticate('github', {
    scope: ['user:email'],
  });
}

export function authenticateGitHubCallback() {
  return passport.authenticate('github', {
    failureRedirect: '/login',
    successRedirect: '/',
  });
}
