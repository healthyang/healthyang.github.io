---
layout: post
title: "sort by citylist"
date: "2019-06-04 09:51:40 +0800"
---
import numpy as np
import pandas as pd



```
citylist=['南京','苏州','无锡','常州','南通','镇江','扬州','泰州','徐州','盐城','淮安','连云港','宿迁']
fn=r'a.xlsx'#待排序文件,有列为江苏省十三个地市

df=pd.read_excel(fn,encoding='gbk')

df['地市'] = df['地市'].astype('category')
df['地市'].cat.set_categories(citylist, inplace=True)
df.sort_values('地市', inplace=True)

df.to_excel(fn)
```