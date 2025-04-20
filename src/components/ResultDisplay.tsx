
import React from 'react';
import { Card } from '@/components/ui/card';

interface AnalysisResult {
  date: string;
  montant: string;
  typeDepense: string;
}

interface ResultDisplayProps {
  result: AnalysisResult | null;
  isLoading: boolean;
}

export const ResultDisplay = ({ result, isLoading }: ResultDisplayProps) => {
  if (isLoading) {
    return (
      <Card className="p-6 mt-6">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/3"></div>
        </div>
      </Card>
    );
  }

  if (!result) return null;

  return (
    <Card className="p-6 mt-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-500">Date</p>
          <p className="text-lg font-semibold">{result.date}</p>
        </div>
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-500">Montant</p>
          <p className="text-lg font-semibold">{result.montant}</p>
        </div>
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-500">Type de dépense</p>
          <p className="text-lg font-semibold">{result.typeDepense}</p>
        </div>
      </div>
    </Card>
  );
};
