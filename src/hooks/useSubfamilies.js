import { useState, useEffect, useCallback } from "react";
import subfamilyService from "../services/subfamilyService";

export function useSubfamilies() {

    const [subfamilies, setSubfamilies] = useState([]);
    const [subfamiliesNames, setSubfamiliesNames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchSubfamilies = useCallback(async () => {
        setLoading(true);
        try {
            const response = await subfamilyService.getSubfamilies();
            setSubfamilies(response.data);
        } catch (err) {

            setError(err);
        } finally {
            setLoading(false);
        }
    }, []);

    const fetchSubfamily = useCallback(async (id) => {
        setLoading(true);
        try {
            const response = await subfamilyService.getSubfamily(id);
            return response;
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }, []);

    const fetchSubfamilyNames = useCallback(async () => {
        setLoading(true);
        try {
            const response = await subfamilyService.getSubfamilyNames();
            const data = response || response.data;

            setSubfamiliesNames(
                data.map(item => ({
                    value: item.id,
                    label: item.name
                }))
            );


            return response.data;
        }
        catch (err) {
            setError(err);
        }
        finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchSubfamilies();
        fetchSubfamilyNames();
    }, [fetchSubfamilies, fetchSubfamilyNames]);

    return {
        subfamilies,
        loading,
        error,
        subfamiliesNames,
        setSubfamiliesNames,
        fetchSubfamilies,
        fetchSubfamily,
        fetchSubfamilyNames,
        setSubfamilies
    }

}