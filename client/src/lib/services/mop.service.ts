import type { MopModel } from '$lib/models/mop.model';
import { browser } from '$app/environment';

// Base path for API
const API_BASE_URL = '/api/mops';

function getApiUrl(path: string): string {
    // In server context, use environment variables but I'm just gonna use localhost for now
    if (!browser) {
      const apiBase = process.env.API_URL || 'http://localhost:3000';
      return `${apiBase}${path}`;
    }
    return path;
  }

/**
 * Fetches all MOPs from the API
 */
export async function getAllMops(customFetch = fetch): Promise<MopModel[]> {
  const url = getApiUrl(API_BASE_URL);
  const response = await customFetch(url);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch MOPs: ${response.statusText}`);
  }
  
  return response.json();
}

// Similarly update other methods to accept customFetch parameter
export async function getMopById(id: string, customFetch = fetch): Promise<MopModel> {
  const url = getApiUrl(`${API_BASE_URL}/${id}`);
  const response = await customFetch(url);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch MOP: ${response.statusText}`);
  }
  
  return response.json();
}

export async function getMopTypes(customFetch = fetch): Promise<string[]> {
  const url = getApiUrl(`${API_BASE_URL}/types`);
  const response = await customFetch(url);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch MOP types: ${response.statusText}`);
  }
  
  return response.json();
}