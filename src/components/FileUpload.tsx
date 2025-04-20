
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText } from 'lucide-react';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
}

export const FileUpload = ({ onFileSelect }: FileUploadProps) => {
  const [preview, setPreview] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      onFileSelect(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, [onFileSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    maxFiles: 1
  });

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card className={`p-8 border-2 border-dashed transition-all duration-200 
        ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
        {...getRootProps()}>
        <input {...getInputProps()} />
        <div className="flex flex-col items-center gap-4">
          <FileText className="w-12 h-12 text-gray-400" />
          {preview ? (
            <div className="w-full max-w-md">
              <img
                src={preview}
                alt="Aperçu de la facture"
                className="w-full h-auto rounded-lg shadow-md"
              />
            </div>
          ) : (
            <div className="text-center">
              <p className="text-lg font-medium text-gray-700">
                Glissez et déposez votre facture ici
              </p>
              <p className="text-sm text-gray-500 mt-1">
                ou cliquez pour sélectionner un fichier
              </p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};
