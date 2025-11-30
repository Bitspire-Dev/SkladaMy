import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from './button';

interface ErrorMessageProps {
  message: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export function ErrorMessage({ 
  message, 
  description, 
  action, 
  className = '' 
}: ErrorMessageProps) {
  return (
    <div className={`text-center py-8 px-4 ${className}`}>
      <div className="flex flex-col items-center space-y-4">
        <div className="bg-red-100 p-3 rounded-full">
          <AlertCircle className="w-8 h-8 text-red-600" />
        </div>
        
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-gray-900">
            {message}
          </h3>
          
          {description && (
            <p className="text-gray-600 max-w-md mx-auto">
              {description}
            </p>
          )}
        </div>
        
        {action && (
          <Button
            onClick={action.onClick}
            variant="outline"
            className="mt-4"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            {action.label}
          </Button>
        )}
      </div>
    </div>
  );
}
