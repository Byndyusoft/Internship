using System.Collections.Generic;

namespace TddDemo
{
    public class ExcelFile : IFile
    {
        public List<Row> Rows {  get; private set; }

        public ExcelFile(List<Row> rows)
        {
            Rows = rows;
        }

        public bool IsValidRow(Row x)
        {
            return x.Cells.Count == 2;
        }
    }
    public class Row
    {
        public List<Cell> Cells { get; }

        public Row(List<Cell> cells)
        {
            Cells = cells;
        }
    }
    public class Cell
    {
        
    }
}