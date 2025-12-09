
import { GoogleGenAI } from "@google/genai";
import { CommuneData, Source } from "../types";
import { getOfficialCommuneData } from "../data/communesDb";

const processEnvApiKey = process.env.API_KEY;

if (!processEnvApiKey) {
  console.error("API_KEY is not set in environment variables.");
}

const ai = new GoogleGenAI({ apiKey: processEnvApiKey });

export const fetchCommuneStats = async (communeName: string, knownEpci?: string): Promise<Partial<CommuneData>> => {
  try {
    // 1. Vérifier les données officielles SRU & Zonages (Priorité absolue)
    const officialData = getOfficialCommuneData(communeName);
    
    // Si données officielles trouvées, on les prépare
    let officialStats: Partial<CommuneData> = {};
    let promptContext = "";

    if (officialData) {
        officialStats = {
            name: officialData.name, // Use official name spelling
            population: officialData.pop,
            epci: officialData.epci,
            directionTerritoriale: officialData.dirTerr,
            zoning: {
                accession: officialData.zoneAcc || "Non trouvé",
                rental: officialData.zoneLoc || "Non trouvé"
            },
            stats: {
                socialHousingRate: officialData.sruRate !== null ? officialData.sruRate : 0,
                targetRate: officialData.targetRate,
                deficit: (officialData.sruRate !== null && officialData.sruRate < officialData.targetRate && !officialData.isOver && !officialData.exempt),
                exempt: officialData.exempt
            },
            // On marque que c'est une source officielle pour l'affichage
        };
        
        // Si on a tout, on n'appelle PAS l'IA pour économiser et accélérer
        if (officialData.pop && officialData.epci && officialData.zoneAcc && officialData.zoneLoc) {
            return {
                ...officialStats,
                sources: [{ title: "Données Officielles DDTM/SRU 2024", uri: "#" }],
                lastUpdated: new Date().toLocaleDateString('fr-FR')
            };
        }

        // Sinon (cas rare de trou dans la BDD), on demande à l'IA de compléter
        promptContext = `
        NOTE IMPORTANTE : J'ai déjà les données officielles suivantes, NE LES CHERCHE PAS et NE LES INVENTE PAS :
        - Population : ${officialData.pop}
        - Taux SRU : ${officialData.sruRate}%
        - EPCI : ${officialData.epci}
        `;
    }

    const model = "gemini-2.5-flash";
    
    const prompt = `
      Tu es un expert en habitat et urbanisme dans le département du Nord (59).
      
      Je cherche les données publiques pour la commune de "${communeName}" (${knownEpci || "Nord"}).

      ${promptContext}

      OBJECTIF : 
      1. Confirmer ou trouver le Zonage ABC (A, B1, B2, ou C).
      2. Confirmer ou trouver le Zonage de financement HLM (1, 2 ou 3).
      ${!officialData ? "3. Trouver Population, Taux SRU, Taux Cible et Direction Territoriale (Source 2023/2024)." : ""}

      FORMAT DE RÉPONSE OBLIGATOIRE (JSON pur) :
      {
        ${!officialData ? '"population": nombre_entier ou null,' : ''}
        ${!officialData ? '"epci": "Nom complet de l\'EPCI",' : ''}
        ${!officialData ? '"directionTerritoriale": "Nom DT (ex: Valenciennes, Sud, Flandre)",' : ''}
        ${!officialData ? '"stats": { "socialHousingRate": nombre (ex: 12.5) ou null, "targetRate": nombre (ex: 25) ou null, "deficit": booléen ou null },' : ''}
        "zoning": { 
            "accession": "Code Zone (ex: B1)" ou "Non trouvé", 
            "rental": "Code Zone (ex: 2 ou B2)" ou "Non trouvé" 
        }
      }
      
      RÈGLES :
      - NE FAIS JAMAIS D'ESTIMATION.
      - Renvoie uniquement le JSON.
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        temperature: 0,
      }
    });

    let jsonText = response.text || "";
    const startIndex = jsonText.indexOf('{');
    const endIndex = jsonText.lastIndexOf('}');
    if (startIndex !== -1 && endIndex !== -1) {
      jsonText = jsonText.substring(startIndex, endIndex + 1);
    } else {
       jsonText = jsonText.replace(/```json\n?|```/g, "").trim();
    }

    let aiData: Partial<CommuneData>;
    try {
      aiData = JSON.parse(jsonText);
    } catch (e) {
      console.error("Failed to parse JSON response:", response.text);
      throw new Error("Erreur de lecture des données (Format invalide).");
    }

    // Fusion : Données Officielles > Données IA
    const finalData = {
        ...aiData,
        ...officialStats, // Ecrase les données IA avec les officielles si elles existent
        zoning: officialData?.zoneAcc ? officialStats.zoning : (aiData.zoning || { accession: "Non trouvé", rental: "Non trouvé" })
    };

    // Sources
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    const sources: Source[] = [];
    if (officialData) {
        sources.push({ title: "Données Officielles DDTM 59", uri: "#" });
    }
    if (Array.isArray(chunks)) {
      chunks.forEach((c: any) => {
        const uri = c.web?.uri;
        const title = c.web?.title;
        if (typeof uri === 'string') {
          if (!sources.some(s => s.uri === uri)) {
              sources.push({ uri, title: title || new URL(uri).hostname });
          }
        }
      });
    }

    finalData.sources = sources.slice(0, 5);
    finalData.lastUpdated = new Date().toLocaleDateString('fr-FR');
    
    return finalData;

  } catch (error) {
    console.error("Error fetching commune stats:", error);
    throw error;
  }
};
