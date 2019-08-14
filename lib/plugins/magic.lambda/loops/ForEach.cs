﻿/*
 * Magic, Copyright(c) Thomas Hansen 2019 - thomas@gaiasoul.com
 * Licensed as Affero GPL unless an explicitly proprietary license has been obtained.
 */

using System;
using System.Linq;
using System.Collections.Generic;
using magic.node;
using magic.signals.contracts;

namespace magic.lambda.loops
{
    [Slot(Name = "for-each")]
    public class ForEach : ISlot, IMeta
    {
        readonly ISignaler _signaler;

        public ForEach(IServiceProvider services)
        {
            _signaler = services.GetService(typeof(ISignaler)) as ISignaler;
        }

        public void Signal(Node input)
        {
            var dest = input.Get<Expression>().Evaluate(new Node[] { input });
            var old = input.Children.Select((x) => x.Clone()).ToList();
            foreach (var idx in dest)
            {
                var dp = new Node(".dp", idx);
                input.Insert(0, dp);
                _signaler.Signal("eval", input);
                input.Clear();
                input.AddRange(old.Select((x) => x.Clone()));
            }
        }

        public IEnumerable<Node> GetArguments()
        {
            yield return new Node("*", "*");
            yield return new Node(":", "x");
        }
    }
}
