import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import * as templateService from '$lib/services/template.service';

export const load: PageServerLoad = async ({ params, fetch }) => {
  try {
    const template = await templateService.getTemplateById(params.id, fetch);
    
    return {
      template
    };
  } catch (e) {
    console.error(`Error loading template ${params.id}:`, e);
    throw error(404, {
      message: 'Template not found'
    });
  }
};