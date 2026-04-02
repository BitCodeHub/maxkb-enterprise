# MaxKB Enterprise API Contract

## Base URL
- Production: `https://api.maxkb.lumenai.app/v1`
- Development: `http://localhost:8081`

## Authentication
```
Header: Authorization: Bearer <token>
```

## Endpoints

### 1. Query Knowledge Base
```
POST /query
Content-Type: application/json

Request:
{
  "query": "Genesis GV60 charging port location",
  "dealer_id": "genesis-anaheim-001",
  "top_k": 5,
  "include_sources": true
}

Response:
{
  "answer": "The Genesis GV60 charging port is located on the rear passenger side...",
  "sources": [
    {
      "document": "Genesis_GV60_2024_Owner_Manual.pdf",
      "page": 47,
      "relevance_score": 0.94
    }
  ],
  "response_time_ms": 1200,
  "query_id": "q_12345"
}
```

### 2. Document Upload
```
POST /documents/upload
Content-Type: multipart/form-data

Request:
- file: <PDF/DOCX/TXT>
- dealer_id: "genesis-anaheim-001"
- category: "owner_manual" | "service_bulletin" | "tsb"

Response:
{
  "document_id": "doc_67890",
  "status": "processing",
  "estimated_completion": "2026-04-01T20:00:00Z"
}
```

### 3. Get Document Status
```
GET /documents/{document_id}/status

Response:
{
  "document_id": "doc_67890",
  "status": "indexed" | "processing" | "error",
  "chunks_indexed": 45,
  "total_chunks": 50,
  "indexed_at": "2026-04-01T19:45:00Z"
}
```

### 4. List Documents
```
GET /documents?dealer_id=genesis-anaheim-001&limit=50&offset=0

Response:
{
  "documents": [
    {
      "id": "doc_123",
      "name": "Genesis_G80_2024_Owner_Manual.pdf",
      "type": "PDF",
      "status": "indexed",
      "uploaded_at": "2026-03-20T10:00:00Z",
      "chunk_count": 156
    }
  ],
  "total": 836,
  "indexed": 1381,
  "processing": 766
}
```

### 5. Analytics
```
GET /analytics?dealer_id=genesis-anaheim-001&range=7d

Response:
{
  "total_queries": 12847,
  "avg_response_time_ms": 1800,
  "satisfaction_rate": 0.94,
  "top_queries": [
    {"query": "GV60 charging port", "count": 342},
    {"query": "Tucson hybrid warranty", "count": 289}
  ],
  "daily_volume": [45, 62, 38, 75, 55, 89, 72]
}
```

### 6. Health Check
```
GET /health

Response:
{
  "status": "healthy",
  "version": "1.0.0",
  "kb_status": {
    "total_documents": 836,
    "indexed_chunks": 1381,
    "pending_chunks": 766
  },
  "latency_ms": 45
}
```

## Error Responses
```
{
  "error": {
    "code": "RATE_LIMITED" | "INVALID_QUERY" | "KB_UNAVAILABLE",
    "message": "Human readable description",
    "retry_after": 60
  }
}
```

## Performance Targets
- Response time: <2s for 95th percentile
- Availability: 99.9%
- Concurrent users: 100 per dealer
