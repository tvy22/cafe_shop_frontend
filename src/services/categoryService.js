import api from "./api";

const ENDPOINT = "/categories"; 

function buildCategoryPayload(data = {}, isUpdate = false) {
  const hasFile = data.image instanceof File;

  if (hasFile) {
    const formData = new FormData();
    if (data.name !== undefined) {
      formData.append("name", data.name);
    }
    formData.append("image", data.image);

    if (isUpdate) {
      formData.append("_method", "PUT");
    }

    return {
      payload: formData,
      config: {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    };
  }

  const jsonPayload = {};
  if (data.name !== undefined) jsonPayload.name = data.name;
  if (data.image !== undefined) jsonPayload.image = data.image;

  return {
    payload: jsonPayload,
    config: {},
  };
}

export const categoryService = {
  // GET /api/categories
  getAll: (params = {}) => api.get(ENDPOINT, { params }),

  // GET /api/categories/{id}
  getById: (id) => api.get(`${ENDPOINT}/${id}`),

  // POST /api/categories
  create: (data) => {
    const { payload, config } = buildCategoryPayload(data, false);
    return api.post(ENDPOINT, payload, config);
  },

  // PUT /api/categories/{id}
  update: (id, data) => {
    const { payload, config } = buildCategoryPayload(data, true);

    if (payload instanceof FormData) {
      return api.post(`${ENDPOINT}/${id}`, payload, config);
    }

    return api.put(`${ENDPOINT}/${id}`, payload, config);
  },

  // DELETE /api/categories/{id}
  delete: (id) => api.delete(`${ENDPOINT}/${id}`),
};