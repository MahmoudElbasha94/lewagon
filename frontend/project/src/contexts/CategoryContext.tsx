import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../utils/api';

interface Category {
  id: string;
  name: string;
  description: string;
  parentId?: string;
  parentCategory?: Category;
  coursesCount: number;
  createdAt: string;
  updatedAt: string;
}

interface CategoryContextType {
  categories: Category[];
  addCategory: (data: Omit<Category, 'id' | 'coursesCount' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateCategory: (id: string, data: Partial<Category>) => Promise<void>;
  deleteCategory: (id: string) => Promise<void>;
}

const CategoryContext = createContext<CategoryContextType | undefined>(undefined);

export const CategoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await api.get('/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  };

  const addCategory = async (data: Omit<Category, 'id' | 'coursesCount' | 'createdAt' | 'updatedAt'>) => {
    try {
      const response = await api.post('/categories', data);
      setCategories(prev => [...prev, response.data]);
    } catch (error) {
      console.error('Failed to add category:', error);
      throw error;
    }
  };

  const updateCategory = async (id: string, data: Partial<Category>) => {
    try {
      const response = await api.put(`/categories/${id}`, data);
      setCategories(prev =>
        prev.map(category => (category.id === id ? response.data : category))
      );
    } catch (error) {
      console.error('Failed to update category:', error);
      throw error;
    }
  };

  const deleteCategory = async (id: string) => {
    try {
      await api.delete(`/categories/${id}`);
      setCategories(prev => prev.filter(category => category.id !== id));
    } catch (error) {
      console.error('Failed to delete category:', error);
      throw error;
    }
  };

  return (
    <CategoryContext.Provider
      value={{
        categories,
        addCategory,
        updateCategory,
        deleteCategory
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategories = () => {
  const context = useContext(CategoryContext);
  if (context === undefined) {
    throw new Error('useCategories must be used within a CategoryProvider');
  }
  return context;
}; 