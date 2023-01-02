import API_ENDPOINT from '../global/api-endpoint'

class RestaurantDicodingApi {
  static async getList() {
    const response = await fetch(API_ENDPOINT.LIST)
    return await response.json()
  }

  static async getListByKeyword(keyword) {
    const response = await fetch(API_ENDPOINT.SEARCH(keyword))
    return await response.json()
  }

  static async setReview(data) {
    const dataJson = JSON.stringify(data)
    const response = await fetch(API_ENDPOINT.REVIEW, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: dataJson
    })
    return await response.json()
  }

  static async getDetail(id) {
    const response = await fetch(API_ENDPOINT.DETAIL(id))
    return await response.json()
  }
}

export default RestaurantDicodingApi
