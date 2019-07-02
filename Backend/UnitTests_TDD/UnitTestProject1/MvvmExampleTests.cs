using System;
using System.ComponentModel;
using Example2;
using NUnit.Framework;

namespace MvvmTests
{
    public class MvvmExampleTests
    {
        [Test]
        public void IfNameIsChanged_RaiseEvent()
        {
            //arrange
            var viewModel = new SongViewModel();
            viewModel.PropertyChanged += new PropertyChangedEventHandler(method);

            //act
            viewModel.ArtistName = "changed name";

            // assert
            Assert.Fail();
        }

        private void method(object sender, EventArgs e)
        {
            // assert
            Assert.Pass();
        }
    }
}
