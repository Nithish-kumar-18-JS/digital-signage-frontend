import { Playlist } from "@/components/models/PlaylistModal";

export const addPlaylist = async (payload: Playlist, token: string | null) => {
    try {
        const formData = {
            name: payload.name,
            description: payload.description,
            items: payload.items,
        }
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/playlists/add-playlist`, {
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error("Failed to add playlist");
        }

        return response.json();
    } catch (error) {
        console.error("Failed to add playlist:", error);
        throw error;
    }
};

export const getAllPlaylist = async (token: string | null) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/playlists/all-playlists`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error("Failed to fetch playlists");
        }

        return response.json();
    } catch (error) {
        console.error("Failed to fetch playlists:", error);
        throw error;
    }
};