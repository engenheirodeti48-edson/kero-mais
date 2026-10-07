import React from 'react';
import { useNotification } from '../context/NotificationContext';
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';

const iconMap = {
  success: CheckCircle,
  error: XCircle,
  warning: AlertCircle,
  info: Info
};

const colorMap = {
  success: 'text-green-600',
  error: 'text-red-600',
  warning: 'text-yellow-600',
  info: 'text-blue-600'
};

const bgMap = {
  success: 'bg-green-50 border-green-200',
  error: 'bg-red-50 border-red-200',
  warning: 'bg-yellow-50 border-yellow-200',
  info: 'bg-blue-50 border-blue-200'
};

export default function NotificationModal() {
  const { notification, closeNotification } = useNotification();

  if (!notification) return null;

  const Icon = notification.icon || iconMap[notification.type] || Info;
  const colorClass = colorMap[notification.type] || 'text-gray-600';
  const bgClass = bgMap[notification.type] || 'bg-gray-50 border-gray-200';

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all scale-100">
        
        {/* Header colorido */}
        <div className={`${bgClass} border-b p-6 flex items-start gap-4`}>
          <div className={`p-3 rounded-full bg-white shadow-sm ${colorClass}`}>
            <Icon size={32} strokeWidth={2.5} />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-900">{notification.title}</h3>
            {notification.message && (
              <p className="text-sm text-gray-600 mt-1 leading-relaxed">{notification.message}</p>
            )}
          </div>
          <button 
            onClick={closeNotification}
            className="text-gray-400 hover:text-gray-700 transition p-1"
          >
            <X size={20} />
          </button>
        </div>

        {/* Footer com ação */}
        <div className="p-4 bg-gray-50 flex justify-end gap-2">
          {notification.action && (
            <button
              onClick={() => {
                notification.action.onClick?.();
                closeNotification();
              }}
              className="px-4 py-2 bg-keroOrange text-white font-bold rounded-lg hover:bg-keroDarkOrange transition text-sm"
            >
              {notification.action.label || 'OK'}
            </button>
          )}
          <button
            onClick={closeNotification}
            className="px-4 py-2 bg-white border border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-100 transition text-sm"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}