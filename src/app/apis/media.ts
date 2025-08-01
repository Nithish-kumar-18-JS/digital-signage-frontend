'use client'    
const addMedia = async (name: string, image:string,type: string,token: string | null) => {
    try {
      const formData = {
        name,
        url:image,
        type,
      }
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/media/add-media`, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error("Upload failed");
      }
  
      return response.json();
    } catch (error) {
      console.error("Image upload error:", error);
      throw error;
    }
};

const getAllMedia = async (token: string | null,type?: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/media/all-media?type=${type}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        throw new Error("Failed to fetch media");
      }
  
      return response.json();
    } catch (error) {
      console.error("Failed to fetch media:", error);
      throw error;
    }
};

const deleteMedia = async (id: string,token: string | null) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/media/delete-media?id=${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        throw new Error("Failed to delete media");
      }
  
      return response.json();
    } catch (error) {
      console.error("Failed to delete media:", error);
      throw error;
    }
};

const searchMedia = async (token: string | null,search?: string,type = "") => {
    try {

      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/media/search-media?search=${search}&type=${type}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        throw new Error("Failed to fetch media");
      }
  
      return response.json();
    } catch (error) {
      console.error("Failed to fetch media:", error);
      throw error;
    }
};

const uploadMedia = async (token: string | null, file: File) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/upload`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        throw new Error("Upload failed");
      }
  
      return response.json();
    } catch (error) {
      console.error("Image upload error:", error);
      throw error;
    }
}

const editMedia = async (name: string, image:string,type: string,token: string | null,id: string) => {
    try {
      const formData = {
        name,
        url:image,
        type,
      }
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/media/update-media?id=${id}`, {
        method: "PUT",
        body: JSON.stringify(formData),
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error("Upload failed");
      }
  
      return response.json();
    } catch (error) {
      console.error("Image upload error:", error);
      throw error;
    }
}


const mediaApi = () => {
    return {
        addMedia,
        getAllMedia,
        deleteMedia,
        searchMedia,
        uploadMedia,
        editMedia
    }
}

export default mediaApi

