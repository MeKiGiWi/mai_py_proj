from urllib.parse import unquote
from django.core.management import BaseCommand
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from schedule.models import GroupLink


class Command(BaseCommand):
    help = 'updating links'

    def handle(self, *args, **options):
        try:
            driver = webdriver.Chrome()
            LINK_TO_SCHEDULE = 'https://mai.ru/education/studies/schedule/groups.php?department=%D0%98%D0%BD%D1%81%D1%82%D0%B8%D1%82%D1%83%D1%82+%E2%84%968&course=all'
            driver.get(LINK_TO_SCHEDULE)
            driver.implicitly_wait(1)

            elements = driver.find_elements(
                'css selector', 
                'div.tab-content.mb-5.mb-sm-8'
                )

            for element in elements:
                sections = element.find_elements(
                    'css selector',
                    'div.tab-pane.fade'
                )
                for section in sections:
                    links = section.find_elements(
                        'css selector',
                        'a'
                    )
                    links = list(map(lambda x: x.get_attribute('href'), links))
                    for link in links:
                        link = unquote(link)
                        name = link.split('group=')[1]
                        GroupLink.objects.create(
                            group_name=f'{name}',
                            url=f'{link}',
                        )
            

        finally: 
            driver.quit()