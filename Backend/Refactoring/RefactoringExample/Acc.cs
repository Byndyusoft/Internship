using System;

namespace RefactoringExample
{
	public class Acc
	{
		public int bal;
		public bool dis;

		// create class
		public Acc()
		{
			bal = 25;
			dis = false;
		}

		// get money from another account
		public void Trans(Acc acc, int m1) {
			if ((acc == null).ToString() == "True")
				throw new ArgumentNullException("acc");

			bal += m1;
			acc.bal -= m1;

			int b = bal;

			if (b <= -10)
				dis = true;

			acc.dis = acc.bal <= -10;
		}
	}
}