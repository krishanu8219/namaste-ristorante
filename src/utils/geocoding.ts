export interface GeocodingResult {
    place_id: number;
    lat: string;
    lon: string;
    display_name: string;
}

export const getCoordinatesFromAddress = async (address: string): Promise<{ latitude: number; longitude: number } | null> => {
    try {
        // Use viewbox to bias towards Torino area instead of appending text
        // Viewbox approx: NW(7.50, 45.16), SE(7.85, 44.90) covering Torino and suburbs
        const viewbox = '7.50,45.16,7.85,44.90';
        const params = new URLSearchParams({
            format: 'json',
            q: address,
            limit: '1',
            viewbox: viewbox,
            bounded: '0', // 0 = Bias only, 1 = Restrict. Bias is better to allow results just outside if they match well.
            countrycodes: 'it'
        });

        const response = await fetch(
            `https://nominatim.openstreetmap.org/search?${params.toString()}`
        );

        if (!response.ok) {
            throw new Error('Failed to fetch coordinates');
        }

        const data = await response.json();

        if (data && data.length > 0) {
            return {
                latitude: parseFloat(data[0].lat),
                longitude: parseFloat(data[0].lon),
            };
        }

        return null;
    } catch (error) {
        console.error('Geocoding error:', error);
        return null;
    }
};

export const searchAddressSuggestions = async (query: string): Promise<GeocodingResult[]> => {
    if (query.length < 3) return [];

    try {
        const viewbox = '7.50,45.16,7.85,44.90';
        const params = new URLSearchParams({
            format: 'json',
            q: query,
            addressdetails: '1',
            limit: '5',
            countrycodes: 'it',
            viewbox: viewbox,
            bounded: '0'
        });

        const response = await fetch(
            `https://nominatim.openstreetmap.org/search?${params.toString()}`
        );

        if (!response.ok) {
            return [];
        }

        const data = await response.json();
        return data || [];
    } catch (error) {
        console.error('Autocomplete error:', error);
        return [];
    }
};
