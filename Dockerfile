FROM registry-itwork.yonghui.cn/public/frontbase:0.7.1

#ENV PRO_API_HOST api.kfitwork.yonghui.cn
#ENV PRO_REGION _CHO_SH

RUN echo "Asia/shanghai" > /etc/timezone;
ADD dist /usr/share/nginx/html
COPY   nginx.conf   /etc/nginx/
# COPY bash/repalce.sh /usr/share/nginx/html

#RUN chmod 777 /usr/share/nginx/html/repalce.sh
#ENTRYPOINT ["/usr/share/nginx/html/repalce.sh"]
CMD ["nginx", "-g", "daemon off;"]


EXPOSE 80
