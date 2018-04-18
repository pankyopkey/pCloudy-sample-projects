using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using NUnit.Framework;
using System.IO;

namespace pCloudyNUnitTestProject
{
    [TestFixture]
    [Parallelizable(ParallelScope.All)]
    public class UnitTest1
    {

        static String[] init()
        {
            log("init");
            return new string[] { "a", "abc", "pqrst" };
        }
        [TestCaseSource("init")]
        [Test]
        public void TestMethod1(String s)
        {

        }



        static void log(String s)
        {
            try
            {

                using (StreamWriter logFile = File.AppendText("log.txt"))
                {
                    logFile.WriteLine(s);
                }

                //  NUnit.Framework.TestContext.Out.WriteLine(s);
                Console.WriteLine(s);
            }
            catch (Exception ex)
            {

            }
        }
    }
}
