export interface EmailData<T> {
  to: string;
  templateId: string;
  dynamicTemplateData: T;
}
