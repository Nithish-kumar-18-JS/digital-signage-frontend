'use client'    
const addMedia = async (name: string, image: File,type: string,token: string | null) => {
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("file", image);
      formData.append("type", type);
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/media/add-media`, {
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


const mediaApi = () => {
    return {
        addMedia,
        getAllMedia
    }
}

export default mediaApi

