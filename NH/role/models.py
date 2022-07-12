from django.db import models
# from django.contrib.auth.models import User


# 人员信息表
class PersonInfo(models.Model):
    types_dict_choice = [(0, "男"), (1, "女")]
    name = models.CharField(max_length=20, help_text=u'姓名', verbose_name='姓名')
    id_num = models.CharField(max_length=20, help_text=u'身份证号码', unique=True, verbose_name='身份证号码')
    employee_number = models.CharField(max_length=20, unique=True, verbose_name='员工编号')
    age = models.IntegerField(help_text=u'年龄', verbose_name='年龄', )
    sex = models.IntegerField(choices=types_dict_choice, help_text=u'性别', verbose_name='性别')
    height = models.IntegerField(help_text=u'身高', verbose_name='身高(cm)', null=True)
    weight = models.IntegerField(help_text=u'体重', verbose_name='体重(kg)', null=True)
    passwd = models.CharField(max_length=20, verbose_name='密码')
    email = models.EmailField(verbose_name='邮箱地址', null=True)
    # 教育背景
    edu_back = models.CharField(max_length=50, help_text=u'教育背景', verbose_name='教育背景')
    # 是否为管理员
    administrator = models.BooleanField(help_text=u'是否为管理员', verbose_name='是否为管理员')
    # 上司
    boss = models.CharField(max_length=20, help_text=u'上司', verbose_name='上司')
    # 特长与喜好
    Hob_Tal = models.CharField(max_length=200, help_text=u'特长与喜好', verbose_name='特长与喜好', null=True)
    photo = models.ImageField(help_text=u'照片', verbose_name='照片', null=True)
    phone_number = models.CharField(max_length=11, help_text=u'联系电话', verbose_name='联系电话')
    area = models.CharField(max_length=20, help_text=u'所属区域', verbose_name='所属区域')
    home_address = models.CharField(max_length=200, help_text=u'家庭住址', verbose_name='家庭住址', null=True)
    join_time = models.DateTimeField(auto_now_add=True, help_text=u'加入时间', verbose_name='加入时间', null=True)
    # 个人简介
    person_file = models.TextField(help_text=u'个人简介', verbose_name='个人简介')
    associated_user = models.CharField(max_length=20, help_text=u'关联用户', verbose_name='关联用户')
    # user = models.ForeignKey(to=User, to_field="id", on_delete=models.CASCADE)

    class Meta:
        ordering = ("join_time",)
        verbose_name_plural = "人员信息"
        verbose_name = "人员信息"


# 绩效任务表
class PerformanceTask(models.Model):
    recept_id = models.CharField(verbose_name="职工编号", unique=True, max_length=32)
    # 接收人员
    recept_staff = models.CharField(verbose_name="接收人员", max_length=32)
    # 发布人员
    pub_staff = models.CharField(verbose_name="发布人", max_length=32)
    # 发布时间
    pub_time = models.DateField(auto_now_add=True, verbose_name="发布时间")
    # 规定完成时间
    completion_time = models.DateField(verbose_name="规定完成时间", null=True)
    # 规定成交数量
    volume = models.IntegerField(verbose_name="成交数量")
    # 规定成交金额
    turnover = models.IntegerField(verbose_name="成交金额", null=True)
    # 任务描述信息
    task_description = models.TextField(verbose_name="任务描述", null=True)
    # 关联区域经理(一个区域经理对应多个任务绩效表)
    user = models.ForeignKey(to=PersonInfo, to_field="id_num", on_delete=models.CASCADE)

    class Meta:
        ordering = ("pub_time",)
        verbose_name_plural = "绩效任务"
        verbose_name = "绩效任务"


# 行政区域管理
class Areas(models.Model):
    provinces = models.CharField(max_length=20,verbose_name="省份")
    city = models.CharField(max_length=20,verbose_name="城市")
    # 区域经理
    regional_manager = models.CharField(max_length=20,verbose_name="区域经理")
    # 业务人员
    business_people = models.CharField(max_length=20,verbose_name="业务人员")
    business_number = models.CharField(max_length=20, verbose_name='业务人员编号')
    # 成交数量
    volume = models.IntegerField(verbose_name="成交数量")
    # 成交金额
    turnover = models.FloatField(verbose_name="成交金额")
    # 建档数量
    input_number = models.IntegerField(verbose_name="建档数量")

    class Meta:
        ordering = ("volume",)
        verbose_name_plural = "行政区域"
        verbose_name = "行政区域"


