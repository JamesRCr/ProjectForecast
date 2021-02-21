import os
import json
from selenium import webdriver
from random import uniform
from time import sleep
from selenium.common.exceptions import NoSuchElementException
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.keys import Keys


def lambda_handler(event, context):
    input_address = event["queryStringParameters"]["address"]
    input_city = event["queryStringParameters"]["city"]
    results = start_selenium(input_address, input_city)
    busyness = results[0]
    status = results[1]

    response_body = {}
    response_body["busyness"] = busyness
    response_body["status"] = status

    response_object = {}
    response_object["statusCode"] = 200
    response_object["headers"] = {}
    response_object["headers"]["Content-Type"] = "application/json"
    response_object["body"] = json.dumps(response_body)

    return response_object


def start_selenium(input_address, input_city):
    # Again, we want to make the scraper undetectable
    os.system("cp /opt/chromedriver /tmp")
    os.system("cp /opt/headless-chromium /tmp")
    os.chmod("/tmp/chromedriver", 0o777)
    os.chmod("/tmp/headless-chromium", 0o777)

    options = webdriver.ChromeOptions()
    options.add_experimental_option("excludeSwitches", ["enable-automation"])
    options.add_experimental_option("useAutomationExtension", False)
    options.add_argument("--disable-dev-shm-usage")
    options.add_argument("--headless")
    options.add_argument("--no-sandbox")
    options.add_argument("--single-process")
    options.add_argument(
        "--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.83 Safari/537.36")

    options.binary_location = "/tmp/headless-chromium"
    browser = webdriver.Chrome("/tmp/chromedriver", chrome_options=options)

    # A very sketchy JS injection to make headlessness undetectable
    browser.execute_cdp_cmd(
        "Page.addScriptToEvaluateOnNewDocument",
        {
            "source": """
                // Pass the Webdriver test
                Object.defineProperty(navigator, 'webdriver', {
                    get: () => false,
                });

                // Pass the Chrome test
                chrome = {
                  runtime: {
                  // Expand as need be
                  },
                };

                // Pass the permissions test
                const originalQuery = window.navigator.permissions.query;
                window.navigator.permissions.query = (parameters) => (
                    parameters.name === 'notifications' ?
                    // Expand as need be
                    Promise.resolve({ state: Notification.permission }) :
                    originalQuery(parameters)
                );

                // Pass the WebGL test
                const getParameter = WebGLRenderingContext.getParameter;
                WebGLRenderingContext.prototype.getParameter = function(parameter) {
                // UNMASKED_VENDOR_WEBGL
                  if (parameter === 37445) {
                    return 'Intel Open Source Technology Center';
                  }
                  // UNMASKED_RENDERER_WEBGL
                  if (parameter === 37446) {
                    return 'Mesa DRI Intel(R) Ivybridge Mobile ';
                  }
                  return getParameter(parameter);
                };
                """
        })

    return start_scraping(browser, input_address, input_city)


def start_scraping(browser, input_address, input_city):
    browser.get("https://google.ca/maps")

    search = browser.find_element_by_id("searchboxinput")
    search.click()
    sleep(uniform(0.1, 0.25))
    search.send_keys(input_address)
    sleep(uniform(0.1, 0.25))
    ActionChains(browser).send_keys(Keys.ENTER).perform()
    sleep(uniform(3, 5))

    try:
        busyness = browser.find_element_by_css_selector(".section-popular-times-live-description").get_attribute(
            "innerHTML")
    except NoSuchElementException:
        busyness = "N/A"

    browser.get("https://covid-19.ontario.ca/zones-and-restrictions")
    sleep(uniform(1, 2))
    browser.find_element_by_css_selector(".ant-btn:nth-child(2) > span").click()

    city_name = "NULL"

    i = 0
    while i <= 3:
        city_number = 2
        while True:
            try:
                city_name = browser.find_element_by_css_selector(
                    ".ant-table-row:nth-child(" + str(city_number) + ") > .ant-table-cell:nth-child(1)").get_attribute(
                    "innerHTML")
                if city_name.find(input_city) != -1:
                    break
                city_number += 1
            except NoSuchElementException:
                browser.find_element_by_css_selector(".anticon-right > svg").click()
                break

        if city_name.find(input_city) != -1:
            break
        i += 1

    if i > 3:
        status = "N/A"
    else:
        raw_status = browser.find_element_by_css_selector(
            ".ant-table-row:nth-child(" + str(city_number) + ") > .ant-table-cell:nth-child(2)").get_attribute(
            "innerHTML")
        status = raw_status.split()[2][5:-1]

    browser.quit()
    return [busyness, status]
