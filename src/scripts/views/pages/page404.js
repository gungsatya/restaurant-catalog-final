const Page404 = {
  async render() {
    return `
         <section id="hero">
          <div class="hero-container">
            <h1>ERROR 404</h1>
            <p>Please contact the administrator</p>
            <a href="/#/">Back to Homepage</a>
          </div>
        </section>
          `
  },

  async afterRender() {
    console.error('Page are not found!')
  }
}

export default Page404
