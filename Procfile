release: python manage.py makemigrations
release: python manage.py makemigrations propensi
release: python manage.py migrate propensi
release: python manage.py migrate
web: gunicorn django_propensi.wsgi --log-file -