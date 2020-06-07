from fake_useragent import UserAgent
import requests


ua = UserAgent()
print(ua.chrome)
header = {'User-Agent':str(ua.chrome)}
print(header)
url = "https://www.hybrid-analysis.com/recent-submissions?filter=file&sort=^timestamp"
htmlContent = requests.get(url, headers=header)
print(htmlContent)
