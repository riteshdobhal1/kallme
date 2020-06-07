import requests 
url = 'https://www.google.co.in/search?vet=10ahUKEwjsoJPA1YrdAhXJLI8KHUpQC44QoEQIKygA..i&ei=LZaCW6zWEsnZvATKoK3wCA&rlz=1C1PRFC_enIN751IN751&yv=3&tbm=lcl&tbs=lrf:!2m1!1e2!2m1!1e3!3sIAE,lf:1,lf_ui:10&q=electronics+address&start=20&asearch=rl_ist&async=num:20,idx:0,hdr:true,stick:,_id:rl_ist0,_pms:s,_fmt:pc'
user_agent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.47 Safari/537.36'
headers = {'User-Agent': user_agent}
response = requests.get(url,headers=headers)
html = response.content
print(response.content)
