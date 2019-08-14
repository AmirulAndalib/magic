﻿/*
 * Magic, Copyright(c) Thomas Hansen 2019 - thomas@gaiasoul.com
 * Licensed as Affero GPL unless an explicitly proprietary license has been obtained.
 */

using System;
using System.Linq;
using System.Collections.Generic;
using magic.node;
using magic.signals.contracts;

namespace magic.lambda.equality
{
    [Slot(Name = "mt")]
    public class Mt : ISlot, IMeta
    {
        readonly ISignaler _signaler;

        public Mt(IServiceProvider services)
        {
            _signaler = services.GetService(typeof(ISignaler)) as ISignaler;
        }

        public void Signal(Node input)
        {
            Common.Compare(_signaler, input, (lhs, rhs) =>
            {
                if (lhs == null && rhs == null)
                    return false;
                else if (lhs != null && rhs == null)
                    return true;
                else if (lhs == null && rhs != null)
                    return false;
                return ((IComparable)lhs).CompareTo(rhs) == 1;
            });
        }

        public IEnumerable<Node> GetArguments()
        {
            yield return new Node("*", 2);
        }
    }
}
