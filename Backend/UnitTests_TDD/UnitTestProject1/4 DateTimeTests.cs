// ReSharper disable InconsistentNaming

namespace _01CreateUnitTest
{
    using NUnit.Framework;

    public class DateTimeTests
    {
        [Test]
        public void FlakyTest()
        {
            Assert.AreEqual(0, System.DateTime.Now.Ticks % 2);
        }
    }
}