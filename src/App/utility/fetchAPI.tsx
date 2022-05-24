async function FetchAPI(address: string) {
  const response = await fetch(address);
  const responseData = await response.json();
  return responseData;
}
export default FetchAPI;
