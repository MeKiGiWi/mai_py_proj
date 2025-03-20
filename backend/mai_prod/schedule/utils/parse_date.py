from datetime import datetime
import locale

# Устанавливаем локаль для русского языка
locale.setlocale(locale.LC_TIME, 'ru_RU.UTF-8')

def parse_date(date_time_str, default_time=(0, 0)):
    """
    Парсит строку формата '[день] [месяц] [HH:MM]' и возвращает datetime
    с учётом учебного года.
    
    :param date_time_str: Строка с датой и временем (например, "12 мая 14:30")
    :param default_time: Кортеж (часы, минуты) по умолчанию, если время не указано
    :return: Объект datetime
    """
    # Текущая дата
    today = datetime.now()
    current_year = today.year
    current_month = today.month

    # Определяем учебный год
    academic_year = current_year if current_month >= 9 else current_year - 1

    # Разделяем дату и время
    parts = date_time_str.split()
    time_part = None
    
    # Ищем часть с временем
    for i, part in enumerate(parts):
        if ':' in part:
            time_part = part
            date_part = ' '.join(parts[:i])
            break
    
    if not time_part:
        date_part = date_time_str
        hours, minutes = default_time
    else:
        try:
            hours, minutes = map(int, time_part.split(':'))
        except ValueError:
            raise ValueError(f"Некорректный формат времени: {time_part}")

    # Парсим дату
    try:
        date_obj = datetime.strptime(date_part, '%d %B')
    except ValueError:
        raise ValueError(f"Некорректный формат даты: {date_part}")

    month = date_obj.month
    day = date_obj.day

    # Определяем год для события
    year = academic_year if month >= 9 else academic_year + 1

    return datetime(year, month, day, hours, minutes)