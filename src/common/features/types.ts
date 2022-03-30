export enum FeatureKey {
  PAYMENTS = 'payments',
  SPOTIFY_LOGIN = 'spotifyLogin',
  SLACK_LOGIN = 'slackLogin',
  MARKETING_SITE = 'marketingSite',
  DOCUMENTATION = 'documentation',
  SIGNUP_NOTIFICATIONS = 'signupNotifications',
}

export type AppFeatureMap = Record<FeatureKey, boolean>;
