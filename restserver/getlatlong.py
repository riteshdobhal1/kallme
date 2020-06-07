import requests
GOOGLE_MAPS_API_URL = 'http://maps.googleapis.com/maps/api/geocode/json'
params = {
            'address': 'Nandini Milk Parlor Choodasandra Circle, Bangalore',
            'sensor': 'false',
            'region': 'india'
}
req = requests.get(GOOGLE_MAPS_API_URL, params=params)
res = req.json()
result = res['results'][0]

geodata = dict()
geodata['lat'] = result['geometry']['location']['lat']
geodata['lng'] = result['geometry']['location']['lng']
geodata['address'] = result['formatted_address']

print('{address}. (lat, lng) = ({lat}, {lng})'.format(**geodata))
