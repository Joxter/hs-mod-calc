export function save(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function get(key, fallback) {
  const data = localStorage.getItem(key);

  if (data == null && fallback) {
    save(key, fallback);
    return fallback;
  }

  return JSON.parse(data);
}
