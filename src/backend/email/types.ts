export interface EmailData<T> {
  to: string;
  dynamic_template_data: T;
}
