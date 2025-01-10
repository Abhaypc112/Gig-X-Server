import axios from 'axios';

export const verifyGoogleToken = async (token: string): Promise<any> => {
  try {
    const response = await axios.post(
      `https://oauth2.googleapis.com/tokeninfo?id_token=${token}`
    );
    return response.data;
  } catch (error) {
    throw new Error('Google authentication failed');
  }
};
