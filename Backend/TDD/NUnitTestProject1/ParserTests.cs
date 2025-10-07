using System.Collections.Generic;
using System.Linq;
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
            repository = new Mock<IFileRepository>();
            parser = new Parser(publisher.Object, repository.Object);
        }

        public Mock<IAlertPublisher> publisher { get; set; }
        public Mock<IFileRepository> repository { get; set; }
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

            var count = new Parser(publisher.Object, repository.Object).Parse(new ExcelFile(new List<Row>
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

            var count = new Parser(publisher.Object, repository.Object).Parse(new ExcelFile(new List<Row>
                {
                    CreateValidRow(),
                    CreateValidRow()
                })
            );

            publisher.Verify(x=>x.PublishAlert(), Times.Never);
        }

        private static Row CreateValidRow(int numberOfCells = 2)
        {
            var cells = Enumerable.Repeat(new Cell(), numberOfCells).ToList();
            return new Row(cells);
        }

        [Test]
        public void MarkAsProcessed_IfAllRowsWereParsed()
        {
            var parser = new Parser(publisher.Object, repository.Object);
            var _ = parser.Parse(new ExcelFile(new List<Row>
                {
                    CreateValidRow(),
                    CreateValidRow()
                })
            );

            Assert.IsTrue(parser.IsProcessed);
        }

        [Test]
        public void DoNotMarkAsProcessed_IfAnyRowWereNotParsed()
        {
            var parser = new Parser(publisher.Object, repository.Object);
            var _ = parser.Parse(new ExcelFile(new List<Row>
                {
                    CreateValidRow(),
                    new Row(new List<Cell>
                    {
                        new Cell()
                    })
                })
            );

            Assert.IsFalse(parser.IsProcessed);
        }

        [Test]
        public void Return3ParsedRowsCountFromCsvFile()
        {
            var parser = new Parser(publisher.Object, repository.Object);
            var count = parser.Parse(new CsvFile(new List<Row>
                {
                    CreateValidRow(3),
                    CreateValidRow(3),
                    CreateValidRow(3)
                })
            );

            Assert.AreEqual(3, count);
        }
    }
}