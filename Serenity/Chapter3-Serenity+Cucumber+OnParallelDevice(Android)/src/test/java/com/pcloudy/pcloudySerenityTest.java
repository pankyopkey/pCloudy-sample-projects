package com.pcloudy;

import org.junit.AfterClass;
import org.junit.BeforeClass;

public class pcloudySerenityTest {

	@BeforeClass
	public static void setUp()  throws Exception  {
		System.out.println("Before method");
	}

	@AfterClass
	public static void tearDown() throws Exception {
		System.out.println("After method");
	}
}