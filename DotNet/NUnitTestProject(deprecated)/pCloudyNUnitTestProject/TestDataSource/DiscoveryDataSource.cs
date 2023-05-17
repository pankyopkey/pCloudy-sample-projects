using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace pCloudyNUnitTestProject.TestDataSource
{
    public class DiscoveryDataSource : ITestDataSource
    {

        String deviceFullName;

        public DiscoveryDataSource(String deviceFullName)
        {
            this.deviceFullName = deviceFullName;
        }

        public string getDeviceName()
        {
            return this.deviceFullName;
        }

        public override string ToString()
        {
            return getDeviceName();
        }
    }
}
