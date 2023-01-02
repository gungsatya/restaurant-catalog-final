const itActsAsFavoriteRestaurantModel = (model) => {
  // eslint-disable-next-line no-undef
  it('should return the restaurant that has been added', async () => {
    await model.putRestaurant({ id: 1 })
    await model.putRestaurant({ id: 2 })

    // eslint-disable-next-line no-undef
    expect(await model.getRestaurant(1))
      .toEqual({ id: 1 })
    // eslint-disable-next-line no-undef
    expect(await model.getRestaurant(2))
      .toEqual({ id: 2 })
    // eslint-disable-next-line no-undef
    expect(await model.getRestaurant(3))
      .toEqual(undefined)
  })

  // eslint-disable-next-line no-undef
  it('should refuse a restaurant from being added if it does not have the correct property', async () => {
    await model.putRestaurant({ aProperty: 'property' })

    // eslint-disable-next-line no-undef
    expect(await model.getAllRestaurant())
      .toEqual([])
  })

  // eslint-disable-next-line no-undef
  it('can return all of the restaurants that have been added', async () => {
    await model.putRestaurant({ id: 1 })
    await model.putRestaurant({ id: 2 })

    // eslint-disable-next-line no-undef
    expect(await model.getAllRestaurant())
      .toEqual([
        { id: 1 },
        { id: 2 }
      ])
  })

  // eslint-disable-next-line no-undef
  it('should remove favorite movie', async () => {
    await model.putRestaurant({ id: 1 })
    await model.putRestaurant({ id: 2 })
    await model.putRestaurant({ id: 3 })

    await model.deleteRestaurant(1)

    // eslint-disable-next-line no-undef
    expect(await model.getAllRestaurant())
      .toEqual([
        { id: 2 },
        { id: 3 }
      ])
  })

  // eslint-disable-next-line no-undef
  it('should handle request to remove a movie even though the movie has not been added', async () => {
    await model.putRestaurant({ id: 1 })
    await model.putRestaurant({ id: 2 })
    await model.putRestaurant({ id: 3 })

    await model.deleteRestaurant(4)

    // eslint-disable-next-line no-undef
    expect(await model.getAllRestaurant())
      .toEqual([
        { id: 1 },
        { id: 2 },
        { id: 3 }
      ])
  })
}

export { itActsAsFavoriteRestaurantModel }
