const fetchBreedList = async ({ queryKey }) => {
  const animal = queryKey[1];

  const res = await fetch(
    `http://pets-v2.dev-apis.com/breeds?animal=${animal}`
  );
  if (!res.ok) {
    throw new Error(`Could not find for animal${animal}`);
  }
  return res.json();
};
export default fetchBreedList;
