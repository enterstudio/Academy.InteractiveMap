using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace MvcGeoMap.Tests.Views
{
    [TestClass]
    public class D3IndexTest
    {
        [TestMethod]
        public void TestMethod1()
        {
            var projection = d3.geo.mercator();
        }
    }
}
