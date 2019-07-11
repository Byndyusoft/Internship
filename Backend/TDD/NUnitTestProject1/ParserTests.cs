using System.Collections.Generic;
using Moq;
using NUnit.Framework;
using TddDemo;

namespace TddDemoTests
{
    public class ParserTests
    {
        [SetUp]
        public void Setup()
        {
            publisher = new Mock<IAlertPublisher>();
            parser = new Parser(publisher.Object);
        }

        public Mock<IAlertPublisher> publisher { get; set; }
        public Parser parser { get; set; }

        [Test]
        public void Return2ParsedRowsCount()
        {
            var count = parser.Parse(new ExcelFile(new List<Row>
            {
                CreateValidRow(),
                CreateValidRow()
            }));

            Assert.AreEqual(2, count);
        }
        

        [Test]
        public void Return3ParsedRowsCount()
        {
            var count = parser.Parse(new ExcelFile(new List<Row>
                {
                    CreateValidRow(),
                    CreateValidRow(),
                    CreateValidRow()
                })
            );

            Assert.AreEqual(3, count);
        }



        [Test]
        public void Return2_IfOneRowIsInvalidFor3RowsFile()
        {
            var count = parser.Parse(new ExcelFile(new List<Row>
                {
                    CreateValidRow(),
                    CreateValidRow(),
                    new Row(new List<Cell>
                    {
                        new Cell()
                    })
                })
            );

            Assert.AreEqual(2, count);
        }

        [Test]
        public void PublishAlert_IfOneRowIsInvalid()
        {

            var count = new Parser(publisher.Object).Parse(new ExcelFile(new List<Row>
                {
                    CreateValidRow(),
                    new Row(new List<Cell>
                    {
                        new Cell()
                    })
                })
            );

            publisher.Verify(x=>x.PublishAlert(), Times.Once);
        }

        [Test]
        public void DoNotPublishAlert_IfAllRowsAreValid()
        {

            var count = new Parser(publisher.Object).Parse(new ExcelFile(new List<Row>
                {
                    CreateValidRow(),
                    CreateValidRow()
                })
            );

            publisher.Verify(x=>x.PublishAlert(), Times.Never);
        }

        private static Row CreateValidRow()
        {
            return new Row(new List<Cell>
            {
                new Cell(),
                new Cell()
            });
        }
    }
}