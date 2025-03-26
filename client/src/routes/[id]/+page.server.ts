// src/routes/[id]/+page.server.ts
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import * as mopService from '$lib/services/mop.service';

export const load = (async ({ params, fetch }) => {
  try {
    // Pass the fetch function from the event
    const mop = await mopService.getMopById(params.id, fetch);
    
    return {
      mop
    };
  } catch (e) {
    console.error(`Error loading MOP ${params.id}:`, e);
    throw error(404, {
      message: 'MOP not found'
    });
  }
}) satisfies PageServerLoad;