
// Example C# code creating a Hyperlambda slot.
using System;

using magic.node;
using magic.node.extensions;
using magic.signals.contracts;
using magic.node.contracts;

// Our slot class.
[Slot(Name = "foo")]
public class Foo : ISlot
{
    /*
     * Notice, because the DI container is built during startup, we cannot
     * use IoC on dynamically compiled code since we can't rebuild the IoC container.
     * This implies we'll have to use the "service locator" pattern to resolve services
     * in dynamically compiled C# code.
     * It's a drag, but we have no choice really.
     */
    readonly IServiceProvider _services;

    public Foo(IServiceProvider services)
    {
        _services = services;
    }

    public void Signal(ISignaler signaler, Node input)
    {
        var configuration = (IMagicConfiguration)_services.GetService(typeof(IMagicConfiguration));
        input.Value = $"Hello {input.GetEx<string>()} your SMTP server is {configuration["magic:smtp:host"]}";
    }
}
