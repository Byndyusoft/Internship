using System.Collections.Generic;
using TddDemo;

namespace TddDemo
{
    public class CsvFile : IFile
    {
        public List<Row> Rows { get; private set; }

        public CsvFile(List<Row> rows)
        {
            Rows = rows;
        }

        public bool IsValidRow(Row x)
        {
            return x.Cells.Count == 3;
        }
    }
}