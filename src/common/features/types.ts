export enum FeatureKey {
  PAYMENTS = 'payments',
  SPOTIFY_LOGIN = 'spotifyLogin',
  SLACK_LOGIN = 'slackLogin',
}

export type AppFeatureMap = Record<FeatureKey, boolean>;
