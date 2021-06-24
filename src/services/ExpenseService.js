import httpClient from "../http-common";

const getAll = (id) => {
  return httpClient.get(`/expenses?userId=${id}`);
};

const create = (data) => {
  return httpClient.post("/expenses", data);
};

const get = (id) => {
  return httpClient.get(`/expenses/${id}`);
};

const remove = (id) => {
  return httpClient.delete(`/expenses/${id}`);
};

const update = (data) => {
  return httpClient.put("/expenses", data);
};

export default { getAll, create, get, remove, update };
