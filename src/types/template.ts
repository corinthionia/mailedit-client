export interface BaseTemplate {
  id: string;
  title: string;
  description?: string;
  category: BaseTemplateCategory;
  contents: BaseTemplateContents[];
  createdAt: string;
  updatedAt: string;
}

export interface BaseTemplateContents {
  id: string;
  isBlock: boolean;
  content: string;
}

export type BaseTemplateCategory = 'school' | 'business';
