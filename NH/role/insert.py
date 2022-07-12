import pymysql
import pandas as pd

# def chun_pymysql(data):
#     # 创建连接
#     connect = pymysql.connect(host="127.0.0.1",
#                               user="root",
#                               passwd="123456",
#                               database="nh",
#                               port=3306,
#                               charset="utf8")
#     cursor = connect.cursor()   #创建游标对象
#     # 编写插入数据的mysql
#     sql = "insert into role_personinfo(name,id_num,staff_id,age,sex," \
#           "height,weight,password,email,edu_back,administrator,boss,Hob_Tal," \
#           "phone_number,area,home_address,join_time,person_file,user_id) " \
#           "values(%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)"
#     # 执行sql
#     for i in data:
#         cursor.execute(sql, (i[0], i[1], str(i[2]), i[3], i[4], i[5],i[6], str(i[7]), i[8], i[9], i[10],
#                             str(i[11]), str(i[12]), str(i[13]), str(i[14]),str(i[15]),i[16],str(i[17]),i[18]))
#     connect.commit()
#     cursor.close()  #关闭游标连接
#     connect.close()  #关闭数据库连接
# data = pd.read_excel("../static/data/人员信息表.xlsx").values
# chun_pymysql(data)

def area(data):
# 创建连接
    connect = pymysql.connect(host="127.0.0.1",
                              user="root",
                              passwd="123456",
                              database="nh",
                              port=3306,
                              charset="utf8")
    cursor = connect.cursor()   #创建游标对象
    # 编写插入数据的mysql
    sql = "insert into role_areas(provinces,city," \
          "regional_manager,business_people,volume," \
          "turnover,input_number) " \
          "values(%s,%s,%s,%s,%s,%s,%s)"
    # 执行sql
    for i in data:
        cursor.execute(sql, (i[0], i[1], str(i[2]), i[3], i[4], i[5], i[6]))
    connect.commit()
    cursor.close()  #关闭游标连接
    connect.close()  #关闭数据库连接
data = pd.read_excel("../static/data/行政区域管理表.xlsx").values
print(data)
area(data)
