using NUnit.Framework;

namespace Portfolio.Tests;

public class PortfolioTest
{
    [Test]
    public void Fix_Me()
    {
        var app = new Portfolio("../../../portfolio.csv");

        app.ComputePortfolioValue();

        Assert.That("fixme", Is.EqualTo("fixme"));
    }
}