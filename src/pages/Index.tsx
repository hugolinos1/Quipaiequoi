
import React, { useState } from 'react';
import { FileUpload } from '@/components/FileUpload';
import { ResultDisplay } from '@/components/ResultDisplay';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface AnalysisResult {
  date: string;
  montant: string;
  typeDepense: string;
}

const Index = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileDownloadURL, setFileDownloadURL] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const handleFileSelect = (file: File, downloadURL?: string) => {
    setSelectedFile(file);
    setFileDownloadURL(downloadURL || null);
    setResult(null);
  };

  const analyzeInvoice = async () => {
    if (!selectedFile || !fileDownloadURL) {
      toast.error("Veuillez d'abord sélectionner une facture");
      return;
    }

    setIsAnalyzing(true);
    try {
      // TODO: Remplacer par l'appel API Mistral
      await new Promise(resolve => setTimeout(resolve, 2000));
      setResult({
        date: "2024-04-20",
        montant: "150,00 €",
        typeDepense: "Services professionnels"
      });
      toast.success("Analyse terminée avec succès !");
    } catch (error) {
      toast.error("Erreur lors de l'analyse de la facture");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Analyseur de Factures
          </h1>
          <p className="mt-2 text-gray-600">
            Chargez votre facture pour extraire automatiquement les informations importantes
          </p>
        </div>

        <FileUpload onFileSelect={handleFileSelect} />

        {selectedFile && (
          <div className="flex justify-center">
            <Button
              onClick={analyzeInvoice}
              disabled={isAnalyzing}
              className="px-6"
            >
              {isAnalyzing ? 'Analyse en cours...' : 'Analyser la facture'}
            </Button>
          </div>
        )}

        <ResultDisplay result={result} isLoading={isAnalyzing} />
      </div>
    </div>
  );
};

export default Index;

