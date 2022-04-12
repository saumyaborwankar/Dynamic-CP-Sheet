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
    # breakpoint()
    # print(e1[2].contents[1].contents[0].contents[0].contents)
    for i in range(len(e1)):
        # print(type(e1[i].contents[1]))
        try:  
            topic=e1[i].contents[1].contents[0].contents[0].contents[0]
        except:
            topic=e1[i].contents[1].contents[0].contents[0]
        final_list[topic]=[]
        for i in e1[i].findAll('a'):
            # print(i['href'])
            final_list[topic].append(i['href'])
            
    # obj = json.loads("{}".format(final_list))
  
    # # Pretty Print JSON
    # json_formatted_str = json.dumps(obj, indent=4)
    # print(json_formatted_str)    # break
    print(final_list)
    with open("filename.json", "w") as write_file:
        json.dump(final_list,write_file,indent=4)
    # for i in range(len(e1)):
    #     f

    # e2 = soup_data.findAll('div',{'class':'mt-3'}) #find divs which contains required data
    # if page_no==400:
    #     break
    # if(len(e1)==0 or len(e2)==0):
    #     break 
    # program=[]
    # uni=[]
    # season=[]
    # date=[]
    # master=[]
    # int=[]
    # page_num=[]
    # gre=[]
    # gpa=[]
    # for i in range(min(len(e1),len(e2))):
    #     try:
    #         # print(e1[i].contents[0].split(',')[0],e1[i].contents[0].split(',')[1],e2[i].contents[3].contents[0],re.sub('[^A-Za-z0-9 ]+','',e2[i].contents[1].contents[0]),e2[i].contents[7].contents[0],e2[i].contents[5].contents[0])
    #         # print(e2[0].contents)
    #         liss=['A','W','R']
    #         if(re.sub('[^A-Za-z0-9 ]+','',e2[i].contents[1].contents[0])[0] not in liss):
    #             continue
    #         program.append(e1[i].contents[0].split(',')[0])
    #         uni.append(e1[i].contents[0].split(',')[1])

    #         date.append(re.sub('[^A-Za-z0-9 ]+','',e2[i].contents[1].contents[0]))
    #         season.append(e2[i].contents[3].contents[0])
    #         count=5
    #         # if e2[i].contents[count].contents[0]=='International' or e2[i].contents[count].contents[0]=='American' or e2[i].contents[count].contents[0]=='Other':
    #         listt=['G','M','P']
    #         if e2[i].contents[count].contents[0][0] not in listt:
    #             int.append(e2[i].contents[count].contents[0])
    #             count+=2
    #         else:
    #             int.append('-')
    #         if e2[i].contents[count].contents[0][0:3]=='GRE':
    #             gre.append(e2[i].contents[count].contents[0])
    #             count+=2
    #         else:
    #             gre.append('-')
    #         if e2[i].contents[count].contents[0][0:3]=='GPA':
    #             gpa.append(e2[i].contents[count].contents[0])
    #             count+=2
    #         else:
    #             gpa.append('-')
    #         if(e2[i].contents[count].contents[0]=='Masters' or e2[i].contents[count].contents[0]=='PhD'):
    #             master.append(e2[i].contents[count].contents[0])
    #         else:
    #             master.append('-')
            
    #         page_num.append(page_no)
    #         # print(len(program),len(uni),len(date),len(season),len(int),len(gre),len(gpa),len(master),len(page_num),e1[i].contents[0].split(',')[0])
    #     # print(e2[0].contents[7].contents[0])
    #     except:
    #         continue
        # breakpoint()
    # break
    # print(len(program))
    # df=pd.DataFrame()
    # df['Program']=program
    # df['Uni']=uni
    # df['Date']=date
    # df['Season']=season
    # df['International']=int
    # df['GRE']=gre
    # df['GPA']=gpa
    # df['Master']=master
    # df['Page No']=page_num
    # df.to_csv('compsci.csv', mode='a', index=False, header=False)
    # page_no +=1 #increments the page number by 1

scrap_bid_data()
# d={}
# d[0].append(0)

