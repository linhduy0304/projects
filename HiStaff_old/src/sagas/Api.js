

const url = "https://happyapi.techup.vn/api/v1/feeds";

function* getHasHeader(url, header) {
  return yield fetch(url, 
    {
      method: 'GET',
      headers: header
    }
  ).then(function(response) {
    return response.json()
  })
  .then(function(res) {
    return res
  })
  .catch(function(error) {
    return {
      status: 500
    }
  });;
}

export const Api = {
  getHasHeader
};