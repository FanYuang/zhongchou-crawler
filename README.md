# zhongchou-crawler
Project that helps my friend who is pursuing PHD in social science in Renmin University of China to crawl data from https://zhongchou.modian.com to do research
The most special thing about this crawler project is that because the page uses lazy loading and the comment page changes, displaying more comments is achieved by switching the displayed components instead of jumping the page. So only crawling pages with http requests cannot achieve the purpose. So I used a headless browser (Puppeteer) to simulate user behavior for crawling.
