# Базовый образ
FROM python:3.12-slim

# Установка системных зависимостей
RUN apt-get update && apt-get install -y \
    postgresql-client \
    && rm -rf /var/lib/apt/lists/*

# Рабочая директория
WORKDIR /app

# Копирование зависимостей
COPY mai_prod/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Копирование проекта
COPY . .

# Команда запуска (будет переопределена в docker-compose)
CMD ["python", "mai_prod/manage.py", "runserver", "0.0.0.0:8000"] 