import axios from "axios";

const API_BASE = "http://localhost:8080/api/books"; // backend url

export const getAllBooks = async () => {
  const response = await axios.get(API_BASE);
  return response.data;
};

export const getBookById = async (id) => {
  const response = await axios.get(`${API_BASE}/${id}`);
  return response.data;
};

export const createBook = async (book) => {
  const response = await axios.post(API_BASE, book);
  return response.data;
};

export const updateBook = async (id, book) => {
  const response = await axios.put(`${API_BASE}/${id}`, book);
  return response.data;
};

export const deleteBook = async (id) => {
  await axios.delete(`${API_BASE}/${id}`);
};