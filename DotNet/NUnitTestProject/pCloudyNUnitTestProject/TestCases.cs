using NUnit.Framework;
using System;
using System.Collections.Generic;

namespace NUnitTestProject1
{

    [TestFixture]
    [Parallelizable(ParallelScope.Children)]
    public class TestCases
    {
        static Random rnd = new Random();


        public static pCloudyDeviceContext[] init()
        {
            List<pCloudyDeviceContext> list = new List<pCloudyDeviceContext>();

            for (int i = 0; i < rnd.Next(8, 15); i++)
            {
                list.Add(new pCloudyDeviceContext(i, 5, i - 5));
            }

            return list.ToArray();
        }

        [TestCaseSource("init")]
        [Test]
        public void multiply(pCloudyDeviceContext multiply)
        //public void multiply(pCloudyDeviceContext multiply)
        {
            // Console.Out.WriteLine(System.DateTime.Now);
            //Assert.AreEqual(multiply.sum, multiply.a * multiply.b);

            System.Threading.Thread.Sleep(rnd.Next(100, 500));
            // System.Threading.Thread.Sleep(1000);
        }


        [TearDown]
        public void cleanup()
        {

        }

    }
}