from urllib.parse import unquote
from django.core.management import BaseCommand
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from schedule.models import GroupLink
from schedule.utils.parse_date import parse_date
from schedule.models import Schedule, GroupLink


class Command(BaseCommand):
    help = 'updating schedule'

    def handle(self, *args, **options):
        try:
            driver = webdriver.Chrome()
            driver.implicitly_wait(2)
            for item in GroupLink.objects.all():
                # title - group name
                title, url = item.group_name, item.url
                driver.get(url=f'{url}&week=1')

                for week in range(1, 24):
                    driver.get(url=f'{url}&week={week}')
                    day_fields = driver.find_elements(
                        'css selector',
                        'div.step-content'
                    )
                    print(f"\n\n{title} week {week}")
                    for day_field in day_fields:
                        date = day_field.find_element(''
                        'css selector',
                        'span.step-title'
                        )
                        date = date.text.split(',')
                        date = date[1].split()

                        day = date[0]
                        month = date[1]

                        subjects = day_field.find_elements(
                            'css selector',
                            'div.mb-4'
                        )
                        for subject in subjects:
                            subject_field = subject.find_element(
                                'css selector',
                                'p'
                            ).text
                            subject_name = ' '.join(subject_field.split()[:-1])
                            subject_type = subject_field.split()[-1]
                            info_fields = subject.find_elements(
                                'css selector',
                                'li'
                            )
                            time = info_fields[0].text
                            if (len(info_fields) == 3):
                                teacher = info_fields[1].text
                                place = info_fields[2].text
                            else:
                                teacher = None
                                place = info_fields[1].text
                            
                            start_time = time.split(' - ')[0]
                            date = parse_date(f'{day} {month} {start_time}')
                            print(title, week, subject_name, subject_type, teacher, place, date)
                            Schedule.objects.create(
                                group_name=GroupLink.objects.get(group_name=title),
                                week=week,
                                lesson_name=subject_name,
                                lesson_type=subject_type,
                                teacher=teacher,
                                start_date=date,
                                place=place,
                            )



        finally: 
            driver.quit()