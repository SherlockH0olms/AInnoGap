// src/components/Common/ErrorAlert.tsx

import React from 'react';
import { X, AlertCircle } from 'lucide-react';

interface ErrorAlertProps {
  title?: string;
  message: string;
  onClose?: () => void;
  details?: string;
}

const ErrorAlert: React.FC<ErrorAlertProps> = ({
  title = 'Error',
  message,
  onClose,
  details,
}) => {
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-6">
      <div className="flex gap-4">
        <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
        <div className="flex-1">
          <h3 className="font-semibold text-red-900 mb-1">{title}</h3>
          <p className="text-red-800 mb-2">{message}</p>
          {details && (
            <details className="text-red-700 text-sm cursor-pointer">
              <summary>Details</summary>
              <pre className="mt-2 bg-red-100 p-2 rounded text-xs overflow-auto">
                {details}
              </pre>
            </details>
          )}
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="text-red-600 hover:text-red-800 transition"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorAlert;
