import axios from 'axios';

export interface Environment {
  production: boolean;
  domain: string;
  sub_path: string;

  currency_code_vn: string;
  domain_uat: string;
  domain_dev: string;
}

const API_URL = 'https://example.com/api/environment';

export const getEnvironment = async (): Promise<Environment> => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching environment configuration:', error);
    throw error;
  }
};
