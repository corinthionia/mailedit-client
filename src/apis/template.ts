import { supabase } from '@/libs/supabase';
import { BaseTemplate } from '@/types/template';

export const getAllBaseTemplates = async () => {
  const { data: BASE_TEMPLATE_TB, error } = await supabase
    .from('BASE_TEMPLATE_TB')
    .select('*');

  try {
    return BASE_TEMPLATE_TB as BaseTemplate[];
  } catch {
    return error;
  }
};

export const getFilteredBaseTemplatesByCategory = async (category: string) => {
  try {
    const { data: BASE_TEMPLATE_TB } = await supabase
      .from('BASE_TEMPLATE_TB')
      .select('*')
      .eq('category', category);

    return BASE_TEMPLATE_TB as BaseTemplate[];
  } catch (e: unknown) {
    console.log(e);
  }
};

export const getBaseTemplatesById = async (id: string) => {
  const { data: BASE_TEMPLATE_TB, error } = await supabase
    .from('BASE_TEMPLATE_TB')
    .select('*')
    .eq('id', id);

  try {
    return BASE_TEMPLATE_TB as BaseTemplate[];
  } catch {
    return error;
  }
};
