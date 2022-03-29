export enum FeatureKey {
  PAYMENTS = 'payments',
  SPOTIFY_LOGIN = 'spotifyLogin',
  SLACK_LOGIN = 'slackLogin',
  MARKETING_SITE = 'marketingSite',
  DOCUMENTATION = 'documentation',
}

export type AppFeatureMap = Record<FeatureKey, boolean>;
