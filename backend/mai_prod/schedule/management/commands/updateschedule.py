from urllib.parse import unquote
from django.core.management import BaseCommand
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from schedule.models import GroupLink
from time import sleep



class Command(BaseCommand):
    help = 'updating schedule'

    def handle(self, *args, **options):
        try:
            driver = webdriver.Chrome()
            driver.implicitly_wait(2)
            for item in GroupLink.objects.all():
                title, url = item.title, item.url
                driver.get(url=f'{url}&week=1')

                for week in range(1, 23):
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
                        print(day, month)
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
                            print(subject_name, '      ', subject_type)


        finally: 
            driver.quit()