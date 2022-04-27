release: python manage.py migrate propensi
release: python manage.py migrate
web: gunicorn django_propensi.wsgi --log-file -
web: java -Dserver.port=$PORT $JAVA_OPTS -jar target/*.jar
