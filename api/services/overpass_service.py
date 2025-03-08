import overpass


def get_restaurants(latitude, longitude):
    """
    Returns all restaurants and bar within a given map extent (box)
    """
    # initialize the API
    api = overpass.API()

    # define the query
    query = """(node["amenity"="fast_food"](around:500,{lat},{lon});
                node["amenity"="restaurant"](around:500,{lat},{lon});
                node["amenity"="bar"](around:500,{lat},{lon});
                node["amenity"="bbq"](around:500,{lat},{lon});
                node["amenity"="cafe"](around:500,{lat},{lon});
                node["amenity"="pub"](around:500,{lat},{lon});
                );""".format(
        lat=latitude, lon=longitude
    )

    # call the API
    result = api.get(query)
    return result
