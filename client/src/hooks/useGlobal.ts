import { useState, useReducer } from 'react';

interface GlobalState {
	form: string[];
	error: boolean | null;
	loading: boolean | null;
}

export const useGlobal = () => {
	const [form, setForm] = useState('');
	const [error, setError] = useState('null');
	const [loading, setLoading] = useState('null');

	return { form, setForm, error, setError, loading, setLoading };
};
