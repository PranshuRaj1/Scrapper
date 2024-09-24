import puppeteer from "puppeteer";

export function findDetail(url) {
  //   const url =
  //   "https://www.flipkart.com/infinix-zero-book-ultra-ai-pc-intel-core-9-185h-32-gb-1-tb-ssd-windows-11-home-zl514-thin-light-laptop/p/itm78daa40a60633?pid=COMHFYZNN5XBNFDW&lid=LSTCOMHFYZNN5XBNFDWQOAKHL&marketplace=FLIPKART&q=infinix+zerobook+ultra&store=6bo%2Fb5g&srno=s_1_3&otracker=AS_Query_HistoryAutoSuggest_6_0_na_na_na&otracker1=AS_Query_HistoryAutoSuggest_6_0_na_na_na&fm=Search&iid=af4bca96-807f-4d29-a1de-41818ccc39de.COMHFYZNN5XBNFDW.SEARCH&ppt=dynamic&ppn=CART_PAGE&ssid=8a06mz2j000000001726907249374&qH=70188ec9de497607";
  // const url1 =
  //   "https://www.flipkart.com/samsung-galaxy-book4-360-evo-intel-core-5-120u-16-gb-512-gb-ssd-windows-11-home-np750qgk-kg1in-np750qgk-lg1in-2-1-laptop/p/itmce1336b974362?pid=COMGY2H4AG5DKPAA&lid=LSTCOMGY2H4AG5DKPAA0CAOVH&marketplace=FLIPKART&q=samsung+book4&store=6bo%2Fb5g&srno=s_1_1&otracker=AS_Query_OrganicAutoSuggest_3_1_na_na_ps&otracker1=AS_Query_OrganicAutoSuggest_3_1_na_na_ps&fm=search-autosuggest&iid=6afe6a7b-bc5e-4656-91c1-9c7cd7fa78ce.COMGY2H4AG5DKPAA.SEARCH&ppt=sp&ppn=sp&ssid=zcwakjsgq80000001726908296918&qH=8eda25a52469b2e0";

  (async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url1); // Replace with actual product URL

    // Extract the product details
    const productDetails = await page.evaluate(() => {
      const name = document.querySelector("span.VU-ZEz").innerText;
      const price = document.querySelector("div.hl05eU").innerText;
      return { name, price };
    });

    console.log(productDetails);

    await browser.close();
  })();
}
