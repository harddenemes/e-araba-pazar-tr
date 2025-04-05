
import api from './api';

export interface BlogPost {
  id: string;
  title: string;
  summary: string;
  content: string;
  author: string;
  authorTitle?: string;
  publishDate: string;
  coverImage: string;
  tags: string[];
  readTimeMinutes: number;
}

// Get all blog posts
export const getAllBlogPosts = async () => {
  try {
    const response = await api.get('/blogs');
    return response.data.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch blog posts' };
  }
};

// Get a blog post by ID
export const getBlogPostById = async (id: string) => {
  try {
    const response = await api.get(`/blogs/${id}`);
    return response.data.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch blog post' };
  }
};

// Filter blog posts by search term and/or tag
export const filterBlogPosts = async (searchTerm?: string, tag?: string) => {
  try {
    const queryParams = new URLSearchParams();
    
    if (searchTerm) queryParams.append('searchTerm', searchTerm);
    if (tag) queryParams.append('tag', tag);
    
    const response = await api.get(`/blogs/filter?${queryParams.toString()}`);
    return response.data.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to filter blog posts' };
  }
};

// Get all unique tags
export const getUniqueTags = async () => {
  try {
    const response = await api.get('/blogs/tags');
    return response.data.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch tags' };
  }
};

// Get similar blog posts
export const getSimilarPosts = async (postId: string, limit: number = 3) => {
  try {
    const response = await api.get(`/blogs/${postId}/similar?limit=${limit}`);
    return response.data.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch similar posts' };
  }
};

// Admin functions for blog post management
// These functions should only be available to admin users

export const addBlogPost = async (postData: FormData) => {
  try {
    const response = await api.post('/blogs', postData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to create blog post' };
  }
};

export const updateBlogPost = async (id: string, postData: FormData) => {
  try {
    const response = await api.patch(`/blogs/${id}`, postData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to update blog post' };
  }
};

export const deleteBlogPost = async (id: string) => {
  try {
    await api.delete(`/blogs/${id}`);
    return true;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to delete blog post' };
  }
};
