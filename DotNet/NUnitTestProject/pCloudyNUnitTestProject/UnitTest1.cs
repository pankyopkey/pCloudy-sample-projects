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
            log(s);
        }



        static void log(String s)
        {

            Console.WriteLine(s);

        }
    }
}
