export interface TrackField {
  name: string;
  content: JSX.Element;
  hidden?: boolean;
}

export enum TrackDndType {
  TRACK = 'TRACK',
}
