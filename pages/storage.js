export function save(key, value) {
  if (typeof value !== `string`) {
    throw new Error(`Yuo can save only strings, '${typeof value}' given`);
  }
  localStorage.setItem(key, value);
}

export function get(key) {
  return localStorage.getItem(key);
}
