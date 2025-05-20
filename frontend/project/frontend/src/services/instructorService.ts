import { Instructor } from '../types';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const instructorService = {
  getAllInstructors: async (): Promise<Instructor[]> => {
    const response = await axios.get(`${API_URL}/instructors`);
    return response.data;
  },

  getInstructorById: async (id: string): Promise<Instructor> => {
    const response = await axios.get(`${API_URL}/instructors/${id}`);
    return response.data;
  },

  searchInstructors: async (query: string): Promise<Instructor[]> => {
    const response = await axios.get(`${API_URL}/instructors/search`, {
      params: { q: query }
    });
    return response.data;
  },

  filterInstructorsByExpertise: async (expertise: string[]): Promise<Instructor[]> => {
    const response = await axios.get(`${API_URL}/instructors/filter`, {
      params: { expertise: expertise.join(',') }
    });
    return response.data;
  },

  submitInstructorApplication: async (application: {
    name: string;
    email: string;
    expertise: string[];
    experience: string;
    message: string;
  }) => {
    const response = await axios.post(`${API_URL}/instructors/apply`, application);
    return response.data;
  }
}; 