import { BASE_URL } from '../constants';

export interface ApiConfig {
    baseUrl: string;
    defaultHeaders?: Record<string, string>;
}
  
class ApiService {
    private baseUrl: string;
    private defaultHeaders: Record<string, string>;

    constructor({ baseUrl, defaultHeaders = {} }: ApiConfig) {
        this.baseUrl = baseUrl;
        this.defaultHeaders = defaultHeaders;
    }

    private async sendHttpRequest<T>(endpoint: string, config: RequestInit): Promise<T> {
        const url = `${this.baseUrl}${endpoint}`;
        const headers = { ...this.defaultHeaders, ...config.headers };
        
        const res = await fetch(url, { ...config, headers });
        const resData = await res.json();

        if (!res.ok) {
            throw new Error(resData.message || 'Something went wrong');
        }

        return resData;
    }

    async get<T>(endpoint: string): Promise<T> {
        return this.sendHttpRequest<T>(endpoint, { method: 'GET' });
    }

    async post<T>(endpoint: string, body: unknown, headers?: Record<string, string>): Promise<T> {
        return this.sendHttpRequest<T>(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', ...headers },
            body: JSON.stringify(body),
        });
    }
}
  
const apiInstance = new ApiService({
    baseUrl: BASE_URL
});

export const Api = Object.freeze(apiInstance);