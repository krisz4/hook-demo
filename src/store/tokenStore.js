import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_STORAGE_KEY = 'token';

export const setToken = async (token) => {
	await AsyncStorage.setItem(TOKEN_STORAGE_KEY, token);
};

export const getToken = async () => {
	return AsyncStorage.getItem(TOKEN_STORAGE_KEY);
};

export const removeToken = async () => {
	await AsyncStorage.removeItem(TOKEN_STORAGE_KEY);
};
