import httpClient from "../http-common";

const getAll = () => {
  return httpClient.get("/expense-categories");
};

const create = (data) => {
  return httpClient.post("/expense-categories", data);
};

const get = (id) => {
  return httpClient.get(`/expense-categories/${id}`);
};

const remove = (id) => {
  return httpClient.delete(`/expense-categories/${id}`);
};

const update = (data) => {
  return httpClient.put("/expense-categories", data);
};

export default { getAll, create, get, remove, update };