# 户主建档信息表
class HouseMainInfo(models.Model):
    types_dict_choice = [(0, "男"), (1, "女")]
    types_health_choice = [(0, "良好"), (1, "较差")]
    types_marriage_choice = [(0, "已婚"), (1, "未婚")]
    name = models.CharField(max_length=20, verbose_name="户主姓名")
    # 身份证号码
    id_number = models.CharField(max_length=20, verbose_name="身份证号码", null=True)
    sex = models.IntegerField(choices=types_dict_choice, help_text=u'性别', verbose_name='性别')
    phone_number = models.CharField(max_length=11, verbose_name="手机号码", null=True)
    # 是否常驻
    is_local = models.BooleanField(help_text=u'是否常驻', verbose_name='是否常驻')
    # 政治面貌
    political_landscape = models.CharField(max_length=20,verbose_name="政治面貌")
    # 个人职业
    staff = models.CharField(max_length=20,verbose_name="个人职业")
    # 健康状况
    health = models.CharField(max_length=10, help_text=u'健康状况', verbose_name='健康状况')
    # 婚姻状况
    marriage = models.CharField(max_length=10, help_text=u'婚姻状况', verbose_name='婚姻状况')
    # 文化程度
    culture = models.CharField(max_length=20,verbose_name="文化程度")
    # 所属区域
    province = models.CharField(max_length=20,verbose_name="所属省份")
    city = models.CharField(max_length=20,verbose_name="所属城市")
    # 农房数量
    house_num = models.IntegerField(default=0, verbose_name=u"农房数量")
    # 农房面积
    house_area = models.FloatField(default=0, verbose_name=u"农房面积(平方米)")
    # 农房价值
    house_value = models.FloatField(default=0, verbose_name=u"农房价值")
    # 汽车数量
    car_num = models.IntegerField(default=0, verbose_name=u"汽车数量")
    # 农业机械数量
    mech_num = models.IntegerField(default=0, verbose_name=u"农业机械数量")
    # 农用机械价值
    mech_value = models.FloatField(default=0, verbose_name=u"农用机械价值(元)")
    # 农用机械图片
    mech_photo = models.ImageField(verbose_name=u"农用机械图片", null=True)
    # 劳动人口
    labor_num = models.IntegerField(default=1, verbose_name=u"劳动人口")
    # 供养人数
    provide_num = models.IntegerField(default=1, verbose_name=u"供养人数")
    # 家庭收入
    family_input = models.FloatField(default=0, verbose_name=u"家庭收入(元)")
    # 家庭支出
    family_spending = models.FloatField(default=0, verbose_name=u"家庭支出(元)")
    # 企业名称
    enterprise_name = models.CharField(max_length=200, verbose_name=u"企业名称", null=True)
    # 生产经营周期
    produce_cycle = models.IntegerField(default=0, verbose_name=u"生产经营周期(年)", null=True)
    # 养殖获奖
    winning_y = models.CharField(max_length=20,verbose_name=u"养殖获奖", null=True)
    # 获奖图片
    winning_p = models.ImageField(verbose_name=u"获奖图片", null=True)
    # 农业补贴
    agricultural_subsidies = models.FloatField(default=0, verbose_name=u"农业补贴")
    # 建档时间
    join_time = models.DateTimeField(auto_now_add=True, verbose_name=u"建档时间")
    # 可贷款金额
    loanable = models.FloatField(default=0, verbose_name=u"贷款金额(元)")
    area = models.CharField(max_length=20,verbose_name="所属区域")
    Regional_Manager = models.CharField(max_length=20, verbose_name='区域经理')
    # 责任人（接收的业务人员）
    responsible = models.ForeignKey(PersonInfo, on_delete=models.CASCADE, verbose_name="责任人（接收的业务人员）")
    business_number = models.CharField(max_length=20, verbose_name='业务人员编号')

    class Meta:
        ordering = ("join_time",)
        verbose_name_plural = "户主建档信息"
        verbose_name = "户主建档信息"


# 户主家庭成员用户建档信息表
class PeopleOfMain(models.Model):
    # 姓名
    name = models.CharField(verbose_name="姓名", max_length=20, null=False)
    # 关联户主姓名
    relation_name = models.CharField(verbose_name="户主姓名", max_length=20)
    # 与户主的关系
    relation = models.CharField(max_length=20, null=True, verbose_name="与户主关系")
    # 身份证号码
    id_num = models.CharField(max_length=18, unique=True, verbose_name="身份证号码")
    # 手机号码
    phone_number = models.CharField(max_length=11, null=False, verbose_name="电话号码")
    # 所属区域
    area = models.CharField(max_length=50, verbose_name="区域")
    # 关联户主表
    user = models.ForeignKey(HouseMainInfo, on_delete=models.CASCADE, help_text="关联户主")

    class Meta:
        verbose_name_plural = "户主家庭成员"
        verbose_name = "户主家庭成员"
