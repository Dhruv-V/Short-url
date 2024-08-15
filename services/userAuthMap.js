const auth_map = new Map();

const setUser = (id, data) => {
  auth_map.set(id, data);
  console.log("set", auth_map);
};

const getUser = (id) => {
  return auth_map.get(id);
};

module.exports = { setUser, getUser };
