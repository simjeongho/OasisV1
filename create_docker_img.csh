/bin/csh

docker build -t oasis-front-app:dev .
aws lightsail push-container-image --region ap-northeast-2 --service-name oasis-front-app-dev --label oasis-front-app-dev --image oasis-front-app:dev
