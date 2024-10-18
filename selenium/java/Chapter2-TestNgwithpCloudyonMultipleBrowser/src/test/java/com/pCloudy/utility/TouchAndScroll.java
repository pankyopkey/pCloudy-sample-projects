package com.pCloudy.utility;

import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.remote.RemoteWebDriver;

public class TouchAndScroll {

	public void verticalScrollForElement(RemoteWebDriver driver) throws InterruptedException {


		long lastHeight = (long) ((JavascriptExecutor) driver).executeScript("return document.body.scrollHeight");

		while (true) {

			((JavascriptExecutor) driver).executeScript("window.scrollTo(0, document.body.scrollHeight);");

			Thread.sleep(2000); 
			long newHeight = (long) ((JavascriptExecutor) driver).executeScript("return document.body.scrollHeight");
			if (newHeight == lastHeight) {
				break;
			}

			lastHeight = newHeight;
		}


	}

}
