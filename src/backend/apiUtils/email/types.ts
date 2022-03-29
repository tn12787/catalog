export interface EmailData<T> {
  to: string | string[];
  templateId: string;
  dynamicTemplateData: T;
}
