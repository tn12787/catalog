export type GAEventArgs = {
  action: Gtag.EventNames | string;
  params?: Gtag.ControlParams | Gtag.EventParams | Gtag.CustomParams;
};
