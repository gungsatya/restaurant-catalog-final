import { createRestaurantDeck } from '../templates/restaurant-deck'
import RestaurantDicodingApi from '../../data/restaurant-dicoding-api'

const Home = {
  async render() {
    return `
        <section id="hero">
          <div class="hero-container">
            <h1>Resto App</h1>
            <p>We always serve you better.</p>
          </div>
        </section>
        <section id="restaurants">
          <div class="container">
            <h2 class="title">Explore Our Restaurants</h2>
            <p class="subtitle">We are spread all over Indonesia</p>
            <input type="text" placeholder="Search and [ENTER]" id="search">
            <div class="card-deck" id="restaurant-deck"></div>
          </div>
        </section>
        `
  },

  async afterRender() {
    let response = await RestaurantDicodingApi.getList()

    document
      .getElementById('restaurant-deck')
      .replaceChildren(...createRestaurantDeck(response.restaurants))

    document
      .getElementById('search')
      .addEventListener('change', async (event) => {
        if (event.target.value == null || event.target.value === '') {
          response = await RestaurantDicodingApi.getList()
        } else {
          response = await RestaurantDicodingApi.getListByKeyword(event.target.value)
        }

        document
          .getElementById('restaurant-deck')
          .replaceChildren(...createRestaurantDeck(response.restaurants))
      })
  }
}

export default Home
