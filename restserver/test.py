from geopy.geocoders import Nominatim
from geopy.distance import geodesic
geolocator = Nominatim(user_agent="nukkadsearch")
with open('bangalore_area') as f:
	for line in f:
		location = geolocator.geocode(str(line + ",Bangalore,India"))
		print(line)
		print((location.latitude, location.longitude))
