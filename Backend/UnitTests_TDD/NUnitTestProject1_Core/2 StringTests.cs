// ReSharper disable InconsistentNaming

namespace _01CreateUnitTest
{
    using System;
    using NUnit.Framework;

    public class StringTests
    {
        [Test]
        public void StringComparingCaseSensitive()
        {
            bool result = "some string" == "some String";

            Assert.False(result);
        }
        [Test]
        public void IfStringIsNull_LenghtThrowsException()
        {
            string nullString = null;
            Assert.Throws<NullReferenceException>(
                () =>
                {
                    nullString.Length.ToString();
                });
        }
    }
}