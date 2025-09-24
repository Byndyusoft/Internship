using System;
using System.ComponentModel;
using MvvmExample;
using NUnit.Framework;

namespace MvvmTests
{
    public class MvvmExampleTests
    {
        [Test]
        public void IfNameIsChanged_RaiseEvent()
        {
            var viewModel = new SongViewModel();

            viewModel.PropertyChanged += handle;

            viewModel.ArtistName = "new name";

            Assert.Fail();
        }

        private void handle(object sender, PropertyChangedEventArgs e)
        {
            Assert.Pass();
        }
    }
}
