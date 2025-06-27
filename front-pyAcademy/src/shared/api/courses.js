import api from "./api";

export const deleteCourse = async (id) => {
  try {
    const response = await api.delete(`/courses/${id}`);
    return { success: true, data: response.data };
  } catch (error) {
    if (error.response) {
      return { success: false, status: error.response.status, data: error.response.data };
    } else if (error.request) {
      return { success: false, status: null, data: "No hay respuesta del servidor" };
    } else {
      return { success: false, status: null, data: error.message };
    }
  }
};
