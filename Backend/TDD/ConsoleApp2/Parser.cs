using System.Linq;

namespace TddDemo
{
    public class Parser
    {
        public Parser(IAlertPublisher publisher, IFileRepository fileRepository)
        {
            Publisher = publisher;
            FileRepository = fileRepository;
        }

        public IAlertPublisher Publisher { get; }
        public IFileRepository FileRepository { get; }
        public bool IsProcessed { get; private set; }

        public int Parse(IFile file)
        {
            for (var i = 0; i < file.Rows.Count(x => file.IsValidRow(x) == false); i++)
                Publisher.PublishAlert();

            if (file.Rows.All(file.IsValidRow))
            {
                FileRepository.Save(file);

                IsProcessed = true;
            }

            return file.Rows.Count(file.IsValidRow);
        }
    }
}