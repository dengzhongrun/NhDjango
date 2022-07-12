import pymysql
import pandas as pd
def chun_pymysql(data):
    # 创建连接
    connect = pymysql.connect(host="127.0.0.1",
                              user="root",
                              passwd="200124",
                              database="nh",
                              port=3306,
                              charset="utf8")
    cursor = connect.cursor()   #创建游标对象
    # 编写插入数据的mysql
    sql = "insert into role_personinfo(name,id_num,employee_number,age,sex," \
          "height,weight,passwd,email,edu_back,administrator,boss,Hob_Tal,photo," \
          "phone_number,area,home_address,join_time,person_file,associated_user) " \
          "values(%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)"
    # 执行sql
    for i in data:
        cursor.execute(sql, (i[0], i[1], str(i[2]), i[3], i[4], i[5],i[6], i[7], i[8], i[9], i[10],
                            i[11], i[12], str(i[13]), str(i[14]),i[15],i[16],i[17],i[18],i[19]))
    connect.commit()
    cursor.close()  #关闭游标连接
    connect.close()  #关闭数据库连接
data = pd.read_excel("../static/data/人员信息表.xlsx").values
chun_pymysql(data)