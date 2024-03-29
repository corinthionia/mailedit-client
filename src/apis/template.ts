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

export const getUserTemplates = async (userId: string) => {
  const { data: USER_TEMPLATE_TB } = await supabase
    .from('USER_TEMPLATE_TB')
    .select('*')
    .eq('userId', userId);

  return USER_TEMPLATE_TB;
};

export const deleteUserTemplate = async (
  userId: string,
  templateId: string
) => {
  const { error } = await supabase
    .from('USER_TEMPLATE_TB')
    .delete()
    .eq('userId', userId)
    .eq('id', templateId);

  return error;
};

export const postStarUserTemplate = async (
  userId: string,
  templateId: string,
  isStar: boolean
) => {
  const { data } = await supabase
    .from('USER_TEMPLATE_TB')
    .update({ isStar: isStar })
    .eq('userId', userId)
    .eq('id', templateId);

  return data;
};

export const getStarUserTemplate = async (userId: string) => {
  const { data } = await supabase
    .from('USER_TEMPLATE_TB')
    .select('*')
    .eq('userId', userId)
    .eq('isStar', true);

  return data;
};
