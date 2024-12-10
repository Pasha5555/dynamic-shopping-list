import { SetStateAction, useCallback, useEffect, useState } from 'react';
import { Api } from '../api/api';
import { InputType } from '../models';

interface UseHttpReturn<T> {
    data: T[];
    isLoading: boolean;
    error: string | null;
    sendRequest: (data?: any) => Promise<void>;
    clearData: () => void;
    setData: (data: SetStateAction<T[]>) => void;
    addItem: (item: T) => void;
    removeItem: (id: string) => void;
    editItem: (updatedItem: T) => void;
    updateList: (id: string, value: InputType, prop: string) => void;
}

export default function useDynamicList<T extends { id: string }>(
    url: string,
    config: RequestInit,
    initialData: T[]
): UseHttpReturn<T> {
    const [error, setError] = useState<string>('');
    const [data, setData] = useState<T[]>(initialData);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const sendRequest = useCallback(async (data?: any) => {
        setIsLoading(true);
        try {
            const resData = config.method === 'POST'
                ? await Api.post<T[]>(url, { ...config, body: data })
                : await Api.get<T[]>(url);
            setData(resData);
        } catch (e) {
            setError(e.message || 'Oops...');
        }
        setIsLoading(false);
    }, [url, config]);

    const clearData = () => setData(initialData);

    const addItem = (item: T) => {
        setData((prevData) => [...prevData, item]);
    };

    const removeItem = (id: string) => {
        setData((prevData) => prevData.filter((item) => item.id !== id));
    };

    const editItem = (updatedItem: T) => {    
        setData((prevData) =>
            prevData.map((item) =>
                item.id === updatedItem.id ? { ...item, ...updatedItem } : item
            )
        );
    };

    const updateList = (id: string, value: InputType, prop: string) => {        
        setData((prevData) => prevData.map((item) => {
            if (!id) {
                return { ...item, [prop]: value };
            }
            return item.id === id ? { ...item, [prop]: value } : item
        }));        
    };

    useEffect(() => {
        if (config && config.method === 'GET') {
            sendRequest();
        }
    }, [sendRequest, config]);

    return {
        data,
        isLoading,
        error,
        sendRequest,
        clearData,
        setData,
        addItem,
        removeItem,
        editItem,
        updateList
    };
}
