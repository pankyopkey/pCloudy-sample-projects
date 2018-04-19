using ssts.util.pCloudy.AppiumAPIs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace pCloudyNUnitTestProject.TestDataSource
{
    public class TestCaseDataSource : ITestDataSource
    {

        PCloudyAppiumSession appiumSession;

        public TestCaseDataSource(PCloudyAppiumSession appiumSession)
        {
            this.appiumSession = appiumSession;
        }

        public PCloudyAppiumSession getAppiumSession()
        {
            return this.appiumSession;
        }

        public string getDeviceName()
        {
            return this.appiumSession.getDeviceName();
        }

        public override string ToString()
        {
            return getDeviceName();
        }
    }
}
