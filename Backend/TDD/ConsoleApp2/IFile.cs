using System.Collections.Generic;

namespace TddDemo
{
    public interface IFile
    {
        List<Row> Rows { get; }
        bool IsValidRow(Row x);
    }
}