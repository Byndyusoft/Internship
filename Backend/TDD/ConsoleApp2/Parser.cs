using System.Linq;

namespace TddDemo
{
    public class Parser
    {
        public Parser(IAlertPublisher publisher)
        {
            Publisher = publisher;
        }

        public IAlertPublisher Publisher { get; }

        public int Parse(ExcelFile excelFile)
        {
            for (var i = 0; i < excelFile._rows.Count(x => IsValidRow(x) == false); i++)
                Publisher.PublishAlert();

            return excelFile._rows.Count(IsValidRow);
        }

        private static bool IsValidRow(Row x)
        {
            return x.Cells.Count == 2;
        }
    }
}