import { supabase } from '@/libs/supabase';

export const getAllBaseTemplates = async () => {
  const { data: BASE_TEMPLATE_TB, error } = await supabase
    .from('BASE_TEMPLATE_TB')
    .select('*');

  try {
    return BASE_TEMPLATE_TB;
  } catch {
    return error;
  }
};

export const getFilteredBaseTemplatesByCategory = async (category: string) => {
  const { data: BASE_TEMPLATE_TB, error } = await supabase
    .from('BASE_TEMPLATE_TB')
    .select('*')
    .eq('category', category);

  try {
    return BASE_TEMPLATE_TB;
  } catch {
    return error;
  }
};
