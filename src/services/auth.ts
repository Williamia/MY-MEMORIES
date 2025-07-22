import axios from 'axios';

const API_URL = 'https://my-memories-api.vercel.app/api/auth/login';

export async function loginUser(email: string, password: string) {
  try {
    const response = await axios.post(API_URL, { email, password });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || 'Login failed');
    } else {
      throw new Error('An unexpected error occurred');
    }
  }
}