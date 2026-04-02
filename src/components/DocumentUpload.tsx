'use client';

import { useState, useCallback } from 'react';

interface Document {
  id: string;
  name: string;
  type: string;
  size: number;
  status: 'uploading' | 'processing' | 'indexed' | 'error';
  uploadedAt: Date;
}

export function DocumentUpload() {
  const [documents] = useState<Document[]>([
    { id: '1', name: 'Genesis_G80_2024_Owner_Manual.pdf', type: 'PDF', size: 15420, status: 'indexed', uploadedAt: new Date('2026-03-20') },
    { id: '2', name: 'Hyundai_Service_Bulletin_TSB-2024-001.pdf', type: 'PDF', size: 8200, status: 'indexed', uploadedAt: new Date('2026-03-21') },
    { id: '3', name: 'Genesis_Electrical_Systems.pdf', type: 'PDF', size: 25600, status: 'processing', uploadedAt: new Date('2026-04-01') },
  ]);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    // TODO: Handle file upload
    console.log('Files dropped:', e.dataTransfer.files);
  }, []);

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const getStatusColor = (status: Document['status']) => {
    switch (status) {
      case 'indexed': return 'bg-green-500/20 text-green-400';
      case 'processing': return 'bg-yellow-500/20 text-yellow-400';
      case 'uploading': return 'bg-blue-500/20 text-blue-400';
      case 'error': return 'bg-red-500/20 text-red-400';
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Total Documents', value: '836', color: 'blue' },
          { label: 'Indexed', value: '1,381', color: 'green' },
          { label: 'Processing', value: '766', color: 'yellow' },
          { label: 'Errors', value: '0', color: 'red' },
        ].map((stat) => (
          <div key={stat.label} className="bg-gray-900 rounded-xl border border-gray-800 p-4">
            <p className="text-2xl font-bold text-white">{stat.value}</p>
            <p className="text-sm text-gray-400">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Upload Area */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-xl p-12 text-center transition-colors ${
          isDragging
            ? 'border-blue-500 bg-blue-500/10'
            : 'border-gray-700 bg-gray-900'
        }`}
      >
        <div className="w-16 h-16 mx-auto mb-4 bg-gray-800 rounded-full flex items-center justify-center">
          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
        </div>
        <p className="text-lg font-medium mb-2">Drop PDFs here or click to upload</p>
        <p className="text-sm text-gray-400 mb-4">Support for PDF, DOCX, and TXT files</p>
        <button className="px-6 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg font-medium transition-colors">
          Select Files
        </button>
      </div>

      {/* Document List */}
      <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-800 flex justify-between items-center">
          <h3 className="font-semibold">Recent Documents</h3>
          <button className="text-sm text-blue-400 hover:text-blue-300">
            View All
          </button>
        </div>
        <table className="w-full">
          <thead className="bg-gray-800/50 text-left">
            <tr>
              <th className="px-6 py-3 text-sm font-medium text-gray-400">Name</th>
              <th className="px-6 py-3 text-sm font-medium text-gray-400">Type</th>
              <th className="px-6 py-3 text-sm font-medium text-gray-400">Size</th>
              <th className="px-6 py-3 text-sm font-medium text-gray-400">Status</th>
              <th className="px-6 py-3 text-sm font-medium text-gray-400">Uploaded</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {documents.map((doc) => (
              <tr key={doc.id} className="hover:bg-gray-800/30">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">📄</span>
                    <span className="font-medium">{doc.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-400">{doc.type}</td>
                <td className="px-6 py-4 text-sm text-gray-400">{formatSize(doc.size)}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex px-2 py-1 text-xs rounded-full ${getStatusColor(doc.status)}`}>
                    {doc.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-400">
                  {doc.uploadedAt.toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
