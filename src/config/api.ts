// API Configuration for MaxKB Enterprise
export const API_CONFIG = {
  // DGX Backend API (via ngrok tunnel from DGX)
  // lumen-kb-api.ngrok.app → DGX port 8000
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'https://lumen-kb-api.ngrok.app',
  
  // Direct DGX access (for server-side calls only)
  DGX_URL: 'http://100.79.93.27:8000',
  
  // Endpoints
  ENDPOINTS: {
    SEARCH: '/api/search',
    DOCUMENTS: '/api/documents',
    UPLOAD: '/api/documents/upload',
    HEALTH: '/api/health',
    VOICE_QUERY: '/api/voice/query',
    MAXKB_STATS: '/api/maxkb/stats',
    LOGIN: '/api/auth/login',
  },
};

// Search result type
export interface SearchResult {
  document_id: string;
  filename: string;
  brand: string | null;
  model: string | null;
  year: number | null;
  score: number | null;
  snippet: string | null;
}
