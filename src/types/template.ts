export interface BaseTemplate {
  id: string;
  title: string;
  description?: string;
  category: 'school' | 'business';
  contents: BaseTemplateContents[];
  createdAt: string;
  updatedAt: string;
}

export interface BaseTemplateContents {
  id: string;
  isBlock: boolean;
  text: string;
}
