import { STORAGE_PREFIX } from "../config";

const storage = {
  getToken: () => {
    return JSON.parse(
      window.localStorage.getItem(`${STORAGE_PREFIX}token`) as string
    );
  },
  setToken: (token: string) => {
    window.localStorage.setItem(
      `${STORAGE_PREFIX}token`,
      JSON.stringify(token)
    );
  },
  clearToken: () => {
    window.localStorage.removeItem(`${STORAGE_PREFIX}token`);
  },
  getUsername: () => {
    return JSON.parse(
      window.localStorage.getItem(`${STORAGE_PREFIX}username`) as string
    );
  },
  setUsername: (username: string) => {
    window.localStorage.setItem(
      `${STORAGE_PREFIX}username`,
      JSON.stringify(username)
    );
  },
  clearUsername: () => {
    window.localStorage.removeItem(`${STORAGE_PREFIX}username`);
  },
  getRoles: () => {
    return JSON.parse(
      window.localStorage.getItem(`${STORAGE_PREFIX}roles`) as string
    );
  },
  setRoles: (roles: string[]) => {
    window.localStorage.setItem(
      `${STORAGE_PREFIX}roles`,
      JSON.stringify(roles)
    );
  },
  clearRoles: () => {
    window.localStorage.removeItem(`${STORAGE_PREFIX}roles`);
  },
};

export default storage;
