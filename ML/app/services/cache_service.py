cache = {}

def get_cache(query):
    return cache.get(query.lower())


def set_cache(query, response):
    cache[query.lower()] = response