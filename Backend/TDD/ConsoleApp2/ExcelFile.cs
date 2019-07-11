using System.Collections.Generic;

namespace TddDemo
{
    public class ExcelFile
    {
        public readonly List<Row> _rows;

        public ExcelFile(List<Row> rows)
        {
            _rows = rows;
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