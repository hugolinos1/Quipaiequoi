
import { AnalysisResult } from '@/types/invoice';

export async function analyzeInvoice(fileUrl: string): Promise<AnalysisResult> {
  try {
    const response = await fetch('https://api.mistral.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_MISTRAL_API_KEY}`
      },
      body: JSON.stringify({
        model: 'mistral-medium',
        messages: [
          {
            role: 'system',
            content: 'Tu es un assistant spécialisé dans l\'analyse de factures. Extrais la date, le montant et le type de dépense.'
          },
          {
            role: 'user',
            content: `Analyse le contenu de cette facture : ${fileUrl}`
          }
        ],
        temperature: 0.2
      })
    });

    if (!response.ok) {
      throw new Error('Erreur lors de l\'analyse de la facture');
    }

    const data = await response.json();
    const analysisText = data.choices[0].message.content;

    // Logique basique d'extraction des informations
    const dateMatch = analysisText.match(/(\d{4}-\d{2}-\d{2})/);
    const montantMatch = analysisText.match(/(\d+(?:,\d{2})?\s*€)/);
    const typeDepenseMatch = analysisText.match(/Type de dépense\s*:\s*(.+)/i);

    return {
      date: dateMatch ? dateMatch[1] : new Date().toISOString().split('T')[0],
      montant: montantMatch ? montantMatch[1] : '0,00 €',
      typeDepense: typeDepenseMatch ? typeDepenseMatch[1] : 'Inconnu'
    };
  } catch (error) {
    console.error('Erreur d\'analyse de facture', error);
    throw error;
  }
}
