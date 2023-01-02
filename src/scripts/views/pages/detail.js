import { createRestaurantDetailContainerTemplate } from '../templates/restaurant-detail'
import RestaurantDicodingApi from '../../data/restaurant-dicoding-api'
import UrlParser from './../../routes/url-parser'
import FavoriteButtonPresenter from '../../utils/favorite-button-presenter'

const Detail = {
  async render() {
    return `
          <section id="restaurant-detail">
            <div class="container">
            </div>
          </section>
          `
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner()
    const response = await RestaurantDicodingApi.getDetail(url.id)
    const restaurant = response.restaurant

    document.querySelector('#restaurant-detail .container').innerHTML =
      createRestaurantDetailContainerTemplate(restaurant)

    await FavoriteButtonPresenter.init({
      favoriteButtonContainer: document.getElementById('favorite-container'),
      restaurant
    })
  }
}

export default Detail
