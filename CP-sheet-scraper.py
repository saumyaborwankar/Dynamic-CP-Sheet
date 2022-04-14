from cgitb import grey
import requests
import re
import pandas as pd
from urllib3.exceptions import InsecureRequestWarning
requests.packages.urllib3.disable_warnings(InsecureRequestWarning)
from bs4 import BeautifulSoup as bs
# df=pd.DataFrame()
# df['Program']=[1]
# df['Uni']=[1]
# df['Date']=[1]
# df['Season']=[1]
# df['International']=[1]
# df['GRE']=[1]
# df['GPA']=[1]
# df['Master']=[1]
# df['Page No']=[1]
# df.to_csv('compsci.csv', index=False)
import json
def scrap_bid_data(): #initial page number
    final_list={}
    print('Hold on creating URL to fetch data...')
    URL = 'https://takeuforward.org/interview-experience/strivers-cp-sheet/' #create dynamic URL
    print('URL cerated: ' + URL)

    scraped_data = requests.get(URL,verify=False) # request to get the data
    soup_data = bs(scraped_data.text, 'html.parser') #parse the scraped data using lxml
    # print(soup_data)
    e1 = soup_data.findAll('details') #find divs which contains required data
    for i in range(len(e1)):
        try:  
            topic=e1[i].contents[1].contents[0].contents[0].contents[0]
        except:
            topic=e1[i].contents[1].contents[0].contents[0]
        final_list[topic]=[]
        for i in e1[i].findAll('a'):
            # print(i['href'])
            final_list[topic].append(i['href'])
    # print(final_list)
    # with open("filename.json", "w") as write_file:
    #     json.dump(final_list,write_file,indent=4)
    f = open('filename.json')
    data=json.load(f)
    data_for_react=[]
    for i in data:
        for link in data[i]:
            # print(link)
            parts=link.split('/')
            # print(parts)  
            try:
                contestid=int(parts[-2])
                index=parts[-1]
            except:
                contestid=int(parts[-3])
                index=parts[-1]
            print(contestid, index)
            data_for_react.append([contestid,index,link,i])
    print(data_for_react)
    with open("list.json", "w") as write_file:
        json.dump(data_for_react,write_file,indent=4)



scrap_bid_data()


