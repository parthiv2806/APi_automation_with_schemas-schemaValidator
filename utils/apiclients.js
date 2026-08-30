import { request } from "@playwright/test";
import { getToken } from "../utils/tokenmanager";

let apicontext = null;

export async function initApiClient() {
  apicontext = await request.newContext({});
}

export async function get(url) {
  return await apicontext.get(url);
}

export async function post(url, payload) {
  return await apicontext.post(url, {
    data: payload,
  });
}

export async function patch(url, payload) {
  return await apicontext.patch(url, {
    data: payload,
    headers: { Cookie: `token=${getToken()}` },
  });
}

export async function put(url, payload) {
  return await apicontext.put(url, {
    data: payload,
    headers: { Cookie: `token=${getToken()}` },
  });
}
export async function remove(url) {
  return await apicontext.delete(url, {
    headers: { Cookie: `token=${getToken()}` },
  });
}