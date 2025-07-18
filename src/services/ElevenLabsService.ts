// This file is located at 'src/services/ElevenLabsService.ts'

import { Platform } from 'react-native';
// You will need to install this library: npm install react-native-fs
import RNFS from 'react-native-fs';

/**
 * Converts a Blob object to a Base64 string.
 * This is needed to save the audio data received from the fetch API.
 * @param blob The blob to convert.
 * @returns A promise that resolves with the base64 encoded string.
 */
const blobToBase64 = (blob: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      // The result includes the data URL prefix (e.g., "data:audio/mpeg;base64,"),
      // which we need to strip before writing to the file.
      const dataUrl = reader.result as string;
      const base64Data = dataUrl.split(',')[1];
      resolve(base64Data);
    };
    reader.readAsDataURL(blob);
  });
};


/**
 * Fetches audio from the ElevenLabs API for the given text.
 * @param text The text to convert to speech.
 * @param apiKey Your ElevenLabs API key.
 * @param voiceId The ID of the voice to use.
 * @returns The local file path to the saved MP3 audio file.
 */
export const getAniVoice = async (
  text: string,
  apiKey: string,
  voiceId: string,
): Promise<string> => {
  const API_URL = `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`;

  const payload = {
    text: text,
    model_id: 'eleven_multilingual_v2', // A good, versatile model
    voice_settings: {
      stability: 0.5,
      similarity_boost: 0.75,
      style: 0.1,
      use_speaker_boost: true,
    },
  };

  try {
    // --- FIX: Switched to standard `fetch` for the API request ---
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'xi-api-key': apiKey,
            'accept': 'audio/mpeg',
        },
        body: JSON.stringify(payload)
    });

    if (!response.ok) {
      // If the response is not successful, throw an error with the status.
      console.error(`ElevenLabs API request failed. Status code: ${response.status}`);
      throw new Error(`API request failed with status ${response.status}`);
    }

    // Get the response data as a Blob
    const blob = await response.blob();
    
    // Convert the Blob to a Base64 string
    const base64Data = await blobToBase64(blob);

    // Define the local file path where the audio will be saved
    const audioFilePath = `${RNFS.TemporaryDirectoryPath}ani_voice_${Date.now()}.mp3`;

    // --- Use RNFS to write the file from the base64 data ---
    await RNFS.writeFile(audioFilePath, base64Data, 'base64');

    console.log('Audio saved to:', audioFilePath);
    return audioFilePath;

  } catch (error) {
    console.error('Failed to fetch and save ElevenLabs response:', error);
    throw error; // Re-throw the error to be handled in the App component
  }
};
