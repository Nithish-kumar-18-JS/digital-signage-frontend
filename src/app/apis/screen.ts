export const addScreen = async (token:string | null , data: any) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/screens/add-screen`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error("Failed to add screen");
        }

        return response.json();
    } catch (error) {
        console.error("Failed to add screen:", error);
        throw error;
    }
};

export const getAllScreen = async (token:string | null) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/screens/all-screen`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error("Failed to fetch screen");
        }

        return response.json();
    } catch (error) {
        console.error("Failed to fetch screen:", error);
        throw error;
    }
};

export const deleteScreen = async (token:string | null , id:string) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/screens/delete-screen?id=${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error("Failed to delete screen");
        }

        return response.json();
    } catch (error) {
        console.error("Failed to delete screen:", error);
        throw error;
    }
};

export const editScreen = async (token:string | null , id:string, data: any) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/screens/edit-screen?id=${id}`, {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error("Failed to edit screen");
        }

        return response.json();
    } catch (error) {
        console.error("Failed to edit screen:", error);
        throw error;
    }
};
