"use server"

export async function getAllProducts(page: number, search: string = "") {
  try {
    const limit = 8;
    const skip = (page - 1) * limit;
    
    const baseUrl = search 
      ? `https://dummyjson.com/products/search?q=${encodeURIComponent(search)}&limit=${limit}&skip=${skip}`
      : `https://dummyjson.com/products?limit=${limit}&skip=${skip}`;

    const response = await fetch(baseUrl);
    
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return { products: [], total: 0 };
  }
}

export async function getProductDetail(id: string) {
  try {
    const response = await fetch(`https://dummyjson.com/products/${id}`);
    
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function createProduct(productData: any) {
  try {
    const response = await fetch("https://dummyjson.com/products/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productData),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function deleteProduct(id: string) {
  try {
    const response = await fetch(`https://dummyjson.com/products/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getCategories() {
  try {
    const response = await fetch(`https://dummyjson.com/products/categories`);
    
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}