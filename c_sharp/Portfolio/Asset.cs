using System.Globalization;

namespace Portfolio;

public class Asset
{
    private readonly DateTime _date;

    public Asset(string description, DateTime date, Value value)
    {
        Description = description;
        _date = date;
        Value = value;
    }

    public string Description { get; }

    public DateTime Date => _date.Date;

    public Value Value { get; set; }
}

public abstract class Value
{
    protected readonly int _value;

    protected Value(int value)
    {
        _value = value;
    }

    public int Get()
    {
        return _value;
    }
}

public class MeasurableValue : Value
{
    public MeasurableValue(int value) : base(value)
    {
    }

    public override string ToString()
    {
        return _value.ToString(CultureInfo.CurrentCulture);
    }
}

public class PricelessValue : Value
{
    public PricelessValue() : base(int.MaxValue)
    {
    }
}

public class NoValue : Value
{
    public NoValue() : base(0)
    {
    }
}