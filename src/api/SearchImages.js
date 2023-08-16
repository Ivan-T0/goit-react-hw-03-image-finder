const BASE_URL = "https://pixabay.com/api/";
const KEY = "38720004-3c98790cd9e1805c2e00b9c38";

const getImages = async ({ searchQuery, page, per_page }) => {
  const params = new URLSearchParams({
    key: KEY,
    q: searchQuery,
    page: page,
    per_page: per_page,
    image_type: "photo"
  });

  const response = await fetch(`${BASE_URL}?${params}`);

  if (!response.ok) {
    throw new Error("Oops...");
  }

  const data = await response.json();
  return data;
};

export default getImages;