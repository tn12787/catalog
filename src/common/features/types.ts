export enum FeatureKey {
  PAYMENTS = 'payments',
  SPOTIFY_LOGIN = 'spotifyLogin',
  SLACK_LOGIN = 'slackLogin',
  MARKETING_SITE = 'marketingSite',
}

export type AppFeatureMap = Record<FeatureKey, boolean>;
