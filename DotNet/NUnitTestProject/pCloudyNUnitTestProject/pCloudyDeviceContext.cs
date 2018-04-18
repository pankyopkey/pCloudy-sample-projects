using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NUnitTestProject1
{
    public class pCloudyDeviceContext
    {

        public int sum;
        public int a;
        public int b;

        public pCloudyDeviceContext(int sum, int a, int b)
        {
            this.sum = sum;
            this.a = a;
            this.b = b;
        }




        public override string ToString()
        {
            return String.Format("Sum: {0} a:{1} b:{2}", sum, a, b);
        }
    }
}
