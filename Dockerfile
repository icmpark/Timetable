FROM alpine
RUN apk update
RUN apk add --no-cache chromium  
RUN apk add --no-cache chromium-chromedriver
RUN apk add --no-cache python3 python3-dev py3-pip nano 
RUN apk add --no-cache gcc musl-dev libffi-dev
RUN pip3 install flask pymysql flask-login flask-security cryptography mysql-connector-python selenium
WORKDIR /src/
ENTRYPOINT ["flask",  "run"] 
