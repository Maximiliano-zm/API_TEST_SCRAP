import { chromium } from 'playwright';
import axios from "axios";

let apiUrl = 'https://prod-19.brazilsouth.logic.azure.com:443/workflows/44a3212fe70f460c84bd0b00149444af/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=n1pIAYWFyaJ8YwdOB9S_UpH5cbV3PtHvaa5_PWXSJNw';


const getTAT = async () => {

  const browser = await chromium.launch({ headless: true});
  const context = await browser.newContext({});
  const page = await context.newPage();
  await page.goto('https://getcar.cl/catalogo');
  await page.waitForTimeout(4000);

  const titlesTATERSALL = await page.locator('//div[contains(@class,\'product-detail\')]//h5').allInnerTexts();
  const pricesTATERSALL = await page.locator('//div[contains(@class,\'btn-container\')]//h5').allInnerTexts();
  const activitysTATERSALL = await page.locator('//div[contains(@class,\'btn-container\')]//span').allInnerTexts();

  const autosTATERSALL : any = [];
  titlesTATERSALL.map((title : any, index : any) => {
    const auto = {
      company: 'TAT',
      titulo: titlesTATERSALL[index],
      precio: pricesTATERSALL[index],
      actividad: activitysTATERSALL[index]
    };
    autosTATERSALL.push(auto);
  });

  await context.close();
  await browser.close();

  return autosTATERSALL;
};

  getTAT().then(res =>{
    axios.request({
      url: apiUrl,
      method: "POST",
      data : {res}
    }).catch((error : any) =>{
      console.log(error.message)
    })
  })

export default {getTAT}