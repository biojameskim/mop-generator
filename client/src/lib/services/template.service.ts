import type { MopModel } from '$lib/models/mop.model';
import type { MopTemplate } from '$lib/models/template.model';
import { browser } from '$app/environment';

const API_BASE_URL = '/api/templates';

/**
 * Fetches all templates from the API
 */
export async function getAllTemplates(customFetch = fetch): Promise<MopTemplate[]> {
  const url = browser ? API_BASE_URL : `http://localhost:3000${API_BASE_URL}`;
  const response = await customFetch(url);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch templates: ${response.statusText}`);
  }
  
  return response.json();
}

/**
 * Fetches a template by ID from the API
 */
export async function getTemplateById(id: string, customFetch = fetch): Promise<MopTemplate> {
  const url = browser ? `${API_BASE_URL}/${id}` : `http://localhost:3000${API_BASE_URL}/${id}`;
  const response = await customFetch(url);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch template: ${response.statusText}`);
  }
  
  return response.json();
}

/**
 * Fetches all template types from the API
 */
export async function getTemplateTypes(customFetch = fetch): Promise<string[]> {
  const url = browser ? `${API_BASE_URL}/types` : `http://localhost:3000${API_BASE_URL}/types`;
  const response = await customFetch(url);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch template types: ${response.statusText}`);
  }
  
  return response.json();
}

/**
 * Generates a MOP from a template
 */
export async function generateMop(templateId: string, formData: Record<string, any>, customFetch = fetch): Promise<MopModel> {
  const url = browser ? `${API_BASE_URL}/${templateId}/generate` : `http://localhost:3000${API_BASE_URL}/${templateId}/generate`;
  const response = await customFetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  });
  
  if (!response.ok) {
    throw new Error(`Failed to generate MOP: ${response.statusText}`);
  }
  
  return response.json();
}