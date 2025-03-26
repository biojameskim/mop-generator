import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import * as mopService from '$lib/services/mop.service';

export const load: PageServerLoad = async () => {
  try {
    const [mops, types] = await Promise.all([
      mopService.getAllMops(),
      mopService.getMopTypes()
    ]);
    
    return {
      mops,
      types
    };
  } catch (e) {
    console.error('Error loading MOPs:', e);
    throw error(500, {
      message: 'Failed to load MOPs'
    });
  }
};