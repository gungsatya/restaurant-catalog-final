import API_ENDPOINT from './../../../global/api-endpoint'
import { IMAGE_SIZE } from '../../../global/config'

export default class RestaurantElm extends HTMLElement {
  id = null
  name = null
  city = null
  pictureId = null
  rating = null
  description = null

  connectedCallback() {
    this.id = this.getAttribute('id') || null
    this.name = this.getAttribute('name') || null
    this.city = this.getAttribute('city') || null
    this.pictureId = this.getAttribute('pictureId') || null
    this.rating = this.getAttribute('rating') || null
    this.description = this.getAttribute('description') || null

    const smallImageUrl = API_ENDPOINT.IMAGE({
      pictureId: this.pictureId,
      size: IMAGE_SIZE.SMALL
    })
    const mediumImageUrl = API_ENDPOINT.IMAGE({
      pictureId: this.pictureId,
      size: IMAGE_SIZE.MEDIUM
    })
    const largeImageUrl = API_ENDPOINT.IMAGE({
      pictureId: this.pictureId,
      size: IMAGE_SIZE.LARGE
    })

    this.innerHTML = `
    <div class="restaurant-card">
            <div class="badge">Rating ${this.rating}</div>
            <div class="restaurant-tumb">
                <picture>
                    <source media="(max-width: 600px)" srcset="${smallImageUrl}" type="image/jpeg">
                    <source media="(max-width: 1000px)" srcset="${mediumImageUrl}" type="image/jpeg">
                    <img class="lazyload" width="200" height="200" src="${largeImageUrl}" alt="Restaurant ${this.name} Picture">
                </picture>
            </div>
            <div class="restaurant-details">
                <span class="restaurant-city">${this.city}</span>
                <h4><a href="/#/detail/${this.id}">${this.name}</a></h4>
                <p>${this.description}</p>
            </div>
        </div>
    `
  }
}
