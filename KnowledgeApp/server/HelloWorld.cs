using System;
using DotNetify;
using System.Threading;

namespace KnowledgeApp
{
    public class HelloWorld : BaseVM
    {
        public Guid instanceId = Guid.NewGuid();
        private Timer _timer;
        public string Greetings => "Hello World! " + instanceId;
        public DateTime ServerTime => DateTime.Now;

        public HelloWorld()
        {
            _timer = new Timer(state =>
            {
                Changed(nameof(ServerTime));
                PushUpdates();
            }, null, 0, 1000);
        }

        public override void Dispose() => _timer.Dispose();
    }
}